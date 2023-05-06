# The Coolest API with Love

Este proyecto es una API en Node.js que utiliza SQLite como base de datos y Swagger para la documentación de las rutas.

## Estructura

El archivo principal de la aplicación se encuentra en index.js, mientras que el control de las rutas se encuentra en la carpeta routes. Las rutas pasan al archivo controller, depués al archivo dao y por último a un archivo de queries.

## Requisitos previos

Antes de poder utilizar esta API, necesitarás instalar los siguientes paquetes en tu equipo:

Node.js
Extensión visual code SQLite Viewer

## Instalación

Para instalar la API, sigue los siguientes pasos:

1. Clona el repositorio en tu equipo:

```sh

git clone https://github.com/Mishkacodelover/the_coolestApi_withLove.git

```

2. Instala las dependencias:

```sh
cd the_coolestApi_withLove
npm install

```

3. Base de datos:

```sh
npm run db-init

```

Para crear una nueva tabla:

- Crear un nuevo archivo 'table.js'. Puede copiar el mismo código que hay en el archivo 'table_user.js' , tan solo tiene que cambiar el nombre de la tabla y los campos de la tabla.
- Después ejecute los siguientes comandos:

```sh
cd the_coolestApi_withLove
node table.js
```

- Estos comandos crean automáticamente la nueva tabla.

## Uso

Para iniciar la API, utiliza el siguiente comando:

```sh
cd app
npm start
```

## Swagger

Para acceder a la documentación de la API en tu navegador con Swagger, utiliza la siguiente dirección:

```sh

http://localhost:3000/api-doc/

```

## Docker

## Contribución

Si quieres contribuir a este proyecto, puedes crear un Pull Request en GitHub. Asegúrate de incluir una descripción clara y detallada de los cambios que propones.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
