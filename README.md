# Task: application for OpenSearch Dashboards

The purpose of this exercise is to build a small application, based on a fictional use
case, but related to the daily job at Wazuh.

Pay attention to details like documentation and testing. We want to ensure our future
colleagues can deliver quality code and documentation.

We want you to:

-   Document the architecture and features of your work.
-   Document the steps to run the tests within the provided development environment.

Please tell us if you have any problems/challenges during the development of the task
and how you solved them. Also, we expect you to suggest features that could be
interesting according to the requirements and the provided context.

## Tech stack

We expect our candidates to be able to work with:

-   NodeJS.
-   ReactJS.
-   A testing framework (preferably Jest).
-   Docker.

We expect knowledge as a user of virtual machines like Virtualbox, Hyper-V, KVM, etc.

## Context

Information security professionals use Wazuh to analyze the security status of all
elements of their infrastructure.

These processes are often performed within the framework of one of the security
standards, such as PCI DSS, ISO 27001, SOX, etc. One of the needs that these
professionals have is to make lists of tasks related to these processes.

These users would like to be able to know:

-   the tasks they have already done.
-   the tasks they have left to do.
-   when they have completed a task, or when they plan to execute it.

They would also like to be able to search for tasks, for example by the text they contain,
or by a list of tags. Each task can be in different states, such as planned, successfully
executed, or executed with error.

As a full stack developer, you have been tasked to implement such an application on the
platform on which Wazuh is integrated.

## Minimum requirements

The application must be a **plugin for OpenSearch Dashboards** and **persist the data
in an OpenSearch index**.

The user must be able to:

-   read and render the TO-DO items.
-   create new TO-DO items and persist them (in an OpenSearch index).
-   set TO-DO items as completed.
-   delete TO-DO items.
-   search TO-DO items.
-   visualize the TO-DO items using dashboards, such as tables and charts.

The application architecture must have (at least):

-   frontend.
-   backend for frontend.
-   tests.

### Frontend

Use **ReactJS** for the front-end.

The OpenSearch Dashboards provides a library of UI components (`@opensearch-project/oui`)
that can be used to create new functionalities and keep the UI appearance. This library
is referenced in the source code as `@elastic/eui`. You can create the user interface
of the application with other libraries you know, but using the provided UI library will
be positively valued.

At least, a **table** and a **chart** must be created, but add any other visualization
you consider. We are interested in seeing how you would represent the data to maximize
the value provided to the user.

Including additional functionalities to ease the navigation, such as sorting or
pagination, will be very positively valued.

### Backend for frontend

Write a small backend for the application in NodeJS which implements a **REST API**.
This server-side code of the app for OpenSearch Dashboards will contain the logic of the
application related to the resources, in this case, the TO-DO items. Use the services
provided by the platform to interact with the index (database).

Check the [References](#references) for additional documentation.

### Tests

The application must have some tests related to UI components and functionalities. The
preferred library is `Jest`, as it's the one OpenSearch Dashboards and Wazuh use, but you
are free to use any other testing library.

> Jest is already configured, so you can focus on writing the tests. If you decide to use
> a different testing library, its configuration is on your side. In this case, provide
> instructions about how to run the tests.
> If the challenge does not include **working and passing** tests or if we cannot manage
> to verify that, the challenge will be void.
>
> The tests are intended to be executed **within** the Docker container.

### TO-DO entity

The TO-DO items must, at least, have a _title_ and a _status_. Add any other properties
you consider interesting to enrich the challenge. Think about what information you want
to display and the best way to visualize it, and add as many properties as you need, for
example:

-   Creation date.
-   Completion date.
-   Assignee.
-   ...

## Development environment

We already provide you with a development environment based on Docker. Continue reading
its [README.md](./dev_environment/README.md) to get started.

## References:

-   [OpenSearch Documentation](https://opensearch.org/docs/2.4)
-   [Introduction to OpenSearch Dashboards Plugins](https://opensearch.org/blog/dashboards-plugins-intro)
-   [UI components library documentation - @elastic/eui](https://eui.elastic.co/v34.6.0)
-   [Jest](https://jestjs.io)

> OpenSearch forked [@elastic/eui](https://github.com/elastic/eui) as
> [@opensearch-project/oui](https://github.com/opensearch-project/oui), but they do not
> hold any documentation yet, hence we use the Elastic UI documentation instead. Be aware
> that there might be differences between these 2 libraries.





# TRADUCCION:



# Tarea: aplicación para OpenSearch Dashboards

El propósito de este ejercicio es construir una pequeña aplicación, basada en un caso de uso ficticio, pero relacionado con el trabajo diario en Wazuh.
ficticio, pero relacionado con el trabajo diario en Wazuh.

Presta atención a detalles como la documentación y las pruebas. Queremos asegurarnos de que nuestros futuros
compañeros puedan entregar código y documentación de calidad.

Queremos que:

- Documentes la arquitectura y características de tu trabajo.
- Documentes los pasos para ejecutar las pruebas dentro del entorno de desarrollo proporcionado.

Por favor, dinos si has tenido algún problema/desafío durante el desarrollo de la tarea
y cómo los resolvió. Además, esperamos que sugieras características que podrían ser
interesantes según los requisitos y el contexto proporcionado.

## Pila tecnológica

Esperamos que nuestros candidatos sean capaces de trabajar con:

- NodeJS.
- ReactJS.
- Un framework de testing (preferiblemente Jest).
- Docker.

Esperamos conocimientos como usuario de máquinas virtuales como Virtualbox, Hyper-V, KVM, etc.

## Contexto

Los profesionales de la seguridad de la información usan Wazuh para analizar el estado de seguridad de todos
elementos de su infraestructura.

Estos procesos se realizan a menudo en el marco de una de las normas de seguridad
como PCI DSS, ISO 27001, SOX, etc. Una de las necesidades que tienen estos
profesionales es hacer listas de tareas relacionadas con estos procesos.

A estos usuarios les gustaría poder saber

- las tareas que ya han realizado.
- las tareas que les quedan por hacer.
- cuándo han completado una tarea o cuándo tienen previsto ejecutarla.

También les gustaría poder buscar tareas, por ejemplo, por el texto que contienen,
o por una lista de etiquetas. Cada tarea puede estar en diferentes estados, como planificada, ejecutada con éxito o ejecutada con error.
ejecutada con éxito o ejecutada con error.

Como desarrollador de pila completa, se le ha encargado la tarea de implementar una aplicación de este tipo en el
plataforma en la que Wazuh está integrado.

## Requisitos mínimos

La aplicación debe ser un **plugin para OpenSearch Dashboards** y **perseguir los datos
en un índice OpenSearch**.

El usuario debe ser capaz de:

- leer y renderizar los elementos TO-DO.
- crear nuevos elementos TO-DO y persistirlos (en un índice OpenSearch).
- establecer los elementos TO-DO como completados.
- eliminar elementos TO-DO.
- buscar elementos TO-DO.
- visualizar los elementos TO-DO mediante cuadros de mando, como tablas y gráficos.

La arquitectura de la aplicación debe tener (como mínimo):

- frontend.
- backend para frontend.
- pruebas.

### Frontend

Utilice **ReactJS** para el front-end.

OpenSearch Dashboards proporciona una librería de componentes UI (`@opensearch-project/oui`)
que se pueden utilizar para crear nuevas funcionalidades y mantener la apariencia de la interfaz de usuario. Esta biblioteca
está referenciada en el código fuente como `@elastic/eui`. Puedes crear la interfaz de usuario
de la aplicación con otras librerías que conozcas, pero usar la librería UI proporcionada será
será valorado positivamente.

Al menos, una **tabla** y un **gráfico** deben ser creados, pero añade cualquier otra visualización
que consideres. Nos interesa ver cómo representarías los datos para maximizar
el valor proporcionado al usuario.

Se valorará muy positivamente la inclusión de funcionalidades adicionales para facilitar la navegación, como la ordenación o la paginación.
paginación, será valorado muy positivamente.

### Backend para frontend

Escribir un pequeño backend para la aplicación en NodeJS que implemente un **REST API**.
Este código del lado del servidor de la app para OpenSearch Dashboards contendrá la lógica de la
aplicación relacionada con los recursos, en este caso, los elementos TO-DO. Utiliza los servicios
proporcionados por la plataforma para interactuar con el índice (base de datos).

Consulte las [Referencias](#references) para obtener documentación adicional.

### Pruebas

La aplicación debe tener algunas pruebas relacionadas con los componentes y funcionalidades de la interfaz de usuario. La librería preferida de
biblioteca preferida es `Jest`, ya que es la que usan OpenSearch Dashboards y Wazuh, pero usted
es libre de utilizar cualquier otra biblioteca de pruebas.

> Jest ya está configurado, así que puedes centrarte en escribir las pruebas. Si decide utilizar
> una librería de pruebas diferente, su configuración corre de tu cuenta. En este caso, proporciona
> instrucciones sobre cómo ejecutar las pruebas.
> Si el reto no incluye **pruebas que funcionen y pasen** o si no podemos conseguir
> verificarlo, el reto será nulo.
>
> Las pruebas deben ejecutarse **dentro** del contenedor Docker.

### Entidad TO-DO

Los elementos TO-DO deben, al menos, tener un _title_ y un _status_. Añada cualquier otra propiedad
que consideres interesantes para enriquecer el reto. Piense qué información quiere
mostrar y la mejor forma de visualizarla, y añada tantas propiedades como necesite, por
ejemplo:

- Fecha de creación.
- Fecha de finalización.
- Cesionario.
- ...

## Entorno de desarrollo

Ya ponemos a tu disposición un entorno de desarrollo basado en Docker. Continúa leyendo
su [README.md](./dev_environment/README.md) para empezar.

