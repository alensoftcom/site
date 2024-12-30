# Persistence Context
## Материалы
+ Обзор
+ Основные понятия Java Persistence API и Hibernate API
+ Жизненный цикл Entity Object
+ Создание и сохранение сущностей
+ Загрузка сущностей
+ Отсоединение сущностей
+ Манипуляции сущностями в управляемом/постоянном состоянии
+ Манипуляции сущностями в неуправляемом состоянии
+ Удаление сущностей
+ Проверка состояния сущностей
+ Каскадные манипуляции
+ Container and Application Managed EntityManager

## Обзор

![](http://localhost:24100/media/db-layer.svg)  
Hibernate, как решение ORM, эффективно «находится между» уровнем доступа к данным приложения Java и реляционной базой данных, как можно увидеть на схеме выше. Приложение Java использует API Hibernate для загрузки, хранения, запроса и т. д. данных своего домена. Здесь мы познакомим вас с основными API Hibernate. Это будет краткое введение; мы подробно обсудим эти контракты позже.

Как поставщик JPA, Hibernate реализует спецификации Java Persistence API, а связь между интерфейсами JPA и специфическими реализациями Hibernate можно визуализировать на следующей диаграмме:

![](http://localhost:24100/media/hib-jp-cls.svg)  

**EntityManagerFactory** и **EntityManager** определены стандартом JPA. **SessionFactory** и &&Session** специфичны для спящего режима. **EntityManager** вызывает сеанс гибернации под капотом. И если вам нужны некоторые специфические функции, которые недоступны в EntityManager, вы можете получить сеанс, вызвав:

```java
Session session = entityManager.unwrap(Session.class);
```

## Основные понятия Java Persistence API и Hibernate API

**EntityManagerFactory**  
Фабрика менеджеров сущностей предоставляет экземпляры менеджеров сущностей, все экземпляры настроены на подключение к одной и той же базе данных, на использование одних и тех же настроек по умолчанию, определенных конкретной реализацией и т. д. Вы можете подготовить несколько фабрик менеджеров сущностей для доступа к нескольким хранилищам данных. Этот интерфейс похож на SessionFactory в нативном Hibernate.

**EntityManager**  
API EntityManager используется для доступа к базе данных в определенной единице работы. Он используется для создания и удаления постоянных экземпляров сущностей, для поиска сущностей по их первичному ключу и для запроса всех сущностей. Этот интерфейс похож на Session в Hibernate.

**SessionFactory** (org.hibernate.SessionFactory)  
Потокобезопасное (и неизменяемое) представление отображения модели домена приложения на базу данных. Действует как фабрика для экземпляров org.hibernate.Session. EntityManagerFactory является эквивалентом SessionFactory в JPA, и по сути, эти два сходятся в одной и той же реализации SessionFactory. Создание SessionFactory очень затратно, поэтому для любой заданной базы данных приложение должно иметь только один связанный SessionFactory. SessionFactory поддерживает службы, которые Hibernate использует во всех сеансах, такие как кэши второго уровня, пулы соединений, интеграции систем транзакций и т. д.

**Session** (org.hibernate.Session)  
Однопоточный, недолговечный объект, концептуально моделирующий "Единицу работы" (PoEAA). В номенклатуре JPA, Session представлен EntityManager. За кулисами Hibernate Session оборачивает JDBC java.sql.Connection и действует как фабрика для **org.hibernate.Transaction** экземпляры. Он поддерживает в целом «повторяемый считываемый» контекст сохранения (кэш первого уровня) модели домена приложения.

**Transaction** (org.hibernate.Transaction)  
Однопоточный, недолговечный объект, используемый приложением для разграничения границ отдельных физических транзакций. EntityTransaction является эквивалентом JPA, и оба действуют как API абстракции для изоляции приложения от базовой используемой системы транзакций (JDBC или JTA).

**Persistence context**  
Контекст сохранения — это набор экземпляров сущностей, в котором для любого идентификатора постоянной сущности существует уникальный экземпляр сущности. В контексте сохранения экземпляры сущностей и их жизненный цикл управляются определенным менеджером сущностей. Областью действия этого контекста может быть либо транзакция, либо расширенная единица работы.

## Жизненный цикл Entity Object

Жизненный цикл объектов-сущностей состоит из четырех состояний: **Transient**, **Managed**, **Removed** и **Detached**:

![Штаты JPA](http://localhost:24100/media/320-02.png)

- **New or Transient**: сущность является новой, если она только что была создана с помощью оператора new и не связана с контекстом сохранения. Она не имеет постоянного представления в базе данных и ей не было присвоено значение идентификатора.
- **Managed (persistent)**: экземпляр управляемой сущности — это экземпляр с постоянной идентификацией, который в данный момент связан с контекстом сохранения.
- **Detached**: экземпляр сущности — это экземпляр с постоянной идентификацией, который больше не связан с контекстом сохранения, обычно потому, что контекст сохранения был закрыт или экземпляр был исключен из контекста.
- **Removed**: удаленный экземпляр сущности — это экземпляр с постоянной идентификацией, связанный с контекстом сохранения, но запланированный для удаления из базы данных.

API EntityManager позволяет изменять состояние сущности или, другими словами, загружать и сохранять объекты.

## Создание и сохранение сущностей

После того, как вы создали новый экземпляр сущности (используя стандартный оператор new), он находится в новом состоянии. Вы можете сделать его **persistent** связывая его либо с **org.hibernate.Session** или **javax.persistence.EntityManager**.

```java
// Example. Making an entity persistent with JPA

Customer customer = new Customer();
customer.setName("Ivan");
entityManager.persist(customer);


// Example. Making an entity persistent with with Hibernate API

Customer customer = new Customer();
customer.setName("Ivan");
session.save(customer);
```

**org.hibernate.Session** также есть метод с именем **persist** который следует точной семантике, определенной в спецификации JPA для метода persist. Это **org.hibernate.Session** метод, к которому относится Hibernate **javax.persistence.EntityManager** делегаты по внедрению.

Если тип сущности Customer имеет сгенерированный идентификатор, значение связывается с экземпляром при вызове методов save или persist. Если идентификатор не генерируется автоматически, вручную назначенное (обычно естественное) значение ключа должно быть установлено на экземпляре до вызова методов save или persist.

## Загрузка сущностей

Часто возникает необходимость получить сущность вместе с ее данными (например, когда нам нужно отобразить ее в пользовательском интерфейсе).

```java
// Example. Obtaining an entity reference with its data initialized with JPA
long customerId = 1;
entityManager.find(Customer.class, new Long( customerId));

// Example. Obtaining an entity reference with its data initialized with Hibernate API
session.get(Customer.class, new Long( customerId));

//Example. Obtaining an entity reference with its data initialized using the byId() Hibernate API
session.byId(Customer.class).load(new Long( customerId));
```

Иногда нам нужно получить ссылку на сущность без необходимости загрузки ее данных, что крайне важно. Наиболее распространенным случаем является необходимость создания ассоциации между сущностью и другой существующей сущностью.

```java
// Example. Obtaining an entity reference without initializing its data with JPA
Address address = new Address();
address.setDescription("Minsk, Tolbuhina 7");
long customerId = 1;
Customer customer = entityManager.getReference(Customer.class, customerId);  
address.setCustomer(customer);

// Example. Obtaining an entity reference without initializing its data with Hibernate API
Address address = new Address();
address.setDescription("Minsk, Tolbuhina 7");
long customerId = 1;
Customer customer = session.load(Customer.class, customerId);  
address.setCustomer(customer);
```

Вы можете перезагрузить экземпляр сущности и его коллекции в любое время с помощью **refresh()** метод. Это полезно, когда триггеры базы данных используются для инициализации некоторых свойств сущности. Обратите внимание, что обновляются только экземпляр сущности и его коллекции, если только вы не укажете REFRESH как каскадный стиль любых ассоциаций:

```java
// Example. Refreshing entity state with JPA
entityManager.persist(customer);
entityManager.flush(); // force the SQL insert and triggers to run
entityManager.refresh(customer); //re-read the state (after the trigger executes)

// Example. Refreshing entity state with Hibernate API
Customer customer = new Customer();
customer.setName("Ivan");
session.save(customer);
session.flush(); 
session.refresh(customer);
```

## Отсоединение сущностей

Мы можем использовать **detach()** Метод. Мы передаем объект, который необходимо отсоединить, в качестве параметра метода:

```java
entityManager.detach(customer);
```

## Манипуляции сущностями в управляемом/постоянном состоянии

Приложение может манипулировать сущностями в управляемом/постоянном состоянии, и любые изменения будут автоматически обнаружены и сохранены при очистке контекста сохранения. Нет необходимости вызывать определенный метод, чтобы сделать ваши изменения постоянными.

```java
// Example. Modifying managed state with JPA
Customer customer = entityManage.find(Customer.class, new Long(1) );
customer.setName("Peter");
entityManager.flush();  // changes to customer are automatically detected and persisted

// Example. Modifying managed state with Hibernate API
Customer customer = session.byId( Customer.class ).load( new Long(1) );
customer.setName("Peter");
session.flush();
```

## Манипуляции сущностями в неуправляемом состоянии

Многим приложениям необходимо извлечь объект в одной транзакции, отправить его на уровень представления для обработки, а затем сохранить изменения в новой транзакции. Между обеими транзакциями может быть значительное время на размышления и ожидания пользователя. Мы можем использовать **merge()**. Метод merge помогает внести изменения, внесенные в отсоединенную сущность, в управляемую сущность, если таковые имеются:

```java
// Example. Merging a detached entity with JPA
Customer customer = entityManage.find(Customer.class, new Long(1) );
entityManager.detach(customer);
customer.setName("Mikle");
customer = entityManager.merge(customer);

// Example. Merging a detached entity with Hibernate API
Customer customer = session.byId( Customer.class ).load( new Long(1) );
//Clear the Session so the person entity becomes detached
session.clear();
customer.setName("Mikle");
customer = (Customer) session.merge(customer);
```

## Удаление сущностей

Сущности также могут быть удалены.

```java
// Example. Deleting an entity with JPA
entityManager.remove(customer);

// Example. Deleting an entity with the Hibernate API
session.delete(customer);
```

## Проверка состояния сущностей

Приложение может проверять состояние сущностей и коллекций относительно контекста сохранения.

```java
// Example. Verifying managed state with JPA
boolean contained = entityManager.contains(customer);

// Example. Verifying managed state with Hibernate API
boolean contained = session.contains(customer);

// Example. Verifying laziness with JPA
PersistenceUnitUtil persistenceUnitUtil = entityManager.getEntityManagerFactory().getPersistenceUnitUtil();
boolean customerInitialized = persistenceUnitUtil.isLoaded(customer);
boolean customerAddressInitialized = persistenceUnitUtil.isLoaded( customer.getAddress());
boolean customerNameInitialized = persistenceUnitUtil.isLoaded(customer, "name");

// Example. Verifying laziness with Hibernate API
boolean customerInitialized = Hibernate.isInitialized(customer);
boolean customerAddressInitialized = Hibernate.isInitialized(customer.getAddress());
boolean customerNameInitialized = Hibernate.isPropertyInitialized(customer, "name");
```

## Каскадные манипуляции

JPA позволяет вам распространять переход состояния от родительской сущности к дочерней. Для этой цели JPA **javax.persistence.CascadeType** определяет различные типы каскадов:

- ALL — каскадирует все переходы состояний сущности.
- PERSIST — каскадирует операцию сохранения сущности.
- MERGE — каскадирует операцию слияния сущностей.
- REMOVE — каскадирует операцию удаления сущности.
- REFRESH — каскадирует операцию обновления сущности.
- DETACH — каскадирует операцию отсоединения сущности.

Кроме того, CascadeType.ALL будет распространять любую специфичную для Hibernate операцию, которая определяется перечислением org.hibernate.annotations.CascadeType:

- SAVE_UPDATE — каскадирует операцию saveOrUpdate сущности.
- REPLICATE — каскадирует операцию репликации сущности.
- LOCK — каскадирует операцию блокировки объекта.

Следующие примеры поясняют некоторые ранее упомянутые каскадные операции с использованием следующих сущностей:

```java
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
    //...
}

@Entity
public class Order {
    @Id
    private Long id;
    
    private Date date;
    
    Decimal amount;
    
    @ManyToOne (fetch = FetchType.LAZY)
    private Customer customer;
    //...
}
```

## Container and Application Managed EntityManager

По сути, существует два типа EntityManager: управляемый контейнером и управляемый приложением.

### Container-Managed EntityManager

Здесь контейнер (такой как JEE Container или Spring) внедряет EntityManager в компоненты предприятия. Другими словами, контейнер создает EntityManager из EntityManagerFactory:

```java
@PersistenceContext
private EntityManager entityManager;

@Transactional
public T save(T entity) {
    entityManager.persist(entity);
    return entity;
}
```

Это также означает, что контейнер отвечает за начало транзакции, а также за ее подтверждение или откат.

### Application-Managed EntityManager

Менеджер сущностей, управляемый приложением, позволяет вам управлять менеджером сущностей в коде приложения. Этот менеджер сущностей извлекается через API EntityManagerFactory. Чтобы создать EntityManager, мы должны явно вызвать createEntityManager() в EntityManagerFactory:

```java
protected static EntityManagerFactory entityManagerFactory;

static {
    entityManagerFactory = Persistence.createEntityManagerFactory("com.mjc");
}

public T save(T entity) {
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    try {
        entityManager.getTransaction().begin();
        entityManager.persist(entity);
        entityManager.getTransaction().commit();
    } catch (Exception e) {
        entityManager.getTransaction().rollback();
    }
    entityManager.close();
    return entity;
}
```

В этом примере у нас больше контроля над потоком, но и больше ответственности (например, нам нужно помнить о необходимости закрыть EntityManager, чтобы явно вызывать операции фиксации и отката).