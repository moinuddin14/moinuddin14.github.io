+++
title = '2. About Kuma'
date = 2023-11-26T00:27:50+05:30
draft = false
weight = 2
+++

Kuma makes modern digital applications work better, by using a Service Mesh framework, where sidecar proxies run next to services, and a control plane sets up these proxies automatically. This helps solve problems with network issues, making sure users have a good experience and keeping things secure. 

The sidecar proxy model has a separate process that handles connections and observability, so developers can focus on their services without worrying about the network details. This proxy, called "sidecar," works alongside services and manages data for incoming and outgoing requests.

![about-kuma](/kuma-1.png)

Because there might be many sidecar proxies with different service instances, a control plane is needed. The control plane automatically sets up the underlying data-plane proxies, enabling teams to make configuration adjustments without manual intervention. Kuma, serving as a Service Mesh solution, follows the sidecar proxy model and employs Envoy as its technology for the sidecar data plane.

![sidecar-data-place](/kuma-2.png)

Kuma's main objective is to minimize the code needed to build reliable architectures. By delegating connectivity, security, and routing responsibilities to the sidecar proxy, Kuma accelerates application development, letting developers focus on core functionality. This strategy lowers technical debt, promotes a secure and standardized architecture, and avoids fragmentation by steering clear of multiple library implementations. In essence, Kuma facilitates the gradual modernization of applications, ensuring development teams can adapt without excessive workloads.

### Kuma Dependencies

Kuma is GoLang-based and comes as a single executable for universal deployment. It integrates into Kubernetes, leveraging the K8s API server for configuration storage, and effortlessly injects sidecar data plane proxies. For universal deployment, Kuma relies on PostgreSQL, manageable through services like AWS RDS. It comes with a bundled Envoy data plane proxy, simplifying setup, and installation is straightforward with provided instructions.

Kuma's platform agnosticism expands Service Mesh capabilities beyond Kubernetes, making it suitable for the entire organization. Unlike the traditional approach of considering Service Mesh as the last step in modernization, Kuma positions it as the initial step, ensuring network security and observability throughout transitions. Kuma is unique in its ability to run natively across diverse platforms, including Kubernetes, VMs, and Bare Metal, accommodating both brownfield and greenfield applications. Its user-friendly nature allows implementation in three simple steps, suitable for both monolithic and microservices applications. With out-of-the-box policies and powerful tagging selectors, Kuma supports versatile behaviors in various topologies, akin to multi-cloud and multi-region architectures.