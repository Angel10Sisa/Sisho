# Environments

Esta sección describe las variables de entorno necesarias para que el _back-end_ pueda funcionar correctamente, manteniendo la privacidad de credenciales.

- **Servidor**

Configuración de las variables del servidor.

| ENV          | POR DEFECTO           | DESCRIPCIÓN                                               |
| :----------- | :-------------------- | :-------------------------------------------------------- |
| SIFME_DOMAIN | http://localhost:3000 | Nombre del dominio, para la carga de archivos al sistema. |

- **Base de datos**

El sistema está utilizando _postgresql_ como sistema de gestión de bases de datos, para lo cual es necesario estalecer las credenciales de acceso a dicho sistema de base de datos.

| ENV                | POR DEFECTO | DESCRIPCIÓN                            |
| :----------------- | :---------- | :------------------------------------- |
| SIFME_PGC_HOST     | localhost   | Host de la base de datos.              |
| SIFME_PGC_PORT     | 5432        | Puerto utilizado por la base de datos. |
| SIFME_PGC_USER     | postgres    | Usuario de la base de datos.           |
| SIFME_PGC_PASSWORD | postgres    | Contraseña de la base de datos.        |
| SIFME_PGC_DATABASE | sisho       | Nombre de la base de datos.            |
