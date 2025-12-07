---
sidebar_position: 1
title: "Week 5: Unity for Robotics Simulation and Digital Twins"
description: "Using Unity 3D for creating realistic robotics simulations and digital twin environments"
---

# Week 5: Unity for Robotics Simulation and Digital Twins

## Learning Objectives

By the end of this week, you will be able to:
- Set up Unity for robotics simulation with the Unity Robotics Hub
- Create realistic 3D environments for robot testing
- Interface Unity with ROS 2 using ROS-TCP-Connector
- Implement physics-based robot simulation in Unity
- Compare Unity and Gazebo for different robotics applications

## Topics Covered

- Unity Robotics Hub setup and configuration
- Environment design and 3D modeling
- ROS 2 integration with Unity
- Physics simulation and sensor modeling
- Digital twin applications

## 5.1 Unity for Robotics Overview

### 5.1.1 Introduction to Unity Robotics

Unity, primarily known as a game development engine, has emerged as a powerful platform for robotics simulation with its Unity Robotics Hub. Unity provides:
- High-fidelity 3D graphics and rendering
- Advanced physics simulation with PhysX engine
- Flexible environment creation tools
- Cross-platform deployment capabilities
- Real-time performance optimization

### 5.1.2 Unity Robotics Ecosystem

- **Unity Robotics Hub**: Centralized package management for robotics tools
- **Unity ML-Agents**: Reinforcement learning framework
- **ROS-TCP-Connector**: Bridge between Unity and ROS/ROS 2
- **Unity Perception**: Tools for generating synthetic training data
- **Unity Simulation**: Scalable simulation capabilities

## 5.2 Setting Up Unity for Robotics

### 5.2.1 Installation Requirements

```bash
# Install Unity Hub (recommended)
# Download from unity.com/get-unity/download

# Install Unity Editor (2021.3 LTS or later recommended)
# Add the following modules:
# - Built-in Package: Physics, Physics 2D, etc.
# - Unity Package Manager: Visual Scripting, etc.
```

### 5.2.2 Installing Unity Robotics Packages

1. Open Unity Hub and create a new 3D project
2. Open Package Manager (Window > Package Manager)
3. Install the following packages:
   - **ROS-TCP-Connector**: Interface with ROS/ROS 2
   - **ML-Agents**: Reinforcement learning framework
   - **Unity Perception**: Synthetic data generation

## 5.3 Environment Creation in Unity

### 5.3.1 Basic Scene Setup

```csharp
using UnityEngine;

public class RobotEnvironment : MonoBehaviour
{
    // Environment parameters
    public float environmentSize = 10f;
    public Material floorMaterial;
    public GameObject[] obstacles;

    void Start()
    {
        CreateEnvironment();
    }

    void CreateEnvironment()
    {
        // Create floor
        GameObject floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
        floor.transform.localScale = new Vector3(environmentSize / 10, 1, environmentSize / 10);
        floor.GetComponent<Renderer>().material = floorMaterial;

        // Add boundaries
        CreateBoundaryWalls();
    }

    void CreateBoundaryWalls()
    {
        float wallHeight = 2f;
        float wallThickness = 0.1f;
        float halfSize = environmentSize / 2f;

        // Create four walls
        for (int i = 0; i < 4; i++)
        {
            GameObject wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
            wall.GetComponent<Renderer>().material = floorMaterial;

            switch (i)
            {
                case 0: // North wall
                    wall.transform.position = new Vector3(0, wallHeight / 2, halfSize);
                    wall.transform.localScale = new Vector3(environmentSize, wallHeight, wallThickness);
                    break;
                case 1: // South wall
                    wall.transform.position = new Vector3(0, wallHeight / 2, -halfSize);
                    wall.transform.localScale = new Vector3(environmentSize, wallHeight, wallThickness);
                    break;
                case 2: // East wall
                    wall.transform.position = new Vector3(halfSize, wallHeight / 2, 0);
                    wall.transform.localScale = new Vector3(wallThickness, wallHeight, environmentSize);
                    break;
                case 3: // West wall
                    wall.transform.position = new Vector3(-halfSize, wallHeight / 2, 0);
                    wall.transform.localScale = new Vector3(wallThickness, wallHeight, environmentSize);
                    break;
            }
        }
    }
}
```

### 5.3.2 Importing Robot Models

Unity supports importing robot models in various formats:
- **FBX**: Industry standard for 3D models
- **OBJ**: Simple geometry format
- **URDF**: Can be converted using external tools

## 5.4 ROS 2 Integration with Unity

### 5.4.1 ROS-TCP-Connector Setup

The ROS-TCP-Connector enables communication between Unity and ROS 2:

```csharp
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;

public class UnityRobotController : MonoBehaviour
{
    ROSConnection ros;
    string rosIP = "127.0.0.1"; // Default localhost
    int rosPort = 10000;

    void Start()
    {
        // Initialize ROS connection
        ros = ROSConnection.GetOrCreateInstance();
        ros.Initialize(rosIP, rosPort);
    }

    // Example: Send robot position to ROS
    void SendRobotPosition()
    {
        var position = new Unity.Robotics.ROSTCPConnector.MessageTypes.Geometry_msgs.Pose();
        position.position.x = transform.position.x;
        position.position.y = transform.position.y;
        position.position.z = transform.position.z;

        ros.Send("robot_position", position);
    }

    // Example: Receive movement commands from ROS
    void OnMessageReceived(Unity.Robotics.ROSTCPConnector.MessageTypes.Std_msgs.Float32Msg msg)
    {
        // Process incoming message
        Debug.Log("Received command: " + msg.data);
    }
}
```

### 5.4.2 Unity-ROS Bridge Implementation

```csharp
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Geometry_msgs;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Sensor_msgs;

public class DifferentialDriveRobot : MonoBehaviour
{
    public float wheelRadius = 0.1f;
    public float wheelSeparation = 0.4f;
    public GameObject leftWheel;
    public GameObject rightWheel;

    ROSConnection ros;
    float leftWheelVelocity = 0f;
    float rightWheelVelocity = 0f;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.Initialize("127.0.0.1", 10000);

        // Subscribe to velocity commands
        ros.Subscribe<Unity.Robotics.ROSTCPConnector.MessageTypes.Std_msgs.Float32MultiArrayMsg>(
            "cmd_vel", ReceiveVelocityCommand);
    }

    void ReceiveVelocityCommand(Unity.Robotics.ROSTCPConnector.MessageTypes.Std_msgs.Float32MultiArrayMsg cmd)
    {
        if (cmd.data.Length >= 2)
        {
            leftWheelVelocity = cmd.data[0];
            rightWheelVelocity = cmd.data[1];
        }
    }

    void Update()
    {
        // Apply wheel velocities
        if (leftWheel != null)
            leftWheel.transform.Rotate(Vector3.right, leftWheelVelocity * Time.deltaTime * Mathf.Rad2Deg);

        if (rightWheel != null)
            rightWheel.transform.Rotate(Vector3.right, rightWheelVelocity * Time.deltaTime * Mathf.Rad2Deg);

        // Calculate robot movement based on differential drive kinematics
        float linearVelocity = (leftWheelVelocity + rightWheelVelocity) * wheelRadius / 2f;
        float angularVelocity = (rightWheelVelocity - leftWheelVelocity) * wheelRadius / wheelSeparation;

        // Update robot position and rotation
        transform.Translate(Vector3.forward * linearVelocity * Time.deltaTime);
        transform.Rotate(Vector3.up, angularVelocity * Time.deltaTime * Mathf.Rad2Deg);

        // Publish odometry
        PublishOdometry();
    }

    void PublishOdometry()
    {
        var odom = new Odometry();
        odom.header.frame_id = "odom";
        odom.header.stamp = new TimeStamp(0, (uint)(Time.time * 1000000000));

        // Set position
        odom.pose.pose.position.x = transform.position.x;
        odom.pose.pose.position.y = transform.position.z; // Unity Z is ROS Y
        odom.pose.pose.position.z = transform.position.y; // Unity Y is ROS Z

        // Convert Unity rotation to ROS quaternion
        Quaternion unityRot = transform.rotation;
        odom.pose.pose.orientation.x = unityRot.x;
        odom.pose.pose.orientation.y = unityRot.z; // Unity Z is ROS Y
        odom.pose.pose.orientation.z = unityRot.y; // Unity Y is ROS Z
        odom.pose.pose.orientation.w = unityRot.w;

        ros.Send("odom", odom);
    }
}
```

## 5.5 Physics Simulation in Unity

### 5.5.1 Unity Physics Engine

Unity uses the PhysX physics engine by default, which provides:
- Rigid body dynamics
- Collision detection and response
- Joint constraints
- Raycasting and overlap queries

### 5.5.2 Configuring Physics for Robotics

```csharp
using UnityEngine;

public class PhysicsConfigurator : MonoBehaviour
{
    public void ConfigurePhysics()
    {
        // Set physics timestep for accurate simulation
        Time.fixedDeltaTime = 0.02f; // 50 Hz physics update
        Physics.defaultSolverIterations = 10;
        Physics.defaultSolverVelocityIterations = 2;

        // Enable auto-simulation for continuous physics updates
        Physics.autoSimulation = true;
        Physics.autoSyncTransforms = true;
    }
}
```

## 5.6 Sensor Simulation in Unity

### 5.6.1 Camera Sensor

```csharp
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Sensor_msgs;

public class CameraSensor : MonoBehaviour
{
    public Camera sensorCamera;
    public int imageWidth = 640;
    public int imageHeight = 480;
    public float publishRate = 30f; // Hz

    private RenderTexture renderTexture;
    private Texture2D texture2D;
    private ROSConnection ros;
    private float lastPublishTime;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();

        // Create render texture for camera
        renderTexture = new RenderTexture(imageWidth, imageHeight, 24);
        sensorCamera.targetTexture = renderTexture;

        texture2D = new Texture2D(imageWidth, imageHeight, TextureFormat.RGB24, false);
    }

    void Update()
    {
        if (Time.time - lastPublishTime >= 1f / publishRate)
        {
            PublishImage();
            lastPublishTime = Time.time;
        }
    }

    void PublishImage()
    {
        // Capture image from render texture
        RenderTexture.active = renderTexture;
        texture2D.ReadPixels(new Rect(0, 0, imageWidth, imageHeight), 0, 0);
        texture2D.Apply();

        // Convert to ROS Image message and publish
        // Implementation would convert texture2D to ROS Image format
    }
}
```

## 5.7 Digital Twin Applications

### 5.7.1 Unity vs Gazebo Comparison

| Feature | Unity | Gazebo |
|---------|-------|--------|
| Graphics Quality | Very High | High |
| Physics Accuracy | High (PhysX) | Very High (ODE/Bullet) |
| Environment Design | Intuitive tools | SDF/XML based |
| Real-time Performance | Excellent | Good |
| ROS Integration | ROS-TCP-Connector | Native support |
| Learning Curve | Moderate | Steeper |
| Community | Large (gaming) | Robotics-focused |

### 5.7.2 Use Cases for Each Platform

**Unity is preferred for:**
- High-fidelity visualization
- VR/AR applications
- Complex environment design
- Digital twin applications
- Human-robot interaction studies

**Gazebo is preferred for:**
- Physics-accurate simulation
- Standardized robotics testing
- Integration with ROS ecosystem
- Reproducible research
- Multi-robot simulation

## 5.8 Practical Exercise

Create a Unity robotics simulation:
1. Set up Unity with ROS-TCP-Connector
2. Create a simple differential drive robot
3. Implement basic movement control via ROS
4. Add camera sensor simulation
5. Compare performance and features with Gazebo

## Next Steps

Complete Module 2 by reviewing both Gazebo and Unity simulation approaches, then proceed to Module 3: The AI-Robot Brain (NVIDIA Isaac™).