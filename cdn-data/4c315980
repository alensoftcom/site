# Lettuce - продвинутый клиент Java Redis  

[Центр Maven](https://mvnrepository.com/artifact/io.lettuce/lettuce-core)

Lettuce — это масштабируемый потокобезопасный клиент Redis для синхронного, асинхронного и реактивного использования. Несколько потоков могут совместно использовать одно соединение, если они избегают блокировок и транзакционных операций, таких как 'BLPOP' и 'MULTI'/'EXEC'. Салат-латук создан с помощью [netty](https://github.com/netty/netty). Поддерживает расширенные функции Redis, такие как модели данных Sentinel, Cluster, Pipelining, Auto-Reconnect и Redis.

Эта версия Lettuce была протестирована с последней сборкой исходного кода Redis.

- [синхронное](https://github.com/lettuce-io/lettuce-core/wiki/Basic-usage), [асинхронное](https://github.com/lettuce-io/lettuce-core/wiki/Asynchronous-API-%284.0%29) и [реактивное](https://github.com/lettuce-io/lettuce-core/wiki/Reactive-API-%285.0%29) использование
- [Redis Sentinel](https://github.com/lettuce-io/lettuce-core/wiki/Redis-Sentinel)
- [Кластер Редис](https://github.com/lettuce-io/lettuce-core/wiki/Redis-Cluster)
- Соединения [SSL](https://github.com/lettuce-io/lettuce-core/wiki/SSL-Connections) и [Unix Domain Socket](https://github.com/lettuce-io/lettuce-core/wiki/Unix-Domain-Sockets)
- [API потоковой передачи](https://github.com/lettuce-io/lettuce-core/wiki/Streaming-API)
- Интеграция [CDI](https://github.com/lettuce-io/lettuce-core/wiki/CDI-Support) и [Spring](https://github.com/lettuce-io/lettuce-core/wiki/Spring-Support)
- [Codecs](https://github.com/lettuce-io/lettuce-core/wiki/Codecs) (для представления ваших данных в UTF8/bit/JSON и т.д.)
- несколько [Командных интерфейсов](https://github.com/lettuce-io/lettuce-core/wiki/Command-Interfaces-%284.0%29)
- Поддержка [Native Transports](https://github.com/lettuce-io/lettuce-core/wiki/Native-Transports)
- Совместимость с Java 8++ (неявный автоматический модуль без дескрипторов)

Смотрите [справочная документация](https://lettuce.io/docs/) и [Wiki](https://github.com/lettuce-io/lettuce-core/wiki) для получения более подробной информации.

## Как мне использовать редис?

[Учитесь бесплатно в Университете Редис](https://university.redis.com/)

[Создавайте быстрее с помощью Redis Launchpad](https://launchpad.redis.com/)

[Попробуйте облако Redis](https://redis.com/try-free/)

[Погружение в обучающие материалы для разработчиков](https://developer.redis.com/)

[Присоединяйтесь к сообществу Redis](https://redis.com/community/)

[Работа в Redis](https://redis.com/company/careers/jobs/)

## Коммуникация

- [GitHub Discussions](https://github.com/lettuce-io/lettuce-core/discussions) (Q&A, Идеи, Общее обсуждение)
- Переполнение стека (Вопросы): [https://stackoverflow.com/questions/tagged/lettuce](https://stackoverflow.com/questions/tagged/lettuce)
- Дискорд: [![ Discord](https://img.shields.io/discord/697882427875393627.svg?style=social&logo=discord)](https://discord.gg/redis)
- Твиттер: [![ Твиттер](https://img.shields.io/twitter/follow/redisinc?style=social)](https://twitter.com/redisinc)
- [GitHub Issues](https://github.com/lettuce-io/lettuce-core/issues) (Отчеты об ошибках, запросы функций)

## Документация

- [Справочная документация](https://lettuce.io/docs/)
- [Вики](https://github.com/lettuce-io/lettuce-core/wiki)
- [Javadoc](https://lettuce.io/core/release/api/)

## Двоичные файлы/Скачать

Двоичные файлы и информацию о зависимостях для Maven, Ivy, Gradle и других можно найти на http://search.maven.org.

Релизы салата доступны в репозитории Maven Central. Взгляните также на раздел [Релизы](https://github.com/lettuce-io/lettuce-core/releases).

Пример для Maven:

```xml
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>x.y.z</version>
</dependency>
```

Если вы предпочитаете получать последние снимки предстоящей основной версии, используйте наш репозиторий снимков Maven и объявите соответствующую версию зависимостей.

```xml
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>x.y.z.BUILD-SNAPSHOT</version>
</dependency>

<repositories>
  <repository>
    <id>sonatype-snapshots</id>
    <name>Sonatype Snapshot Repository</name>
    <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
    <snapshots>
      <enabled>true</enabled>
    </snapshots>
  </repository>
</repositories>
```

## Базовое использование

```java
RedisClient client = RedisClient.create("redis://localhost");
StatefulRedisConnection<String, String> connection = client.connect();
RedisStringCommands sync = connection.sync();
String value = sync.get("key");
```

Каждая команда Redis реализуется одним или несколькими методами с именами, идентичными имени команды Redis в нижнем регистре. Сложные команды с несколькими модификаторами, которые изменяют тип результата, включают модификатор CamelCased как часть имени команды, например, zrangebyscore и zrangebyscoreWithScores.

Для получения более подробной информации см. [Базовое использование](https://github.com/lettuce-io/lettuce-core/wiki/Basic-usage).

## Асинхронный API

```java
StatefulRedisConnection<String, String> connection = client.connect();
RedisStringAsyncCommands<String, String> async = connection.async();
RedisFuture<String> set = async.set("key", "value")
RedisFuture<String> get = async.get("key")

LettuceFutures.awaitAll(set, get) == true

set.get() == "OK"
get.get() == "value"
```

Дополнительные сведения см. в разделе [Асинхронный API](https://github.com/lettuce-io/lettuce-core/wiki/Asynchronous-API-%284.0%29).

## Реактивный API

```java
StatefulRedisConnection<String, String> connection = client.connect();
RedisStringReactiveCommands<String, String> reactive = connection.reactive();
Mono<String> set = reactive.set("key", "value");
Mono<String> get = reactive.get("key");

set.subscribe();

get.block() == "value"
```

Дополнительные сведения см. в разделе [Reactive API](https://github.com/lettuce-io/lettuce-core/wiki/Reactive-API-%285.0%29).

## Pub/Sub

```java
RedisPubSubCommands<String, String> connection = client.connectPubSub().sync();
connection.getStatefulConnection().addListener(new RedisPubSubListener<String, String>() { ... })
connection.subscribe("channel")
```

## Building

Lettuce собирается с помощью Apache Maven. Для тестов требуется несколько запущенных экземпляров Redis для разных тестовых случаев, которые настраиваются с помощью 'Makefile'. Тесты запускаются по умолчанию против Redis 'unstable'.

Чтобы построить:

```shell
$ git clone https://github.com/lettuce-io/lettuce-core.git
$ cd lettuce/
$ make prepare ssl-keys
$ make test
```

- Initial environment setup (clone and build `redis`): `make prepare`
- Setup SSL Keys: `make ssl-keys`
- Run the build: `make test`
- Start Redis (manually): `make start`
- Stop Redis (manually): `make stop`

## Ошибки и отзывы

Для поиска ошибок, вопросов и обсуждений, пожалуйста, используйте [GitHub Issues](https://github.com/lettuce-io/lettuce-core/issues).

## Лицензия

- Этот репозиторий лицензирован под лицензией "MIT". Смотрите [ЛИЦЕНЗИЯ](http://localhost:24100/LICENSE).
- Форк https://github.com/wg/lettuce

## Вклад

![[Lettuce.jpeg]]

Github предназначен для социального кодирования: если вы хотите писать код, я приветствую участие через запросы на вытягивание из форков этого репозитория. Создавайте тикеты Github для сообщений об ошибках и новых функциях, комментируйте те, которые вас интересуют, и ознакомьтесь с [CONTRIBUTING.md](https://github.com/lettuce-io/lettuce-core/blob/main/.github/CONTRIBUTING.md)