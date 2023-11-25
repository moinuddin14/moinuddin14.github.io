var relearn_search_index = [
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Let’s deploy a sample shopping website. Clone this repository by running the following command\ngit clone https://github.com/pamruthav/Kubecon-CFP-2024-Kuma-Mesh.git Run the following kubectl command to deploy the sample application\nkubectl apply -f demo-app.yaml Front-end UI of this app can be accessed on http://localhost:8080, port-forward your frontend service\nkubectl port-forward service/frontend -n kuma-demo 8080 Port-forward the kuma-control-plane service in the kuma-system namespace and access here http://localhost:5681/gui/\nkubectl port-forward service/kuma-control-plane -n kuma-system 5681 The current state of this application involves operating WITHOUT Kuma. This means all traffic flows directly between the services, not routed through any data plane proxies.\nLet’s install the Kuma service mesh and see the difference. Before we install the mesh, we need to install Kumactl\nKumactl, a command-line interface (CLI) tool, that facilitates interaction with Kuma by enabling:\nExecution of read-only operations on Kuma resources within a Kubernetes environment. Reading and creation of resources in Kuma’s Universal mode. Functioning as a client for the Kuma HTTP API. Install kumactl curl -L https://kuma.io/installer.sh | VERSION=2.5.0 sh - cd kuma-2.5.0/bin PATH=$(pwd):$PATHInstall control plane kumactl install control-plane \\ --set \"controlPlane.mode=standalone\" \\ | kubectl apply -f -Ensure all pods are up and running in the kuma-system namespace kubectl get pods -n kuma-system\nKuma (kuma-cp), a single executable in GoLang, offers universal deployment and simplicity. In a Kubernetes environment, it requires no external dependencies, utilizing the K8s API server for configuration storage. It automatically injects sidecar data plane proxies in Kubernetes, all you need to do is namespace labelling with kuma.io/sidecar-injection: enabled The application’s deployment YAML file already includes this label, eliminating the need for manual edits. Having integrated the control-plane into our cluster, it’s necessary to either delete the current pods or execute a rolling update. This step allows the injector to fulfil its function\nkubectl delete pods --all -n kuma-demo\nOnce these pods are up and running, observe that they are nearly identical to before except each pod now has an additional container. The additional container is the Envoy sidecar proxy that the control-plane is automatically adding to each pod.\nkubectl get pods -n kuma-demo -w\nThe application UI, now utilizing Kuma, remains visually identical to its non-Kuma version. However, the underlying change involves services directing traffic to Envoy data plane proxies within the same pod, enabling communication between the Envoy proxies without any noticeable visual alterations for the user.\nThe mesh object can be viewed with the below command: (Observe that the mTLS is turned off)\nkubectl get meshes\n",
    "description": "",
    "tags": null,
    "title": "1. Install Kuma Control Plane",
    "uri": "/module1/1.install-kuma-control-plane/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "In this module, we will learn about service mesh in general and deep dive into Kuma which is a servie mesh from Kong. We will learn the following in this module\nService Mesh and it’s benefits About Kuma Kuma Architecture Kuma Deployment Topologies Kuma Policies ",
    "description": "",
    "tags": null,
    "title": "Module 0",
    "uri": "/module0/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 0",
    "content": "What is a Service Mesh As organizations transition from monolithic to microservices architectures, they face challenges related to service-to-service communication, observability, security, and resilience. A service mesh addresses these challenges by providing a dedicated infrastructure layer for managing and controlling communication between microservices.\nService mesh is a microservices architecture solution designed to streamline the challenges of complex service communication. Service mesh addresses issues like service discovery, load balancing, security, and observability. It achieves this by abstracting network communication from application code, employing sidecar proxies, a control plane, and a data plane.\nKey benefits of service mesh include\nAutomatic service discovery: ensuring services find and communicate without hardcoded details. Intelligent load balancing: optimizing resource utilization across multiple service instances. Enhanced security: features include end-to-end encryption, authentication, and authorization. Resilience is improved through features like circuit breaking and retries. Robust observability, encompassing metrics, logging, and distributed tracing for insights into performance and health. Sophisticated traffic management strategies like canary releases and blue-green deployments, allow safer updates. In essence, service mesh provides a centralized platform, decoupling networking concerns from application logic, and enhancing agility, scalability, and maintainability in microservices architectures.\n",
    "description": "",
    "tags": null,
    "title": "1. Service Mesh Intro",
    "uri": "/module0/1-service-mesh/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 0",
    "content": "Kuma makes modern digital applications work better, by using a Service Mesh framework, where sidecar proxies run next to services, and a control plane sets up these proxies automatically. This helps solve problems with network issues, making sure users have a good experience and keeping things secure.\nThe sidecar proxy model has a separate process that handles connections and observability, so developers can focus on their services without worrying about the network details. This proxy, called “sidecar,” works alongside services and manages data for incoming and outgoing requests.\nBecause there might be many sidecar proxies with different service instances, a control plane is needed. The control plane automatically sets up the underlying data-plane proxies, enabling teams to make configuration adjustments without manual intervention. Kuma, serving as a Service Mesh solution, follows the sidecar proxy model and employs Envoy as its technology for the sidecar data plane.\nKuma’s main objective is to minimize the code needed to build reliable architectures. By delegating connectivity, security, and routing responsibilities to the sidecar proxy, Kuma accelerates application development, letting developers focus on core functionality. This strategy lowers technical debt, promotes a secure and standardized architecture, and avoids fragmentation by steering clear of multiple library implementations. In essence, Kuma facilitates the gradual modernization of applications, ensuring development teams can adapt without excessive workloads.\nKuma Dependencies Kuma is GoLang-based and comes as a single executable for universal deployment. It integrates into Kubernetes, leveraging the K8s API server for configuration storage, and effortlessly injects sidecar data plane proxies. For universal deployment, Kuma relies on PostgreSQL, manageable through services like AWS RDS. It comes with a bundled Envoy data plane proxy, simplifying setup, and installation is straightforward with provided instructions.\nKuma’s platform agnosticism expands Service Mesh capabilities beyond Kubernetes, making it suitable for the entire organization. Unlike the traditional approach of considering Service Mesh as the last step in modernization, Kuma positions it as the initial step, ensuring network security and observability throughout transitions. Kuma is unique in its ability to run natively across diverse platforms, including Kubernetes, VMs, and Bare Metal, accommodating both brownfield and greenfield applications. Its user-friendly nature allows implementation in three simple steps, suitable for both monolithic and microservices applications. With out-of-the-box policies and powerful tagging selectors, Kuma supports versatile behaviors in various topologies, akin to multi-cloud and multi-region architectures.\n",
    "description": "",
    "tags": null,
    "title": "2. About Kuma",
    "uri": "/module0/2-about-kuma/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "mTLS Traffic Permissions enable you to control service communication, enhancing mesh security. You can specify which source services are permitted to consume particular destination services, with the service field being mandatory in both sources and destinations. Kuma includes a default traffic permission called allow-all-default\nmTLS can be enabled using the below command\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: Mesh metadata: name: default spec: mtls: enabledBackend: ca-1 backends: - name: ca-1 type: builtin EOFImplementing this will make no difference. Because of the default allow-all traffic permission. To test/verify this, let’s delete the traffic permissions using the below command\nkubectl delete trafficpermission -n kuma-demo --all\nCan verify no access\n",
    "description": "",
    "tags": null,
    "title": "2. Kuma Policies",
    "uri": "/module1/2.kuma-policies/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "Installation of Kuma Service Mesh ",
    "description": "",
    "tags": null,
    "title": "Module 1",
    "uri": "/module1/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 0",
    "content": "A Kuma mesh comprises two main components: the data plane, which consists of Envoy proxies running alongside services to manage mesh traffic, and the control plane, which configures the data plane proxies without directly interacting with mesh traffic. Kuma supports multi-mesh deployments, reducing complexity and operational costs.\nCommunication occurs between the control plane and data plane, as well as between services and their proxies, facilitated by Envoy xDS APIs for configuration retrieval. A minimal Kuma deployment involves instances of the control plane executable (kuma-cp) and data plane proxy executable (kuma-dp) for each service. User interaction with the control plane is through the kumactl command-line tool.\nThe Kuma control plane operates in two modes: “Kubernetes” mode, where configuration is done via Kubernetes resources, utilizing the Kubernetes API server as the data store, and “Universal” mode, where users configure Kuma via the Kuma API server and resources, with PostgreSQL serving as the data store. The universal mode is suitable for any infrastructure other than Kubernetes, although it can run on top of a Kubernetes cluster.\nKubernetes Mode In Kubernetes mode, Kuma utilizes the underlying Kubernetes API Server to store its state and configuration. Joining Kubernetes services to the mesh involves enabling sidecar injection, achieved by adding the label “kuma.io/sidecar-injection: enabled” to the Namespace or Pod. Kuma automatically adds the kuma-dp sidecar container to Pods configured for sidecar injection.\nPolicies in Kubernetes mode are created using kubectl and Kuma.io Custom Resource Definitions (CRDs). Kuma generates annotations for Pods associated with a Kubernetes Service resource, such as “kuma.io/service: _svc,” where , , and are derived from the Service configuration. Example: kuma.io/service: echo-server_kuma-test_svc_80\nUniversal Mode When running in Universal mode, Kuma requires a PostgreSQL database to store its state. This replaces the Kubernetes API. With Universal, you use kumactl to interact directly with the Kuma API server to manage policies.\n",
    "description": "",
    "tags": null,
    "title": "3. Kuma Architecture",
    "uri": "/module0/3-kuma-architecture/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Traffic Permissions Adding Granular Traffic Permissions Apply the following three policies: The first permits communication from the Kong service to the frontend. The second allows the frontend to communicate with the backend. The third enables communication from the backend to PostgreSQL. By withholding permissions for Redis, traffic to that service will not be allowed. This means that in the UI, all functionalities will operate except for the reviews.\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: namespace: kuma-demo name: kong-to-frontend spec: sources: - match: kuma.io/service: kong-validation-webhook_kuma-demo_svc_443 destinations: - match: kuma.io/service: frontend_kuma-demo_svc_8080 --- apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: namespace: kuma-demo name: frontend-to-backend spec: sources: - match: kuma.io/service: frontend_kuma-demo_svc_8080 destinations: - match: kuma.io/service: backend_kuma-demo_svc_3001 --- apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: namespace: kuma-demo name: backend-to-postgres spec: sources: - match: kuma.io/service: backend_kuma-demo_svc_3001 destinations: - match: kuma.io/service: postgres_kuma-demo_svc_5432 EOFVerify the traffic permissions using below command\nkubectl get trafficpermissions\nTo re-enable the Redis service in the future, simply add an additional traffic permission, as below\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: namespace: kuma-demo name: backend-to-redis spec: sources: - match: kuma.io/service: backend_kuma-demo_svc_3001 destinations: - match: kuma.io/service: redis_kuma-demo_svc_6379 EOF",
    "description": "",
    "tags": null,
    "title": "3. Kuma Traffic Permissions",
    "uri": "/module1/3.kuma-traffic-permissions/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "Lorem Ipsum.\n",
    "description": "",
    "tags": null,
    "title": "Module 2",
    "uri": "/module2/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 0",
    "content": "Standalone The standalone deployment mode for Kuma is the default and simplest option. In this mode\nControl Plane One deployment of the control plane that can be horizontally scaled. Manages connections from data plane proxies. Handles policy creation and changes for data plane proxies. Maintains an inventory of running data plane proxies. Computes and sends configurations using XDS (Discovery Service) to data plane proxies. Data Plane Proxies Connect to the control plane, regardless of their deployment location. Receive configurations from the control plane using XDS. Establish connections to other data plane proxies. Service connectivity is established directly between every data plane proxy. Each data plane proxy must connect to every other data plane proxy. Deployment Scope Ideal for a single zone, like within one Kubernetes cluster or AWS VPC. Limitations All data plane proxies must communicate with every other one. Cannot mix Universal and Kubernetes workloads. Can connect to only one Kubernetes cluster at a time. Components Control planes handle connections, policies, inventory, and configurations. Data plane proxies connect to the control plane, receive configurations, and connect to other proxies. Failure Modes Control plane offline: New data plane proxies can’t join the mesh. Control plane connection failure may block updates and new instance creation. mTLS-enabled meshes may face issues with certificate refresh. Data plane proxy configuration won’t be updated. Communication between data plane proxies will still work, but changes won’t reflect on existing proxies. Multi-Zone Global Control Plane Zone Control Plane Kuma supports running service meshes in multiple zones, allowing for deployment across various regions, clouds, or data centres. Zones can be Kubernetes clusters, VPCs, or any other deployment, and they must enable data planes to connect within the same zone. The abstraction of zones in Kuma facilitates automatic failover of services in case of zone failures.\nThe key components of a multi-zone deployment in Kuma include\nGlobal Control Plane Accepts connections only from zone control planes. Manages policies applied to data plane proxies. Propagates policies and zone ingresses to zone control planes. Maintains an inventory of all data plane proxies for observability. Rejects connections from data plane proxies. Zone Control Planes Accept connections from local data plane proxies. Receive policy updates from the global control plane. Send data plane proxies and zone ingress changes to the global control plane. Compute and send configurations to local data plane proxies using XDS. Updates the list of services in the zone ingress. Rejects policy changes not originating from the global control plane. Data Plane Proxies Connect to the local zone control plane. Receive configurations using XDS from the local zone control plane. Connect to other local data plane proxies. Connect to zone ingresses for cross-zone traffic. Receive and send traffic within the zone and across zones. Zone Ingress Receives XDS configuration from the local zone control plane. Proxies traffic from other zone data plane proxies to local data plane proxies. Handles cross-zone communication within the mesh. Zone Egress (Optional) Receives XDS configuration from the local zone control plane. Proxies traffic from local data plane proxies to zone ingress proxies in other zones or to external services locally. Failure Modes Global Control Plane Offline\nPolicy updates become impossible. Changes in service lists between zones do not propagate. Zone disabling or deletion is not possible. Zone Control Plane Offline\nNew data plane proxies cannot join the mesh. Control plane connection failure may block updates of applications and new instances. Data plane proxy configuration does not update. Communication Between Global and Zone Control Plane Failing\nZone configuration updates are not reflected globally. Inventory view of data plane proxies becomes outdated. Communication Between Two Zones Failing\nCommunication within each zone remains unaffected. Cross-zone communication fails, but resiliency mechanisms can reroute traffic. Kuma does not replace API gateways; instead, it focuses on cross-zone communication within a mesh, while API gateways can be used in addition to zone ingresses. ",
    "description": "",
    "tags": null,
    "title": "4. Kuma Deployment Topologies",
    "uri": "/module0/4-kuma-deployment-topologies/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Traffic Routing Traffic Routing policies enable the configuration of routing rules for L4 traffic, such as blue/green deployments and canary releases. Kuma facilitates traffic routing by matching tags assigned to Dataplane resources.\nDuring the earlier application deployment, three versions of the backend application were manifested: backend, backend-v1, and backend-v2. The original backend service functions as a standard marketplace. Backend-v1 features one sale on the front page, while backend-v2 showcases two sales. The diagram below illustrates the assignment of version tags to the two destination services, aiding in canary deployment.\n----\u003e backend-v0 : service=backend, version=v0, env=prod / (browser) -\u003e frontend ----\u003e backend-v1 : service=backend, version=v1, env=intg \\ ----\u003e backend-v2 : service=backend, version=v2, env=devBackend-v1 and backend-v2 were initially deployed with zero replicas. Let’s scale them up to one replica each to observe the functioning of traffic routing.\nkubectl scale deployment kuma-demo-backend-v1 -n kuma-demo --replicas=1 kubectl scale deployment kuma-demo-backend-v2 -n kuma-demo --replicas=1\nCheck all the pods are running\nkubectl get pods -n kuma-demo\nAdding Routing Policy v2 version has 2 items on sale. v1 has a one-time sale. Let’s limit the amount of special offers that appear on the marketplace. To do so, apply this TrafficRoute policy to route the majority of our traffic to the v0 version\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: TrafficRoute metadata: name: frontend-to-backend namespace: kuma-demo mesh: default spec: sources: - match: kuma.io/service: frontend_kuma-demo_svc_8080 destinations: - match: kuma.io/service: backend_kuma-demo_svc_3001 conf: split: - weight: 80 destination: kuma.io/service: backend_kuma-demo_svc_3001 version: v0 - weight: 20 destination: kuma.io/service: backend_kuma-demo_svc_3001 version: v1 - weight: 0 destination: kuma.io/service: backend_kuma-demo_svc_3001 version: v2 EOFThis can be verified by refreshing front-end page, the two item sale (v2) will never come up\n",
    "description": "",
    "tags": null,
    "title": "4. Kuma Traffic Routing",
    "uri": "/module1/4.kuma-traffic-routing/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "Lorem Ipsum.\n",
    "description": "",
    "tags": null,
    "title": "Module 3",
    "uri": "/module3/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Health Check The objective of Health Checks is to reduce the occurrence of failed requests caused by the temporary unavailability of a target endpoint. By implementing a Health Check policy, you instruct a data plane proxy to monitor the health statuses of target endpoints. The dataplane ensures it doesn’t send requests to an endpoint marked as “unhealthy.”\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: HealthCheck metadata: name: frontend-to-backend namespace: kuma-demo mesh: default spec: sources: - match: kuma.io/service: frontend_kuma-demo_svc_8080 destinations: - match: kuma.io/service: backend_kuma-demo_svc_3001 conf: interval: 10s timeout: 2s unhealthyThreshold: 3 healthyThreshold: 1 EOF",
    "description": "",
    "tags": null,
    "title": "5. Kuma Health Check",
    "uri": "/module1/5.kuma-health-check/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 0",
    "content": "Policies refer to configurations and rules that govern the behaviour of the service mesh. They help define how traffic is routed, secured, and observed within the distributed system. They include a variety of settings and configurations, depending on the specific requirements of your application and infrastructure.Common types of policies in Kuma include\nTraffic Routing Policies These are essential in a service mesh for managing how traffic flows through the network. They can include rules for load balancing, traffic splitting, and routing based on various criteria like HTTP paths or headers. Security Policies These are crucial for maintaining the security of communications within the service mesh. Kuma supports policies for encrypting communications, implementing mutual TLS (mTLS) for authentication, and access control for restricting interactions between services Observability Policies Observability is key in distributed systems for monitoring and understanding the behavior of services. Policies in this category would encompass logging, tracing, and metrics collection, providing valuable insights into service performance and issues. Traffic Retry and Timeout Policies These policies ensure the resilience and reliability of communications in the service mesh. They define how retries and timeouts are handled, which is important for maintaining service availability and fault tolerance. Circuit Breaker Policies Circuit breakers are a critical component in preventing failures in one service from cascading to others. They work by breaking the circuit if certain error conditions or thresholds are met, thereby helping to manage traffic flow and system stability. Example of a Traffic Routing policy Traffic routing can be managed through the TrafficRoute resource. Here’s how you could define this resource for our scenario\napiVersion: kuma.io/v1alpha1 kind: TrafficRoute metadata: name: service-route mesh: default spec: sources: - match: kuma.io/service: service destinations: - match: kuma.io/service: service conf: - weight: 80 destination: kuma.io/service: service version: v1 - weight: 20 destination: kuma.io/service: service version: v2This resource specifies the source of the traffic (any instance of service in this case), the destination (again, service), and the configuration (conf) that includes routing rules. In the example, 80% of the traffic is directed to service-v1 and 20% to service-v2. This resource is applied in to the Kuma service mesh and may vary depending on the kuma deployment mode.\n",
    "description": "",
    "tags": null,
    "title": "5. Kuma Policies",
    "uri": "/module0/5-kuma-policies/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "Lorem Ipsum.\n",
    "description": "",
    "tags": null,
    "title": "Module 4",
    "uri": "/module4/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Traffic Metrics (Observability) By default, Kuma seamlessly integrates with Prometheus and Grafana. Once enabled, each data plane proxy exposes its metrics in Prometheus format. Additionally, Kuma ensures that Prometheus can effortlessly discover every data plane proxy within the mesh.\nkumactl install observability | kubectl apply -f -\nVerify by running the following command\nkubectl get pods -n mesh-observability\nKuma ensures consistent traffic metrics across all data plane proxies in the mesh. Users can enable and customize metrics at both the mesh and individual Dataplane levels.\nTo enable metrics, mesh objects need to be edited with a traffic metric policy\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: Mesh metadata: name: default spec: mtls: enabledBackend: ca-1 backends: - name: ca-1 type: builtin metrics: enabledBackend: prometheus-1 backends: - name: prometheus-1 type: prometheus EOFAllow all traffic between Grafana and the Prometheus Server, as well as from the Prometheus Server to Dataplane metrics and other Prometheus components.\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: name: metrics-permissions spec: sources: - match: kuma.io/service: prometheus-server_mesh-observability_svc_80 destinations: - match: kuma.io/service: dataplane-metrics - match: kuma.io/service: \"prometheus-alertmanager_mesh-observability_svc_80\" - match: kuma.io/service: \"prometheus-kube-state-metrics_mesh-observability_svc_80\" - match: kuma.io/service: \"prometheus-kube-state-metrics_mesh-observability_svc_81\" - match: kuma.io/service: \"prometheus-pushgateway_mesh-observability_svc_9091\" --- apiVersion: kuma.io/v1alpha1 kind: TrafficPermission mesh: default metadata: name: grafana-to-prometheus spec: sources: - match: kuma.io/service: \"grafana_mesh-observability_svc_80\" destinations: - match: kuma.io/service: \"prometheus-server_mesh-observability_svc_80\" EOFPort-forward grafana pod in ns mesh-observability and visualize metrics on grafana (admin, admin) at http://localhost:3000\nkubectl port-forward grafana-78d497dcf9-dt5dl -n mesh-observability 3000\n",
    "description": "",
    "tags": null,
    "title": "6. Kuma Traffic Metrics",
    "uri": "/module1/6.kuma-traffic-metrics/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site \u003e Module 1",
    "content": "Traffic Logs (Observability) Configure logging backends for use in the Mesh. A logging backend serves as a destination for access logs. In the present version of Kuma, logging backends can be either a file or a TCP log collector, like Logstash. Let’s use the file (stdout) in our demo.\nWe need to configure the Mesh object to include what we want logged\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: Mesh metadata: name: default spec: mtls: enabledBackend: ca-1 backends: - name: ca-1 type: builtin metrics: enabledBackend: prometheus-1 backends: - name: prometheus-1 type: prometheus logging: defaultBackend: stdout backends: - name: stdout type: file # Use `file` field to configure a file-based logging backend. conf: path: /dev/stdout EOFCreate a TrafficLog policy to select a subset of traffic and forward its access logs into one of the logging backends configured for that Mesh (stdout in our case)\ncat \u003c\u003cEOF | kubectl apply -f - apiVersion: kuma.io/v1alpha1 kind: TrafficLog mesh: default metadata: namespace: kuma-demo name: everything spec: sources: - match: kuma.io/service: '*' destinations: - match: kuma.io/service: '*' conf: backend: stdoud EOFThese logs can be viewed in loki in the same Grafana page\n",
    "description": "",
    "tags": null,
    "title": "7. Kuma Traffic Logs",
    "uri": "/module1/7.kuma-traffic-logs/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": null,
    "title": "My New Hugo Site",
    "uri": "/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "",
    "description": "",
    "tags": null,
    "title": "Categories",
    "uri": "/categories/index.html"
  },
  {
    "breadcrumb": "My New Hugo Site",
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tags",
    "uri": "/tags/index.html"
  }
]
