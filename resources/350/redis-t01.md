## What is Redis?

This README is just a fast _quick start_ document. You can find more detailed documentation at [redis.io](https://redis.io/).

Redis is often referred to as a _data structures_ server. What this means is that Redis provides access to mutable data structures via a set of commands, which are sent using a _server-client_ model with TCP sockets and a simple protocol. So different processes can query and modify the same data structures in a shared way.

![What is redis](media/350-01.png)

Data structures implemented into Redis have a few special properties:

- Redis cares to store them on disk, even if they are always served and modified into the server memory. This means that Redis is fast, but that it is also non-volatile.
- The implementation of data structures emphasizes memory efficiency, so data structures inside Redis will likely use less memory compared to the same data structure modelled using a high-level programming language.
- Redis offers a number of features that are natural to find in a database, like replication, tunable levels of durability, clustering, and high availability.

Another good example is to think of Redis as a more complex version of memcached, where the operations are not just SETs and GETs, but operations that work with complex data types like Lists, Sets, ordered data structures, and so forth.

If you want to know more, this is a list of selected starting points:

- Introduction to Redis data types. https://redis.io/topics/data-types-intro
- Try Redis directly inside your browser. https://try.redis.io
- The full list of Redis commands. https://redis.io/commands
- There is much more inside the official Redis documentation. https://redis.io/documentation

## Building Redis

Redis can be compiled and used on Linux, OSX, OpenBSD, NetBSD, FreeBSD. We support big endian and little endian architectures, and both 32 bit and 64 bit systems.

![Inslall redis](media/350-02.png)

It may compile on Solaris derived systems (for instance SmartOS) but our support for this platform is _best effort_ and Redis is not guaranteed to work as well as in Linux, OSX, and *BSD.

It is as simple as:

```go
% make
```

To build with TLS support, you'll need OpenSSL development libraries (e.g. libssl-dev on Debian/Ubuntu) and run:

```shell
% make BUILD_TLS=yes
```

To build with systemd support, you'll need systemd development libraries (such as libsystemd-dev on Debian/Ubuntu or systemd-devel on CentOS) and run:

```shell
% make USE_SYSTEMD=yes
```

To append a suffix to Redis program names, use:

```go
% make PROG_SUFFIX="-alt"
```

You can build a 32 bit Redis binary using:

```go
% make 32bit
```

After building Redis, it is a good idea to test it using:

```shell
% make test
```

If TLS is built, running the tests with TLS enabled (you will need `tcl-tls` installed):

```shell
% ./utils/gen-test-certs.sh
% ./runtest --tls
```

## Fixing build problems with dependencies or cached build options

Redis has some dependencies which are included in the `deps` directory. `make` does not automatically rebuild dependencies even if something in the source code of dependencies changes.

![Fixing redis](media/350-03.png)

When you update the source code with `git pull` or when code inside the dependencies tree is modified in any other way, make sure to use the following command in order to really clean everything and rebuild from scratch:

```go
% make distclean
```

This will clean: jemalloc, lua, hiredis, linenoise and other dependencies.

Also if you force certain build options like 32bit target, no C compiler optimizations (for debugging purposes), and other similar build time options, those options are cached indefinitely until you issue a `make distclean` command.

## Fixing problems building 32 bit binaries

If after building Redis with a 32 bit target you need to rebuild it with a 64 bit target, or the other way around, you need to perform a `make distclean` in the root directory of the Redis distribution.

In case of build errors when trying to build a 32 bit binary of Redis, try the following steps:

- Install the package libc6-dev-i386 (also try g++-multilib).
- Try using the following command line instead of `make 32bit`: `make CFLAGS="-m32 -march=native" LDFLAGS="-m32"`

## Allocator

Selecting a non-default memory allocator when building Redis is done by setting the `MALLOC` environment variable. Redis is compiled and linked against libc malloc by default, with the exception of jemalloc being the default on Linux systems. This default was picked because jemalloc has proven to have fewer fragmentation problems than libc malloc.

To force compiling against libc malloc, use:

```go
% make MALLOC=libc
```

To compile against jemalloc on Mac OS X systems, use:

```go
% make MALLOC=jemalloc
```

## Monotonic clock

By default, Redis will build using the POSIX clock_gettime function as the monotonic clock source. On most modern systems, the internal processor clock can be used to improve performance. Cautions can be found here: http://oliveryang.net/2015/09/pitfalls-of-TSC-usage/

To build with support for the processor's internal instruction clock, use:

```go
% make CFLAGS="-DUSE_PROCESSOR_CLOCK"
```

## Verbose build

Redis will build with a user-friendly colorized output by default. If you want to see a more verbose output, use the following:

```go
% make V=1
```

## Running Redis

To run Redis with the default configuration, just type:

```shell
% cd src
% ./redis-server
```

If you want to provide your redis.conf, you have to run it using an additional parameter (the path of the configuration file):

```shell
% cd src
% ./redis-server /path/to/redis.conf
```

It is possible to alter the Redis configuration by passing parameters directly as options using the command line. Examples:

```shell
% ./redis-server --port 9999 --replicaof 127.0.0.1 6379
% ./redis-server /etc/redis/6379.conf --loglevel debug
```

All the options in redis.conf are also supported as options using the command line, with exactly the same name.

## Running Redis with TLS:

Please consult the [TLS.md](http://localhost:24100/TLS.md) file for more information on how to use Redis with TLS.

## Playing with Redis

You can use redis-cli to play with Redis. Start a redis-server instance, then in another terminal try the following:

```shell
% cd src
% ./redis-cli
redis> ping
PONG
redis> set foo bar
OK
redis> get foo
"bar"
redis> incr mycounter
(integer) 1
redis> incr mycounter
(integer) 2
redis>
```

You can find the list of all the available commands at https://redis.io/commands.

## Installing Redis

In order to install Redis binaries into /usr/local/bin, just use:

```go
% make install
```

You can use `make PREFIX=/some/other/directory install` if you wish to use a different destination.

`make install` will just install binaries in your system, but will not configure init scripts and configuration files in the appropriate place. This is not needed if you just want to play a bit with Redis, but if you are installing it the proper way for a production system, we have a script that does this for Ubuntu and Debian systems:

```shell
% cd utils
% ./install_server.sh
```

_Note_: `install_server.sh` will not work on Mac OSX; it is built for Linux only.

The script will ask you a few questions and will setup everything you need to run Redis properly as a background daemon that will start again on system reboots.

You'll be able to stop and start Redis using the script named `/etc/init.d/redis_<portnumber>`, for instance `/etc/init.d/redis_6379`.

## Code contributions

By contributing code to the Redis project in any form, including sending a pull request via GitHub, a code fragment or patch via private email or public discussion groups, you agree to release your code under the terms of the [Redis Software Grant and Contributor License Agreement](https://github.com/redis/redis/blob/unstable/CONTRIBUTING.md). Redis software contains contributions to the original Redis core project, which are owned by their contributors and licensed under the 3BSD license. Any copy of that license in this repository applies only to those contributions. Redis releases all Redis project versions from 7.4.x and thereafter under the RSALv2/SSPL dual-license as described in the [LICENSE.txt](https://github.com/redis/redis/blob/unstable/LICENSE.txt) file included in the Redis source distribution.

Please see the [CONTRIBUTING.md](https://github.com/redis/redis/blob/unstable/CONTRIBUTING.md) file in this source distribution for more information. For security bugs and vulnerabilities, please see [SECURITY.md](https://github.com/redis/redis/blob/unstable/SECURITY.md).

## Redis Trademarks

The purpose of a trademark is to identify the goods and services of a person or company without causing confusion. As the registered owner of its name and logo, Redis accepts certain limited uses of its trademarks but it has requirements that must be followed as described in its Trademark Guidelines available at: https://redis.com/legal/trademark-guidelines/.

# Redis internals

If you are reading this README you are likely in front of a Github page or you just untarred the Redis distribution tar ball. In both the cases you are basically one step away from the source code, so here we explain the Redis source code layout, what is in each file as a general idea, the most important functions and structures inside the Redis server and so forth. We keep all the discussion at a high level without digging into the details since this document would be huge otherwise and our code base changes continuously, but a general idea should be a good starting point to understand more. Moreover most of the code is heavily commented and easy to follow.

There are also many other files not described here, but it is useless to cover everything. We just want to help you with the first steps. Eventually you'll find your way inside the Redis code base :-)

Enjoy!
