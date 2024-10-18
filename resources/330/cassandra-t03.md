
# Just Docker

Almost the same as in QuickStart, but simpler (in principle, the first line is enough)

```
docker run --name cassandra -d -p 9042:9042 cassandra:latest
```
docker container ls
```
docker exec -it cassandra bash`

And now you can open the base console to check data_center

```
cqlsh
```
use system;

select data_center from local
```

Connect from Idea and then try everything in turn from Java (as long as you are interested)

## Introduction

[CassandraDay2021-workshop-1.pdf](https://mega.nz/file/6d5kTThZ#6zTFTWxRNohzSofWoDVBVlUmpfN4ej0RfGOODFE8xs4)

## Using

[CassandraDay2021-workshop-2.pdf](https://mega.nz/file/7Jxy1b7Q#RKLauwdFbS-VEqOwAVc0PxzkIB82grqQxx0SF2Dh4sE)

## Async

[CassandraDay2021-workshop-3.pdf](https://mega.nz/file/3BAg1RiB#g55C-aURByUOFSNpXy_yw9CxqOd3-XSJh6gLpMmPfd0)

[CQL data types](https://docs.datastax.com/en/cql-oss/3.x/cql/cql_reference/cql_data_types_c.html)

[Creating a table](https://docs.datastax.com/en/cql-oss/3.x/cql/cql_using/useCreateTable.html)


# About keys (how to create them correctly - this is probably the most important point)

[Cassandra Partition Key,
Composite Key,
and Clustering Key | Baeldung](https://www.baeldung.com/cassandra-keys)

## 1. Overview[](https://www.baeldung.com/cassandra-keys#overview)

Data distribution and data modeling in the Cassandra NoSQL database are different from those in a traditional relational database.

In this article, we’ll learn how a partition key, composite key, and clustering key form a primary key. We’ll also see how they differ. As a result, we’ll touch upon the data distribution architecture and data modeling topics in Cassandra.

## Further reading:

## [Build a Dashboard Using Cassandra, Astra, and Stargate](https://www.baeldung.com/cassandra-astra-stargate-dashboard)

Learn how to build a dashboard using DataStax Astra, a database-as-a-service powered by Apache Cassandra and Stargate APIs.

[Read more](https://www.baeldung.com/cassandra-astra-stargate-dashboard) →

## [Build a Dashboard With Cassandra, Astra, REST & GraphQL - Recording Status Updates](https://www.baeldung.com/cassandra-astra-rest-dashboard-updates)

An example of using Cassandra to store time-series data.

[Read more](https://www.baeldung.com/cassandra-astra-rest-dashboard-updates) →

## [Build a Dashboard With Cassandra, Astra and CQL – Mapping Event Data](https://www.baeldung.com/cassandra-astra-rest-dashboard-map)

Learn how to display events on an interactive map, based on data stored in an Astra database.

[Read more](https://www.baeldung.com/cassandra-astra-rest-dashboard-map) →

## 2. Apache Cassandra Architecture[](https://www.baeldung.com/cassandra-keys#apache-cassandra-architecture)

[Apache Cassandra](https://cassandra.apache.org/) is an open-source NoSQL distributed database built for high availability and linear scalability without compromising performance.

Here is the high-level Cassandra architecture [diagram](https://cassandra.apache.org/_/cassandra-basics.html):

[![Cassandra Architecture](https://www.baeldung.com/wp-content/uploads/2021/08/apache-cassandra-diagrams-01-1024x504.jpeg)](https://www.baeldung.com/wp-content/uploads/2021/08/apache-cassandra-diagrams-01-scaled.jpeg)

In Cassandra, the data is distributed across a cluster. Additionally, a cluster may consist of a [ring of nodes arranged in racks installed in data centers](https://www.baeldung.com/cassandra-cluster-datacenters-racks-nodes) across geographical regions.

At a more granular level, virtual nodes known as [_vnodes_](https://docs.datastax.com/en/archived/cassandra/3.x/cassandra/architecture/archDataDistributeVnodesUsing.html) assign the data ownership to a physical machine. Vnodes make it possible to allow each node to own multiple small partition ranges by using a technique called [consistent hashing](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/architecture/archDataDistributeHashing.html) to distribute the data.

A partitioner is a function that hashes the partition key to generate a token. This token value represents a row and is used to identify the partition range it belongs to in a node.

However, a Cassandra client sees the cluster as a unified whole database and communicates with it using a Cassandra driver library.

## 3. Cassandra Data Modeling[](https://www.baeldung.com/cassandra-keys#cassandra-data-modeling)

Generally, data modeling is a process of analyzing the application requirements, identifying the entities and their relationships, organizing the data, and so on. In relational data modeling, the queries are often an afterthought in the whole data modeling process.

However, in Cassandra, the data access queries drive the [data modeling](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html). The queries are, in turn, driven by the application workflows.

Additionally, there are no table-joins in the Cassandra data models, which implies that all desired data in a query must come from a single table. As a result, the data in a table is in a denormalized format.

Next, in the logical data modeling step, we **specify the actual database schema by defining keyspaces, tables, and even table columns**. Then, in the physical data modeling step, we use the Cassandra Query Language (CQL) to create physical keyspaces — tables with all data types in a cluster.

## 4. Primary Key[](https://www.baeldung.com/cassandra-keys#primary-key)

The way primary keys work in Cassandra is an important concept to grasp.

A primary key in Cassandra **consists of one or more partition keys and zero or more clustering key components**. The order of these components always puts the partition key first and then the clustering key.

Apart from making data unique, the partition key component of a primary key plays an additional significant role in the placement of the data. As a result, it improves the performance of reads and writes of data spread across multiple nodes in a cluster.

Now, let’s look at each of these components of a primary key.

### 4.1. Partition Key[](https://www.baeldung.com/cassandra-keys#1-partition-key)

The primary goal of a partition key is to distribute the data evenly across a cluster and query the data efficiently.

**A partition key is for data placement apart from uniquely identifying the data and is always the first value in the primary key definition.**

Let’s try to understand using an example — a simple table containing application logs with one primary key:

```sql
CREATE TABLE application_logs (
  id                    INT,
  app_name              VARCHAR,
  hostname              VARCHAR,
  log_datetime          TIMESTAMP,
  env                   VARCHAR,
  log_level             VARCHAR,
  log_message           TEXT,
  PRIMARY KEY (app_name)
);
```

Here are some sample data in the above table:

[![SampleTableDataPK](https://www.baeldung.com/wp-content/uploads/2021/08/SampleTableDataPK.png)](https://www.baeldung.com/wp-content/uploads/2021/08/SampleTableDataPK.png)

As we learned earlier, Cassandra uses a consistent hashing technique to generate the hash value of the partition key (_app_name_) and assign the row data to a partition range inside a node.

Let’s look at possible data storage:

[![Data Nodes](https://www.baeldung.com/wp-content/uploads/2021/08/DataDistributionNodes.png)](https://www.baeldung.com/wp-content/uploads/2021/08/DataDistributionNodes.png)

The above diagram is a possible scenario where the hash values of _app1_, _app2_, and _app3_ resulted in each row being stored in three different nodes — _Node1_, _Node2_, and _Node3_, respectively.

All _app1_ logs go to _Node1_, _app2_ logs go to _Node2_, and _app3_ logs go to _Node3_.

A data fetch query without a partition key in the _where_ clause results in an inefficient full cluster scan.

On the other hand, with a partition key in _where_ clause, Cassandra uses the consistent hashing technique to identify the exact node and the exact partition range within a node in the cluster. As a result, the fetch data query is fast and efficient:

```sql
select * application_logs where app_name = 'app1';
```

### 4.2. Composite Partition Key[](https://www.baeldung.com/cassandra-keys#2-composite-partition-key)

**If we need to combine more than one column value to form a single partition key, we use a composite partition key.**

Here again, the goal of the composite partition key is for the data placement, in addition to uniquely identifying the data. As a result, the storage and retrieval of data become efficient.

Here’s an example of the table definition that combines the _app_name_ and _env_ columns to form a composite partition key:

```sql
CREATE TABLE application_logs (
  id                    INT,
  app_name              VARCHAR,
  hostname              VARCHAR,
  log_datetime          TIMESTAMP,
  env                   VARCHAR,
  log_level             VARCHAR,
  log_message           TEXT,
  PRIMARY KEY ((app_name, env))
);
```

**The important thing to note in the above definition is the inner parenthesis around _app_name_ and _env_ primary key definition**. This inner parenthesis specifies that _app_name_ and _env_ are part of a partition key and are not clustering keys.

**If we drop the inner parenthesis and have only a single parenthesis, then the _app_name_ becomes the partition key, and _env_ becomes the clustering key component**.

Here’s the sample data for the above table:

[![CompositeSampleTableDataPK](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableDataPK.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableDataPK.png)

Let’s look at the possible data distribution of the above sample data. Please note: Cassandra generates the hash value for the _app_name_ and _env_ column combination:

[![CompositeDataDistributionNodes](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeDataDistributionNodes.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeDataDistributionNodes.png)

As we can see above, the possible scenario where the hash value of _app1:prod, app1:dev, app1:qa_ resulted in these three rows being stored in three separate nodes — _Node1_, _Node2_, and _Node3_, respectively.

All _app1_ logs from the _prod_ environment go to _Node1_, while _app1_ logs from the _dev_ environment go to _Node2_, and _app1_ logs from the _qa_ environment go to _Node3_.

Most importantly, **to efficiently retrieve data, the _where_ clause in fetch query must contain all the composite partition keys in the same order as specified in the primary key definition**:

```sql
select * application_logs where app_name = 'app1' and env = 'prod';
```

### 4.3. Clustering Key[](https://www.baeldung.com/cassandra-keys#3-clustering-key)

As we’ve mentioned above, partitioning is the process of identifying the partition range within a node the data is placed into. In contrast, **clustering is a storage engine process of sorting the data within a partition and is based on the columns defined as the clustering keys**.

Moreover, identification of the clustering key columns needs to be done upfront — that’s because our selection of clustering key columns depends on how we want to use the data in our application.

All the data within a partition is stored in continuous storage, sorted by clustering key columns. As a result, the retrieval of the desired sorted data is very efficient.

Let’s look at an example table definition that has the clustering keys along with the composite partition keys:

```sql
CREATE TABLE application_logs (
  id                    INT,
  app_name              VARCHAR,
  hostname              VARCHAR,
  log_datetime          TIMESTAMP,
  env                   VARCHAR,
  log_level             VARCHAR,
  log_message           TEXT,
  PRIMARY KEY ((app_name, env), hostname, log_datetime)
);
```

And let’s see some sample data:

[![CompositePartitionKeyTableData](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableData-1024x198.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableData.png)

As we can see in the above table definition, we’ve included the _hostname_ and the _log_datetime_ as clustering key columns. Assuming all the logs from _app1_ and _prod_ environment are stored in _Node1_, the Cassandra storage engine lexically sorts those logs by the _hostname_ and the _log_datetime_ within the partition.

By default, the Cassandra storage engine sorts the data in ascending order of clustering key columns, but **we can control the clustering columns’ sort order by using _WITH CLUSTERING ORDER BY_ clause in the table definition**:

```sql
CREATE TABLE application_logs (
  id                    INT,
  app_name              VARCHAR,
  hostname              VARCHAR,
  log_datetime          TIMESTAMP,
  env                   VARCHAR,
  log_level             VARCHAR,
  log_message           TEXT,
  PRIMARY KEY ((app_name,env), hostname, log_datetime)
) 
WITH CLUSTERING ORDER BY (hostname ASC, log_datetime DESC);
```

Per the above definition, within a partition, the Cassandra storage engine will store all logs in the lexical ascending order of _hostname_, but in descending order of _log_datetime_ within each _hostname_ group.

Now, let’s look at an example of the data fetch query with clustering columns in the _where_ clause:

```sql
select * application_logs 
where 
app_name = 'app1' and env = 'prod' 
and hostname = 'host1' and log_datetime > '2021-08-13T00:00:00';
```

What’s important to note here is that the _where_ clause should contain the columns in the same order as defined in the primary key clause.

## 5. Conclusion[](https://www.baeldung.com/cassandra-keys#conclusion)

In this article, we learned that Cassandra uses a partition key or a composite partition key to determine the placement of the data in a cluster. The clustering key provides the sort order of the data stored within a partition. All of these keys also uniquely identify the data.

We also touched upon the Cassandra architecture and data modeling topics.

For more information on Cassandra, visit the [DataStax](https://docs.datastax.com/en/landing_page/doc/landing_page/current.html) and [Apache Cassandra](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html) documentation.

# And useful video 
BUT it is 6 hours, if you look at everything, then you will need at least 24 hours of practice. ;-)

[https://www.youtube.com/watch?v=sG64NdRUGuo&ab_channel=Слёрм](https://www.youtube.com/watch?v=sG64NdRUGuo&ab_channel=Слёрм)