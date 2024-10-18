# Criteria Api

## Materials
+ Overview
+ Steps to create Criteria Query
+ Restrictions
+ Sorting
+ Pagination
+ Join

## Overview

Язык запросов JPA (JPQL) можно рассматривать как объектно-ориентированную версию SQL. Пользователи, знакомые с SQL, должны найти JPQL очень простым в изучении и использовании  
. **JPA Criteria API** предоставляет альтернативный способ построения динамических запросов, основанный на объектах Java, которые представляют элементы запроса (заменяя строковый JPQL).  
JPA также предоставляет способ построения статических запросов, как **named queries**, используя **@NamedQuery** и **@NamedQueries** аннотации. В JPA считается хорошей практикой отдавать предпочтение именованным запросам вместо динамических запросов, когда это возможно.

Запросы критериев предлагают типобезопасную альтернативу запросам HQL, JPQL и собственным запросам SQL. Hibernate предлагает более старый, устаревший API _org.hibernate.Criteria_ , который следует считать устаревшим. Разработка функций не будет нацелена на эти API. В конечном итоге, специфичные для Hibernate функции критериев будут перенесены в качестве расширений в JPA _javax.persistence.criteria.CriteriaQuery_ .  
В этой главе основное внимание будет уделено API JPA для объявления типобезопасных запросов критериев.

## Steps to create Criteria Query

1. Создайте объект интерфейса CriteriaBuilder, вызвав метод _getCriteriaBuilder()_ для экземпляра интерфейса EntityManager.  
    
    ```java
    EntityManager entityManager = entityManager.createEntityManager();
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    ```
    
2. создать экземпляр интерфейса CriteriaQuery для создания объекта запроса.
    
    ```java
     CriteriaQuery<Customer> cq=cq.createQuery(Customer.class);  
    ```
    
3. Вызовите метод объекта CriteriaQuery, чтобы задать корень запроса.
    
    ```java
    Root<Customer> customer=cq.from(Customer.class);
    ```
    
4. Вызовите метод select объекта CriteriaQuery, чтобы указать тип результата запроса.
    
    ```java
    CriteriaQuery<Customer> select = cq.select(customer);
    ```
    
5. КритерииЗапросавыбрать = cq.выбрать(stud);
    
    ```java
    Query q = entityManager.createQuery(select);  
    ```
    
6. Вызов методов интерфейса запросов
    
    ```java
    List<Customer> list = q.getResultList(); 
    ```
    

## Restrictions

Ограничения с подобными:

```java
EntityManager entityManager = entityManager.createEntityManager();
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Customer> cq = cg.createQuery(Customer.class);
Root<Customer> customer = cq.from(Customer.class);
cq.select(customer).where(cq.like(customer.get("name"), "%Iva%"));
List<Customer> customers = entityManager.createQuery(cq).getResultList();
```

Ограничения между:

```java
EntityManager entityManager = entityManager.createEntityManager();
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Customer> cq = cb.createQuery(Customer.class);
Root<Customer> customer = cq.from(Customer.class);
cq.select(emp).where(cb.between(emp.get("age"), 35, 50));
List<Employee> employees = em.createQuery(cq).getResultList();
```

## Sorting

```java
EntityManager entityManager = entityManager.createEntityManager();
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Customer> cq = cb.createQuery(Customer.class);
Root<Customer> customer = cq.from(Customer.class);
cq.select(customer).orderBy(cb.desc(customer.get("id")), cb.asc(customer.get("name")));
List<Customer> customers = entityManager.createQuery(cq).getResultList();
```

## Pagination

```java
EntityManager entityManager = entityManager.createEntityManager();
int pageNumber = 1;
int pageSize = 2;
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Customer> cq = cb.createQuery(Customer.class);
cq.from(Customer.class);
List<Customer> customers = entityManager.createQuery(cq)
        .setFirstResult(pageSize * (pageNumber-1))
        .setMaxResults(pageSize)
        .getResultList();
```

## Join

```java
EntityManager em = entityManager.createEntityManager();
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Customer> criteria = cb.createQuery(Customer.class);
Root<Customer> customer = criteria.from(Customer.class);
Join<Customer, Address> customerJoin = customer.join("address", JoinType.INNER);
criteria.where(cb.equal(customerJoin.get("name"), "Ivan"));
List<Address> address = entityManager.createQuery(criteria).getResultList();
```