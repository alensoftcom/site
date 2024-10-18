# Spring MVC

## Materials

- Обзор
- Понимание Spring Web Model-View-Controller
- Понимание потока Spring Web MVC
- Пример проекта Spring MVC

## Overview

А **Spring MVC** это фреймворк Java, который используется для создания веб-приложений. Он следует **Model-View-Controller design pattern**.  
Он реализует все основные функции ядра Spring Framework, такие как Inversion of Control, Dependency Injection. Spring MVC предоставляет элегантное решение для использования MVC в Spring Framework с помощью DispatcherServlet, который полностью интегрирован с Spring IoC-контейнером. DispatcherServlet — это класс, который получает входящий запрос и сопоставляет его с нужным ресурсом, таким как Controllers, Models и Views.

## Understanding Spring Web Model-View-Controller

![Модель-Представление-Контроллер](http://localhost:24100/media/310-01.png)

- **Model** - Модель содержит данные приложения. Данные могут быть отдельным объектом или набором объектов.
- **Controller** - Контроллер содержит бизнес-логику приложения. Здесь, **@Controller annotation** используется для обозначения класса как контроллера.
- **View** - Вид представляет предоставленную информацию в определенном формате. Как правило, **JSP+JSTL** используется для создания страницы просмотра. Хотя Spring также поддерживает другие технологии просмотра, такие как **Apache Velocity, Thymeleaf and FreeMarker**.  
    
- **Front Controller** - В Spring Web MVC класс DispatcherServlet работает как фронт-контроллер. Он отвечает за управление потоком приложения Spring MVC.

## Understanding the flow of Spring Web MVC

![Жизненный цикл Модель-Представление-Контроллер](http://localhost:24100/media/310-02.png) ![Жизненный цикл Модель-Представление-Контроллер](http://localhost:24100/media/310-03.png)

1. **DispatcherServlet** получает запрос.
2. **DispatcherServlet** отправляет задачу выбора подходящего контроллера **HandlerMapping**.
3. **HandlerMapping** выбирает контроллер, который сопоставлен с URL-адресом входящего запроса, и возвращает (выбранный обработчик) и **Controller to DispatcherServlet**.
4. **DispatcherServlet** отправляет задачу выполнения бизнес-логики **Controller** к **HandlerAdapter**.
5. **HandlerAdapter** вызывает процесс бизнес-логики Контроллера.
6. **Controller** выполняет бизнес-логику, устанавливает результат обработки в **Model** и возвращает логическое имя представления **HandlerAdapter**.
7. **DispatcherServlet** отправляет задачу по разрешению **the View** соответствующий **the View name** к **ViewResolver**.
8. **ViewResolver** возвращается **the View** сопоставлено с **View name**.
9. **DispatcherServlet** отправляет процесс рендеринга на возвращенный **View**.
10. **View** оказывает **Model** данные и возвращает ответ.

## Spring MVC example project

[https://github.com/eugenp/tutorialshttps://github.com/eugenp/tutorials...](https://github.com/eugenp/tutorials/tree/master/spring-web-modules/spring-mvc-basics/src/main/webapp/WEB-INF/view)

[https://www.baeldung.com/spring-mvc-tutorial...](https://www.baeldung.com/spring-mvc-tutorial)

Spring MVC и конфигурация на основе Java  
[https://dzone.com/articles/...](https://dzone.com/articles/spring-mvc-and-java-based-configuration-1)

Spring MVC с использованием конфигурации на основе Java  
[https://www.geeksforgeeks.org/](https://www.geeksforgeeks.org/spring-mvc-using-java-based-configuration/)