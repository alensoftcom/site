# Быстрый старт (официальный)
## Хотите начать работу с Cassandra? Следуйте этим инструкциям.

### ШАГ 1: ПОЛУЧИТЕ CASSANDRA С ПОМОЩЬЮ DOCKER

На компьютере должны быть установлены Docker Desktop для Mac, Docker Desktop для Windows или аналогичное программное обеспечение.

Apache Cassandra также доступен в виде архива или пакета [download](https://cassandra.apache.org/_/download.html).

```asciidoc
docker pull cassandra:latest
```

### ШАГ 2: ЗАВЕДИТЕ КАССАНДРУ

Сеть Docker позволяет нам получать доступ к портам контейнера, не открывая их на хосте.

```asciidoc
docker network create cassandra

docker run --rm -d --name cassandra --hostname cassandra --network cassandra cassandra
```

### ШАГ 3: СОЗДАНИЕ ФАЙЛОВ

Язык запросов Cassandra (CQL) очень похож на SQL, но подходит для структуры Cassandra без JOIN.

Создайте файл с именем data.cql и вставьте в него следующий CQL-скрипт. Этот скрипт создаст пространство ключей, слой, на котором Cassandra реплицирует свои данные, таблицу для хранения данных и вставит некоторые данные в эту таблицу:

```asciidoc
-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS store WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS store.shopping_cart (
userid text PRIMARY KEY,
item_count int,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('9876', 2, toTimeStamp(now()));
INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('1234', 5, toTimeStamp(now()));
```

### ШАГ 4: ЗАГРУЗИТЕ ДАННЫЕ С ПОМОЩЬЮ CQLSH

Оболочка CQL, или cqlsh, является одним из инструментов для взаимодействия с базой данных. Мы будем использовать его для загрузки некоторых данных в базу данных с помощью скрипта, который вы только что сохранили.

```asciidoc
docker run --rm --network cassandra -v "$(pwd)/data.cql:/scripts/data.cql" -e CQLSH_HOST=cassandra -e CQLSH_PORT=9042 -e CQLVERSION=3.4.6 nuvo/docker-cqlsh
```

Примечание: Сам сервер кассандры (первая команда docker run, которую вы запустили) запускается за несколько секунд. Приведенная выше команда выдаст ошибку, если сервер еще не завершил свою последовательность инициализации, поэтому дайте ей несколько секунд на запуск.

### ШАГ 5: ИНТЕРАКТИВНАЯ CQLSH

Как и в случае с оболочкой SQL, вы, конечно, можете использовать CQLSH для выполнения команд CQL в интерактивном режиме.

```asciidoc
docker run --rm -it --network cassandra nuvo/docker-cqlsh cqlsh cassandra 9042 --cqlversion='3.4.5'
```

Это должно привести к следующему запросу:

```asciidoc
Connected to Test Cluster at cassandra:9042.
[cqlsh 5.0.1 | Cassandra 4.0.4 | CQL spec 3.4.5 | Native protocol v5]
Use HELP for help.
cqlsh>
```

### ШАГ 6: ПРОЧИТАЙТЕ НЕКОТОРЫЕ ДАННЫЕ

```asciidoc
 SELECT * FROM store.shopping_cart;
```

### ШАГ 7: ЗАПИШИТЕ ЕЩЕ НЕМНОГО ДАННЫХ

```asciidoc
 INSERT INTO store.shopping_cart (userid, item_count) VALUES ('4567', 20);
```

### ШАГ 8: ОЧИСТКА

```asciidoc
docker kill cassandra
docker network rm cassandra
```

**ПОЗДРАВЛЯЮ!**

Эй, это было не так уж и сложно, не так ли?

Чтобы узнать больше, мы предлагаем следующие шаги:

- Прочтите [Основы Кассандры](https://cassandra.apache.org/_/cassandra-basics.html), чтобы узнать основные концепции и то, как Кассандра работает на высоком уровне.
    
- Чтобы понять Кассандру более подробно, перейдите в раздел [Документы](https://cassandra.apache.org/doc/latest/).
    
- Просмотрите [Тематические исследования](https://cassandra.apache.org/_/case-studies.html), чтобы узнать, как другие пользователи в нашем мировом сообществе получают выгоду от Cassandra.



