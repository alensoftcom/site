# Messaging Patterns Overview - Enterprise Integration Patterns

This pattern catalog describes 65 integration patterns, collected from many integration projects since 2002. The patterns provide technology-independent design guidance for developers and architects to describe and develop robust integration solutions. The inspiration to document these patterns came when we struggled through multiple integration vendors' product documentation just to realize later that many of the underlying concepts were quite similar.

## Why Enterprise Integration Patterns?

Enterprise integration is too complex to be solved with a simple 'cookbook' approach. 
Instead, patterns provide guidance by documenting the kind of experience that usually lives only in architects' heads: they are accepted solutions to recurring problems within a given context. Patterns are abstract enough to apply to most integration technologies, but specific enough to provide hands-on guidance to designers and architects. Patterns also provide a vocabulary for developers to efficiently describe their solution.

Patterns are not 'invented'; they are harvested from repeated use in practice. If you have built integration solutions, it is likely that you have used some of these patterns, maybe in slight variations and maybe calling them by a different name. The purpose of this site is to present a coherent collection of relevant and proven patterns, which in total form an integration pattern language.

Despite the 700+ pages, our book covers only a fraction of patterns (and the problems to be solved) in the integration space. The current patterns focus on [_Messaging_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Messaging.html), which forms the basis of most other integration patterns. We have started to [harvest more patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/ramblings/72_eipvolumes.html) but are realizing (once again) how much work documenting these patterns really is. So please stay tuned.

## Messaging Patterns


Here have documented [65 messaging patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/toc.html), organized as follows (click on the image or view the [Table of Contents](https://www.enterpriseintegrationpatterns.com/patterns/messaging/toc.html)):

### Integration Pattern Language


![](media/340-01.png)

*   [**Integration Styles**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/IntegrationStylesIntro.html) document different ways applications can be integrated, providing a historical account of integration technologies. All subsequent patterns follow the [_Messaging_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Messaging.html) style.
*   [**Channel Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingChannelsIntro.html) describe how messages are transported across a [_Message Channel_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html). These patterns are implemented by most commercial and open source messaging systems.
*   [**Message Construction Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageConstructionIntro.html) describe the intent, form and content of the messages that travel across the messaging system. The base pattern for this section is the [_Message_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) pattern.
*   [**Routing Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRoutingIntro.html) discuss how messages are routed from a sender to the correct receiver. Message routing patterns consume a message from one channel and republish it message, usually without modification, to another channel based on a set of conditions. The patterns presented in this section are specializations of the [_Message Router_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html) pattern.
*   [**Transformation Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTransformationIntro.html) change the content of a message, for example to accommodate different data formats used by the sending and the receiving system. Data may have to be added, taken away or existing data may have to be rearranged. The base pattern for this section is the [_Message Translator_](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html).
*   [**Endpoint Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingEndpointsIntro.html) describe how messaging system clients produce or consume messages.
*   [**System Management Patterns**](https://www.enterpriseintegrationpatterns.com/patterns/messaging/SystemManagementIntro.html) describe the tools to keep a complex message-based system running, including dealing with error conditions, performance bottlenecks and changes in the participating systems.

What products implement or use Enterprise Integration Patterns?
---------------------------------------------------------------

The patterns are not tied to a specific implementation and help you design better solutions with any of the following platforms:

*   **Open source ESB's** like [Mule ESB](http://www.mulesoft.org/), [JBoss Fuse](http://www.jboss.org/products/fuse/overview/), [Open ESB](http://www.open-esb.net/), [WSo2](http://wso2.com/), [Spring Integration](http://projects.spring.io/spring-integration/), or [Talend ESB](http://www.talend.com/)
*   **Message Brokers** like [ActiveMQ](http://activemq.apache.org), [Apache Kafka](https://kafka.apache.org/), or [RabbitMQ](https://www.rabbitmq.com)
*   **EAI and SOA platforms**, such as [IBM WebSphere MQ](http://www.ibm.com/software/mqseries), [TIBCO](http://www.tibco.com), [Vitria](http://www.vitria.com), [Oracle Service Bus](http://www.oracle.com/technetwork/middleware/service-bus), [WebMethods](http://www.softwareag.com/corporate/products/webmethods_integration/integration/overview/default.asp) (now Software AG), [Microsoft BizTalk](http://www.microsoft.com/biztalk ), or [Fiorano](http://www.fiorano.com).
*   **Cloud-based integration**, including [Amazon Simple Queue Service (SQS)](http://aws.amazon.com/sqs/), [Amazon EventBridge](https://aws.amazon.com/eventbridge/), [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/), or [Azure Service Bus](https://azure.microsoft.com/en-us/products/service-bus).
*   **JMS-based messaging systems**
*   **Microsoft technologies** like [MSMQ](https://msdn.microsoft.com/en-us/library/ms711472) or [Windows Communication Foundation (WCF)](https://msdn.microsoft.com/library/vstudio/ms735119)

How can you use the Patterns?
-----------------------------

To encourage widespread use of the integration pattern language, we have provided a variety of ways to access them, including open source licensing:

*   **Build**. Many open-source frameworks, such as [Mule](http://mule.codehaus.org/display/MULE/Architecture+Guide), [Apache Camel](http://activemq.apache.org/camel/), or [Spring Integration](http://projects.spring.io/spring-integration/) incorporate our patterns. Now you can not only think in integration patterns, but also to code in them!
*   **Draw**. You can create design documents using our icon language by downloading the [Visio stencil](downloads.html) or using the [OmniGraffle stencil](http://www.graffletopia.com/stencils/137) created by one of our readers.
*   **Reference**. Link to [summary of each pattern](toc.html) from the book from your site or docs.
*   **Read**. The book [_Enterprise Integration Patterns_](http://amazon.com/o/asin/0321200683/ref=nosim/enterpriseint-20) (Addison-Wesley, ISBN 0321200683) contains the full description of each pattern with plenty of examples -- over 700 pages worth of material. You can also read the full text [on-line on Safari](http://safari.informit.com/0321200683) (with membership).
*   **Reuse**. You are also welcome to build on top of what we have done. We made the pattern name, icon, problem and solution statements, as well as the sketches (the diagram below the solution statement) available under the [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/) license.  
    In brief, this license allows you share, use and modify these passages as long as you give proper attribution. In our case, this would mean a link to the site and a reference to the book title and authors. If you have questions regarding this requirement, please [contact us](gregor.html).
*   **Teach**. A number of professors use our material in lectures. If you are interested in getting access to material for academic purposes, please [contact us](gregor.html).

What about REST / SOA / Serverless / EDA Patterns?
--------------------------------------------------

The book is now 20 years old. Yet, the integration problems we have to solve every day remain [frustratingly similar](https://www.enterpriseintegrationpatterns.com/ramblings/81_restconversation.html). Because the patterns encapsulate design knowledge, this knowledge does not age as quickly as specific technologies. To see how the patterns apply to integration technologies like [REST](https://www.enterpriseintegrationpatterns.com/ramblings/81_restconversation.html) or [Google Cloud Pub/Sub](https://www.enterpriseintegrationpatterns.com/ramblings/82_googlepubsub.html), follow our [Ramblings](https://www.enterpriseintegrationpatterns.com/ramblings), or check the [list of modern examples](https://www.enterpriseintegrationpatterns.com/ramblings/eip1_examples_updated.html). I've also implemented the Loan Broker example application in [AWS Lambda, EventBridge, and Step Functions](https://www.enterpriseintegrationpatterns.com/ramblings/loanbroker_stepfunctions.html) and [GCP PubSub and Workflows](https://www.enterpriseintegrationpatterns.com/ramblings/loanbroker_gcp_workflows.html).

