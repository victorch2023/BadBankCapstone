<div align="center" id="top"> 
  <img src="./.github/app.gif" alt=“Capstone BadBank” />

  &#xa0;

  <!-- <a href="https://eyeexercise.netlify.app">Demo</a> -->
</div>

<h1 align="center">Capstone BadBank</h1>


<p align="center">
  <a href="#dart-descripci%C3%B3n">Descripción</a> &#xa0; | &#xa0;
  <a href="#rocket-c%C3%B3mo-se-ejecuta">Cómo ejecutar</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-hoja-de-ruta-para-futuras-mejoras">Documentación</a> &#xa0; | &#xa0;
  <a href="#memo-licencia">Licencia</a> &#xa0; | &#xa0;
  <a href="https://github.com/victorch2023" target="_blank">Autor</a>
</p>

<br>


## :dart: Descripción ##

Ésta es una app que simula a nivel académico una solución sencilla de banco. Con simples funciones como “Crear cuenta de usuario”, “login”, “realizar depósitos en la cuenta” y “realizar retiros de la misma cuenta”. Cada nuevo usuario registrado y logeado inicia su cuenta con un saldo ficticio de USD 100. En la app hay una pestaña final llama “All data” que tiene como finalidad mostrar todos los usuarios y transacciones creadas, para un monitoreo más completo de la base de datos para una mejor comprensión del aplicativo.

Cabe indicar que la app al ser una simulación académica no cuenta con los mecanismos correspondiente de ciberseguridad que debería tener cualquier banco. Además simula operaciones con una divisa ficticia a modo de ejercicio.



## :rocket: Cómo se ejecuta ##

A través de cualquier navegador entrando al link:
[Run] (https://victorch2023.github.io/BadBankCapstone/#/)

La función de “Sign Up con Facebook” y “Login con Facebook” por el momento solo funciona con cuentas de Facebook previamente indicados para que el autor los registre como cuentas autorizadas para probar esta función. De no contar con una cuenta autorizada a la mano, se puede busca en “All data” y hacer login con un usuario que cuente con email, pero con el campo de password vacío. Este tipo de usuario fue creado con cuentas de Facebook ya registradas.


## :pencil: Documentación de SDK usados ##

Esta app usa una base de datos alojado de manera externa en un servicio de Firebase (Google) para poder conservar de manera persistente los datos creados y actualizados. Para configurar esta solución se recurrió a la correspondiente documentación especificada en el siguiente link.
https://firebase.google.com/docs/web/setup?authuser=0&hl=es#add-sdk-and-initialize

Esta app también utiliza una autenticación externa (OAuth) de Facebook. Para configurar esta solución se recurrió a la correspondiente documentación especificada en el siguiente link.
https://developers.facebook.com/docs/facebook-login/web

Ambas documentaciones fueron útiles en gran medida, sin embargo, también fue necesario realizar más indagaciones e investigación para pequeños ajustes requeridos para el total funcionamiento de estas soluciones.



## :memo: Licencia ##

This project is under license from MIT. For more details, see the [LICENSE](./LICENSE) file.


Made with :heart: by <a href="https://github.com/victorch2023" target="_blank">victorch2023</a>

&#xa0;

<a href="#top">Back to top</a>
