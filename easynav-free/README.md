# 🎯 Easynav Free

Herramientas de usabilidad web: ajuste de texto y alto contraste. Fácil de instalar en cualquier sitio.

> ⚠️ **IMPORTANTE**: Easynav Free ofrece herramientas de usabilidad, **NO es una solución de accesibilidad real**. Estas herramientas no reemplazan la verdadera accesibilidad web ni garantizan cumplimiento WCAG. Si necesitas accesibilidad real, visita [Accessibility.cl](https://accessibility.cl).

## ✨ Características

- **📏 Ajuste de tamaño de texto**: Aumenta o disminuye el tamaño del texto de toda la página (80% - 150%)
- **◐ Modo de alto contraste**: Mejora la legibilidad aumentando el contraste visual
- **💾 Persistencia automática**: Las preferencias del usuario se guardan en localStorage
- **📱 Diseño responsive**: Funciona perfectamente en móviles, tablets y escritorio
- **🌍 Multiidioma automático**: Detecta el atributo `lang` del HTML (es, en, pt, fr, de, it, ca)
- **♿ Herramientas de usabilidad**: Útiles pero NO reemplazan la accesibilidad real
- **⚡ Cero dependencias**: JavaScript puro, sin librerías externas
- **🎨 Iconos Unicode**: No requiere fuentes de iconos adicionales

## 🚀 Instalación

### Opción 1: Instalación básica

1. Descarga el archivo `easynav.js`
2. Súbelo a tu servidor web
3. Agrega esta línea en el `<head>` de tu HTML:

```html
<script src="ruta/a/easynav.js"></script>
```

### Opción 2: Instalación desde CDN (con SRI para seguridad)

```html
<script 
  src="https://cdn.jsdelivr.net/gh/usuario/easynav-free@1.0.0/easynav.min.js" 
  integrity="sha384-rNSnNSURPFaYLtRJvJesVwHOZ1VJW3LReqf76TW6NmW/QNIHtRq900EL/4xldFhW" 
  crossorigin="anonymous">
</script>
```

> 💡 **Subresource Integrity (SRI)**: El atributo `integrity` garantiza que el archivo no ha sido modificado. Ver [SRI-INTEGRITY.md](SRI-INTEGRITY.md) para más información.

### Opción 3: Instalación inline (para una página específica)

Copia todo el contenido de `easynav.js` y pégalo dentro de una etiqueta `<script>` en tu HTML:

```html
<script>
  // Pega aquí todo el contenido de easynav.js
</script>
```

## � Seguridad (SRI)

Si vas a servir Easynav desde un CDN, es altamente recomendable usar **Subresource Integrity (SRI)** para garantizar que el archivo no ha sido modificado.

**Hashes de integridad v1.0.0:**

```html
<!-- easynav.min.js (RECOMENDADO) -->
<script 
  src="https://tucdn.com/easynav/1.0.0/easynav.min.js" 
  integrity="sha384-rNSnNSURPFaYLtRJvJesVwHOZ1VJW3LReqf76TW6NmW/QNIHtRq900EL/4xldFhW" 
  crossorigin="anonymous">
</script>

<!-- easynav.js (versión completa) -->
<script 
  src="https://tucdn.com/easynav/1.0.0/easynav.js" 
  integrity="sha384-mGryAoyDg3dC/unRW9XP33Dx8O3Z6uOv/vUq7L4gGydGUOF+gwFPTe0ZVsXqXJLC" 
  crossorigin="anonymous">
</script>
```

📖 **Para más información sobre SRI y cómo generar tus propios hashes, consulta [SRI-INTEGRITY.md](SRI-INTEGRITY.md)**

## �📖 Uso

Una vez instalado, Easynav se carga automáticamente y aparece como una barra horizontal en la parte superior de la página con el texto "Herramientas por Accessibility.cl".

### Funcionalidades disponibles

1. **Aumentar/Disminuir texto**: Ajusta el tamaño base del texto de la página
2. **Alto contraste**: Activa un filtro de alto contraste para mejorar la visibilidad
3. **Restablecer**: Vuelve a la configuración predeterminada (se activa solo cuando hay cambios)
4. **Texto de voz**: (Próximamente - actualmente deshabilitado)

## 🎨 Personalización

### Cambiar la posición

Por defecto, Easynav aparece en la esquina superior derecha. Para cambiar la posición, modifica el CSS en el archivo `easynav.js`:

```css
.easynav---container {
  position: fixed;
  top: 20px;      /* Cambia esto */
  right: 30px;    /* Cambia esto */
  /* Para posición izquierda usa: left: 30px; */
}
```

### Cambiar colores

Busca las siguientes clases en el CSS dentro de `easynav.js` y modifica los colores:

```css
.easynav---button {
  color: #1a1a1a;           /* Color del texto */
  background: white;         /* Color de fondo */
  border: 1px solid #e5e5e5; /* Color del borde */
}
```

### Ajustar rangos de tamaño de fuente

Modifica la configuración al inicio del script:

```javascript
const config = {
  fontSize: 100,      // Tamaño inicial (%)
  maxFontSize: 150,   // Tamaño máximo (%)
  minFontSize: 80,    // Tamaño mínimo (%)
  fontStep: 10        // Incremento por clic (%)
};
```

## 🌍 Internacionalización (i18n)

Easynav Free detecta automáticamente el idioma del documento a través del atributo `lang` del HTML y muestra los textos en el idioma correspondiente.

### Idiomas soportados

| Código | Idioma | Brand |
|--------|--------|-------|
| `es` | Español | "Herramientas por Accessibility.cl" |
| `en` | English | "Tools by Accessibility.cl" |
| `pt` | Português | "Ferramentas por Accessibility.cl" |
| `fr` | Français | "Outils par Accessibility.cl" |
| `de` | Deutsch | "Werkzeuge von Accessibility.cl" |
| `it` | Italiano | "Strumenti di Accessibility.cl" |
| `ca` | Català | "Eines per Accessibility.cl" |

### Uso

Simplemente asegúrate de que tu HTML tenga el atributo `lang` definido:

```html
<!-- Para español -->
<html lang="es">

<!-- Para inglés -->
<html lang="en">

<!-- Para portugués -->
<html lang="pt">

<!-- También funciona con variantes regionales -->
<html lang="en-US">
<html lang="es-CL">
<html lang="pt-BR">
```

Si el idioma no está soportado, se usa español como fallback.

## 🔌 API de JavaScript

Easynav expone un objeto global `window.Easynav` con las siguientes propiedades y métodos:

### Propiedades

```javascript
// Versión de Easynav
console.log(window.Easynav.version); // "1.0.0"
```

### Métodos

```javascript
// Obtener la configuración actual
const config = window.Easynav.getConfig();
console.log(config);
// { fontSize: 110, highContrast: false, maxFontSize: 150, minFontSize: 80, fontStep: 10 }

// Restablecer toda la configuración
window.Easynav.reset();
```

### Eventos personalizados

Puedes escuchar cambios en la configuración:

```javascript
// Detectar cuando se cierra/abre el menú
document.getElementById('easynav---dropdown').addEventListener('click', function(e) {
  console.log('Menú interactuado');
});
```

## 🌐 Compatibilidad

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Opera (últimas 2 versiones)
- ✅ Chrome/Safari iOS
- ✅ Chrome Android

## 📱 Responsive

Easynav se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Menú flotante en esquina superior derecha
- **Tablet**: Ajusta el ancho del dropdown
- **Mobile**: Dropdown de ancho completo con márgenes mínimos

## 🛠️ Herramientas incluidas

Easynav incluye herramientas útiles pero honestas sobre sus límites:

- ✅ Navegación completa por teclado
- ✅ Atributos ARIA apropiados
- ✅ Compatible con lectores de pantalla
- ✅ Focus visible en elementos interactivos

> 💡 **Recuerda**: Estas herramientas mejoran la usabilidad pero **NO hacen tu sitio accesible**. La verdadera accesibilidad requiere diseño inclusivo desde el principio. [Aprende más](https://accessibility.cl).

### Atajos de teclado

- `Tab`: Navegar entre controles
- `Enter`/`Space`: Activar botones
- `Esc`: Cerrar el menú desplegable

## 🔧 Solución de problemas

### El botón no aparece

1. Verifica que el script esté cargando correctamente (mira la consola del navegador)
2. Asegúrate de que no haya errores de JavaScript en la página
3. Verifica que no haya otro elemento con `z-index` mayor que 99999

### Los estilos no se aplican correctamente

1. Verifica que no haya CSS en tu página con `!important` que sobrescriba los estilos
2. Asegúrate de que el script se carga antes del cierre de `</body>`

### La configuración no se guarda

1. Verifica que el navegador tenga localStorage habilitado
2. Comprueba que no estés en modo incógnito (localStorage se borra al cerrar)

## 📄 Estructura de clases CSS

Todas las clases usan el prefijo `easynav---` para evitar conflictos:

- `easynav---container`: Contenedor principal
- `easynav---button`: Botón principal
- `easynav---dropdown`: Menú desplegable
- `easynav---action-button`: Botones de acción
- `easynav---reset-button`: Botón de restablecer
- `easynav---high-contrast`: Clase aplicada al body en modo contraste

## 📦 Tamaño del archivo

- **Minificado**: ~12 KB
- **Sin minificar**: ~15 KB
- **Gzipped**: ~4 KB

## 🤝 Contribuir

Este es un proyecto de código abierto. Las contribuciones son bienvenidas.

## 📝 Licencia

MIT License - Uso libre para proyectos comerciales y personales.

## 🔮 Roadmap

- [ ] Soporte para texto a voz (Text-to-Speech)
- [ ] Más opciones de personalización de colores
- [ ] Modo oscuro
- [ ] Cursor grande
- [ ] Guía de lectura
- [ ] Pausar animaciones
- [ ] Simplificar fuentes (modo dislexia)

## 📞 Soporte

Para reportar problemas o sugerir mejoras, por favor abre un issue en el repositorio.

---

Hecho con ❤️ por [Accessibility.cl](https://accessibility.cl) - Para verdadera accesibilidad web, contáctanos.
