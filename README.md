# pas-website

Sitio de **PAS — Proyectos Ambientales y Sustentables**.
Publicado en GitHub Pages con dominio propio: <https://proyectos-ambientales-sustentables.com/>

HTML, CSS y JavaScript puros. **Sin framework, sin npm, sin proceso de compilación.**
Lo que está en el repositorio es exactamente lo que se sirve.

---

## Estructura

```
/
├── index.html                  Inicio
├── servicios.html              Los 4 servicios (#auditorias #impacto #asesoria #capacitacion)
├── cursos.html                 Catálogo de cursos
├── nosotros.html               Misión, carta del fundador, cómo trabajamos
├── contacto.html               Formulario + contacto directo
├── 404.html                    Página de error (usa rutas absolutas, a propósito)
├── blog/
│   ├── index.html              Índice con filtro por categoría
│   ├── plantilla-articulo.html PLANTILLA — no se publica ni se enlaza
│   └── *.html                  Un archivo por artículo
├── assets/
│   ├── css/site.css            Única hoja de estilos del sitio
│   ├── js/site.js              Único script del sitio
│   └── img/
├── CNAME                       Dominio propio — NO BORRAR
├── .nojekyll                   Desactiva Jekyll — NO BORRAR
├── robots.txt
└── sitemap.xml
```

> **`.nojekyll` y `CNAME` son imprescindibles.** Sin `CNAME` el dominio propio deja de
> funcionar. Sin `.nojekyll`, GitHub Pages procesa el sitio con Jekyll, que ignora los
> archivos y carpetas que empiezan con `_`. Ambos empiezan con punto o van sin extensión,
> así que algunos gestores de archivos los ocultan: al copiar el sitio, comprueba que viajen.

---

## Publicar un artículo nuevo

1. **Copia la plantilla** y renómbrala con el slug del artículo, en minúsculas y con guiones:

   ```
   blog/plantilla-articulo.html  ->  blog/residuos-peligrosos-almacen-temporal.html
   ```

   El nombre del archivo **es** la URL, y Google lo lee. Que describa el tema.

2. **Abre el archivo y sustituye los marcadores `{{...}}`.** Están todos documentados en
   el comentario del inicio de la plantilla: título, descripción, slug, fechas, categoría,
   minutos de lectura, entradilla y cuerpo.

3. **Cambia la etiqueta robots** de `noindex,nofollow` a `index,follow`, y borra el
   comentario de instrucciones del inicio.

4. **Añade la tarjeta en `blog/index.html`**, al principio de la lista (el artículo más
   reciente va arriba). Copia una tarjeta existente y cambia `href`, `data-cat`, la
   categoría, la fecha, el título y el resumen.

   Los valores válidos de `data-cat` son: `auditorias`, `impacto`, `asesoria`,
   `capacitacion`. Deben coincidir con los del filtro de esa misma página.

5. **Añade la URL a `sitemap.xml`**, con la fecha de publicación en `<lastmod>`.

6. Si el artículo merece estar en la portada, cambia también una de las tres tarjetas de
   la sección **Blog** en `index.html`.

### Escribir el cuerpo

Usa solo estas etiquetas, que ya tienen estilo:

| Para | Escribe |
|---|---|
| Sección | `<h2 id="mi-seccion">Título</h2>` |
| Subsección | `<h3>Título</h3>` |
| Párrafo | `<p>…</p>` |
| Destacado | `<strong>…</strong>` |
| Enlace | `<a class="link" href="otro-articulo.html">…</a>` |
| Lista | `<ul><li>…</li></ul>` |
| Lista numerada | `<ol><li>…</li></ol>` |
| Cita destacada | `<blockquote>…</blockquote>` |
| Tabla | `<div class="table-wrap"><table>…</table></div>` |

Cada `<h2>` necesita su `id` para que funcione el índice del artículo. La tabla **debe** ir
envuelta en `<div class="table-wrap">` o romperá el diseño en móvil.

---

## Cambiar el número de WhatsApp

El número actual (**55 2067 6290**) es provisional. Está escrito directamente en el HTML,
no en JavaScript, para que los enlaces sigan funcionando aunque el visitante tenga el
JavaScript desactivado.

Para cambiarlo, haz **búsqueda y reemplazo en todo el proyecto** con estas dos cadenas:

| Buscar         | Dónde aparece |
|----------------|---|
| `525559657126` | Enlaces `wa.me` y el `telephone` de los datos estructurados |
| `55 5965 7126` | El número visible en pantalla |

El `52` inicial es la lada de México y **debe conservarse** en los enlaces `wa.me`.

Cada aparición lleva al lado un comentario `<!-- CAMBIAR-TELEFONO -->` para que sea fácil
localizarlas revisando el archivo.

---

## Cambiar el correo

El correo de contacto es `cotizaciones@proyectos-ambientales-sustentables.com`. Aparece en
enlaces `mailto:`, en el atributo `data-email` del formulario de `contacto.html` y en los
datos estructurados. Búsqueda y reemplazo de esa cadena en todo el proyecto.

El formulario **no envía correos por sí solo**: GitHub Pages es estático y no ejecuta código
de servidor. Al enviarlo, `assets/js/site.js` compone un enlace `mailto:` con los datos y
abre la aplicación de correo del visitante. Si en el futuro quieren recibir los mensajes
directamente en una bandeja, hay que conectar un servicio externo tipo Formspree o
Web3Forms.

---

## Contenido pendiente de revisar

Los bloques que **no** provienen de textos entregados por PAS están marcados en el HTML.
Búscalos y confírmalos o sustitúyelos:

- `<!-- CONTENIDO SUGERIDO - REVISAR CON EL CLIENTE -->` — viñetas de «qué incluye» de cada
  servicio, catálogo de cursos completo, y las cuatro etapas de «cómo trabajamos».
- `<!-- CONFIRMAR CON EL CLIENTE -->` — la franja de tres atributos bajo el hero del inicio.
- `<!-- FRASE COMPLETADA - REVISAR -->` — el texto original de «Capacitación» estaba cortado
  a media frase y se completó.
- `<!-- CAMBIAR-TELEFONO -->` — el número provisional de WhatsApp.

No se inventaron acreditaciones, números de registro, años de experiencia ni nombres de
clientes. Si quieren mostrar esos datos, hay que añadirlos.

---

## Probar en local

Desde la raíz del proyecto:

```bash
python -m http.server 8099
```

Y abre <http://127.0.0.1:8099>. Hace falta un servidor: abriendo los `.html` con doble clic
(`file://`) las rutas de `blog/` no resuelven igual que en producción.

---

## Publicar

Es un sitio estático servido desde la rama del repositorio. Haz commit y push; GitHub Pages
publica solo. El despliegue tarda un par de minutos.

---

## Notas técnicas

- **Cabecera y pie están duplicados** en cada `.html`, a propósito. Cargarlos con `fetch()`
  perjudicaría el SEO y produciría un parpadeo al abrir la página. Si cambias un enlace del
  menú o del pie, cámbialo en todos los archivos.
- El enlace activo del menú se marca con `aria-current="page"`. Al copiar una página, mueve
  ese atributo al enlace que corresponda.
- Toda `<img>` lleva `width` y `height` explícitos. No los quites: evitan que el diseño
  salte mientras cargan las imágenes.
- Las imágenes están optimizadas al tamaño en que se muestran. Si añades fotos nuevas,
  redúcelas antes: ninguna debería pasar de ~200 KB.
- Las animaciones se desactivan solas si el sistema del visitante tiene activado
  «reducir movimiento».
