+++
title = '4. Kuma Deployment Topologies'
date = 2023-11-26T00:27:50+05:30
draft = false
weight = 4
+++

### Standalone

![Standalone](/kuma-5.png)

The standalone deployment mode for Kuma is the default and simplest option. In this mode

##### Control Plane

- One deployment of the control plane that can be horizontally scaled.
- Manages connections from data plane proxies.
- Handles policy creation and changes for data plane proxies.
- Maintains an inventory of running data plane proxies.
- Computes and sends configurations using XDS (Discovery Service) to data plane proxies.

##### Data Plane Proxies
- Connect to the control plane, regardless of their deployment location.
- Receive configurations from the control plane using XDS.
- Establish connections to other data plane proxies.
- Service connectivity is established directly between every data plane proxy.
- Each data plane proxy must connect to every other data plane proxy.

##### Deployment Scope
- Ideal for a single zone, like within one Kubernetes cluster or AWS VPC.

##### Limitations
- All data plane proxies must communicate with every other one.
- Cannot mix Universal and Kubernetes workloads.
- Can connect to only one Kubernetes cluster at a time.

##### Components
- Control planes handle connections, policies, inventory, and configurations.
- Data plane proxies connect to the control plane, receive configurations, and connect to other proxies.

##### Failure Modes
- Control plane offline: 
    - New data plane proxies can't join the mesh.
    - Control plane connection failure may block updates and new instance creation.
    - mTLS-enabled meshes may face issues with certificate refresh.
    - Data plane proxy configuration won't be updated.
    - Communication between data plane proxies will still work, but changes won't reflect on existing proxies.

### Multi-Zone

![Multi Zone](/kuma-6.png)

- Global Control Plane
- Zone Control Plane

Kuma supports running service meshes in multiple zones, allowing for deployment across various regions, clouds, or data centres. Zones can be Kubernetes clusters, VPCs, or any other deployment, and they must enable data planes to connect within the same zone. The abstraction of zones in Kuma facilitates automatic failover of services in case of zone failures.

The key components of a multi-zone deployment in Kuma include

##### Global Control Plane
- Accepts connections only from zone control planes.
- Manages policies applied to data plane proxies.
- Propagates policies and zone ingresses to zone control planes.
- Maintains an inventory of all data plane proxies for observability.
- Rejects connections from data plane proxies.

##### Zone Control Planes
- Accept connections from local data plane proxies.
- Receive policy updates from the global control plane.
- Send data plane proxies and zone ingress changes to the global control plane.
- Compute and send configurations to local data plane proxies using XDS.
- Updates the list of services in the zone ingress.
- Rejects policy changes not originating from the global control plane.

##### Data Plane Proxies
- Connect to the local zone control plane.
- Receive configurations using XDS from the local zone control plane.
- Connect to other local data plane proxies.
- Connect to zone ingresses for cross-zone traffic.
- Receive and send traffic within the zone and across zones.

##### Zone Ingress
- Receives XDS configuration from the local zone control plane.
- Proxies traffic from other zone data plane proxies to local data plane proxies.
- Handles cross-zone communication within the mesh.

##### Zone Egress (Optional)
- Receives XDS configuration from the local zone control plane.
- Proxies traffic from local data plane proxies to zone ingress proxies in other zones or to external services locally.

##### Failure Modes
- Global Control Plane Offline      
    - Policy updates become impossible.
    - Changes in service lists between zones do not propagate.
    - Zone disabling or deletion is not possible.

- Zone Control Plane Offline
    - New data plane proxies cannot join the mesh.
    - Control plane connection failure may block updates of applications and new instances.
    - Data plane proxy configuration does not update.

- Communication Between Global and Zone Control Plane Failing
    - Zone configuration updates are not reflected globally.
    - Inventory view of data plane proxies becomes outdated.

- Communication Between Two Zones Failing
    - Communication within each zone remains unaffected.
    - Cross-zone communication fails, but resiliency mechanisms can reroute traffic.
    - Kuma does not replace API gateways; instead, it focuses on cross-zone communication within a mesh, while API gateways can be used in addition to zone ingresses.

