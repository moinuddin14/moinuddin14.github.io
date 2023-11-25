+++
title = '3. Kuma Architecture'
date = 2023-11-26T00:27:50+05:30
draft = false
weight = 3
+++

A Kuma mesh comprises two main components: the data plane, which consists of Envoy proxies running alongside services to manage mesh traffic, and the control plane, which configures the data plane proxies without directly interacting with mesh traffic. Kuma supports multi-mesh deployments, reducing complexity and operational costs.

Communication occurs between the control plane and data plane, as well as between services and their proxies, facilitated by Envoy xDS APIs for configuration retrieval. A minimal Kuma deployment involves instances of the control plane executable (kuma-cp) and data plane proxy executable (kuma-dp) for each service. User interaction with the control plane is through the kumactl command-line tool.

The Kuma control plane operates in two modes: "Kubernetes" mode, where configuration is done via Kubernetes resources, utilizing the Kubernetes API server as the data store, and "Universal" mode, where users configure Kuma via the Kuma API server and resources, with PostgreSQL serving as the data store. The universal mode is suitable for any infrastructure other than Kubernetes, although it can run on top of a Kubernetes cluster.

### Kubernetes Mode

![Kubernetes Mode](/kuma-3.png)

In Kubernetes mode, Kuma utilizes the underlying Kubernetes API Server to store its state and configuration. Joining Kubernetes services to the mesh involves enabling sidecar injection, achieved by adding the label "kuma.io/sidecar-injection: enabled" to the Namespace or Pod. Kuma automatically adds the kuma-dp sidecar container to Pods configured for sidecar injection.

Policies in Kubernetes mode are created using kubectl and Kuma.io Custom Resource Definitions (CRDs). Kuma generates annotations for Pods associated with a Kubernetes Service resource, such as "kuma.io/service: <name>_<namespace>svc<port>," where <name>, <namespace>, and <port> are derived from the Service configuration.
Example:
kuma.io/service: echo-server_kuma-test_svc_80

### Universal Mode

When running in Universal mode, Kuma requires a PostgreSQL database to store its state. This replaces the Kubernetes API. With Universal, you use kumactl to interact directly with the Kuma API server to manage policies.

![Kuma Universal Mode](/kuma-4.png)

