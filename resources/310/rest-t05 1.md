## Error Handling for REST with Spring

## Материалы

- Решение 1: @ExceptionHandler уровня контроллера
- Решение 2: HandlerExceptionResolver
- Решение 3: @ControllerAdvice
- Решение 4: ResponseStatusException

Spring предоставляет несколько способов обработки выданных исключений в веб-приложении Spring. Рассмотрим некоторые из них:

## Solution 1: Controller-Level @ExceptionHandler

Первое решение работает на уровне @RestController. Мы определим метод обработки исключений и аннотируем его с помощью **@ExceptionHandler**:

```Java
@RestController
public class BookController 
{
    //REST endpoints of BookController
    //..............................
    
    @ExceptionHandler({ CustomException1.class, CustomException2.class })
    public ResponseEntity<String> handleException(Exception exc) {
        return new ResponseEntity<>(exc.getMessage(), ERROR_STATUS);
    }
}
```

У этого подхода есть существенный недостаток: _**The @ExceptionHandler annotated method is only active for that particular Controller, not globally for the entire application.**_  
Конечно, добавление этого к каждому контроллеру делает его не очень подходящим для общего механизма обработки исключений. Мы можем обойти это ограничение, если все контроллеры будут расширять класс базового контроллера. Однако это решение может быть проблемой для приложений, где по какой-либо причине это невозможно. Например, контроллеры могут уже расширяться из другого базового класса, который может находиться в другом jar-файле или не поддаваться модификации напрямую, или сами по себе не подлежат модификации напрямую.

## Solution 2: HandlerExceptionResolver

Это решение заключается в определении HandlerExceptionResolver. Это разрешит любое исключение, выданное приложением. Это также позволит нам реализовать _**a uniform exception handling mechanism**_ в нашем REST API. Давайте рассмотрим существующие реализации ExceptionResolvers.

- **ExceptionHandlerExceptionResolver** включен по умолчанию в DispatcherServlet.
- **DefaultHandlerExceptionResolver** включен по умолчанию в DispatcherServlet. Он используется для разрешения стандартных исключений Spring с соответствующими им кодами состояния HTTP, а именно кодами состояния Client error 4xx и Server error 5xx. Вот полный список исключений Spring, которые он обрабатывает, и как они сопоставляются с кодами состояния. Хотя он и устанавливает код состояния ответа должным образом, _**one limitation is that it doesn't set anything to the body of the Response**_ . В некоторых случаях для REST API — кода состояния на самом деле недостаточно для предоставления клиенту информации — ответ должен также иметь тело, чтобы приложение могло предоставить дополнительную информацию о сбое.
- **ResponseStatusExceptionResolver** включен по умолчанию в DispatcherServlet. Его основная обязанность — использовать аннотацию @ResponseStatus, доступную для пользовательских исключений, и сопоставлять эти исключения с кодами статуса HTTP. Такое пользовательское исключение может выглядеть так:
    
    ```Java
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class ApplicationResourceNotFoundException extends RuntimeException 
    {
        public ApplicationResourceNotFoundException() {
            super();
        }
        public ApplicationResourceNotFoundException(String message, Throwable cause) {
            super(message, cause);
        }
        public ApplicationResourceNotFoundException(String message) {
            super(message);
        }
        public ApplicationResourceNotFoundException(Throwable cause) {
            super(cause);
        }
    }
    ```
    

## Solution 3: @ControllerAdvice

Весна приносит поддержку глобальному **@ExceptionHandler** с **@ControllerAdvice** аннотация. Это позволяет реализовать механизм, который отходит от старой модели MVC и использует ResponseEntity вместе с безопасностью типов и гибкостью @ExceptionHandler:

```Java
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
  
  @ExceptionHandler(value = {IllegalArgumentException.class, IllegalStateException.class})
  protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
    String bodyOfErrorResponse = "Argument or State of resource hase a illegal value.";
    return handleExceptionInternal(ex, bodyOfErrorResponse,
            new HttpHeaders(), HttpStatus.CONFLICT, request);
  }
}
```

Аннотация @ControllerAdvice позволяет нам _**consolidate our multiple, scattered @ExceptionHandlers from before into a single, global error handling component**_ Фактический механизм чрезвычайно прост, но в то же время очень гибок:

- Это дает нам полный контроль над текстом ответа, а также над кодом статуса.
- Он обеспечивает сопоставление нескольких исключений с одним и тем же методом для совместной обработки.
- Он хорошо использует новый ответ RESTful ResposeEntity. Здесь следует помнить о том, что исключения, объявленные с помощью @ExceptionHandler, должны соответствовать исключению, используемому в качестве аргумента метода. Если они не совпадают, компилятор не будет жаловаться — нет причин, по которым он должен — и Spring тоже не будет жаловаться. Однако, когда исключение действительно выбрасывается во время выполнения, _**the exception resolving mechanism will fail with**_ :
    
    ```Java
    java.lang.IllegalStateException: No suitable resolver for argument [0] [type=...]
    HandlerMethod details: ...
    ```
    

## Solution 4: ResponseStatusException

Spring 5 предоставляет введенные **ResponseStatusException** класс. Мы можем создать его экземпляр, предоставив HttpStatus и, опционально, reason и cause:

```Java
@GetMapping(value = "/{id}")
public Book findById(@PathVariable("id") Long id, HttpServletResponse response) {
    try {
        return RestPreconditions.checkFound(service.findOne(id));
    } catch (CustomResourceNotFoundException exc) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book Not Found", exc);
    }
}
```

Каковы преимущества использования ResponseStatusException?

- Отлично подходит для создания прототипов: мы можем довольно быстро реализовать базовое решение.
- Один тип, несколько кодов статуса: один тип исключения может привести к нескольким разным ответам. Это снижает тесную связь по сравнению с @ExceptionHandler.
- Нам не придется создавать так много пользовательских классов исключений.
- У нас больше контроля над обработкой исключений, поскольку исключения можно создавать программно.

Каковы компромиссы?

- Не существует единого способа обработки исключений: сложнее обеспечить соблюдение некоторых соглашений на уровне приложения, чем в случае с @ControllerAdvice, который обеспечивает глобальный подход.
- Дублирование кода: мы можем столкнуться с необходимостью дублирования кода в нескольких контроллерах.
- Также следует отметить, что в рамках одного приложения можно комбинировать различные подходы.

Вы можете комбинировать различные подходы в одном приложении. Например, вы можете реализовать @ControllerAdvice глобально, а также ResponseStatusExceptions локально. Однако нам нужно быть осторожными: если одно и то же исключение можно обработать несколькими способами, мы можем заметить некоторое неожиданное поведение. Возможным соглашением является обработка одного конкретного вида исключения всегда одним способом.