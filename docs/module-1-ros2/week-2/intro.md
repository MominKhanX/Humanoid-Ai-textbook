---
sidebar_position: 1
title: "Week 2: ROS 2 Packages, Workspaces, and Basic Commands"
description: "Understanding ROS 2 packages, workspaces, and fundamental command-line tools"
---

# Week 2: ROS 2 Packages, Workspaces, and Basic Commands

## Learning Objectives

By the end of this week, you will be able to:
- Create and manage ROS 2 workspaces and packages
- Use essential ROS 2 command-line tools
- Understand the package structure and build system
- Implement basic publisher-subscriber patterns
- Debug ROS 2 applications using command-line tools

## Topics Covered

- ROS 2 workspace structure and setup
- Package creation and management
- Essential ROS 2 commands (ros2, colcon)
- Basic publisher-subscriber implementation
- Package dependencies and build system

## 2.1 ROS 2 Workspace Structure

### 2.1.1 Understanding Workspaces

A ROS 2 workspace is a directory containing ROS 2 packages that you want to build and use. The typical structure is:

```
ros2_workspace/
├── src/
│   ├── package_1/
│   ├── package_2/
│   └── ...
├── build/
├── install/
└── log/
```

### 2.1.2 Creating a Workspace

```bash
# Create workspace directory
mkdir -p ~/ros2_workspace/src
cd ~/ros2_workspace

# Build the workspace (even without packages yet)
colcon build

# Source the setup file
source install/setup.bash
```

### 2.1.3 Sourcing the Workspace

To use your workspace, you must source its setup file:

```bash
# Each time you open a new terminal
source ~/ros2_workspace/install/setup.bash

# Or add to your bashrc to source automatically
echo "source ~/ros2_workspace/install/setup.bash" >> ~/.bashrc
```

## 2.2 Package Management

### 2.2.1 Creating a Package

```bash
cd ~/ros2_workspace/src
ros2 pkg create --build-type ament_python my_robot_package
```

### 2.2.2 Package Structure

A typical ROS 2 package includes:

```
my_robot_package/
├── package.xml          # Package manifest
├── CMakeLists.txt       # Build configuration (for C++)
├── setup.py             # Python setup
├── setup.cfg            # Python installation configuration
├── my_robot_package/    # Python package directory
│   ├── __init__.py
│   └── my_node.py
└── test/                # Test files
```

### 2.2.3 package.xml Manifest

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>my_robot_package</name>
  <version>0.0.0</version>
  <description>Example ROS 2 package</description>
  <maintainer email="user@example.com">Your Name</maintainer>
  <license>Apache-2.0</license>

  <depend>rclpy</depend>
  <depend>std_msgs</depend>

  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

## 2.3 Essential ROS 2 Commands

### 2.3.1 Package Commands

```bash
# Create a package
ros2 pkg create --build-type ament_python my_package

# List all packages
ros2 pkg list

# Show package information
ros2 pkg info my_package

# Find package path
ros2 pkg prefix my_package
```

### 2.3.2 Node Commands

```bash
# List active nodes
ros2 node list

# Show node information
ros2 node info /node_name

# Execute a node directly
ros2 run my_package my_node
```

### 2.3.3 Topic Commands

```bash
# List active topics
ros2 topic list

# Show topic information
ros2 topic info /topic_name

# Echo messages on a topic
ros2 topic echo /topic_name std_msgs/msg/String

# Publish a message to a topic
ros2 topic pub /topic_name std_msgs/msg/String "data: 'Hello'"
```

### 2.3.4 Service Commands

```bash
# List active services
ros2 service list

# Show service information
ros2 service info /service_name

# Call a service
ros2 service call /service_name example_interfaces/srv/AddTwoInts "{a: 1, b: 2}"
```

## 2.4 Build System (Colcon)

### 2.4.1 Building Packages

```bash
# Build all packages in workspace
colcon build

# Build specific package
colcon build --packages-select my_package

# Build with verbose output
colcon build --event-handlers console_direct+

# Build with symlinks (faster rebuilds)
colcon build --symlink-install
```

### 2.4.2 Clean Build

```bash
# Remove build and install directories
rm -rf build/ install/ log/

# Or clean specific package
rm -rf build/my_package install/my_package
```

## 2.5 Basic Publisher-Subscriber Implementation

### 2.5.1 Publisher Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1


def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### 2.5.2 Subscriber Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)


def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### 2.5.3 Launch Both Nodes

```bash
# Terminal 1: Run the publisher
ros2 run my_robot_package minimal_publisher

# Terminal 2: Run the subscriber
ros2 run my_robot_package minimal_subscriber
```

## 2.6 Debugging with ROS 2 Tools

### 2.6.1 Using rqt Tools

```bash
# Install rqt tools
sudo apt install ros-humble-rqt ros-humble-rqt-common-plugins

# Run rqt
rqt

# Or specific tools
rqt_graph          # View node connections
rqt_console        # View log messages
rqt_plot           # Plot numerical data
```

### 2.6.2 Using ros2 Doctor

```bash
# Check ROS 2 installation health
ros2 doctor

# Run specific checks
ros2 doctor --report
```

## 2.7 Practical Exercise

Create a ROS 2 package that includes:
1. A publisher node that publishes sensor data (e.g., temperature readings)
2. A subscriber node that processes the sensor data
3. Use appropriate message types
4. Test the nodes using ROS 2 command-line tools
5. Visualize the node graph using rqt_graph

## Next Steps

Continue to Week 3 to explore advanced ROS 2 concepts including nodes, topics, services, and Quality of Service (QoS) settings.