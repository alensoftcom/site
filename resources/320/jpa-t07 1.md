# N+1 problem in Hibernate

## Materials
+ Overview
+ FetchType.LAZY as a solution
+ Solution
+ Why you should avoid N+1 problems?

## Overview

Проблема N+1 — это проблема производительности в объектно-реляционном сопоставлении, которое запускает несколько запросов на выборку (точнее, N+1, где N = количество записей в таблице) в базе данных для одного запроса на выборку на уровне приложения. Hibernate и Spring Data JPA предоставляют несколько способов обнаружения и решения этой проблемы производительности.

Давайте рассмотрим пример для таблиц Customer и Order:

```java
 @Entity
 @Table(name="CUSTOMER")
 public class Customer {
     @Id
     @GeneratedValue
     private Long id;
     
     private String name;
     
     @OneToMany(mappedBy = "order")
     private List<Order> orders = new ArrayList<>();
     // ...
 }

 @Entity
 @Table(name="ORDER")
 public class Order {
     @Id
     private Long id;
     
     private Date date;
     
     Decimal amount;
     
     @ManyToOne 
     @JoinColumn(name="CUSTOMER_ID")
     private Customer customer;
     // ...
 }
```

В кэше сеанса хранится граф объектов, связанный друг с другом. По умолчанию, когда Hibernate загружает объект Customer из базы данных, он одновременно загружает все связанные объекты Orders. Возьмем в качестве примера классы Customer и Order, предполагая, что внешний ключ CUSTOMER_ID таблицы ORDERS может быть пустым.

Следующий метод find() сеанса используется для извлечения всех объектов Customer из базы данных:

```java
List customerLists=session.find("from Customer as c");
```

При запуске метода find() выше Hibernate сначала запросит все записи в таблице CUSTOMERS, а затем запросит записи со ссылочной связью в таблице ORDERS в соответствии с идентификатором каждой записи. Hibernate выполнит следующие операторы select по очереди:

```roomsql
select * from CUSTOMERS;
select * from ORDERS where CUSTOMER_ID=1;
select * from ORDERS where CUSTOMER_ID=2;
select * from ORDERS where CUSTOMER_ID=3;
select * from ORDERS where CUSTOMER_ID=4;
```

С помощью пяти приведенных выше операторов select Hibernate в конечном итоге загружает 4 объекта Customer и 5 объектов Order, формируя связанный граф объектов в памяти.

Hibernate использует стратегию немедленного извлечения по умолчанию при извлечении объекта Order, связанного с Customer. В этой стратегии поиска есть два основных недостатка:

1. Количество операторов select слишком велико, что требует частого доступа к базе данных, что повлияет на производительность поиска. Если вам нужно запросить n объектов Customer, вы должны выполнить n+1 операторов запроса select. Это классическая проблема n+1 запроса select. Эта стратегия поиска не использует функцию запроса соединения SQL. Например, приведенные выше пять операторов select могут быть полностью завершены следующим одним оператором select:
    
    ```roomsql
    select * from CUSTOMERS left outer join ORDERS
    on CUSTOMERS.ID=ORDERS.CUSTOMER_ID
    ```
    

Приведенный выше оператор select использует функцию запроса левого внешнего соединения SQL, которая может запрашивать все записи таблицы CUSTOMERS и записи сопоставленной таблицы ORDERS в операторе select.

2. Когда логике приложения требуется только доступ к объекту Customer без доступа к объекту Order, загрузка объекта Order является полностью избыточной операцией. Эти избыточные объекты Order тратят много памяти.

## FetchType.LAZY as a solution

На первый взгляд, вы можете лениво загрузить дочерний объект. Поэтому для этого установите аннотацию @ManyToOne(fetch = FetchType.LAZY). Под капотом ленивая загрузка создает прокси-объекты для дочерних объектов. Когда мы обращаемся к дочерним объектам, hibernate будет запускать запросы и загружать их. С учетом сказанного, это может показаться хорошей идеей, но ленивая загрузка — не идеальное решение.

```java
@Entity
public class Order {
    @Id
    private Long id;
    
    private Date date;
    
    Decimal amount;
    
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name="CUSTOMER_ID")
    private Customer customer;
    // ...
}
```

Это связано с базовой логикой ленивой загрузки. Когда ленивая загрузка включена, hibernate создаст прокси для полей заказов. При доступе к полю заказа hibernate заполнит прокси значениями из базы данных. Да, запрос все равно будет выполняться для каждого объекта Customer.

## Solution

Так как же нам решить проблему N+1? Для этого нам нужно вернуться к некоторым основам SQL. Когда нам нужно загрузить данные из двух отдельных таблиц, мы можем использовать объединения. Поэтому вместо использования нескольких запросов мы можем написать один запрос, как показано ниже.

```roomsql
select * from CUSTOMERS left outer join ORDERS
on CUSTOMERS.ID=ORDERS.CUSTOMER_ID
```

## Why you should avoid N+1 problems?

Причины:

1. Проблемы N+1 создают больше запросов к базе данных. Это означает, что база данных будет перегружена.
2. Больше запросов к базе данных влияет на производительность базы данных, а также сервера приложений. Каждый запрос и обработка ответа требуют больше циклов ЦП.
3. Каждый дополнительный запрос увеличит общее время обработки. Поскольку каждый запрос должен отправлять и получать запросы и результаты, время обработки увеличивается пропорционально.
4. Более длительное время обработки означает больше открытых соединений из пулов соединений. Это влияет на другие запросы, поскольку им приходится дольше ждать получения соединений.