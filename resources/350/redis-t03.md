
# # Spring and Redis

One of the key-value stores supported by Spring Data is [Redis](https://redis.io/). To quote the Redis project home page:

> Redis is an advanced key-value store. It is similar to memcached but the dataset is not volatile, and values can be strings, exactly like in memcached, but also lists, sets, and ordered sets. All this data types can be manipulated with atomic operations to push/pop elements, add/remove elements, perform server side union, intersection, difference between sets, and so forth. Redis supports different kind of sorting abilities.

Spring Data Redis provides easy configuration and access to Redis from Spring applications. It offers both low-level and high-level abstractions for interacting with the store, freeing the user from infrastructural concerns.

Spring Data support for Redis contains a wide range of features:

- [`RedisTemplate` and `ReactiveRedisTemplate` helper class](https://docs.spring.io/spring-data/redis/reference/redis/template.html) that increases productivity when performing common Redis operations. Includes integrated serialization between objects and values.
    
- Exception translation into Spring’s portable Data Access Exception hierarchy.
    
- Automatic implementation of [Repository interfaces](https://docs.spring.io/spring-data/redis/reference/repositories.html), including support for custom query methods.
    
- Feature-rich [Object Mapping](https://docs.spring.io/spring-data/redis/reference/redis/redis-repositories/mapping.html) integrated with Spring’s Conversion Service.
    
- Annotation-based mapping metadata that is extensible to support other metadata formats.
    
- [Transactions](https://docs.spring.io/spring-data/redis/reference/redis/transactions.html) and [Pipelining](https://docs.spring.io/spring-data/redis/reference/redis/pipelining.html).
    
- [Redis Cache](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html) integration through Spring’s Cache abstraction.
    
- [Redis Pub/Sub Messaging](https://docs.spring.io/spring-data/redis/reference/redis/pubsub.html) and [Redis Stream](https://docs.spring.io/spring-data/redis/reference/redis/redis-streams.html) Listeners.
    
- [Redis Collection Implementations](https://docs.spring.io/spring-data/redis/reference/redis/support-classes.html) for Java such as `RedisList` or `RedisSet`.
    

## [](https://docs.spring.io/spring-data/redis/reference/redis.html#_why_spring_data_redis)Why Spring Data Redis?

The Spring Framework is the leading full-stack Java/JEE application framework. It provides a lightweight container and a non-invasive programming model enabled by the use of dependency injection, AOP, and portable service abstractions.

[NoSQL](https://en.wikipedia.org/wiki/NoSQL) storage systems provide an alternative to classical RDBMS for horizontal scalability and speed. In terms of implementation, key-value stores represent one of the largest (and oldest) members in the NoSQL space.

The Spring Data Redis (SDR) framework makes it easy to write Spring applications that use the Redis key-value store by eliminating the redundant tasks and boilerplate code required for interacting with the store through Spring’s excellent infrastructure support.

## [](https://docs.spring.io/spring-data/redis/reference/redis.html#redis:architecture)Redis Support High-level View

The Redis support provides several components.For most tasks, the high-level abstractions and support services are the best choice.Note that, at any point, you can move between layers.For example, you can get a low-level connection (or even the native library) to communicate directly with Redis.

## Section Summary

- [Getting Started](https://docs.spring.io/spring-data/redis/reference/redis/getting-started.html)
- [Drivers](https://docs.spring.io/spring-data/redis/reference/redis/drivers.html)
- [Connection Modes](https://docs.spring.io/spring-data/redis/reference/redis/connection-modes.html)
- [RedisTemplate](https://docs.spring.io/spring-data/redis/reference/redis/template.html)
- [Redis Cache](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html)
- [Redis Cluster](https://docs.spring.io/spring-data/redis/reference/redis/cluster.html)
- [Hash Mapping](https://docs.spring.io/spring-data/redis/reference/redis/hash-mappers.html)
- [Pub/Sub Messaging](https://docs.spring.io/spring-data/redis/reference/redis/pubsub.html)
- [Redis Streams](https://docs.spring.io/spring-data/redis/reference/redis/redis-streams.html)
- [Scripting](https://docs.spring.io/spring-data/redis/reference/redis/scripting.html)
- [Redis Transactions](https://docs.spring.io/spring-data/redis/reference/redis/transactions.html)
- [Pipelining](https://docs.spring.io/spring-data/redis/reference/redis/pipelining.html)
- [Support Classes](https://docs.spring.io/spring-data/redis/reference/redis/support-classes.html)


![Caching](media/350-04.png)



## Getting Started

Here is a quick teaser of an application using Spring Data Redis in Java:

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

## Maven configuration

Add the Maven dependency:

```php-template
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-redis</artifactId>
  <version>${version}</version>
</dependency>
```

If you'd rather like the latest snapshots of the upcoming major version, use our Maven snapshot repository and declare the appropriate dependency version.

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

## Getting Help

Having trouble with Spring Data? We’d love to help!

- Check the [reference documentation](https://docs.spring.io/spring-data/redis/reference/), and [Javadocs](https://docs.spring.io/spring-data/redis/docs/current/api/).
- Learn the Spring basics – Spring Data builds on Spring Framework, check the [spring.io](https://spring.io/) web-site for a wealth of reference documentation. If you are just starting out with Spring, try one of the [guides](https://spring.io/guides).
- If you are upgrading, check out the [Release notes](https://github.com/spring-projects/spring-data-commons/wiki#release-notes) for "`new and noteworthy`" features.
- Ask a question - we monitor [stackoverflow.com](https://stackoverflow.com/) for questions tagged with [`spring-data-redis`](https://stackoverflow.com/tags/spring-data). You can also chat with the community on [Gitter](https://gitter.im/spring-projects/spring-data).
- Report bugs with Spring Data Redis at [github.com/spring-projects/spring-data-redis](https://github.com/spring-projects/spring-data-redis/issues/new).

## Reporting Issues

Spring Data uses Github as issue tracking system to record bugs and feature requests. If you want to raise an issue, please follow the recommendations below:

- Before you log a bug, please search the [issue tracker](https://github.com/spring-projects/spring-data-redis/issues) to see if someone has already reported the problem.
- If the issue does not already exist, [create a new issue](https://github.com/spring-projects/spring-data-redis/issues/new).
- Please provide as much information as possible with the issue report, we like to know the version of Spring Data that you are using, the JVM version, Stacktrace, etc.
- If you need to paste code, or include a stack trace use [Markdown code](https://guides.github.com/features/mastering-markdown/) fences +++```+++.
- If possible try to create a test-case or project that replicates the issue. Attach a link to your code or a compressed file containing your code.

## Building from Source

You don’t need to build from source to use Spring Data (binaries in [repo.spring.io](https://repo.spring.io/)), but if you want to try out the latest and greatest, Spring Data can be easily built with the [maven wrapper](https://github.com/takari/maven-wrapper). You also need JDK 17 or above and `make`. The local build environment is managed within a `Makefile` to download, build and spin up Redis in various configurations (Standalone, Sentinel, Cluster, etc.)

```shell
 $ make test
```

The preceding command runs a full build. You can use `make start`, `make stop`, and `make clean` commands to control the environment yourself. This is useful if you want to avoid constant server restarts. Once all Redis instances have been started, you can either run tests in your IDE or the full Maven build:

```shell
 $ ./mvnw clean install
```

If you want to build with the regular `mvn` command, you will need [Maven v3.8.0 or above](https://maven.apache.org/run-maven/index.html).

_Also see link CONTRIBUTING.adoc if you wish to submit pull requests, and in particular please sign the [Contributor’s Agreement](https://cla.pivotal.io/sign/spring) before your first non-trivial change._

## Building reference documentation

Building the documentation builds also the project without running tests.

```shell
 $ ./mvnw clean install -Pantora
```

The generated documentation is available from `target/antora/site/index.html`.

## Guides

The [spring.io](https://spring.io/) site contains several guides that show how to use Spring Data step-by-step:

- [Messaging with Redis](https://spring.io/guides/gs/messaging-redis/): Learn how to use Redis as a message broker.
- [Accessing Data Reactively with Redis](https://spring.io/guides/gs/spring-data-reactive-redis/): Learn how to reactively interface with Redis and Spring Data.

## Examples

- [Spring Data Examples](https://github.com/spring-projects/spring-data-examples/) contains example projects that explain specific features in more detail.

## License

Spring Data Redis is Open Source software released under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.html).
