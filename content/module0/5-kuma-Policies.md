+++
title = '5. Kuma Policies'
date = 2023-11-26T00:27:50+05:30
draft = false
weight = 5
+++

Policies refer to configurations and rules that govern the behaviour of the service mesh. They help define how traffic is routed, secured, and observed within the distributed system. They include a variety of settings and configurations, depending on the specific requirements of your application and infrastructure.Common types of policies in Kuma include

- **Traffic Routing Policies** These are essential in a service mesh for managing how traffic flows through the network. They can include rules for load balancing, traffic splitting, and routing based on various criteria like HTTP paths or headers.
- **Security Policies** These are crucial for maintaining the security of communications within the service mesh. Kuma supports policies for encrypting communications, implementing mutual TLS (mTLS) for authentication, and access control for restricting interactions between services
- **Observability Policies** Observability is key in distributed systems for monitoring and understanding the behavior of services. Policies in this category would encompass logging, tracing, and metrics collection, providing valuable insights into service performance and issues.
- **Traffic Retry and Timeout Policies** These policies ensure the resilience and reliability of communications in the service mesh. They define how retries and timeouts are handled, which is important for maintaining service availability and fault tolerance.
- **Circuit Breaker Policies** Circuit breakers are a critical component in preventing failures in one service from cascading to others. They work by breaking the circuit if certain error conditions or thresholds are met, thereby helping to manage traffic flow and system stability.

### **__Example of a Traffic Routing policy__**

Traffic routing can be managed through the TrafficRoute resource. Here's how you could define this resource for our scenario

``` yaml

apiVersion: kuma.io/v1alpha1
kind: TrafficRoute
metadata:
  name: service-route
  mesh: default
spec:
  sources:
    - match:
        kuma.io/service: service
  destinations:
    - match:
        kuma.io/service: service
  conf:
    - weight: 80
      destination:
        kuma.io/service: service
        version: v1
    - weight: 20
      destination:
        kuma.io/service: service
        version: v2

```

This resource specifies the source of the traffic (any instance of service in this case), the destination (again, service), and the configuration (conf) that includes routing rules. In the example, 80% of the traffic is directed to service-v1 and 20% to service-v2. This resource is applied in to the Kuma service mesh and may vary depending on the kuma deployment mode.