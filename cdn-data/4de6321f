
# # Spring and Redis

Одним из хранилищ пар "ключ-значение", поддерживаемых Spring Data, является [Redis](https://redis.io/). Процитируем домашнюю страницу проекта Redis:

> Redis — это расширенное хранилище пар «ключ-значение». Он похож на memcached, но набор данных не является изменяемым, и значения могут быть строками, точно такими же, как в memcached, а также списками, наборами и упорядоченными наборами. Всеми этими типами данных можно манипулировать с помощью атомарных операций для отправки/извлечения элементов, добавления/удаления элементов, выполнения объединения на стороне сервера, пересечения, разницы между наборами и так далее. Redis поддерживает различные виды возможностей сортировки.

Spring Data Redis обеспечивает простую настройку и доступ к Redis из приложений Spring. Он предлагает как низкоуровневые, так и высокоуровневые абстракции для взаимодействия с магазином, освобождая пользователя от инфраструктурных проблем.

Поддержка Spring Data для Redis содержит широкий спектр возможностей:

- [Вспомогательный класс ''RedisTemplate' и 'ReactiveRedisTemplate'](https://docs.spring.io/spring-data/redis/reference/redis/template.html), который повышает производительность при выполнении общих операций Redis. Включает интегрированную сериализацию между объектами и значениями.
    
- Трансляция исключений в переносимую иерархию исключений доступа к данным Spring.
    
- Автоматическая реализация [Интерфейсы репозитория](https://docs.spring.io/spring-data/redis/reference/repositories.html), включая поддержку пользовательских методов запроса.
    
- Многофункциональный [Object Mapping](https://docs.spring.io/spring-data/redis/reference/redis/redis-repositories/mapping.html) интегрирован с Spring Conversion Service.
    
- Метаданные сопоставления на основе аннотаций, которые можно расширить для поддержки других форматов метаданных.
    
- [Транзакции](https://docs.spring.io/spring-data/redis/reference/redis/transactions.html) и [Конвейерная обработка](https://docs.spring.io/spring-data/redis/reference/redis/pipelining.html).
    
- [Redis Cache](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html) интеграция через абстракцию Spring Cache.
    
- [Redis Pub/Sub Messaging](https://docs.spring.io/spring-data/redis/reference/redis/pubsub.html) и [Redis Stream](https://docs.spring.io/spring-data/redis/reference/redis/redis-streams.html) Слушатели.
    
- [Реализации коллекции Redis](https://docs.spring.io/spring-data/redis/reference/redis/support-classes.html) для Java, такие как 'RedisList' или 'RedisSet'.
    

## [](https://docs.spring.io/spring-data/redis/reference/redis.html#_why_spring_data_redis)Почему Spring Data Redis?

Spring Framework — это ведущая полнофункциональная среда для приложений Java/JEE. Он предоставляет облегченный контейнер и неинвазивную модель программирования, обеспечиваемую использованием внедрения зависимостей, АОП и абстракций переносимых сервисов.

[NoSQL](https://en.wikipedia.org/wiki/NoSQL) системы хранения данных представляют собой альтернативу классическим реляционным СУБД для горизонтальной масштабируемости и скорости. С точки зрения реализации, хранилища пар «ключ-значение» представляют собой один из крупнейших (и старейших) членов в пространстве NoSQL.

Среда Spring Data Redis (SDR) упрощает написание приложений Spring, использующих хранилище ключ-значение Redis, устраняя избыточные задачи и шаблонный код, необходимые для взаимодействия с хранилищем, благодаря превосходной поддержке инфраструктуры Spring.

## [](https://docs.spring.io/spring-data/redis/reference/redis.html#redis:architecture)Redis Support High-level View

Поддержка Redis предоставляет несколько компонентов. Для большинства задач лучшим выбором являются высокоуровневые абстракции и службы поддержки. Обратите внимание, что в любой момент вы можете перемещаться между слоями. Например, вы можете получить низкоуровневое соединение (или даже нативную библиотеку) для прямого взаимодействия с Redis.

## Резюме раздела

- [Начало работы](https://docs.spring.io/spring-data/redis/reference/redis/getting-started.html)
- [Водители](https://docs.spring.io/spring-data/redis/reference/redis/drivers.html)
- [Режимы подключения](https://docs.spring.io/spring-data/redis/reference/redis/connection-modes.html)
- [RedisTemplate](https://docs.spring.io/spring-data/redis/reference/redis/template.html)
- [Кэш Redis](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html)
- [Кластер Редис](https://docs.spring.io/spring-data/redis/reference/redis/cluster.html)
- [Хэш-маппинг](https://docs.spring.io/spring-data/redis/reference/redis/hash-mappers.html)
- [Обмен сообщениями](https://docs.spring.io/spring-data/redis/reference/redis/pubsub.html)
- [Редис Стримы](https://docs.spring.io/spring-data/redis/reference/redis/redis-streams.html)
- [Сценарий](https://docs.spring.io/spring-data/redis/reference/redis/scripting.html)
- [Транзакции Redis](https://docs.spring.io/spring-data/redis/reference/redis/transactions.html)
- [Конвейеризация](https://docs.spring.io/spring-data/redis/reference/redis/pipelining.html)
- [Классы поддержки](https://docs.spring.io/spring-data/redis/reference/redis/support-classes.html)


![Caching](media/350-04.png)



## Начало работы

Вот краткий тизер приложения, использующего Spring Data Redis на Java:

```typescript
public class Example {

    // inject the actual template
    @Autowired
    private RedisTemplate<String, String> template;

    // inject the template as ListOperations
    // can also inject as Value, Set, ZSet, and HashOperations
    @Resource(name="redisTemplate")
    private ListOperations<String, String> listOps;

    public void addLink(String userId, URL url) {
        listOps.leftPush(userId, url.toExternalForm());
        // or use template directly
        redisTemplate.boundListOps(userId).leftPush(url.toExternalForm());
    }
}

@Configuration
class ApplicationConfig {

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory();
  }
}
```

## Настройка Maven

Добавьте зависимость Maven:

```php-template
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-redis</artifactId>
  <version>${version}</version>
</dependency>
```

Если вы предпочитаете получать последние снимки предстоящей основной версии, используйте наш репозиторий снимков Maven и объявите соответствующую версию зависимостей.

```php-template
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-redis</artifactId>
  <version>${version}-SNAPSHOT</version>
</dependency>

<repository>
  <id>spring-snapshot</id>
  <name>Spring Snapshot Repository</name>
  <url>https://repo.spring.io/snapshot</url>
</repository>
```

## Получение помощи

Возникли проблемы с Spring Data? Мы будем рады помочь!

- Проверьте [справочную документацию](https://docs.spring.io/spring-data/redis/reference/) и [Javadocs](https://docs.spring.io/spring-data/redis/docs/current/api/).
- Изучите основы Spring – Spring Data построен на основе Spring Framework, посетите веб-сайт [spring.io](https://spring.io/) для получения обширной справочной документации. Если вы только начинаете знакомиться с Spring, попробуйте одно из [руководств](https://spring.io/guides).
- Если вы обновляетесь, ознакомьтесь с [Примечаниями к выпуску](https://github.com/spring-projects/spring-data-commons/wiki#release-notes) для «новых и заслуживающих внимания» функций.
- Задать вопрос - мы отслеживаем [stackoverflow.com](https://stackoverflow.com/) на предмет вопросов, помеченных тегом ['spring-data-redis'](https://stackoverflow.com/tags/spring-data). Вы также можете общаться с сообществом в чате на [Gitter](https://gitter.im/spring-projects/spring-data).
- Сообщайте об ошибках с помощью Spring Data Redis по адресу [github.com/spring-projects/spring-data-redis](https://github.com/spring-projects/spring-data-redis/issues/new).

## Сообщение о проблемах

Spring Data использует Github в качестве системы отслеживания проблем для записи ошибок и запросов функций. Если вы хотите задать вопрос, следуйте приведенным ниже рекомендациям:

- Прежде чем сообщать об ошибке, выполните поиск в [системе отслеживания проблем](https://github.com/spring-projects/spring-data-redis/issues), чтобы узнать, не сообщал ли кто-нибудь уже о проблеме.
- Если проблема еще не существует, [создать новую проблему](https://github.com/spring-projects/spring-data-redis/issues/new).
- Пожалуйста, предоставьте как можно больше информации в отчете о проблеме, мы хотели бы знать версию Spring Data, которую вы используете, версию JVM, Stacktrace и т.д.
- Если вам нужно вставить код или включить трассировку стека, используйте [код Markdown](https://guides.github.com/features/mastering-markdown/) заборы +++''+++.
- Если возможно, попробуйте создать тест-кейс или проект, который воспроизводит проблему. Прикрепите ссылку к вашему коду или сжатый файл, содержащий ваш код.

## Сборка из исходников

Вам не нужно собирать данные из исходников, чтобы использовать Spring Data (двоичные файлы в [repo.spring.io](https://repo.spring.io/)), но если вы хотите попробовать последние и лучшие версии, Spring Data можно легко собрать с помощью [maven wrapper](https://github.com/takari/maven-wrapper). Вам также нужен JDK 17 или выше и 'make'. Локальная среда сборки управляется в «Makefile» для загрузки, сборки и развертывания Redis в различных конфигурациях (Standalone, Sentinel, Cluster и т. д.)

```shell
 $ make test
```

Предыдущая команда запускает полную сборку. Вы можете использовать команды «make start», «make stop» и «make clean» для самостоятельного управления окружающей средой. Это полезно, если вы хотите избежать постоянных перезапусков сервера. После запуска всех экземпляров Redis вы можете выполнить тесты либо в своей IDE, либо в полной сборке Maven:

```shell
 $ ./mvnw clean install
```

Если вы хотите собрать сборку с помощью обычной команды 'mvn', вам понадобится [Maven v3.8.0 or above](https://maven.apache.org/run-maven/index.html).

_Also перейдите по ссылке CONTRIBUTING.adoc, если вы хотите отправлять запросы на вытягивание, и, в частности, пожалуйста, подпишите [Соглашение автора](https://cla.pivotal.io/sign/spring) перед вашим первым нетривиальным change._

## Справочная документация по зданию

Сборка документации также приводит к сборке проекта без проведения тестов.

```shell
 $ ./mvnw clean install -Pantora
```

Сгенерированная документация доступна по адресу `target/antora/site/index.html`.

## Guides

Сайт [spring.io](https://spring.io/) содержит несколько руководств, которые показывают, как использовать Spring Data шаг за шагом:

- [Обмен сообщениями с Redis](https://spring.io/guides/gs/messaging-redis/): узнайте, как использовать Redis в качестве брокера сообщений.
- [Реактивный доступ к данным с помощью Redis](https://spring.io/guides/gs/spring-data-reactive-redis/): узнайте, как реактивно взаимодействовать с Redis и Spring Data.

## Examples

- [Spring Data Examples](https://github.com/spring-projects/spring-data-examples/) содержит примеры проектов, в которых более подробно объясняются конкретные функции.

## Лицензия

Spring Data Redis — программное обеспечение с открытым исходным кодом, выпущенное под управлением [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.html).
