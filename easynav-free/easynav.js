/**
 * Easynav Free - Herramientas de Usabilidad Web
 * Script de instalación automática
 * 
 * IMPORTANTE: Esto NO es una solución de accesibilidad real.
 * Para verdadera accesibilidad visita https://accessibility.cl
 */

(function () {
  'use strict';

  // ============================================
  // INTERNACIONALIZACIÓN (i18n)
  // ============================================
  const i18n = {
    es: {
      brand: 'Herramientas por Accessibility.cl',
      reset: 'Restablecer',
      decreaseFont: 'Reducir tamaño de fuente',
      increaseFont: 'Aumentar tamaño de fuente',
      toggleContrast: 'Alto Contraste',
      ariaLabel: 'Herramientas de usabilidad',
      resetConfig: 'Restablecer configuración'
    },
    en: {
      brand: 'Tools by Accessibility.cl',
      reset: 'Reset',
      decreaseFont: 'Decrease font size',
      increaseFont: 'Increase font size',
      toggleContrast: 'High Contrast',
      ariaLabel: 'Usability tools',
      resetConfig: 'Reset settings'
    },
    pt: {
      brand: 'Ferramentas por Accessibility.cl',
      reset: 'Redefinir',
      decreaseFont: 'Diminuir tamanho da fonte',
      increaseFont: 'Aumentar tamanho da fonte',
      toggleContrast: 'Alto Contraste',
      ariaLabel: 'Ferramentas de usabilidade',
      resetConfig: 'Redefinir configurações'
    },
    fr: {
      brand: 'Outils par Accessibility.cl',
      reset: 'Réinitialiser',
      decreaseFont: 'Réduire la taille de police',
      increaseFont: 'Augmenter la taille de police',
      toggleContrast: 'Contraste Élevé',
      ariaLabel: 'Outils d\'utilisabilité',
      resetConfig: 'Réinitialiser les paramètres'
    },
    de: {
      brand: 'Werkzeuge von Accessibility.cl',
      reset: 'Zurücksetzen',
      decreaseFont: 'Schriftgröße verkleinern',
      increaseFont: 'Schriftgröße vergrößern',
      toggleContrast: 'Hoher Kontrast',
      ariaLabel: 'Benutzerfreundlichkeitstools',
      resetConfig: 'Einstellungen zurücksetzen'
    },
    it: {
      brand: 'Strumenti di Accessibility.cl',
      reset: 'Ripristina',
      decreaseFont: 'Riduci dimensione carattere',
      increaseFont: 'Aumenta dimensione carattere',
      toggleContrast: 'Alto Contrasto',
      ariaLabel: 'Strumenti di usabilità',
      resetConfig: 'Ripristina impostazioni'
    },
    ca: {
      brand: 'Eines per Accessibility.cl',
      reset: 'Restablir',
      decreaseFont: 'Reduir mida de la font',
      increaseFont: 'Augmentar mida de la font',
      toggleContrast: 'Alt Contrast',
      ariaLabel: 'Eines d\'usabilitat',
      resetConfig: 'Restablir configuració'
    }
  };

  // Detectar idioma del documento
  function getLanguage() {
    const htmlLang = document.documentElement.lang || 'es';
    const lang = htmlLang.split('-')[0].toLowerCase(); // 'en-US' -> 'en'
    return i18n[lang] ? lang : 'es'; // Fallback a español
  }

  // Obtener textos del idioma actual
  function t(key) {
    const lang = getLanguage();
    return i18n[lang][key] || i18n.es[key];
  }

  // Configuración inicial
  const config = {
    fontSize: 100, // Porcentaje base
    highContrast: false,
    maxFontSize: 150,
    minFontSize: 80,
    fontStep: 10
  };

  // Función para crear los estilos
  function createStyles() {
    const style = document.createElement('style');
    style.id = 'easynav---styles';
    style.textContent = `
      /* Estilos base de Easynav - Barra horizontal en desktop */
      .easynav---container {
        position: relative;
        width: 100%;
        background: #f8f9fa;
        border-bottom: 1px solid #e5e5e5;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .easynav---bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        padding: 8px 20px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .easynav---label {
        font-size: 12px;
        font-weight: 600;
        color: #1a1a1a!important;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-right: auto;
        text-decoration: none;
        transition: color 0.2s;
      }

      .easynav---label:hover {
        color: #2563eb;
      }

      .easynav---fonts {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .easynav---font-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-weight: 700;
        color: #1a1a1a;
        background: white;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .easynav---font-btn:hover:not(:disabled) {
        background: #e9ecef;
        border-color: #adb5bd;
      }

      .easynav---font-btn:disabled {
        color: #999;
        cursor: not-allowed;
        background: #e9ecef;
        border-color: #ccc;
      }

      .easynav---font-btn--small {
        font-size: 12px;
      }

      .easynav---font-btn--large {
        font-size: 16px;
      }

      .easynav---contrast-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: white;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        padding: 4px;
      }

      .easynav---contrast-btn:hover {
        background: #e9ecef;
        border-color: #adb5bd;
      }

      .easynav---contrast-btn.easynav---active {
        background: #333;
        border-color: #333;
      }

      .easynav---contrast-btn.easynav---active svg path {
        fill: white;
      }

      .easynav---contrast-icon {
        width: 20px;
        height: 20px;
      }

      .easynav---reset-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        font-size: 11px;
        font-weight: 600;
        color: #999;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: not-allowed;
        transition: all 0.2s;
        text-transform: uppercase;
      }

      .easynav---reset-btn.easynav---active {
        color: #1a1a1a;
        border-color: #999;
        background: white;
        cursor: pointer;
      }

      .easynav---reset-btn.easynav---active:hover {
        color: #000;
        border-color: #666;
        background: #e9ecef;
      }
.easynav---reset-btn span:first-child {
  font-size: 20px;
  display: flex;
  height: 20px;
  width: 20px;
  line-height: 10px;
  justify-content: center;
  align-items: center;
}

      /* Modo de alto contraste */
      html.easynav---high-contrast,
      html.easynav---high-contrast body {
        background-color: #333 !important;
        color: #fff !important;
      }

      html.easynav---high-contrast * {
        background-color: #333;
      }

      html.easynav---high-contrast h1,
      html.easynav---high-contrast h2,
      html.easynav---high-contrast h3,
      html.easynav---high-contrast h4,
      html.easynav---high-contrast h5,
      html.easynav---high-contrast h6,
      html.easynav---high-contrast p,
      html.easynav---high-contrast button,
      html.easynav---high-contrast select,
      html.easynav---high-contrast a,
      html.easynav---high-contrast span,
      html.easynav---high-contrast article,
      html.easynav---high-contrast li,
      html.easynav---high-contrast label,
      html.easynav---high-contrast input,
      html.easynav---high-contrast textarea,
      html.easynav---high-contrast div,
      html.easynav---high-contrast section,
      html.easynav---high-contrast header,
      html.easynav---high-contrast footer,
      html.easynav---high-contrast nav,
      html.easynav---high-contrast main,
      html.easynav---high-contrast aside,
      html.easynav---high-contrast td,
      html.easynav---high-contrast th,
      html.easynav---high-contrast i {
        color: #fff !important;
        background-color: transparent;
      }

      html.easynav---high-contrast a:hover {
        color: #ffff00 !important;
      }

      html.easynav---high-contrast button:hover,
      html.easynav---high-contrast input[type="submit"]:hover {
        background-color: #fff !important;
        color: #333 !important;
      }

      html.easynav---high-contrast img {
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
        background-color: #333 !important;
      }

      /* Ocultar imágenes de fondo y forzar color sólido */
      html.easynav---high-contrast *:not(.easynav---container):not(.easynav---container *) {
        background-image: none !important;
        background-color: #333 !important;
      }

      /* Excepciones para elementos que necesitan fondo transparente */
      html.easynav---high-contrast h1:not(.easynav---container *),
      html.easynav---high-contrast h2:not(.easynav---container *),
      html.easynav---high-contrast h3:not(.easynav---container *),
      html.easynav---high-contrast h4:not(.easynav---container *),
      html.easynav---high-contrast h5:not(.easynav---container *),
      html.easynav---high-contrast h6:not(.easynav---container *),
      html.easynav---high-contrast p:not(.easynav---container *),
      html.easynav---high-contrast span:not(.easynav---container *),
      html.easynav---high-contrast a:not(.easynav---container *),
      html.easynav---high-contrast strong:not(.easynav---container *),
      html.easynav---high-contrast em:not(.easynav---container *),
      html.easynav---high-contrast b:not(.easynav---container *),
      html.easynav---high-contrast i:not(.easynav---container *),
      html.easynav---high-contrast small:not(.easynav---container *),
      html.easynav---high-contrast label:not(.easynav---container *) {
        background-color: transparent !important;
      }

      html.easynav---high-contrast input,
      html.easynav---high-contrast textarea,
      html.easynav---high-contrast select {
        border: 1px solid #fff !important;
        background-color: #333 !important;
      }

      html.easynav---high-contrast button,
      html.easynav---high-contrast [role="button"] {
        border: 1px solid #fff !important;
      }

      html.easynav---high-contrast a {
        text-decoration: underline;
      }

      /* Barra de Easynav en alto contraste */
      html.easynav---high-contrast .easynav---container {
        background-color: #1a1a1a !important;
        border-color: #fff !important;
      }

      html.easynav---high-contrast .easynav---font-btn,
      html.easynav---high-contrast .easynav---contrast-btn,
      html.easynav---high-contrast .easynav---reset-btn {
        background-color: #333 !important;
        border-color: #fff !important;
        color: #fff !important;
      }

      html.easynav---high-contrast .easynav---font-btn:hover,
      html.easynav---high-contrast .easynav---contrast-btn:hover,
      html.easynav---high-contrast .easynav---reset-btn:hover {
        background-color: #fff !important;
        color: #333 !important;
      }

      html.easynav---high-contrast .easynav---contrast-btn.easynav---active {
        background-color: #fff !important;
      }

      html.easynav---high-contrast .easynav---contrast-btn.easynav---active svg path {
        fill: #fff !important;
      }

      html.easynav---high-contrast .easynav---label {
        color: #fff !important;
      }

      /* Mobile: Barra horizontal adaptada */
      @media (max-width: 768px) {

        .easynav---bar {
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px 12px;
        }

        .easynav---label {
          font-size: 11px;
          margin-right: auto;
        }

        .easynav---font-btn {
          width: 28px;
          height: 28px;
        }

        .easynav---font-btn--small {
          font-size: 11px;
        }

        .easynav---font-btn--large {
          font-size: 14px;
        }

        .easynav---contrast-btn {
          width: 28px;
          height: 28px;
        }

        .easynav---contrast-icon {
          width: 16px;
          height: 16px;
        }

        .easynav---reset-btn {
          padding: 4px 8px;
          font-size: 10px;
        }

        .easynav---reset-btn span:last-child {
          display: none;
        }
      }

      /* Modo flotante (desktop con scroll) */
      .easynav---container.easynav---floating {
        position: fixed;
        top: 20px;
        right: 20px;
        left: auto;
        width: auto;
        border-radius: 12px;
        border: 1px solid #e5e5e5;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        cursor: move;
        animation: easynav-scaleIn 0.3s ease;
      }

      .easynav---container.easynav---floating .easynav---bar {
        align-items: center;
        justify-content: center;
        max-width: 300px;
        flex-wrap: wrap;
        width: 300px;
        padding: 10px 16px;
        gap: 12px;
      }

     .easynav---container.easynav---floating .easynav---label {
  display: flex;
  margin: 0px;
  width: 100%;
}

      .easynav---container.easynav---floating.easynav---dragging {
        opacity: 0.9;
        cursor: grabbing;
        box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      }

      @media (max-width: 768px) {
        .easynav---container.easynav---floating {
          position: relative;
          top: auto;
          right: auto;
          width: 100%;
          border-radius: 0;
          box-shadow: none;
          cursor: default;
        }
      }

      /* Animaciones */
      @keyframes easynav-fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes easynav-fadeInDownHeight {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes easynav-scaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    return style;
  }

  // Función para crear la estructura HTML
  function createHTML() {
    const nav = document.createElement('nav');
    nav.id = 'easynav---main';
    nav.className = 'easynav---container';
    nav.setAttribute('aria-label', t('ariaLabel'));

    nav.innerHTML = `
      <!-- Barra horizontal para desktop -->
      <div class="easynav---bar">
        <a href="https://accessibility.cl" target="_blank" rel="noopener" class="easynav---label">${t('brand')}</a>
        
        <div class="easynav---fonts">
          <button 
            id="easynav---decrease-font" 
            class="easynav---font-btn easynav---font-btn--small"
            aria-label="${t('decreaseFont')}"
            title="${t('decreaseFont')}"
          >A</button>
          <button 
            id="easynav---increase-font" 
            class="easynav---font-btn easynav---font-btn--large"
            aria-label="${t('increaseFont')}"
            title="${t('increaseFont')}"
          >A</button>
        </div>

        <button 
          id="easynav---toggle-contrast" 
          class="easynav---contrast-btn"
          aria-label="${t('toggleContrast')}"
          title="${t('toggleContrast')}"
        >
          <svg class="easynav---contrast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9791 4.40469e-05C9.60981 8.46401e-05 7.29378 0.70267 5.32384 2.01896C3.3539 3.33524 1.81852 5.20611 0.91186 7.39499C0.00519581 9.58386 -0.232033 11.9924 0.230172 14.3161C0.692377 16.6398 1.83326 18.7743 3.50854 20.4496C4.61892 21.5709 5.93992 22.4619 7.39566 23.0711C8.85139 23.6804 10.4132 23.9961 11.9913 24C13.5694 24.0038 15.1327 23.6959 16.5914 23.0938C18.0501 22.4917 19.3755 21.6073 20.4914 20.4914C21.6072 19.3755 22.4916 18.0502 23.0938 16.5915C23.6959 15.1328 24.0038 13.5695 24 11.9914C23.9961 10.4133 23.6804 8.85155 23.0711 7.39583C22.4618 5.94011 21.5709 4.61912 20.4496 3.50875C19.3398 2.39288 18.0197 1.50821 16.5658 0.90594C15.1118 0.303669 13.5528 -0.00423756 11.9791 4.40469e-05V4.40469e-05ZM1.71112 11.9792C1.71112 6.31743 6.31725 1.71135 11.9791 1.71135V22.247C6.31725 22.247 1.71112 17.6409 1.71112 11.9792Z" fill="black"/>
          </svg>
        </button>

        <button 
          id="easynav---reset" 
          class="easynav---reset-btn"
          aria-label="${t('resetConfig')}"
          disabled
        >
          <span aria-hidden="true">↻</span>
          <span>${t('reset')}</span>
        </button>
      </div>
    `;

    return nav;
  }

  // Función para guardar configuración en localStorage
  function saveConfig() {
    localStorage.setItem('easynav-config', JSON.stringify(config));
  }


  // Función para cargar configuración desde localStorage
  function loadConfig() {
    const saved = localStorage.getItem('easynav-config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(config, parsed);
      } catch (e) {
        console.warn('Easynav: Error al cargar configuración', e);
      }
    }
  }

  // Función para aplicar el tamaño de fuente
  function applyFontSize() {
    const scale = config.fontSize / 100;

    // Crear o actualizar stylesheet dinámico
    let dynamicStyle = document.getElementById('easynav---dynamic-font-styles');
    if (!dynamicStyle) {
      dynamicStyle = document.createElement('style');
      dynamicStyle.id = 'easynav---dynamic-font-styles';
      document.head.appendChild(dynamicStyle);
    }

    if (config.fontSize === 100) {
      // Remover estilos cuando está en 100%
      dynamicStyle.textContent = '';
      document.body.style.zoom = '';
    } else {
      // Usar zoom para escalar todo el contenido (excepto la barra de easynav)
      // zoom es ampliamente soportado y escala tanto texto como elementos
      document.body.style.zoom = scale;

      // Contrarrestar el zoom en la barra de easynav para que mantenga su tamaño
      dynamicStyle.textContent = `
        .easynav---container {
          zoom: ${1 / scale};
        }
      `;
    }
  }

  // Función para aplicar alto contraste
  function applyHighContrast() {
    if (config.highContrast) {
      document.documentElement.classList.add('easynav---high-contrast');
    } else {
      document.documentElement.classList.remove('easynav---high-contrast');
    }
  }

  // Función para actualizar el estado del botón reset
  function updateResetButton() {
    const resetBtn = document.getElementById('easynav---reset');
    const decreaseBtn = document.getElementById('easynav---decrease-font');
    const increaseBtn = document.getElementById('easynav---increase-font');
    const contrastBtn = document.getElementById('easynav---toggle-contrast');

    const hasChanges = config.fontSize !== 100 || config.highContrast;

    if (hasChanges) {
      resetBtn.classList.add('easynav---active');
      resetBtn.disabled = false;
    } else {
      resetBtn.classList.remove('easynav---active');
      resetBtn.disabled = true;
    }

    // Actualizar estado de botones de fuente
    decreaseBtn.disabled = config.fontSize <= config.minFontSize;
    increaseBtn.disabled = config.fontSize >= config.maxFontSize;

    // Actualizar estado visual del botón de contraste
    if (config.highContrast) {
      contrastBtn.classList.add('easynav---active');
    } else {
      contrastBtn.classList.remove('easynav---active');
    }
  }

  // Función para inicializar eventos
  function initializeEvents() {
    // Disminuir tamaño de texto
    document.getElementById('easynav---decrease-font').addEventListener('click', function () {
      if (config.fontSize > config.minFontSize) {
        config.fontSize -= config.fontStep;
        applyFontSize();
        saveConfig();
        updateResetButton();
      }
    });

    // Aumentar tamaño de texto
    document.getElementById('easynav---increase-font').addEventListener('click', function () {
      if (config.fontSize < config.maxFontSize) {
        config.fontSize += config.fontStep;
        applyFontSize();
        saveConfig();
        updateResetButton();
      }
    });

    // Toggle alto contraste
    document.getElementById('easynav---toggle-contrast').addEventListener('click', function () {
      config.highContrast = !config.highContrast;
      applyHighContrast();
      saveConfig();
      updateResetButton();
    });

    // Restablecer configuración
    document.getElementById('easynav---reset').addEventListener('click', function () {
      config.fontSize = 100;
      config.highContrast = false;
      applyFontSize();
      applyHighContrast();
      saveConfig();
      updateResetButton();
    });

    // Scroll listener para modo flotante (solo desktop)
    initFloatingMode();
  }

  // Función para inicializar modo flotante con drag and drop
  function initFloatingMode() {
    const container = document.getElementById('easynav---main');
    let isDragging = false;
    let startX, startY, initialX, initialY;
    const scrollThreshold = 100; // Pixels de scroll para activar modo flotante

    // Detectar scroll para activar/desactivar modo flotante
    function handleScroll() {
      // Solo en desktop (> 768px)
      if (window.innerWidth <= 768) {
        container.classList.remove('easynav---floating');
        container.style.left = '';
        container.style.top = '';
        return;
      }

      if (window.scrollY > scrollThreshold) {
        if (!container.classList.contains('easynav---floating')) {
          container.classList.add('easynav---floating');
          // Resetear posición al activar
          container.style.left = '';
          container.style.top = '';
          container.style.right = '20px';
        }
      } else {
        container.classList.remove('easynav---floating');
        container.style.left = '';
        container.style.top = '';
        container.style.right = '';
      }
    }

    // Drag and Drop
    function handleMouseDown(e) {
      if (!container.classList.contains('easynav---floating')) return;
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

      isDragging = true;
      container.classList.add('easynav---dragging');

      const rect = container.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      initialX = rect.left;
      initialY = rect.top;

      e.preventDefault();
    }

    function handleMouseMove(e) {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newX = initialX + deltaX;
      let newY = initialY + deltaY;

      // Limitar dentro de la ventana
      const rect = container.getBoundingClientRect();
      newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));

      container.style.right = 'auto';
      container.style.left = newX + 'px';
      container.style.top = newY + 'px';
    }

    function handleMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('easynav---dragging');
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // También manejar resize
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768) {
        container.classList.remove('easynav---floating');
        container.style.left = '';
        container.style.top = '';
        container.style.right = '';
      }
    });
  }

  // Función principal de inicialización
  function init() {
    // Esperar a que toda la página (DOM + recursos de red) esté completamente cargada
    if (document.readyState !== 'complete') {
      window.addEventListener('load', init);
      return;
    }

    // Verificar si ya está instalado
    if (document.getElementById('easynav---main')) {
      console.warn('Easynav ya está instalado en esta página');
      return;
    }

    // Crear e insertar estilos
    const styles = createStyles();
    document.head.appendChild(styles);

    // Crear e insertar HTML
    const nav = createHTML();

    // Insertar como primer elemento del body
    document.body.insertBefore(nav, document.body.firstChild);

    // Cargar configuración guardada
    loadConfig();
    applyFontSize();
    applyHighContrast();
    updateResetButton();

    // Inicializar eventos
    initializeEvents();

    console.log('Easynav Free instalado correctamente');
  }

  // Iniciar la instalación
  init();

  // Exponer API pública (opcional)
  window.Easynav = {
    version: '1.0.0',
    reset: function () {
      config.fontSize = 100;
      config.highContrast = false;
      applyFontSize();
      applyHighContrast();
      saveConfig();
      updateResetButton();
    },
    getConfig: function () {
      return { ...config };
    }
  };

})();
