# Обзор шаблонов обмена сообщениями - Шаблоны интеграции с предприятием

Этот каталог шаблонов описывает 65 шаблонов интеграции, собранных из многих интеграционных проектов с 2002 года. Шаблоны предоставляют разработчикам и архитекторам независимые от технологий рекомендации по проектированию для описания и разработки надежных интеграционных решений. Вдохновение для документирования этих шаблонов пришло после того, как мы с трудом просмотрели документацию по продуктам нескольких поставщиков интеграции, чтобы позже понять, что многие из основных концепций были очень похожи.

## Зачем нужны шаблоны корпоративной интеграции?

Корпоративная интеграция слишком сложна, чтобы ее можно было решить с помощью простого подхода «поваренной книги». 
Вместо этого шаблоны обеспечивают руководство, документируя тот опыт, который обычно живет только в головах архитекторов: они являются принятыми решениями повторяющихся проблем в данном контексте. Шаблоны достаточно абстрактны, чтобы их можно было применить к большинству интеграционных технологий, но достаточно специфичны, чтобы обеспечить практическое руководство для дизайнеров и архитекторов. Шаблоны также предоставляют разработчикам словарь для эффективного описания своего решения.

Узоры не «изобретаются»; Их собирают от многократного использования на практике. Если вы создавали интеграционные решения, вполне вероятно, что вы использовали некоторые из этих шаблонов, возможно, в небольших вариациях и, возможно, называя их другими именами. Целью данного сайта является представление целостной коллекции актуальных и проверенных шаблонов, которые в совокупности образуют интеграционный язык шаблонов.

Несмотря на 700+ страниц, наша книга охватывает лишь часть шаблонов (и проблем, которые необходимо решить) в пространстве интеграции. Текущие шаблоны сосредоточены на [_Messaging_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Messaging.html), который составляет основу большинства других шаблонов интеграции. Мы начали [собирать больше шаблонов] (https://www.enterpriseintegrationpatterns.com/patterns/messaging/ramblings/72_eipvolumes.html), но осознаем (в очередной раз), сколько работы на самом деле требуется для документирования этих шаблонов. Так что, пожалуйста, следите за обновлениями.

## Шаблоны обмена сообщениями

Здесь задокументированы [65 шаблонов обмена сообщениями](https://www.enterpriseintegrationpatterns.com/patterns/messaging/toc.html), организованных следующим образом (нажмите на изображение или просмотрите [Оглавление](https://www.enterpriseintegrationpatterns.com/patterns/messaging/toc.html)):

### Язык шаблонов интеграции


![](media/340-01.png)

* [**Стили интеграции**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/IntegrationStylesIntro.html) документировать различные способы интеграции приложений, предоставляя исторический отчет о технологиях интеграции. Все последующие шаблоны следуют стилю [_Messaging_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Messaging.html).
* [**Шаблоны каналов**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingChannelsIntro.html) описывают, как сообщения передаются через [_Message Channel_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html). Эти шаблоны реализованы в большинстве коммерческих систем обмена сообщениями и системами обмена сообщениями с открытым исходным кодом.
* [**Шаблоны построения сообщений**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageConstructionIntro.html) описывают намерение, форму и содержание сообщений, которые распространяются по системе обмена сообщениями. Базовым шаблоном для этого раздела является шаблон [_Message_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html).
* [**Шаблоны маршрутизации**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRoutingIntro.html) обсудите, как сообщения перенаправляются от отправителя к нужному получателю. Шаблоны маршрутизации сообщений используют сообщение из одного канала и повторно публикуют его, обычно без изменений, в другом канале на основе набора условий. Шаблоны, представленные в этом разделе, являются специализациями шаблона [_Message Router_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html).
* [**Шаблоны преобразования**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTransformationIntro.html) изменяют содержимое сообщения, например, чтобы приспособиться к различным форматам данных, используемым отправляющей и принимающей системой. Возможно, потребуется добавить, убрать данные или переупорядочить существующие данные. Базовым шаблоном для этого раздела является [_Message Translator_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html).
* [**Endpoint Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingEndpointsIntro.html) описывают, как клиенты системы обмена сообщениями создают или потребляют сообщения.
* [**Шаблоны управления системой**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/SystemManagementIntro.html) описывают инструменты для поддержания работы сложной системы, основанной на сообщениях, включая устранение ошибок, узких мест производительности и изменений в участвующих системах.

В каких продуктах реализуются или используются шаблоны корпоративной интеграции?
---------------------------------------------------------------

Шаблоны не привязаны к конкретной реализации и помогают разрабатывать лучшие решения на любой из следующих платформ:

*   **Open source ESB's** like [Mule ESB](http://www.mulesoft.org/), [JBoss Fuse](http://www.jboss.org/products/fuse/overview/), [Open ESB](http://www.open-esb.net/), [WSo2](http://wso2.com/), [Spring Integration](http://projects.spring.io/spring-integration/), or [Talend ESB](http://www.talend.com/)
*   **Message Brokers** like [ActiveMQ](http://activemq.apache.org), [Apache Kafka](https://kafka.apache.org/), or [RabbitMQ](https://www.rabbitmq.com)
*   **EAI and SOA platforms**, such as [IBM WebSphere MQ](http://www.ibm.com/software/mqseries), [TIBCO](http://www.tibco.com), [Vitria](http://www.vitria.com), [Oracle Service Bus](http://www.oracle.com/technetwork/middleware/service-bus), [WebMethods](http://www.softwareag.com/corporate/products/webmethods_integration/integration/overview/default.asp) (now Software AG), [Microsoft BizTalk](http://www.microsoft.com/biztalk ), or [Fiorano](http://www.fiorano.com).
*   **Cloud-based integration**, including [Amazon Simple Queue Service (SQS)](http://aws.amazon.com/sqs/), [Amazon EventBridge](https://aws.amazon.com/eventbridge/), [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/), or [Azure Service Bus](https://azure.microsoft.com/en-us/products/service-bus).
*   **JMS-based messaging systems**
*   **Microsoft technologies** like [MSMQ](https://msdn.microsoft.com/en-us/library/ms711472) or [Windows Communication Foundation (WCF)](https://msdn.microsoft.com/library/vstudio/ms735119)

Как можно использовать шаблоны?
-----------------------------

Чтобы стимулировать широкое использование языка шаблонов интеграции, мы предусмотрели различные способы доступа к ним, включая лицензирование с открытым исходным кодом:

*   **Build**. Многие фреймворки с открытым исходным кодом, такие как [Mule](http://mule.codehaus.org/display/MULE/Architecture+Guide), [Apache Camel](http://activemq.apache.org/camel/) или [Spring Integration](http://projects.spring.io/spring-integration/), включают в себя наши шаблоны. Теперь вы можете не только мыслить в интеграционных шаблонах, но и программировать в них!
* **Draw**. Вы можете создавать проектные документы с помощью нашего языка значков, загрузив [Набор элементов Visio](downloads.html) или используя трафарет [OmniGraffle](http://www.graffletopia.com/stencils/137), созданный одним из наших читателей.
*   **Reference**. Ссылка на [краткое изложение каждого шаблона](toc.html) из книги с вашего сайта или документов.
*   **Read**. Книга [_Enterprise Integration Patterns_](http://amazon.com/o/asin/0321200683/ref=nosim/enterpriseint-20) (Addison-Wesley, ISBN 0321200683) содержит полное описание каждого шаблона с большим количеством примеров — более 700 страниц материала. Вы также можете прочитать полный текст [on-line on Safari](http://safari.informit.com/0321200683) (с членством).
*   **Reuse**. Вы также можете развивать то, что мы сделали. Мы сделали название шаблона, значок, условия проблемы и решения, а также эскизы (диаграмма под формулировкой решения) доступными под лицензией [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/).  
    Короче говоря, эта лицензия позволяет вам делиться, использовать и изменять эти отрывки при условии надлежащего указания авторства. В нашем случае это будет означать ссылку на сайт и ссылку на название книги и авторов. Если у вас есть вопросы относительно этого требования, пожалуйста, [свяжитесь с нами](gregor.html).
* **Teach**. Ряд преподавателей используют данный материал на лекциях. Если вы тоже заинтересованы в получении доступа к материалам для академических целей, пожалуйста, [свяжитесь с нами](gregor.html).

Как насчет шаблонов REST / SOA / Serverless / EDA?
--------------------------------------------------

Исследованию уже 20 лет. Тем не менее, проблемы интеграции, которые нам приходится решать каждый день, остаются [разочаровывающе похожими](https://www.enterpriseintegrationpatterns.com/ramblings/81_restconversation.html). Поскольку шаблоны заключают в себе знания о проектировании, эти знания устаревают не так быстро, как конкретные технологии. Чтобы увидеть, как шаблоны применимы к технологиям интеграции, таким как [REST](https://www.enterpriseintegrationpatterns.com/ramblings/81_restconversation.html) или [Google Cloud Pub/Sub](https://www.enterpriseintegrationpatterns.com/ramblings/82_googlepubsub.html), следуйте нашему [Ramblings](https://www.enterpriseintegrationpatterns.com/ramblings) или ознакомьтесь с [списком современных примеров](https://www.enterpriseintegrationpatterns.com/ramblings/eip1_examples_updated.html). Я также реализовал пример приложения Loan Broker в [AWS Lambda, EventBridge и Step Functions](https://www.enterpriseintegrationpatterns.com/ramblings/loanbroker_stepfunctions.html) и [GCP PubSub and Workflows](https://www.enterpriseintegrationpatterns.com/ramblings/loanbroker_gcp_workflows.html).

