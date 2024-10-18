
# Просто Docker

Почти то же самое, что и в QuickStart, но попроще (в принципе, достаточно первой строки)

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

Подключитесь из Idea, а затем попробуйте все по очереди из Java (если вам это интересно)

## Introduction

[CassandraDay2021-workshop-1.pdf](https://mega.nz/file/6d5kTThZ#6zTFTWxRNohzSofWoDVBVlUmpfN4ej0RfGOODFE8xs4)

## Using

[CassandraDay2021-workshop-2.pdf](https://mega.nz/file/7Jxy1b7Q#RKLauwdFbS-VEqOwAVc0PxzkIB82grqQxx0SF2Dh4sE)

## Async

[CassandraDay2021-workshop-3.pdf](https://mega.nz/file/3BAg1RiB#g55C-aURByUOFSNpXy_yw9CxqOd3-XSJh6gLpMmPfd0)

[CQL data types](https://docs.datastax.com/en/cql-oss/3.x/cql/cql_reference/cql_data_types_c.html)

[Creating a table](https://docs.datastax.com/en/cql-oss/3.x/cql/cql_using/useCreateTable.html)


# О ключах (как их правильно создать - это, наверное, самый важный момент)

[Ключ от раздела Кассандра, составной ключ, и ключ кластеризации | Baeldung](https://www.baeldung.com/cassandra-keys)

## 1. Обзор[](https://www.baeldung.com/cassandra-keys#overview)

Распределение и моделирование данных в базе данных Cassandra NoSQL отличаются от таковых в традиционной реляционной базе данных.

В этой статье мы узнаем, как ключ секции, составной ключ и ключ кластеризации образуют первичный ключ. Мы также посмотрим, чем они отличаются. В результате мы затронем темы архитектуры распределения данных и моделирования данных в Cassandra.

## Дополнительные материалы:

## [Создание панели управления с использованием Cassandra, Astra и Stargate](https://www.baeldung.com/cassandra-astra-stargate-dashboard)

Узнайте, как создать информационную панель с помощью DataStax Astra, базы данных как услуги на базе API Apache Cassandra и Stargate.

[Читать далее](https://www.baeldung.com/cassandra-astra-stargate-dashboard) →

## [Создание панели управления с помощью Cassandra, Astra, REST и GraphQL - запись обновлений статуса](https://www.baeldung.com/cassandra-astra-rest-dashboard-updates)

Пример использования Cassandra для хранения данных временных рядов.

[Читать далее](https://www.baeldung.com/cassandra-astra-rest-dashboard-updates) →

## [Создание дашборда с помощью Cassandra, Astra и CQL – отображение данных о событиях](https://www.baeldung.com/cassandra-astra-rest-dashboard-map)

Узнайте, как отображать события на интерактивной карте на основе данных, хранящихся в базе данных Astra.

[Читать далее](https://www.baeldung.com/cassandra-astra-rest-dashboard-map) →

## 2. Архитектура Apache Cassandra[](https://www.baeldung.com/cassandra-keys#apache-cassandra-architecture)

[Апач Кассандра](https://cassandra.apache.org/) — это распределенная база данных NoSQL с открытым исходным кодом, созданная для обеспечения высокой доступности и линейной масштабируемости без ущерба для производительности.

Вот высокоуровневая архитектура Cassandra [diagram](https://cassandra.apache.org/_/cassandra-basics.html):

[![Cassandra Architecture](https://www.baeldung.com/wp-content/uploads/2021/08/apache-cassandra-diagrams-01-1024x504.jpeg)](https://www.baeldung.com/wp-content/uploads/2021/08/apache-cassandra-diagrams-01-scaled.jpeg)

В Cassandra данные распределяются по кластеру. Кроме того, кластер может состоять из [кольца узлов, расположенных в стойках, установленных в центрах обработки данных](https://www.baeldung.com/cassandra-cluster-datacenters-racks-nodes) в разных географических регионах.

На более детальном уровне виртуальные узлы, известные как [_vnodes_](https://docs.datastax.com/en/archived/cassandra/3.x/cassandra/architecture/archDataDistributeVnodesUsing.html), назначают владение данными физическому компьютеру. Виртуальные узлы позволяют каждому узлу владеть несколькими небольшими диапазонами разделов с помощью метода, называемого [согласованным хешированием](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/architecture/archDataDistributeHashing.html) для распределения данных.

Секционер — это функция, которая хеширует ключ секции для создания маркера. Это значение маркера представляет строку и используется для определения диапазона секций, к которому оно принадлежит в узле.

Однако клиент Cassandra рассматривает кластер как единую базу данных и взаимодействует с ней с помощью библиотеки драйверов Cassandra.

## 3. Моделирование данных Cassandra[](https://www.baeldung.com/cassandra-keys#cassandra-data-modeling)

В целом, моделирование данных — это процесс анализа требований приложения, идентификации сущностей и их взаимосвязей, организации данных и так далее. При реляционном моделировании данных запросы часто являются второстепенной задачей во всем процессе моделирования данных.

Однако в Cassandra запросы доступа к данным управляют [моделированием данных](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html). Запросы, в свою очередь, управляются рабочими процессами приложения.

Кроме того, в моделях данных Cassandra нет соединений таблиц, что означает, что все необходимые данные в запросе должны поступать из одной таблицы. В результате данные в таблице находятся в денормализованном формате.

Далее, на шаге логического моделирования данных, мы **указываем фактическую схему базы данных, определяя пространства ключей, таблицы и даже столбцы таблиц**. Затем, на этапе моделирования физических данных, мы используем язык запросов Cassandra Query Language (CQL) для создания физических пространств ключей — таблиц со всеми типами данных в кластере.

## 4. Первичный ключ[](https://www.baeldung.com/cassandra-keys#primary-key)

То, как работают первичные ключи в Cassandra, является важной концепцией для понимания.

Первичный ключ в Cassandra **состоит из одного или нескольких ключей секций и нуля или более компонентов ключа кластеризации**. Порядок этих компонентов всегда ставит на первое место ключ секции, а затем ключ кластеризации.

Помимо того, что данные становятся уникальными, компонент ключа секции первичного ключа играет дополнительную важную роль в размещении данных. В результате повышается производительность чтения и записи данных, распределенных по нескольким узлам в кластере.

Теперь давайте рассмотрим каждый из этих компонентов первичного ключа.

### 4.1. Ключ раздела[](https://www.baeldung.com/cassandra-keys#1-partition-key)

Основная цель ключа секции — равномерно распределить данные по кластеру и эффективно запрашивать данные.

** Ключ секции предназначен для размещения данных, а не для уникальной идентификации данных, и всегда является первым значением в определении первичного ключа.**

Попробуем разобраться на примере — простой таблице, содержащей логи приложений с одним первичным ключом:

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

Вот некоторые примеры данных в приведенной выше таблице:

[![SampleTableDataPK](https://www.baeldung.com/wp-content/uploads/2021/08/SampleTableDataPK.png)](https://www.baeldung.com/wp-content/uploads/2021/08/SampleTableDataPK.png)

Как мы узнали ранее, Cassandra использует согласованный метод хеширования для генерации хэш-значения ключа секции (_app_name_) и назначения данных строки диапазону секций внутри узла.

Давайте рассмотрим возможные варианты хранения данных:

[![Data Nodes](https://www.baeldung.com/wp-content/uploads/2021/08/DataDistributionNodes.png)](https://www.baeldung.com/wp-content/uploads/2021/08/DataDistributionNodes.png)

Приведенная выше диаграмма представляет собой возможный сценарий, в котором хеш-значения _app1_, _app2_ и _app3_ привели к тому, что каждая строка хранится в трех разных узлах — _Node1_, _Node2_ и _Node3_ соответственно.

Все логи _app1_ попадают в _Node1_, _app2_ логи — в _Node2_, а _app3_ логи — в _Node3_.

Запрос на получение данных без ключа секции в предложении _where_ приводит к неэффективному сканированию всего кластера.

С другой стороны, при наличии ключа секции в предложении _where_ Cassandra использует метод согласованного хеширования для определения точного узла и точного диапазона секций в узле кластера. В результате запрос на получение данных выполняется быстро и эффективно:

```sql
select * application_logs where app_name = 'app1';
```

### 4.2. Составной ключ раздела[](https://www.baeldung.com/cassandra-keys#2-composite-partition-key)

** Если нам нужно объединить более одного значения столбца для формирования одного ключа секции, мы используем составной ключ секции.**

И в этом случае целью составного ключа секции является размещение данных, а также уникальная идентификация данных. В результате хранение и извлечение данных становятся эффективными.

Ниже приведен пример определения таблицы, которое объединяет столбцы _app_name_ и _env_ для формирования составного ключа секции:

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

**В приведенном выше определении важно отметить внутреннюю скобку вокруг _app_name_ и определение первичного ключа _env_**. Эта внутренняя скобка указывает, что _app_name_ и _env_ являются частью ключа секции и не являются ключами кластеризации.

**Если мы отбросим внутреннюю скобку и получим только одну скобку, то _app_name_ становится ключом секции, а _env_ становится компонентом ключа кластеризации**.

Ниже приведен пример данных для приведенной выше таблицы:

[![CompositeSampleTableDataPK](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableDataPK.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableDataPK.png)

Давайте рассмотрим возможное распределение приведенных выше примеров данных. Обратите внимание: Cassandra генерирует хеш-значение для комбинации столбцов _app_name_ и _env_:

[![CompositeDataDistributionNodes](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeDataDistributionNodes.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeDataDistributionNodes.png)

Как мы можем видеть выше, возможный сценарий, в котором хеш-значение _app1:prod, app1:dev, app1:qa_ привело к тому, что эти три строки хранятся в трех отдельных узлах — _Node1_, _Node2_ и _Node3_ соответственно.

Все _app1_ логи из среды _prod_ попадают в _Node1_, в то время как _app1_ логи из среды _dev_ попадают в _Node2_, а _app1_ логи из среды _qa_ — в _Node3_.

Самое главное, ** для эффективного извлечения данных предложение _where_ в запросе fetch должно содержать все составные ключи секций в том же порядке, который указан в определении первичного ключа**:

```sql
select * application_logs where app_name = 'app1' and env = 'prod';
```

### 4.3. Ключ кластеризации[](https://www.baeldung.com/cassandra-keys#3-clustering-key)

Как мы уже упоминали выше, секционирование — это процесс определения диапазона секций в узле, в который помещаются данные. В отличие от этого, **кластеризация является механизмом хранения данных для сортировки данных в секции и основана на столбцах, определенных как ключи кластеризации**.

Более того, идентификация ключевых столбцов кластеризации должна быть выполнена заранее — это связано с тем, что наш выбор ключевых столбцов кластеризации зависит от того, как мы хотим использовать данные в нашем приложении.

Все данные в секции хранятся в непрерывном хранилище, отсортированном по ключевым столбцам кластеризации. В результате извлечение нужных отсортированных данных происходит очень эффективно.

Давайте рассмотрим пример определения таблицы, содержащей ключи кластеризации вместе с составными ключами секций:

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

И давайте посмотрим на некоторые примеры данных:

[![CompositePartitionKeyTableData](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableData-1024x198.png)](https://www.baeldung.com/wp-content/uploads/2021/08/CompositeSampleTableData.png)

Как видно из приведенного выше определения таблицы, мы включили _hostname_ и _log_datetime_ в качестве ключевых столбцов кластеризации. Предполагая, что все журналы из среды _app1_ и _prod_ хранятся в _Node1_, механизм хранения Cassandra лексически сортирует эти журналы по _hostname_ и _log_datetime_ в разделе.

По умолчанию механизм хранения Cassandra сортирует данные в порядке возрастания кластеризации ключевых столбцов, но **мы можем управлять порядком сортировки столбцов кластеризации_WITH используя предложение CLUSTERING ORDER BY_ в определении таблицы**:

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

Согласно приведенному выше определению, в пределах секции механизм хранения Cassandra будет хранить все журналы в лексическом порядке возрастания _hostname_, но в порядке убывания _log_datetime_ в каждой группе _hostname_.

Теперь давайте рассмотрим пример запроса на получение данных с кластеризацией столбцов в предложении _where_:

```sql
select * application_logs 
where 
app_name = 'app1' and env = 'prod' 
and hostname = 'host1' and log_datetime > '2021-08-13T00:00:00';
```

Здесь важно отметить, что предложение _where_ должно содержать столбцы в том же порядке, который определен в предложении первичного ключа.

## 5. Заключение[](https://www.baeldung.com/cassandra-keys#conclusion)

В этой статье мы узнали, что Cassandra использует ключ секции или составной ключ секции для определения размещения данных в кластере. Ключ кластеризации обеспечивает порядок сортировки данных, хранящихся в секции. Все эти ключи также однозначно идентифицируют данные.

Мы также затронули темы архитектуры Cassandra и моделирования данных.

Дополнительные сведения о Cassandra см. в документации [DataStax](https://docs.datastax.com/en/landing_page/doc/landing_page/current.html) и [Apache Cassandra](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html).

# И полезное видео 

НО это 6 часов, если посмотреть все, то вам понадобится минимум 24 часа практики для закрепления теории. ;-)

[https://www.youtube.com/watch?v=sG64NdRUGuo&ab_channel=Слёрм](https://www.youtube.com/watch?v=sG64NdRUGuo&ab_channel=Слёрм)