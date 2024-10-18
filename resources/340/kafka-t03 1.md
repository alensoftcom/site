## Quick Start

#### [Шаг 1: Получите Кафку](https://kafka.apache.org/quickstart#quickstart_download)

[Загрузите](https://www.apache.org/dyn/closer.cgi?path=/kafka/3.8.0/kafka_2.13-3.8.0.tgz)  последнюю версию Kafka и распакуйте ее:

```bash
$ tar -xzf kafka_2.13-3.8.0.tgz
$ cd kafka_2.13-3.8.0
```

#### [](https://kafka.apache.org/quickstart#quickstart_startserver)[Шаг 2: Запустите среду Kafka](https://kafka.apache.org/quickstart#quickstart_startserver)

ПРИМЕЧАНИЕ: В вашей локальной среде должна быть установлена ​​Java 8+.

Apache Kafka можно запустить с помощью KRaft или ZooKeeper. Чтобы начать работу с любой из конфигураций, следуйте одному из разделов ниже, но не обоим.

##### Кафка с KRaft

Kafka можно запустить в режиме KRaft с использованием локальных скриптов и загруженных файлов или образа docker. Следуйте одному из разделов ниже, но не обоим, чтобы запустить сервер kafka.

##### Использование загруженных файлов

Сгенерировать UUID кластера

```bash
$ KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
```

Форматирование каталогов журналов

```bash
$ bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties
```

Запустите сервер Kafka

```bash
$ bin/kafka-server-start.sh config/kraft/server.properties
```

##### Кафка с ZooKeeper

Выполните следующие команды, чтобы запустить все службы в правильном порядке:

```bash
# Start the ZooKeeper service
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

Откройте еще один сеанс терминала и выполните:

```bash
# Start the Kafka broker service
$ bin/kafka-server-start.sh config/server.properties
```

После успешного запуска всех служб у вас будет запущенная и готовая к использованию базовая среда Kafka.

##### Использование образа Apache Kafka Docker на основе JVM

Получите образ Docker:

```bash
$ docker pull apache/kafka:3.8.0
```

Запустите контейнер Kafka Docker:

```bash
$ docker run -p 9092:9092 apache/kafka:3.8.0
```

##### Использование собственного образа Apache Kafka Docker на основе GraalVM

Получите образ Docker:

```bash
$ docker pull apache/kafka-native:3.8.0
```

Запустите контейнер Kafka Docker:

```bash
$ docker run -p 9092:9092 apache/kafka-native:3.8.0
```

После успешного запуска сервера Kafka у вас будет запущена и готова к использованию базовая среда Kafka.

#### [](https://kafka.apache.org/quickstart#quickstart_createtopic)[Шаг 3: Создайте тему для хранения ваших событий.](https://kafka.apache.org/quickstart#quickstart_createtopic)

Kafka — это распределенная  _платформа потоковой передачи событий_  , которая позволяет читать, записывать, хранить и обрабатывать  [_события_](https://kafka.apache.org/documentation/#messages)  (   в документации также называемые _записями_  или  _сообщениями ) на многих машинах._

Примерами событий являются платежные транзакции, обновления геолокации с мобильных телефонов, заказы на доставку, измерения датчиков с устройств IoT или медицинского оборудования и многое другое. Эти события организованы и хранятся в  [_темах_](https://kafka.apache.org/documentation/#intro_concepts_and_terms) . Очень упрощенно, тема похожа на папку в файловой системе, а события — это файлы в этой папке.

Итак, прежде чем вы сможете написать свои первые события, вы должны создать тему. Откройте еще одну терминальную сессию и выполните:

```bash
$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

Все инструменты командной строки Kafka имеют дополнительные опции: запустите  `kafka-topics.sh` команду без аргументов, чтобы отобразить информацию об использовании. Например, она также может показать вам  [такие подробности, как количество разделов](https://kafka.apache.org/documentation/#intro_concepts_and_terms)  новой темы:

```bash
$ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events        TopicId: NPmZHyhbR9y00wMglMH2sg PartitionCount: 1       ReplicationFactor: 1	Configs:
Topic: quickstart-events Partition: 0    Leader: 0   Replicas: 0 Isr: 0
```

#### [](https://kafka.apache.org/quickstart#quickstart_send)[Шаг 4: Впишите некоторые события в тему](https://kafka.apache.org/quickstart#quickstart_send)

Клиент Kafka взаимодействует с брокерами Kafka через сеть для записи (или чтения) событий. После получения брокеры будут хранить события в надежном и отказоустойчивом виде столько времени, сколько вам нужно — даже вечно.

Запустите консольный клиент-производитель, чтобы записать несколько событий в тему. По умолчанию каждая введенная вами строка приведет к записи отдельного события в тему.

```bash
$ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
>This is my first event
>This is my second event
```

Вы можете остановить работу клиента-производителя  `Ctrl-C` в любое время.

#### [](https://kafka.apache.org/quickstart#quickstart_consume)[Шаг 5: Прочитайте события](https://kafka.apache.org/quickstart#quickstart_consume)

Откройте еще один сеанс терминала и запустите консольный клиент-потребитель, чтобы прочитать только что созданные вами события:

```bash
$ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
This is my first event
This is my second event
```

Вы можете остановить работу клиента-потребителя  `Ctrl-C` в любое время.

Не стесняйтесь экспериментировать: например, вернитесь к терминалу производителя (предыдущий шаг), чтобы записать дополнительные события, и посмотрите, как события немедленно отобразятся в терминале потребителя.

Поскольку события надежно хранятся в Kafka, их можно читать столько раз и столько раз, сколько нужно потребителям. Вы можете легко в этом убедиться, открыв еще один сеанс терминала и снова выполнив предыдущую команду.

#### [](https://kafka.apache.org/quickstart#quickstart_kafkaconnect)[Шаг 6: Импортируйте/экспортируйте данные в виде потоков событий с помощью Kafka Connect](https://kafka.apache.org/quickstart#quickstart_kafkaconnect)

У вас, вероятно, есть много данных в существующих системах, таких как реляционные базы данных или традиционные системы обмена сообщениями, а также множество приложений, которые уже используют эти системы.  [Kafka Connect](https://kafka.apache.org/documentation/#connect)  позволяет вам непрерывно вводить данные из внешних систем в Kafka и наоборот. Это расширяемый инструмент, который запускает  _коннекторы_ , реализующие пользовательскую логику для взаимодействия с внешней системой. Таким образом, очень легко интегрировать существующие системы с Kafka. Чтобы сделать этот процесс еще проще, существуют сотни таких коннекторов, которые легко доступны.

В этом кратком руководстве мы рассмотрим, как запустить Kafka Connect с простыми коннекторами, которые импортируют данные из файла в тему Kafka и экспортируют данные из темы Kafka в файл.

Во-первых, обязательно добавьте  `connect-file-3.8.0.jar` свойство  `plugin.path` в конфигурацию Connect worker. Для целей этого быстрого запуска мы будем использовать относительный путь и рассматривать пакет коннекторов как uber jar, который работает, когда команды быстрого запуска запускаются из установочного каталога. Однако стоит отметить, что для производственных развертываний использование абсолютных путей всегда предпочтительнее.   Подробное описание того, как задать эту конфигурацию, см. в [plugin.path.](https://kafka.apache.org/documentation/#connectconfigs_plugin.path)

Отредактируйте  `config/connect-standalone.properties` файл, добавьте или измените  `plugin.path` свойство конфигурации, как указано ниже, и сохраните файл:

```bash
$ echo "plugin.path=libs/connect-file-3.8.0.jar" >> config/connect-standalone.properties
```

Затем начните с создания исходных данных для тестирования:

```bash
$ echo -e "foo\nbar" > test.txt
```

Или в Windows:

```bash
$ echo foo > test.txt
$ echo bar >> test.txt
```

Далее мы запустим два коннектора, работающих в  _автономном_  режиме, что означает, что они работают в одном локальном выделенном процессе. Мы предоставляем три файла конфигурации в качестве параметров. Первый всегда является конфигурацией для процесса Kafka Connect, содержащей общую конфигурацию, такую ​​как брокеры Kafka для подключения и формат сериализации для данных. Остальные файлы конфигурации каждый указывает коннектор для создания. Эти файлы включают уникальное имя коннектора, класс коннектора для создания экземпляра и любую другую конфигурацию, требуемую коннектором.

```bash
$ bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
```

Эти примеры файлов конфигурации, входящие в состав Kafka, используют конфигурацию локального кластера по умолчанию, которую вы запустили ранее, и создают два коннектора: первый — исходный коннектор, который считывает строки из входного файла и выводит каждую из них в тему Kafka, а второй — коннектор-приемник, который считывает сообщения из темы Kafka и выводит каждое из них в виде строки в выходном файле.

Во время запуска вы увидите ряд сообщений журнала, включая некоторые, указывающие на то, что коннекторы создаются. После запуска процесса Kafka Connect исходный коннектор должен начать считывать строки из  `test.txt` темы и выдавать их в нее  `connect-test`, а коннектор приемника должен начать считывать сообщения из темы  `connect-test` и записывать их в файл  `test.sink.txt`. Мы можем проверить, что данные были доставлены по всему конвейеру, изучив содержимое выходного файла:

```bash
$ more test.sink.txt
foo
bar
```

Обратите внимание, что данные хранятся в теме Kafka  `connect-test`, поэтому мы также можем запустить консольный потребитель, чтобы увидеть данные в теме (или использовать пользовательский код потребителя для их обработки):

```bash
$ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning
{"schema":{"type":"string","optional":false},"payload":"foo"}
{"schema":{"type":"string","optional":false},"payload":"bar"}
…
```

Коннекторы продолжают обрабатывать данные, поэтому мы можем добавлять данные в файл и наблюдать их перемещение по конвейеру:

```bash
$ echo "Another line" >> test.txt
```

Вы должны увидеть строку в выходных данных потребителя консоли и в файле приемника.

#### [](https://kafka.apache.org/quickstart#quickstart_kafkastreams)[Шаг 7: Обработка событий с помощью Kafka Streams](https://kafka.apache.org/quickstart#quickstart_kafkastreams)

После того, как ваши данные сохранены в Kafka как события, вы можете обрабатывать данные с помощью  клиентской библиотеки [Kafka Streams](https://kafka.apache.org/documentation/streams)  для Java/Scala. Она позволяет вам реализовывать критически важные приложения и микросервисы реального времени, где входные и/или выходные данные хранятся в темах Kafka. Kafka Streams сочетает простоту написания и развертывания стандартных приложений Java и Scala на стороне клиента с преимуществами технологии серверного кластера Kafka, чтобы сделать эти приложения высокомасштабируемыми, эластичными, отказоустойчивыми и распределенными. Библиотека поддерживает обработку exact-once, операции с сохранением состояния и агрегации, оконную обработку, объединения, обработку на основе времени события и многое другое.

Чтобы дать вам первое представление, вот как можно реализовать популярный  `WordCount` алгоритм:

```java
KStream<String, String> textLines = builder.stream("quickstart-events");

KTable<String, Long> wordCounts = textLines
            .flatMapValues(line -> Arrays.asList(line.toLowerCase().split(" ")))
            .groupBy((keyIgnored, word) -> word)
            .count();

wordCounts.toStream().to("output-topic", Produced.with(Serdes.String(), Serdes.Long()));
```

Демонстрация  [Kafka Streams](https://kafka.apache.org/documentation/streams/quickstart)  и  [руководство по разработке приложения](https://kafka.apache.org/38/documentation/streams/tutorial)  демонстрируют, как писать код и запускать такое потоковое приложение от начала до конца.

#### [](https://kafka.apache.org/quickstart#quickstart_kafkaterminate)[Шаг 8: Завершите работу среды Kafka.](https://kafka.apache.org/quickstart#quickstart_kafkaterminate)

Теперь, когда вы достигли конца краткого руководства, можете смело сносить среду Kafka или продолжать экспериментировать.

1. Остановите клиентов-производителей и потребителей с помощью  `Ctrl-C`, если вы этого еще не сделали.
2. Остановите брокера Kafka с помощью  `Ctrl-C`.
3. Наконец, если вы следовали разделу Kafka с ZooKeeper, остановите сервер ZooKeeper с помощью  `Ctrl-C`.

Если вы также хотите удалить какие-либо данные локальной среды Kafka, включая любые события, которые вы создали в процессе, выполните команду:

```bash
$ rm -rf /tmp/kafka-logs /tmp/zookeeper /tmp/kraft-combined-logs
```

#### [](https://kafka.apache.org/quickstart#quickstart_kafkacongrats)[Поздравляю!](https://kafka.apache.org/quickstart#quickstart_kafkacongrats)

Вы успешно завершили краткое руководство по Apache Kafka.

Чтобы узнать больше, мы предлагаем следующие шаги:

- Прочитайте краткое  [Введение,](https://kafka.apache.org/intro)  чтобы узнать, как работает Kafka на высоком уровне, его основные концепции и как он сравнивается с другими технологиями. Чтобы понять Kafka более подробно, перейдите в  [Документацию](https://kafka.apache.org/documentation/) .
- Просмотрите  [примеры использования](https://kafka.apache.org/powered-by)  , чтобы узнать, как другие пользователи нашего мирового сообщества извлекают пользу из Kafka.
- Присоединяйтесь к  [местной группе встреч Kafka](https://kafka.apache.org/events)  и  [смотрите выступления на Kafka Summit](https://kafka-summit.org/past-events/) , главной конференции сообщества Kafka.