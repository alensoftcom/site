
## 5. Deploying the application to k8s

###### Create manifests to deploy publisher and discussion instances to Kubernetes.
  - Define the configuration of containers, services, and other resources for each instance.
  - Specify the necessary parameters, such as container images, ports, and environment variables.
###### Configure manifests to deploy databases and message brokers to Kubernetes.
  - Determine the types of components (in our case, PostgreSQL, Cassandra, Redis, Kafka).
  - Specify parameters for data storage, access, and configuration.
###### Create manifests to configure the load balancer on Kubernetes.
  - Define the load balancer type (for example, Ingress, Service with the LoadBalancer type).
  - Specify the rules for routing traffic to services and the rules for starting or stopping them.
###### Set up communication between services, brokers, and databases in Kubernetes.
  - Specify the connection parameters from the services.
  - Ensure secure data transfer between services, brokers, and databases.
###### Test the deployed infrastructure on Kubernetes.
  - Run service availability tests through the load balancer.
  - Check the health of the connection between services and databases.
###### Monitoring and maintenance of the deployed infrastructure in Kubernetes.
  - Set up monitoring of the status of services, databases, and the load balancer.
  - Provide mechanisms for data backup and disaster recovery.

