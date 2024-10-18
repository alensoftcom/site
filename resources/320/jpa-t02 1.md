# Defining JPA Entities

## Materials
+ Entity
+ Entity Annotations
+ Entity Relationships
+ Lazy Loading and Eager Loading

## Entity

Сущности в JPA — это не что иное, как POJO, представляющие данные, которые могут быть сохранены в базе данных. Сущность представляет собой таблицу, хранящуюся в базе данных. Каждый экземпляр сущности представляет собой строку в таблице.

Каждая сущность связана с некоторыми метаданными, которые представляют информацию о ней. Вместо базы данных эти метаданные существуют либо внутри, либо вне класса. Эти метаданные могут быть в следующих формах:

- **Annotation** - В Java аннотации - это форма тегов, представляющих метаданные. Эти метаданные сохраняются внутри класса.
- **XML** - В этой форме метаданные сохраняются вне класса в XML-файле.

## Entity Annotations

Все аннотации JPA определены в **javax.persistence** Пакет. Аннотации Hibernate основаны на спецификации JPA 2 и поддерживают все функции.

### 1. Entity Annotation

Допустим, у нас есть POJO под названием Customer, который представляет данные о клиенте, и мы хотели бы сохранить его в базе данных.

```java
  public class Customer {
      // fields, getters and setters
  }
```

Для того, чтобы сделать это, мы должны определить сущность так, чтобы JPA знал о ней. Так что давайте определим ее, используя **@Entity** аннотация. Мы должны указать эту аннотацию на уровне класса. Мы также должны убедиться, что у сущности есть конструктор без аргументов и первичный ключ:

```java
  @Entity
  public class Customer {
      // fields, getters and setters
  }
```

Поскольку различные реализации JPA будут пытаться создать подклассы нашей сущности для предоставления своей функциональности, классы сущностей не должны объявляться окончательными.

### 2. Id Annotation

Каждая сущность JPA должна иметь первичный ключ, который ее уникально идентифицирует. **@Id** аннотация определяет первичный ключ. Мы можем генерировать идентификаторы разными способами, которые указаны в **@GeneratedValue** аннотация.

С помощью элемента стратегии мы можем выбрать одну из четырех стратегий генерации идентификаторов. **The value can be AUTO, TABLE, SEQUENCE, or IDENTITY**Если мы укажем GenerationType.AUTO, поставщик JPA будет использовать любую стратегию, которую захочет, для генерации идентификаторов.

```java
@Entity
public class Customer {
 @Id
 @GeneratedValue(strategy=GenerationType.AUTO)
 private Long id;
 
 private String name;
    // g...
}
```

### 3. The Table Annotation

В большинстве случаев имя таблицы в базе данных и имя сущности не будут совпадать. В этих случаях мы можем указать имя таблицы с помощью **@Table** аннотация:

```java
@Entity
@Table(name="CUSTOMER")
public class Customer {

    // ...

}
```

Мы также можем указать схему, используя элемент schema:

```java
 @Entity
 @Table(name="CUSTOMER", schema="SHOP")
 public class Customer {
     // ...
 }
```

Имя схемы помогает отличить один набор таблиц от другого. Если мы не используем **@Table** аннотации, имя сущности будет считаться именем таблицы.

### 4. Column Annotation

Мы можем использовать **@Column** аннотация для указания деталей столбца в таблице. **@Column** Аннотация имеет множество элементов, таких как имя, длина, допустимость значения NULL и уникальность.

```java
 @Entity
 @Table(name="CUSTOMER")
 public class Customer {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @Column(name="CUSTOMER_NAME", length=50, nullable=false, unique=false)
  private String name;
    
     // ...
 }
```

Элемент name определяет имя столбца в таблице. Элемент length определяет его длину. Элемент nullable определяет, является ли столбец nullable или нет, а элемент unique определяет, является ли столбец уникальным. Если мы не укажем эту аннотацию, имя поля будет считаться именем столбца в таблице.

### 5. Transient Annotation

Иногда нам может понадобиться сделать поле неперсистентным. Мы можем использовать **@Transient** аннотация для этого. Она указывает, что поле не будет сохранено. Например, мы можем вычислить возраст клиента по дате рождения.

```java
@Entity
@Table(name="CUSTOMER")
public class Customer {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @Column(name="CUSTOMER_NAME", length=50, nullable=false)
  private String name;

  @Transient
  private Integer age;

  // ...
}
```

В результате возраст поля не будет сохранен в таблице.

### 6. Enumerated Annotation

Иногда нам может понадобиться сохранить тип перечисления Java. Мы можем использовать аннотацию @Enumerated, чтобы указать, следует ли сохранять перечисление по имени или по порядковому номеру (по умолчанию).

```java
public enum Gender {
    MALE, FEMALE
}

@Entity
@Table(name="CUSTOMER")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
  
    @Column(name = "CUSTOMER_NAME", length = 50, nullable = false, unique = false)
    private String name;
  
    @Transient
    private Integer age;
  
    @Temporal(TemporalType.DATE)
    private Date birthDate;
  
    @Enumerated(EnumType.STRING)
    private Gender gender;
  
    // ...
}
```

## Entity Relationships

JPA определяет четыре аннотации для определения отношений между сущностями:

- @ОдинКОдному
- @ОдинКМногим
- @МногиеКОдному
- @ManyToMany

### 1. One-to-one relationships

The **@OneToOne** Аннотация используется для определения отношения один к одному между двумя сущностями. Например, у вас может быть сущность Customer, которая содержит имя клиента, адрес электронной почты, возраст, пол, но вы можете захотеть сохранить дополнительную информацию о клиенте (например, адрес) в отдельной сущности Address. Аннотация @OneToOne облегчает разбиение ваших данных и сущностей таким образом.

Класс Customer ниже имеет один экземпляр Address. Address сопоставляется с одним экземпляром Customer.

```java
@Entity
public class Customer {
    @Id
    private Long id;
    
    private String email;
    
    @Column(name="CUSTOMER_NAME", length=50, nullable=false, unique=false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @OneToOne(mappedBy="customerId")
    private Address address;
    // ...
}
    
@Entity
public class Address {
    @Id
    private Long id;
    
    private String description;
    
    @OneToOne
    private Customer customer;
    // ...
}
```

Поставщик JPA использует поле клиента Address для сопоставления Address и Customer. Сопоставление указывается в атрибуте mappedBy в аннотации @OneToOne.

### 2. One-to-many and many-to-one relationships

The **@OneToMany** и **@ManyToOne** аннотации облегчают обе стороны одного и того же отношения. Рассмотрим пример, где у Order может быть только один Customer, но у Customer может быть много заказов. Сущность Order будет определять отношение @ManyToOne с Customer, а сущность Customer будет определять отношение @OneToMany с Order.

```java
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();
    // ...
}

@Entity
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

В этом случае класс Customer хранит список заказов, сделанных этим клиентом, а класс Order хранит ссылку на своего единственного клиента. Кроме того, @JoinColumn указывает имя столбца в таблице Order для хранения идентификатора Customer.

### 3. Many-to-many relationships

Наконец, **@ManyToMany** аннотация облегчает связь «многие ко многим» между сущностями. Вот случай, когда сущность Order имеет несколько элементов, и элемент может быть включен в разные заказы:

```java
@Entity
public class Order {
    @Id
    private Long id;
    
    private Date date;
    
    Decimal amount;
    
    @ManyToMany
    @JoinTable(name="ORDER_ITEM",
        joinColumns=@JoinColumn(name="ORDER_ID"),
        inverseJoinColumns=@JoinColumn(name="ITEM_ID"))
    private Set<Item> items = new HashSet<>();
    // ...
}

@Entity
public class Item {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    
    @ManyToMany(mappedBy = "orders")
    private Set<Order> orders = new HashSet<>();
    // ...
}
```

В этом примере мы создаем новую таблицу ORDER_ITEM с двумя столбцами: ORDER_ID и ITEM_ID. Использование атрибутов joinColumns и inverseJoinColumns сообщает вашей JPA-среде, как сопоставлять эти классы в отношении «многие ко многим». Аннотация @ManyToMany в классе Item ссылается на поле в классе Order, которое управляет отношением; а именно на свойство items.

## Lazy Loading and Eager Loading

Спецификация JPA определяет две основные стратегии загрузки данных (ленивая и активная):

- **EAGER** стратегия — это требование к среде выполнения поставщика персистентности, согласно которому данные должны извлекаться с большой скоростью;
- **LAZY** Стратегия — это подсказка среде выполнения поставщика персистентности о том, что данные следует извлекать лениво при первом доступе к ним.

Ленивая загрузка обычно используется для отсрочки загрузки атрибутов или ассоциаций сущности или сущностей до момента, когда они понадобятся, в то время как жадная загрузка представляет собой противоположную концепцию, в которой атрибуты и ассоциации сущности или сущностей извлекаются явно и без какой-либо необходимости указывать на них.

```java
@Entity
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