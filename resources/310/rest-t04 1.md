## REST with Spring

## Материалы
+ Понимание REST in Spring
+ Rest Controllers
+ Конфигурация Spring REST Application
+ Управление версиями REST API
+ Пагинация REST in Spring
+ Spring HATEOAS

## Понимание REST in Spring

Фреймворк Spring поддерживает два способа создания RESTful-сервисов:

- использование MVC с ModelAndView
- использование конвертеров HTTP-сообщений  
    

The **ModelAndView approach** более старый и гораздо лучше документированный, но также более многословный и тяжелый в настройке. Новый подход, основанный на **HttpMessageConverter and annotations**, намного легче и проще в реализации. Конфигурация минимальна, и она предоставляет разумные значения по умолчанию для того, что вы ожидаете от RESTful-сервиса.

Давайте рассмотрим, как шаг за шагом создать REST-приложение с использованием фреймворка Spring Web.

## Rest Controllers

Давайте рассмотрим, как построить REST-контроллеры с использованием Spring Web Framework. Spring REST-контроллеры аннотируются @RestController. Аннотация включает аннотации @RestController и @ResponseBody, и в результате упрощает реализацию контроллера:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private Convertor<BookDTO, Book> convertor;

    @GetMapping
    ResponseEntity<List<BookDTO>> getAll(
           @RequestParam(defaultValue = "10", required = false) int limit, 
           @RequestParam(defaultValue = "5", required = false) int offset) {
        List<Book> bookList = bookService.getAllBooks(limit, offest);
        List<BookDTO> bookDTOList = convertor.convertModelListToDtoList(bookList);
        return new ResponseEntity<>(bookDTOList, HttpStatus.OK);
    }

    @GetMapping(value = "/{id:\\d+}")
    ResponseEntity<List<BookDTO>> getById(@PathVariable long id) {
        Book book = bookService.getBookById(id);
        BookDTO bookDTO = convertor.convertModelToDto(book);
        return new ResponseEntity<>(bookDTO, HttpStatus.OK);
    }

    @PostMapping
    ResponseEntity<BookDTO> create(@RequestBody BookCreateDTO bookCreateDTO) {
        Book book = convertor.convertDtoToModel(bookCreateDTO);
        Book createdBook = bookService.createBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(createdBook), HttpStatus.CREATE);
    }

    @PutMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> update(@PathVariable long id, @Valid @RequestBody BookUpdateDTO bookUpdateDTO) {
        Book book = convertor.convertDtoToModel(bookUpdateDTO);
        Book updatedBook = bookService.updateBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(updatedBook), HttpStatus.OK);
    }

    @PatchMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> patch(@PathVariable long id, @Valid @RequestBody BookPatchDTO bookPatchDTO) {
        Book book = convertor.convertDtoToModel(bookPatchDTO);
        Book patchedBook = bookService.patchBook(id, book);
        return new ResponseEntity<>(convertor.convertModelToDto(patchedBook), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id:\\d+}")
    ResponseEntity<V> delete(@PathVariable long id) {
        bookService.deleteBok(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

**ResponseEntity** используется как метод response. ResponseEntity представляет собой HTTP-ответ, включающий заголовки, тело и статус.

## Конфигурация Spring REST Application

Фреймворк Spring предоставляет два способа настройки RESTful-приложения:

- использование XML-файлов конфигурации, таких как web.xml и SpringApplicationContext.xml
- с использованием класса Java

Давайте рассмотрим наиболее широко используемый подход к настройке Spring REST-приложения, основанный на **Java based Web Configurations**.

Конфигурирование приложения на базе spring framework через Java — это современный подход по сравнению с xml. Рассмотрим конфигурацию Java:

```Java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.epam.mjc.school"})
public class WebConfig
{
 //Here, you configure beans related to web application context
}
```

The **@Configuration annotation** является центральным артефактом Java-конфигураций Spring. @Configuration — это мета-аннотация, обозначенная как @Component, которая позволяет сканировать компоненты, а также обеспечивает гибкость использования **@Autowired annotations**. Класс, аннотированный аннотацией @Configuration, показывает, что это может использоваться контейнером Spring IoC для определений bean-компонентов.  
Новый **@EnableWebMvc annotation** делает некоторые полезные вещи – в частности, в случае REST, он обнаруживает существование Jackson и JAXB 2 в classpath и автоматически создает и регистрирует конвертеры JSON и XML по умолчанию. Функциональность аннотации эквивалентна версии XML:

```xml
<mvc:annotation-driven />
```

**@ComponentScan annotation** с **@Configuration classes** позволяет Spring сканировать все классы через пакет и регистрирует все компоненты и контроллер для нашего приложения.

`The WebConfig class`Показанный выше пример установит базовую поддержку, необходимую для проекта Spring Web, например, регистрацию контроллеров и сопоставлений, преобразователей типов, поддержку проверки, преобразователей сообщений и обработку исключений. Класс конфигурации заменит `SpringApplicationContext.xml`тот, который используется в конфигурации xml.

Если мы хотим настроить эту конфигурацию, вам следует реализовать **WebMvcConfigurer interface** или удалить **@EnableWebMvc annotation** и продлить **WebMvcConfigurationSupport class** напрямую.

```Java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.epam.mjc.school"})
public class WebConfig implements WebMvcConfigurer {
// Here, you configure beans related to web application context
}
```

Для загрузки приложения Spring Web, которое загружает эту конфигурацию, вам нужен класс инициализатора. Для этой цели Spring Web предоставляет **WebApplicationInitializer** который является **Servlet 3.0 + implementation** для программной настройки ServletContext по сравнению с использованием web.xml в конфигурации XML.

```Java
public class MainWebAppInitializer implements WebApplicationInitializer {
@Override
public void onStartup(final ServletContext servletContext) throws ServletException {

    //create the root Spring application context
    AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
    rootContext.register(WebConfig.class);
    rootContext.setConfigLocation("com.epam.mjc.school.config");

    //add ContextLoaderListner to the ServletContext which will be responsible to load the application context
    servletContext.addListener(new ContextLoaderListener(rootContext));
    
    //register and map the dispatcher servlet
    //note Dispatcher servlet with constructor arguments
    ServletRegistration.Dynamic dispatcher = 
            servletContext.addServlet("dispatcher",  new DispatcherServlet(servletAppContext));
    dispatcher.setLoadOnStartup(1);
    dispatcher.addMapping("/");

    //add specific encoding (e.g. UTF-8) via CharacterEncodingFilter 
    FilterRegistration.Dynamic encodingFilter = 
            servletContext.addFilter("encoding-filter", new CharacterEncodingFilter());
    encodingFilter.setInitParameter("encoding", "UTF-8");
    encodingFilter.setInitParameter("forceEncoding", "true");
    encodingFilter.addMappingForUrlPatterns(null, true, "/*");
    }
}
```

Давайте посмотрим, что **onStartup** метод **WebApplicationInitializer interface** содержит:  
Если вы хотите использовать `Java-based annotation`вместо XML-конфигурации, вам следует использовать **AnnotationConfigWebApplicationContext** для этого

```Java
AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
```

Вам необходимо зарегистрировать контекст приложения. Это можно легко сделать, зарегистрировав свой пользовательский класс конфигурации.  

```Java
servletAppContext.register(WebConfig.class);
```

Если конфигурации вашего приложения распределены по нескольким классам и вы хотите использовать все эти конфигурации, Spring **WebApplicationInitializer** предоставить способ указать корневой пакет для сканирования на предмет классов конфигурации.

```Java
rootContext.setConfigLocation("com.epam.mjc.school.config");
```

Чтобы загрузить контекст приложения при запуске приложения, необходимо добавить **ContextLoaderListner** к **ServletContext** который будет отвечать за загрузку контекста.

```Java
servletContext.addListener(new ContextLoaderListener(rootContext));
```

Наконец, вам следует создать и зарегистрировать **Dispatcher servlet**, который является точкой входа нашего приложения.

```Java
ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher",  new DispatcherServlet(servletAppContext));
dispatcher.setLoadOnStartup(1);
dispatcher.addMapping("/");
```

Если вы хотите добавить определенную кодировку, вы можете добавить **FilterRegistration.Dynamic filter**:

```Java
FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encoding-filter", new CharacterEncodingFilter());
encodingFilter.setInitParameter("encoding", "UTF-8");
encodingFilter.setInitParameter("forceEncoding", "true");
encodingFilter.addMappingForUrlPatterns(null, true, "/*");
```

Обычно для начальной загрузки веб-приложения Spring легко использовать **AbstractAnnotationConfigDispatcherServletInitializer class** который является реализацией **WebApplicationInitializer interface**. **AbstractAnnotationConfigDispatcherServletInitializer class** регистрирует **ContextLoaderlistener** (по желанию) и **DispatcherServlet** и позволяет вам легко добавлять классы конфигурации для загрузки для обоих классов и применять фильтры к **DispatcherServlet** и обеспечить отображение сервлета.

```Java
public class MainWebAppInitializer implements AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { SecurityConfig.class, ApplicationConfig.class, RepositoryConfig.class };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        //add specific encoding (e.g. UTF-8) via CharacterEncodingFilter
        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encoding-filter", new CharacterEncodingFilter());
        encodingFilter.setInitParameter("encoding", "UTF-8");
        encodingFilter.setInitParameter("forceEncoding", "true");
        encodingFilter.addMappingForUrlPatterns(null, true, "/*");
    }
}
```

В фреймворке Spring Web каждый **DispatcherServlet** имеет свой собственный **WebApplicationContext**, который наследует все бины, уже определенные в корне **WebApplicationContext**. Эти унаследованные бины могут быть переопределены в области действия сервлета, и вы можете определить новые бины, специфичные для области действия, локальные для данного экземпляра сервлета. Смотрите рисунок ниже:

![Типичная иерархия контекста](http://localhost:24100/media/310-04.png)

## Управление версиями REST API

Есть несколько способов управления версиями REST API. Давайте рассмотрим высокоуровневые подходы к управлению версиями REST API:

- Версионирование URI – версионирование пространства URI с использованием индикаторов версий.
- Использование Accept Header – версия REST API с использованием Media Type
- Использование пользовательского заголовка — версия REST API с использованием пользовательского http-заголовка
- Использование параметра URI - версия REST API с использованием параметра запроса URI

**1. URI Versioning**

Когда мы вводим версию в пространстве URI, представления ресурсов считаются неизменными.

Поэтому, когда необходимо внести изменения в API, необходимо создать новое пространство URI. Например, скажем, API публикует следующие ресурсы — пользователей и привилегии:

```bash
http://host/v1/users
http://host/v1.0/books
```

Если вы вносите критические изменения в API пользователей и книг, необходимо ввести вторую версию, например:

```bash
http://host/v2/users
http://host/v2/privileges
```

**2. Versioning using Accept Header**

Согласование контента с использованием **HTTP Accept header** может использоваться для управления версиями API REST. Для управления версиями API REST будет использовать тип MIME для определения управления версиями API.

```bash
Accept: application/vnd.javadevjournal.v2+json
Accept: application/vnd.javadevjournal+json;version=1.0
```

Здесь важно понимать, что клиент не делает никаких предположений о структуре ответа, выходящих за рамки того, что он определяет в типе носителя. Ответ:

```json
############## GET Request for Products ##############
GET /products/228781 HTTP/1.1
Accept: application/vnd.javadevjournal.v1+json

############## Response ##############
HTTP/1.1 200 OK
Content-Type: application/vnd.javadevjournal.v1+json
{
   "product": {
      "code": "228781",
      "name": "Running shoes",
      "description": "one of the best running shoes"
   }
}
```

**3. Versioning using Custom Header**

Вы можете использовать пользовательский заголовок для управления версиями API. Пример:

```makefile
Accept-version: v1
Accept-version: v2
```

**4. Versioning using URI parameter**

Это наименее используемый метод для версионирования вашего REST API. Добавьте версию как параметр запроса. Пример:

```bash
http://host/shopping?version=2.0
http://host/catalog/titles/series/70023522?v=1.5
```

Если клиент REST API попытается использовать старый API, система должна вернуть **HTTP 410 status code**. **HTTP 410 Gone status code** указывает на то, что доступ к целевому ресурсу на исходном сервере больше невозможен и что это состояние, скорее всего, будет постоянным.

## Пагинация REST in Spring

Пагинация — это механизм обработки большого набора результатов в любом типе приложения. Реализация пагинации в REST API ничем не отличается, но требует дополнительного процесса обдумывания. Предоставление плавной и эффективной пагинации для REST API может улучшить пользовательский опыт и помочь создать эффективный и быстрый REST API.

**Resource vs Representation**

Прежде чем приступить к проектированию API пагинации, вам необходимо четко понимать страницу как ресурс или представление ресурса.

1. Если учесть, что страница не является ресурсом в REST, а является свойством запроса.  
    Пример:
    
    ```bash
    http://domainname/products?page=1
    ```
    
2. Если рассматривать страницу как ресурс, то:
    
    ```bash
    http://domainname/products/page/1?sort_by=date
    
    //URL part for sorting by date 
    http://domainname/products/date/page/1
    ```
    

**Discoverability**

Discoverability помогает сделать RESTful API более полезным и элегантным. Discoverability тесно связана с HATEOAS в REST API. Discoverability пагинации REST API будет передавать ссылки «следующий», «предыдущий», «первый» и «последний» как часть данных ответа. Вы рассказываете, как добавить эту функцию в свой API во время пагинации. Давайте рассмотрим некоторые основные моменты при создании интерфейса пагинации REST API.

1. **Page & Size\Limit** **Page and Size\Limit** позволяют REST API и клиенту контролировать количество запрошенных результатов в наборе результатов. Передавая страницу и параметр limit\size, вы можете указать, какую страницу вы хотите получить и сколько элементов на каждой странице вы хотите вернуть. API может настроить ограничение по умолчанию, но должен разрешить клиенту указать `a limit\size`.
    
2. **Sorting** **Sorting** всегда идет бок о бок с поиском и пагинацией. При проектировании REST API предоставьте гибкость, чтобы клиент мог указать вариант сортировки при получении результатов из API. Рекомендуется использовать `sort_by=[attribute name]::[asc/desc]`шаблон при проектировании API. Разработчик API должен указать допустимое имя атрибута в качестве параметра сортировки. Например, можно использовать `?name::asc`для сортировки ресурса по имени или ?name::desc для сортировки в обратном порядке.
    

Пример REST-контроллера с пагинацией и сортировкой:

```Java
@RestController
@RequestMapper("/books")
public class BookController {

   @Autowired
   private BookService bookService;
   
   @Autowired
   private BookMapper bookMapper;
   
   @Autowired 
   private EntityLinks links;

   @GetMapping
   public ResponseEntity<PagedResources<BookDTO>> getAllBooks(
            @Min(1) @RequestParam int page, 
            @RequestParam(required = false, defaultValue = "10") int size, 
            @RequestParam(name = "sort_by", required = false, defaultValue = "title::asc") String sortBy, 
            PagedResourcesAssembler assembler) {
      Page<BookDTO> bookDTOPage = bookMapper.mapToBookDTOPage(bookService.findAllBooks(page, size, sortBy));
      PagedResources<BookDTO> bookDTOResources = 
              assembler.toResource(bookDTOPage, linkTo(BookController.class).slash("/books").withSelfRel());
      HttpHeaders responseHeaders = new HttpHeaders();
      responseHeaders.add("Link", createLinkHeader(bookDTOResources));
      return new ResponseEntity<>(
              assembler.toResource(products, linkTo(BookController.class).slash("/books").withSelfRel()), 
              responseHeaders, 
              HttpStatus.OK);
   }

   private String createLinkHeader(PagedResources<BookDTO> bookDTOResources) {
      final StringBuilder linkHeader = new StringBuilder();
      linkHeader.append(buildLinkHeader(bookDTOResources.getLinks("first").get(0).getHref(), "first"));
      linkHeader.append(", ");
      linkHeader.append(buildLinkHeader(bookDTOResources.getLinks("next").get(0).getHref(), "next"));
      return linkHeader.toString();
   }

   public static String buildLinkHeader(final String uri, final String rel) {
      return "<" + uri + ">; rel=\"" + rel + "\"";
   }
}
```

Каждый постраничный ответ будет возвращать ссылки на `previous and next pages`результаты на основе текущей страницы с использованием определенных IANA связей `prev and next`. Однако, если вы в данный момент находитесь на первой странице результатов, не `prev link`будет отображено. Давайте рассмотрим следующий пример URI:

```bash
http://host:port/books?page=1&size=20&sort_by=title::asc
```

Пример ответа:

```json
{
    "_embedded": {
        "bookDTO": [
            ...data...
        ]
    },
    "_links": {
        "first": {
            "href": "http://host:port/books?page=1&size=20"
    },
    "self": {
        "href": "http://host:port/books"
    },
    "next": {
        "href": "http://host:port/books?page=2&size=20"
    },
    "last": {
        "href": "http://host:port/books?page=5&size=20"
    }
    },
    "page": {
        "size": 20,
        "totalElements": 100,
        "totalPages": 5,
        "number": 0
    }
}
```

Давайте посмотрим на данные ответа, где:  

- Указывает `next link`на следующую страницу. `last link`Указывает на последний набор результатов.
- В нем `self link`представлена ​​вся коллекция.
- Предоставляет `bottom page section`информацию о пагинации, включая `page size, total results, total pages and current page number`.

**HTTP link header** также может использоваться для передачи клиенту информации о пагинации. С помощью приведенного выше примера контроллера REST система вернет следующую дополнительную информацию как часть `Link HTTP header`.

```bash
Link → 
<http://host:port/books?page=1&size=20>; rel="first", 
<http://host:port/books?page=2&size=20>; rel="next"
```

Например, `Github API`используйте заголовок ссылки для пагинации.

## Spring HATEOAS

https://www.baeldung.com/spring-hateoas-tutorial https://www.javadevjournal.com/spring/spring-hateoas/

HATEOAS (Hypermedia as the Engine of Application State) — это ограничение архитектуры приложения REST. REST API, управляемый гипермедиа, предоставляет информацию, помогающую динамически перемещаться по API. Это делается путем передачи гипермедиа-ссылок с ответами. HATEOAS — это фундаментальная концепция для создания обнаруживаемых REST API.

Фреймворк Spring предоставляет , `HATEOAS library`который можно использовать для простого создания представлений REST, которые следуют принципу HATEOAS (гипертекст как механизм состояния приложения).