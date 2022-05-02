# Readme

## ¿Cómo correr la aplicación?

Primero se debe estar ubicado en la carpeta que se descargó desde GitHub. Luego ejecutar el siguiente comando:

### npm install

Y por último

### npm start

Se abrirá automáticamente el navegador en la ruta http://localhost:3000

# Algunas aclaraciones para los destinatarios de esta aplicación

Traté de hacer una aplicación escalable, es decir, pensando en que más personas tocarían el código en un futuro por ende intenté delegar responsabilidades lo más que pude. Es por esto que creé hooks personalizados y una carpeta utils con funciones para ser reutilizadas en caso de ser necesario.

Al clickear en algún usuario se abre una nueva pestaña porque de esta manera podía mantener el listado de usuarios. Pensé en agregar context o incluso session storage para poder tener la información disponible en caso de ir a algún perfil de usuario y volver a inicio para que el listado de usuarios buscados siga ahí. Pero quizá era complicarlo demasiado, creo que de esta manera lo solucioné bien.

Para las validaciones del formulario había pensado en deshabilitar el botón si no cumplía con los requisitos. Es una posibilidad que queda abierta y dejé el código comentado en caso de querer implementarla. Intenté cubrir todas las posibilidades de error, inclusive si escribieran con espacios en el input.

Aprovechando el componente Errors, también agregué las validaciones en caso de ingresar a la url de algún usuario y tratar de modificarla para buscar algo que no estuviera permitido y agregué una ruta particular para manejar los not found.

En relación a lo mencionado anteriormente, intenté eliminar toda responsabilidad del componente Home en cuanto a manejo de errores. Quería que quedara lo más limpio posible y que se encargue solamente de traer la información de usuarios y enviarla al siguiente componente. Con respecto al useLoading entiendo que no cumple gran funcionalidad y que, de hecho, no es 100% necesario pero al necesitar un loader en más de un componente creo que fue una buena opción para reutilizar código y evitar crear un estado propio dentro de todos los componentes en los que lo necesite.
