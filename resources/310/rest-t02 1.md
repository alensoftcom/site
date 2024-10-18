# Spring Web Annotations

## Materials
+ @Controller
+ @RestController
+ @RequestMapping
+ @RequestBody
+ @PathVariable
+ @RequestParam
+ @RequestHeader
+ @CookieValue
+ @ResponseBody
+ @ExceptionHandler
+ @ResponseStatus
+ @ModelAttribute
+ @CrossOrigin

Рассмотрим аннотации, которые используются в Spring Web.

## @Controller

Это аннотация уровня класса, которая сообщает Spring Framework, что этот класс служит контроллером в Spring MVC:

```Java
@Controller
@ResponseBody
@ResponseStatus( HttpStatus.OK )
public class BookController {
    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus( HttpStatus.OK )
    List<Book> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }
}
```

## @RestController

@RestController объединяет @Controller и @ResponseBody. Аннотируя класс контроллера аннотацией @RestController, вам больше не нужно добавлять @ResponseBody ко всем методам сопоставления запросов. Аннотация @ResponseBody активна по умолчанию. Поэтому следующие объявления эквивалентны:

```Java
@Controller
@ResponseBody
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseStatus( HttpStatus.OK )
    List<Book> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }
}
```

```Java
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseStatus( HttpStatus.OK )
    List<Book> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }
}
```

## @RequestMapping

Аннотация **marks request handler methods** внутри аннотированных классов @Controller \ @RestController; его можно настроить с помощью:  

- **path**или его псевдонимы, имя и значение: URL-адрес, к которому сопоставлен метод
- **method**: совместимые методы HTTP
- **params**: фильтрует запросы на основе наличия, отсутствия или значения параметров HTTP
- **headers**: фильтрует запросы на основе наличия, отсутствия или значения заголовков HTTP
- **consumes**: какие типы медиа может использовать метод в теле HTTP-запроса
- **produces**: какие типы медиа может создавать метод в теле ответа HTTP Вот краткие примеры:  
    Пример контроллера rest для приложения Spring MVC:  
    

```Java
@Controller
public class BookController {
    @Autowired
    private BookService bookService;
    
    @RequestMapping(value = "/books", method = RequestMethod.GET)
    String getAllBooks(Model model) {
        model.addAttribute("bookList", bookService.getAllBooks());
        return "books";
    }
}
```

Пример контроллера отдыха для применения пружинного отдыха:  

```Java
@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    
    @RequestMapping(value = "/books", method = RequestMethod.GET)
    ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }
}
```

Вы можете предоставить настройки по умолчанию для всех методов обработчика в аннотированном классе @Controller \ @RestController, если вы примените эту аннотацию на уровне класса. Единственным исключением является URL, который Spring не будет переопределять настройками на уровне метода, а добавит две части пути. Например, следующая конфигурация имеет тот же эффект, что и предыдущая:  

```Java
@RestController
@RequestMapping(value = "/books")
public class BookController {
    @Autowired
    private BookService bookService;
    
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id:\\d+}", method = RequestMethod.GET)
    ResponseEntity<List<Book>> getBookById(@PathVariable long id) {
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }
}
```

Вы можете использовать регулярное выражение в свойстве value аннотации @RequestMapping. Например:  

```Java
@RestController
@RequestMapping(value = "/books", produces = {"application/JSON", "application/XML"})
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id:\\d+}", method = RequestMethod.GET)
    ResponseEntity<List<Book>> getBookById(@PathVariable long id) {
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }
}
```

Существуют различные варианты @RequestMapping с уже установленным HTTP-методом GET, POST, PUT, DELETE и PATCH соответственно: **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping**, и **@PatchMapping**.

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private Convertor<BookDTO, Book> convertor;

    @GetMapping
    ResponseEntity<List<BookDTO>> getAllBooks() {
        List<Book> bookList = bookService.getAllBooks();
        List<BookDTO> bookDTOList = convertor.convertModelListToDtoList(bookList);
        return new ResponseEntity<>(bookDTOList, HttpStatus.OK);
    }

    @GetMapping(value = "/{id:\\d+}")
    ResponseEntity<List<BookDTO>> getBookById(@PathVariable long id) {
        Book book = bookService.getBookById(id);
        BookDTO bookDTO = convertor.convertModelToDto(book);
        return new ResponseEntity<>(bookDTO, HttpStatus.OK);
    }

    @PostMapping()
    ResponseEntity<BookDTO> createBook(@RequestBody BookCreateDTO bookCreateDTO) {
        Book book = convertor.convertDtoToModel(bookCreateDTO);
        Book createdBook = bookService.createBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(createdBook), HttpStatus.CREATE);
    }

    @PutMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> updateBook(@PathVariable long id, @RequestBody BookUpdateDTO bookUpdateDTO) {
        Book book = convertor.convertDtoToModel(bookUpdateDTO);
        Book updatedBook = bookService.updateBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(updatedBook), HttpStatus.OK);
    }

    @PatchMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> patchBook(@PathVariable long id, @RequestBody BookPatchDTO bookPatchDTO) {
        Book book = convertor.convertDtoToModel(bookPatchDTO);
        Book patchedBook = bookService.patchBook(id, book);
        return new ResponseEntity<>(convertor.convertModelToDto(patchedBook), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id:\\d+}")
    ResponseEntity<V> deleteBook(@PathVariable long id) {
        bookService.deleteBok(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

## @RequestBody

Сопоставляет тело HTTP-запроса с объектом:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private Convertor<BookDTO, Book> convertor;
    
    @PostMapping()
    ResponseEntity<BookDTO> createBook(@RequestBody BookCreateDTO bookCreateDTO) {
        Book book = convertor.convertDtoToModel(bookCreateDTO);
        Book createdBook = bookService.createBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(createdBook), HttpStatus.CREATE);
    }

    @PutMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> updateBook(@PathVariable long id, @RequestBody BookUpdateDTO bookUpdateDTO) {
        if (bookUpdateDTO.getId > 0 && bookUpdateDTO.getId != id) {
            throw new BadRequestException("Resource id in path and request body does not match.");
        }
        if (bookUpdateDTO.getId == 0) {
            bookUpdateDTO.setId(id);
        }
        Book book = convertor.convertDtoToModel(bookUpdateDTO);
        Book updatedBook = bookService.updateBook(book);
        return new ResponseEntity<>(convertor.convertModelToDto(updatedBook), HttpStatus.OK);
    }

    @PatchMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> patchBook(@PathVariable long id, @RequestBody BookPatchDTO bookPatchDTO) {
        Book book = convertor.convertDtoToModel(bookPatchDTO);
        Book patchedBook = bookService.patchBook(id, book);
        return new ResponseEntity<>(convertor.convertModelToDto(patchedBook), HttpStatus.OK);
    }
}
```

## @PathVariable

Эта аннотация указывает, что **a method argument is bound to a URI template variable**. Вы можете указать шаблон URI с помощью аннотации @RequestMapping и привязать аргумент метода к одной из частей шаблона с помощью @PathVariable. Аннотация извлекает значения из пути URI. Вы можете добиться этого с помощью имени или его псевдонима, аргумента значения. Если имя части в шаблоне совпадает с именем аргумента метода, вам не нужно указывать его в аннотации:  

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping(value = "/{id:\\d+}")
    ResponseEntity<List<BookDTO>> getBookById(@PathVariable long id) {
        //....
    }
}
```

Если имя детали в шаблоне не совпадает с именем аргумента метода, необходимо указать это в аннотации:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....
    
    @GetMapping(value = "/{title}")
    ResponseEntity<BookDTO> getBookByTitle(@PathVariable("title") String bookTitle) {
        //....
    }
}
```

Более того, вы можете пометить переменную пути как необязательную, установив аргумент required в false, значение по умолчанию для свойства required — true:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @PutMapping(value = "/{id:\\d+}")
    ResponseEntity<BookDTO> updateBook(@PathVariable(required = false) long id, @RequestBody BookUpdateDTO bookUpdateDTO) {
        //....
    }
}
```

## @RequestParam

Он используется для доступа к параметрам HTTP-запроса. @RequestParams извлекает значения из строки запроса. Пример rest uri с параметрами: http://localhost:8080/bookshop/books?author=Conan Doyle&limit=10, где строки запроса — author=Conan Doyle и limit=10. В @RequestParam вы можете указать внедренное значение, когда Spring не находит никакого значения или оно пустое в запросе. Для этого вам нужно задать аргумент defaultValue.

Предоставление значения по умолчанию неявно устанавливает required в false:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping()
    ResponseEntity<BookDTO> getBooksByAuthor(
            @RequestParam("author") String authorName, 
            @RequestParam(defaultValue = "5", required = false) int limit) {
        //....
    }
}
```

Помимо параметров запроса, есть и другие части HTTP-запроса, к которым вы можете получить доступ: файлы cookie и заголовки. Вы можете получить к ним доступ с помощью аннотаций. **@CookieValue** и **@RequestHeader** соответственно. Вы можете настроить их так же, как @RequestParam.

## @RequestHeader

Эта аннотация сопоставляет все или определенное значение заголовка с аргументом метода контроллера. Тип аннотации @RequestHeader — параметр. Таким образом, вы можете добавить ее непосредственно к аргументу метода контроллера. В следующем примере вы читаете все заголовки HTTP в HashMap. Вы используете аннотацию @RequestHeader для сопоставления всех заголовков HTTP с экземпляром Java Map.

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping()
    ResponseEntity<List<BookDTO>> getAllBooks(
            @RequestHeader Map<String, String> headers, 
            @RequestParam(defaultValue = "5", required = false) int limit) {
        //....
    }
}
```

Пример чтения определенного заголовка в Spring REST Controller:

```Java
@RestController
@RequestMapping(value = "/books", consumes = {"application/JSON"}, produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping()
    ResponseEntity<List<BookDTO>> getAllBooks(
            @RequestHeader(value = "content-type", required = false) String contentType, 
            @RequestParam(defaultValue = "5", required = false) int limit) {
        //....
    }
}
```

## @CookieValue

Эта аннотация используется для получения значения любого HTTP cookie без итерации по всем cookie, извлеченным из запроса. Эта аннотация может использоваться для сопоставления значения cookie с параметром метода контроллера.

```Java
@RestController
@RequestMapping(value = "/info")
public class InfoController {
    //....

    @GetMapping()
    public String getSessionInfo(@CookieValue("JSESSIONID") String jsessionid, Model model) {
        model.addAttribute("info", "JSESSIONID: " + jsessionid );
        return "sessionInfo";
    }
}
```

## @ResponseBody

Аннотация используется с аннотацией @Controller. Spring рассматривает результат метода как сам ответ:

```Java
@Controller
@RequestMapping(value = "/books", produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping
    @ResponseBody
    ResponseEntity<List<BookDTO>> getAllBooks(
            @RequestParam(defaultValue = "10", required = false) int limit, 
            @RequestParam(defaultValue = "5", required = false) int offset) {
        //....
    }
}
```

## @ExceptionHandler

используется для объявления **a custom error handler method**. Spring вызывает этот метод, когда метод обработчика запросов выдает любое из указанных исключений. Пойманное исключение может быть передано методу в качестве аргумента:

```Java
@Controller
@RequestMapping(value = "/books", produces = {"application/JSON", "application/XML"})
public class BookController {
    //....

    @GetMapping(value = "/{id}")
    ResponseEntity<BookDTO> getBookById(@PathVariable long id) {
        //....
    }

    @ExceptionHandler(NoSuchResourceFoundException.class)
    public ResponseEntity<String> handleNoSuchResourceFoundException(
            NoSuchResourceFoundException exc
    ) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exc.getMessage());
    }
}
```

Метод обработчика исключений принимает исключение или список исключений в качестве аргумента, который вы хотите обработать в определенном методе. Вы аннотируете метод с помощью **@ExceptionHandler** чтобы определить исключение, которое вы хотите обработать.

## @ResponseStatus

Это используется для указания желаемого HTTP-статуса ответа, если вы аннотируете метод обработчика запросов этой аннотацией. Вы можете объявить код статуса с помощью аргумента code или его псевдонима, аргумента value. Кроме того, вы можете указать причину, используя аргумент reason. Вы также можете использовать его вместе с @ExceptionHandler:

```Java
@RestController
@RequestMapping(value = "/books", produces = {"application/JSON", "application/XML"})
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    BookDTO getBookById(@PathVariable long id) {
        if (bookService.getBookById(id) == null) {
            throw new NoSuchResourceFoundException();
        }
    }

    @ExceptionHandler(NoSuchResourceFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchResourceFoundException(NoSuchResourceFoundException exc) {
        return exc.getMessage();
    }
}

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
}
```

## @ModelAttribute

Это используется в приложении Spring MVC. Вы можете получить доступ к элементам, которые уже находятся в модели MVC **@Controller**, предоставив ключ модели:

```Java
@Controller
@RequestMapping(value = "/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(method = RequestMethod.POST)
    String submitNewBook(@ModelAttribute("book") Book book) {
        bookService.createNewBook(book);
        return "newBookView";
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ModelAttribute("book")
    Book getBookById(@PathVariable long id) {
        return bookService.getBookById(id);
    }
}
```

В приведенном выше фрагменте кода вы заполняете атрибут модели книги данными из формы, отправленной в конечную точку создания новой книги. Spring MVC делает это за кулисами перед вызовом метода submitNewBook. Если вы аннотируете метод с помощью @ModelAttribute, Spring автоматически добавит возвращаемое значение метода в модель.

## @CrossOrigin

Обеспечивает междоменную связь для методов обработчика аннотированных запросов:

```Java
@CrossOrigin
@RestController
@RequestMapping(value = "/books")
public class BookController {
    //....

    @GetMapping(value = "/{id}")
    ResponseEntity<BookDTO> getBookById(@PathVariable long id) {
        //....
    }
}
```

Аннотация @CrossOrigin использует значения по умолчанию:  

- Разрешены все источники.
- Разрешены методы HTTP, указанные в аннотации @RequestMapping (в данном примере — GET).
- Время кэширования предполетного ответа (maxAge) составляет 30 минут.