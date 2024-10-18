# JPQL & HQL

## Materials
+ Overview
+ JPA Query API
+ Hibernate Query Language (HQL)

## Overview

Язык запросов JPA (JPQL) можно рассматривать как объектно-ориентированную версию SQL. Пользователи, знакомые с SQL, должны найти JPQL очень простым в изучении и использовании  
. **JPA Criteria API** предоставляет альтернативный способ построения динамических запросов, основанный на объектах Java, которые представляют элементы запроса (заменяя строковый JPQL).  
JPA также предоставляет способ построения статических запросов, как **named queries**, используя аннотации @NamedQuery и @NamedQueries. В JPA считается хорошей практикой предпочитать именованные запросы динамическим запросам, когда это возможно.

Hibernate Query Language (HQL) и Java Persistence Query Language (JPQL) — это языки запросов, ориентированные на объектную модель, по своей природе схожие с SQL. JPQL — это подмножество HQL, во многом вдохновленное им. Запрос JPQL всегда является допустимым запросом HQL, однако обратное неверно.

## JPA Query API

В JPA запрос представлен _javax.persistence.Query_ или _javax.persistence.TypedQuery_ , полученными из EntityManager. Чтобы создать встроенный Query или TypedQuery, вам нужно использовать метод EntityManager#createQuery:

```java
Query query = entityManager.createQuery(
"select c from Customer c where p.name like :name");

TypedQuery<Person> typedQuery = entityManager.createQuery(
"select c from Customer c where c.name like :name", Customer.class);
```

### Query Parameters in JPA

В JPA существует два типа параметров запроса:

- **Named parameters(:name)**

Следующий метод извлекает объект Customer из базы данных по его имени:

```java
String customerName = "Ivan";
Query query = entityManager.createQuery("select c from Customer c where c.name like :name ");
query.setParameter("name", pattern +"%");
```

Предложение WHERE сводит результаты запроса к объектам Customer, значение поля name которых равно :name, что является параметром, который служит в качестве заполнителя для реального значения. Перед выполнением запроса необходимо задать значение параметра с помощью метода setParameter(). Запросы могут включать несколько параметров, и каждый параметр может встречаться в строке запроса несколько раз. Запрос можно запустить только после установки значений для всех его параметров (независимо от порядка).

- **Positional parameters (?index)**

В дополнение к именованным параметрам, форма которых :name, JPQL также поддерживает позиционные параметры, форма которых ?index. Следующий метод эквивалентен методу выше, за исключением того, что порядковый параметр заменяет именованный параметр:  
_Пример_ :  

```java
String customerName = "Ivan";
Query query = entityManager.createQuery("SELECT FROM Customer c where c.name = ?1 ");
query.setParameter(1, customerName);
```

### Running JPA Queries

С точки зрения выполнения интерфейс Query определяет два метода выполнения запросов SELECT:

- Query.getSingleResult — используется, когда ожидается только один объект результата.  
    
    ```java
    long count = (Long) entityManager.createQuery("select count() from Customer");
    ```
    
- Query.getResultList — для общего использования в любых других случаях.  
    
    ```java
    List<Customer> = entityManager.createQuery("select from Customer").getResultList();
    ```
    

Аналогично интерфейс TypedQuery определяет следующие методы:

- TypedQuery.getSingleResult — используется, когда ожидается только один объект результата.
- TypedQuery.getResultList — для общего использования в любых других случаях.

### JPQL Statement types

JPQL позволяет выполнять операторы SELECT, UPDATE и DELETE.

Простейший возможный оператор HQL SELECT имеет вид:

```java
List<Customer> customers = session.createQuery("select * from Customer" ).list();
```

Операторы UPDATE одинаковы в HQL и JPQL:

```java
String jpqlUpdate = "update Customer c set c.name = :newName where c.name = :oldName";
int updatedEntities = entityManager.createQuery(jpqlUpdate)
        .setString( "newName", newName )
        .setString( "oldName", oldName )
        .executeUpdate();
```

Операторы DELETE одинаковы в HQL и JPQL:

```java
entityManager.createQuery("delete from Customer where name = :name")  
        .setParameter( name, "Ivan" )
        .executeUpdate();  
```

## Hibernate Query Language (HQL)

Hibernate Query Language (HQL) — это то же самое, что SQL (Structured Query Language), но он не зависит от таблицы базы данных. Вместо имени таблицы в HQL мы используем имя класса. Так что это язык запросов, независимый от базы данных.

Преимущество HQL:

- независимая от базы данных
- поддерживает полиморфные запросы
- легко освоить для Java-программиста

В Hibernate запрос HQL представлен как _org.hibernate.query.Query_ , который получается из _Session_ . Если HQL является именованным запросом, будет использоваться _Session#getNamedQuery_ ; в противном случае потребуется _Session#createQuery ._

```java
org.hibernate.query.Query query = session.createQuery(
        "select c from Customer c where c.name like :name");
```

или

```java
org.hibernate.query.Query query = session.createQuery(
        "from Customer c where c.name like :name");
```

### Query Parameters in HQL

В JPA также есть два типа параметров запроса:

- **Named parameters(:name)**  
    Следующий метод извлекает объект Customer из базы данных по его имени:
    
    ```java
    String customerName = "Ivan";
    org.hibernate.query.Query query = session.createQuery("select c from Customer c where c.name like :name ");
    query.setParameter("name", pattern +"%");
    ```
    
- **Positional parameters (?index)**  
    Позиционные параметры в стиле HQL следуют синтаксису позиционных параметров JDBC. Они объявляются с использованием ? без последующего порядкового номера. Нет способа связать два таких позиционных параметра как «одинаковые», кроме как привязать к каждому одно и то же значение:
    
    ```java
    String customerName = "Ivan";
    org.hibernate.query.Query query = session.createQuery("select c from Customer c where c.name = ?");
    query.setParameter(0, customerName);
    ```
    

### Running HQL Queries

С точки зрения исполнения, Hibernate предлагает 4 различных метода. Два наиболее часто используемых метода:

- Query.list() — выполняет запрос на выборку и возвращает список результатов.
- Query.uniqueResult() - выполняет запрос select и возвращает единственный результат. Если результатов было больше одного, выдается исключение.
    
    ```java
    List<Customer> customers = session.createQuery("select c from Customer c where c.name like :name" )
            .setParameter( "name", "Iv%" )
            .list();
    ```
    

Также возможно извлечь один результат из запроса.

```java
Customer customer = (Customer) session.createQuery("select c from Customer c where c.name like :name" )
        .setParameter( "name", "Iv%" )
        .uniqueResult();
```

### HQL Statement types

HQL, как и JPQL, позволяет выполнять операторы SELECT, UPDATE и DELETE. HQL дополнительно позволяет выполнять операторы INSERT в форме, аналогичной SQL INSERT FROM SELECT.

Простейший возможный оператор HQL SELECT имеет вид:

```java
List<Customer> customers = session.createQuery("from Customer").list();
```

Операторы UPDATE одинаковы в HQL и JPQL:

```java
int updatedEntities = session.createQuery("update Customer set name = :newName where name = :oldName" )
        .setParameter( "oldName", oldName )
        .setParameter( "newName", newName )
        .executeUpdate();
```

Операторы DELETE одинаковы в HQL и JPQL:

```java
session.createQuery("delete from Customer where name = :name");  
        .setParameter( name, "Ivan" )
        .executeUpdate(); 
```

Оператор DELETE также выполняется с помощью метода executeUpdate() org.hibernate.query.Query.

HQL также добавляет возможность определять операторы INSERT. Эквивалента этому в JPQL нет.

Оператор HQL INSERT выглядит следующим образом:

```roomsql
insert_statement ::=
insert_clause select_statement

insert_clause ::=
INSERT INTO entity_name (attribute_list)

attribute_list ::=
state_field[, state_field ]*
```



