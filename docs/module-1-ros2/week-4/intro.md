---
sidebar_position: 1
title: "Week 4: URDF and Robot Modeling in ROS 2"
description: "Understanding Unified Robot Description Format (URDF) for robot modeling and simulation"
---

# Week 4: URDF and Robot Modeling in ROS 2

## Learning Objectives

By the end of this week, you will be able to:
- Create and modify URDF files to describe robot geometry and kinematics
- Understand the structure of URDF files including links, joints, and materials
- Use Xacro to create parameterized and reusable URDF models
- Visualize robot models in RViz and Gazebo simulation environments
- Integrate URDF models with ROS 2 control systems

## Topics Covered

- URDF basics: Links, joints, and materials
- Xacro for parameterized robot descriptions
- Robot state publishing and TF trees
- Visualization in RViz
- Integration with simulation environments

## 4.1 Understanding URDF

### 4.1.1 What is URDF?

Unified Robot Description Format (URDF) is an XML format for representing a robot model. It defines the physical and visual properties of a robot, including its links, joints, and materials.

### 4.1.2 URDF Structure

A URDF file contains:
- **Links**: Rigid parts of the robot (e.g., chassis, arms, wheels)
- **Joints**: Connections between links with specific degrees of freedom
- **Materials**: Visual properties like color and texture
- **Inertial properties**: Mass, center of mass, and inertia tensor

### 4.1.3 Basic URDF Example

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Wheel link -->
  <link name="wheel_link">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.1"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.0005"/>
    </inertial>
  </link>

  <!-- Joint connecting base to wheel -->
  <joint name="wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_link"/>
    <origin xyz="0.2 0 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>
</robot>
```

## 4.2 Links and Their Properties

### 4.2.1 Visual Elements

The visual element defines how a link appears in simulation and visualization:
- **Geometry**: Shape (box, cylinder, sphere, mesh)
- **Material**: Color and texture properties
- **Origin**: Position and orientation relative to parent

### 4.2.2 Collision Elements

The collision element defines the physical boundaries of a link:
- Used for physics simulation and collision detection
- Can be different from visual geometry for performance

### 4.2.3 Inertial Elements

The inertial element defines the physical properties for dynamics:
- **Mass**: Mass of the link
- **Inertia**: 3x3 inertia tensor
- **Origin**: Center of mass location

## 4.3 Joints and Their Types

### 4.3.1 Joint Types

- **Fixed**: No degrees of freedom (rigid connection)
- **Revolute**: One rotational degree of freedom with limits
- **Continuous**: One rotational degree of freedom without limits
- **Prismatic**: One translational degree of freedom with limits
- **Floating**: Six degrees of freedom (x, y, z, roll, pitch, yaw)

### 4.3.2 Joint Properties

- **Parent/Child**: Links connected by the joint
- **Origin**: Position and orientation of the joint
- **Axis**: Axis of rotation or translation
- **Limits**: Range of motion for revolute/prismatic joints

## 4.4 Xacro for Parameterized Descriptions

### 4.4.1 What is Xacro?

Xacro (XML Macros) is an XML macro language that allows you to create parameterized and reusable URDF models.

### 4.4.2 Xacro Example

```xml
<?xml version="1.0"?>
<robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="xacro_robot">

  <!-- Properties -->
  <xacro:property name="wheel_radius" value="0.1" />
  <xacro:property name="wheel_width" value="0.05" />
  <xacro:property name="base_length" value="0.5" />
  <xacro:property name="base_width" value="0.5" />
  <xacro:property name="base_height" value="0.2" />

  <!-- Macro for creating wheels -->
  <xacro:macro name="wheel" params="prefix reflect">
    <link name="${prefix}_wheel">
      <visual>
        <origin xyz="0 0 0" rpy="${pi/2} 0 0"/>
        <geometry>
          <cylinder radius="${wheel_radius}" length="${wheel_width}"/>
        </geometry>
        <material name="black">
          <color rgba="0 0 0 1"/>
        </material>
      </visual>
      <collision>
        <origin xyz="0 0 0" rpy="${pi/2} 0 0"/>
        <geometry>
          <cylinder radius="${wheel_radius}" length="${wheel_width}"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="0.1"/>
        <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.0005"/>
      </inertial>
    </link>
  </xacro:macro>

  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="${base_length} ${base_width} ${base_height}"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="${base_length} ${base_width} ${base_height}"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Wheels using macro -->
  <xacro:wheel prefix="front_left" reflect="1"/>
  <xacro:wheel prefix="front_right" reflect="-1"/>
  <xacro:wheel prefix="back_left" reflect="1"/>
  <xacro:wheel prefix="back_right" reflect="-1"/>

</robot>
```

## 4.5 Robot State Publishing

### 4.5.1 Joint State Publisher

The joint state publisher provides information about joint positions, velocities, and efforts.

### 4.5.2 Robot State Publisher

The robot state publisher combines joint states with URDF to publish TF transforms.

## 4.6 Practical Exercise

Create a URDF model for a simple differential drive robot with:
1. A rectangular base
2. Four wheels (two drive wheels, two caster wheels)
3. A camera mounted on top
4. Use Xacro to parameterize dimensions
5. Include proper inertial properties

## Next Steps

Continue to Week 5 to explore ROS 2 control systems and robot hardware interfaces.