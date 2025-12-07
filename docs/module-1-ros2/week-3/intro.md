---
sidebar_position: 1
title: "Week 3: Advanced ROS 2 Concepts - Nodes, Topics, and Services"
description: "Deep dive into ROS 2 architecture: nodes, topics, services, and communication patterns"
---

# Week 3: Advanced ROS 2 Concepts - Nodes, Topics, and Services

## Learning Objectives

By the end of this week, you will be able to:
- Design and implement custom ROS 2 nodes with proper lifecycle management
- Create and manage topics for asynchronous message passing
- Implement and use services for synchronous request-response communication
- Understand Quality of Service (QoS) settings and their impact on communication
- Apply best practices for ROS 2 communication patterns in robotic applications

## Topics Covered

- ROS 2 node architecture and lifecycle
- Topic-based communication patterns
- Service-based communication patterns
- Quality of Service (QoS) profiles
- Message and service definitions

## 3.1 ROS 2 Node Architecture

### 3.1.1 Understanding ROS 2 Nodes

A ROS 2 node is the fundamental building block of a ROS 2 system. It represents a single process that performs computation and communicates with other nodes through topics, services, actions, and parameters.

### 3.1.2 Node Lifecycle

ROS 2 nodes follow a specific lifecycle that includes several states:
- Unconfigured: Initial state when the node is created
- Inactive: Node is configured but not executing
- Active: Node is running and processing callbacks
- Finalized: Node is shutting down

### 3.1.3 Creating a Basic Node (Python)

```python
import rclpy
from rclpy.node import Node


class MinimalNode(Node):

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
    minimal_publisher = MinimalNode()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### 3.1.4 Creating a Basic Node (C++)

```cpp
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

class MinimalPublisher : public rclcpp::Node
{
public:
    MinimalPublisher()
    : Node("minimal_publisher"), count_(0)
    {
        publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
        timer_ = this->create_wall_timer(
            500ms, std::bind(&MinimalPublisher::timer_callback, this));
    }

private:
    void timer_callback()
    {
        auto message = std_msgs::msg::String();
        message.data = "Hello, world! " + std::to_string(count_++);
        RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", message.data.c_str());
        publisher_->publish(message);
    }
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
    size_t count_;
};

int main(int argc, char * argv[])
{
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<MinimalPublisher>());
    rclcpp::shutdown();
    return 0;
}
```

## 3.2 Topic-Based Communication

### 3.2.1 Understanding Topics

Topics provide asynchronous, many-to-many communication in ROS 2. Publishers send messages to a topic, and subscribers receive messages from that topic.

### 3.2.2 Publisher Implementation

A publisher sends messages to a topic. The message type must be specified, and the publisher must be created with a topic name and queue size.

### 3.2.3 Subscriber Implementation

A subscriber receives messages from a topic. The callback function processes incoming messages.

## 3.3 Service-Based Communication

### 3.3.1 Understanding Services

Services provide synchronous, request-response communication between nodes. A client sends a request and waits for a response from the service server.

### 3.3.2 Service Server Implementation

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response


def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### 3.3.3 Service Client Implementation

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalClientAsync(Node):

    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()


def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClientAsync()
    response = minimal_client.send_request(1, 2)
    minimal_client.get_logger().info(
        'Result of add_two_ints: for %d + %d = %d' %
        (1, 2, response.sum))
    minimal_client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## 3.4 Quality of Service (QoS) Profiles

### 3.4.1 QoS Settings

Quality of Service profiles allow you to configure how messages are delivered in terms of reliability, durability, and history.

### 3.4.2 Common QoS Profiles

- **Reliability**: Best effort vs Reliable
- **Durability**: Volatile vs Transient local
- **History**: Keep last vs Keep all

## 3.5 Practical Exercise

Create a ROS 2 package that implements:
1. A publisher node that publishes sensor data
2. A subscriber node that processes the sensor data
3. A service server that provides data analysis
4. A service client that requests data analysis

## Next Steps

Continue to Week 4 to explore URDF and robot modeling in ROS 2.