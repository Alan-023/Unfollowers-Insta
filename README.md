# Instagram Unfollowers

Script en JavaScript para detectar qué cuentas a las que sigues en Instagram **no te siguen de vuelta**, ejecutándose directamente desde la consola de tu navegador web sin instalar extensiones ni compartir tu contraseña con servicios externos.

---

## ⚠️ Importante: Cómo usarlo correctamente

Para que funcione, **debes copiar el contenido completo de [`script_final.js`](./script_final.js) y pegarlo dentro de la consola del navegador** estando en [Instagram](https://www.instagram.com/) con tu sesión iniciada.

> [!IMPORTANT]
> **El script funciona con tiempos de espera automáticos.**
> No arroja el resultado de forma instantánea: consulta tus listas en bloques de 100 usuarios y hace una pausa aleatoria de entre **1.5 y 3.5 segundos** entre cada página (`1500 ms` a `3500 ms`) para reducir el riesgo de que Instagram bloquee o limite temporalmente tu cuenta por exceso de peticiones.
> Si sigues o te siguen muchas cuentas, **ten paciencia y no cierres ni recargues la pestaña** hasta que aparezca el resultado final en la consola.

---

## 🚀 Paso a paso

1. **Inicia sesión en Instagram** desde tu navegador web en `https://www.instagram.com/`.
2. **Abre las Herramientas para desarrolladores** en esa misma pestaña:
   - **Windows / Linux:** presiona `F12` o `Ctrl + Shift + I` (o clic derecho en la página → **Inspeccionar**).
   - **macOS:** presiona `Cmd + Option + I`.
3. Ve a la pestaña **Consola** (*Console*).
   - *Nota:* Si es la primera vez que pegas código en la consola, navegadores como Chrome, Edge o Firefox pueden bloquear el pegado por seguridad. Si ves una advertencia, escribe `allow pasting` (o `permitir pegar`, según el idioma de tu navegador) y presiona `Enter`.
4. **Copia todo el código de [`script_final.js`](./script_final.js)**, pégalo en la consola y presiona `Enter`.
5. **Espera a que terminen los tiempos de espera:**
   - **Paso 1:** Obtendrá página por página las cuentas a las que sigues (`following`).
   - **Paso 2:** Obtendrá página por página las cuentas que te siguen (`followers`).
   - En la consola verás el progreso en tiempo real (`⏳ Obteniendo... (Página X, Encontrados: Y)`).
6. Al finalizar, el script comparará ambas listas y mostrará en la consola el resumen junto con cada `@usuario` que no te sigue de vuelta y el enlace directo a su perfil.

---

## ⏱️ ¿Por qué usa tiempos de espera?

Instagram aplica límites de velocidad (*rate limits*) a sus endpoints internos (`/api/v1/friendships/...`). Hacer muchas peticiones seguidas sin pausas suele provocar errores HTTP (como `429 Too Many Requests`) o bloqueos temporales en la cuenta.

Por eso [`script_final.js`](./script_final.js):
- Solicita páginas de hasta **100 usuarios** por petición.
- Introduce una espera aleatoria (`sleep`) de **1.5 a 3.5 segundos** entre cada página mientras queden resultados pendientes.

---

## 🛠️ Posibles mensajes de error

- **`❌ No se encontró el ID de usuario. Asegúrate de estar logueado.`**  
  El script lee la cookie `ds_user_id` de tu navegador. Asegúrate de estar dentro de `https://www.instagram.com/` y con tu sesión iniciada antes de pegar el código.
- **`❌ Error al obtener following/followers. (Código: XXX). ¡Es probable que Instagram te haya limitado temporalmente!`**  
  Instagram rechazó una de las peticiones (por ejemplo, por límite temporal de solicitudes). Espera unos minutos (o un par de horas si hiciste varios intentos seguidos) antes de volver a ejecutarlo.

---

## 🔒 Privacidad

Todo el proceso se ejecuta localmente en tu propio navegador utilizando tu sesión ya abierta en `instagram.com`. No se envían datos ni credenciales a servidores de terceros.
