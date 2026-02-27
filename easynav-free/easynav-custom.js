/**
 * Easynav Custom - Herramientas de Usabilidad Web Configurable
 * Versión personalizable con múltiples opciones
 * 
 * IMPORTANTE: Esto NO es una solución de accesibilidad real.
 * Para verdadera accesibilidad visita https://accessibility.cl
 * 
 * @version 2.0.0
 * @license MIT
 * @author Accessibility.cl
 */

(function (global, factory) {
  'use strict';
  
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(global);
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window) {
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

  // ============================================
  // CONFIGURACIÓN POR DEFECTO
  // ============================================
  const DEFAULTS = {
    // Apariencia
    theme: 'light',                    // 'light' | 'dark' | 'auto'
    position: 'top',                   // 'top' | 'bottom'
    primaryColor: '#5739ef',           // Color principal (botones activos, hover)
    backgroundColor: '#f8f9fa',        // Color de fondo de la barra
    textColor: '#1a1a1a',              // Color del texto
    borderColor: '#e5e5e5',            // Color del borde
    buttonBackground: '#ffffff',       // Fondo de botones
    buttonBorder: '#999999',           // Borde de botones
    borderRadius: '4px',               // Radio de bordes de botones
    
    // Tamaño de fuente
    fontSizeEnabled: true,             // Habilitar control de fuente
    fontSizeMin: 80,                   // Mínimo porcentaje
    fontSizeMax: 150,                  // Máximo porcentaje
    fontSizeStep: 10,                  // Incremento por clic
    fontSizeDefault: 100,              // Valor inicial
    
    // Alto contraste
    contrastEnabled: true,             // Habilitar botón de contraste
    contrastBackground: '#333333',     // Fondo en modo contraste
    contrastText: '#ffffff',           // Texto en modo contraste
    contrastLinkHover: '#ffff00',      // Color hover de links en contraste
    
    // Modo flotante
    floatingEnabled: true,             // Habilitar modo flotante
    floatingThreshold: 100,            // Pixels de scroll para activar
    floatingPosition: 'top-right',     // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    floatingDraggable: true,           // Permitir arrastrar
    
    // Comportamiento
    persistence: true,                 // Guardar preferencias en localStorage
    storageKey: 'easynav-config',      // Clave para localStorage
    zIndex: 99999,                     // z-index del contenedor
    autoDetectLanguage: true,          // Detectar idioma del atributo lang del HTML
    
    // Textos personalizables (si autoDetectLanguage=true, se ignoran y se usan las traducciones)
    labels: {
      decreaseFont: null,              // Auto: según idioma del documento
      increaseFont: null,              // Auto: según idioma del documento
      toggleContrast: null,            // Auto: según idioma del documento
      reset: null,                     // Auto: según idioma del documento
      ariaLabel: null                  // Auto: según idioma del documento
    },
    
    // Elementos visibles
    showBrand: true,                   // Mostrar label/marca
    showFontControls: true,            // Mostrar controles de fuente
    showContrastButton: true,          // Mostrar botón de contraste
    showResetButton: true,             // Mostrar botón reset
    
    // Callbacks
    onInit: null,                      // Callback al inicializar
    onFontChange: null,                // Callback al cambiar fuente
    onContrastChange: null,            // Callback al cambiar contraste
    onReset: null,                     // Callback al resetear
    onFloatingChange: null,            // Callback al cambiar modo flotante
    
    // Mobile
    mobileBreakpoint: 768,             // Breakpoint para mobile
    mobileFloating: false,             // Modo flotante en mobile
  };

  // ============================================
  // CLASE PRINCIPAL EASYNAV
  // ============================================
  class EasynavCustom {
    constructor(options = {}) {
      // Merge de opciones con defaults
      this.options = this._mergeDeep(DEFAULTS, options);
      
      // Estado interno
      this.state = {
        fontSize: this.options.fontSizeDefault,
        highContrast: false,
        isFloating: false,
        isDragging: false
      };
      
      // Referencias a elementos
      this.elements = {};
      
      // Bind de métodos
      this._handleScroll = this._handleScroll.bind(this);
      this._handleMouseDown = this._handleMouseDown.bind(this);
      this._handleMouseMove = this._handleMouseMove.bind(this);
      this._handleMouseUp = this._handleMouseUp.bind(this);
      this._handleResize = this._handleResize.bind(this);
    }

    // ============================================
    // MÉTODOS PÚBLICOS
    // ============================================
    
    /**
     * Inicializa Easynav
     */
    init() {
      if (document.readyState !== 'complete') {
        window.addEventListener('load', () => this.init());
        return this;
      }

      if (document.getElementById('easynav---main')) {
        console.warn('Easynav ya está instalado');
        return this;
      }

      this._loadState();
      this._render();

      if (typeof this.options.onInit === 'function') {
        this.options.onInit(this);
      }

      console.log('Easynav Custom v2.0.0 instalado');
      return this;
    }

    /**
     * Destruye la instancia de Easynav
     */
    destroy() {
      this._teardown({ removeDynamicStyles: true });

      // Resetear body zoom
      document.body.style.zoom = '';
      document.documentElement.classList.remove('easynav---high-contrast');

      return this;
    }

    /**
     * Aumenta el tamaño de fuente
     */
    increaseFontSize() {
      if (this.state.fontSize < this.options.fontSizeMax) {
        this.state.fontSize += this.options.fontSizeStep;
        this._applyFontSize();
        this._saveState();
        this._updateUI();
        
        if (typeof this.options.onFontChange === 'function') {
          this.options.onFontChange(this.state.fontSize, this);
        }
      }
      return this;
    }

    /**
     * Disminuye el tamaño de fuente
     */
    decreaseFontSize() {
      if (this.state.fontSize > this.options.fontSizeMin) {
        this.state.fontSize -= this.options.fontSizeStep;
        this._applyFontSize();
        this._saveState();
        this._updateUI();
        
        if (typeof this.options.onFontChange === 'function') {
          this.options.onFontChange(this.state.fontSize, this);
        }
      }
      return this;
    }

    /**
     * Establece un tamaño de fuente específico
     */
    setFontSize(size) {
      size = Math.max(this.options.fontSizeMin, Math.min(this.options.fontSizeMax, size));
      this.state.fontSize = size;
      this._applyFontSize();
      this._saveState();
      this._updateUI();
      
      if (typeof this.options.onFontChange === 'function') {
        this.options.onFontChange(this.state.fontSize, this);
      }
      return this;
    }

    /**
     * Activa/desactiva el alto contraste
     */
    toggleContrast() {
      this.state.highContrast = !this.state.highContrast;
      this._applyContrast();
      this._saveState();
      this._updateUI();
      
      if (typeof this.options.onContrastChange === 'function') {
        this.options.onContrastChange(this.state.highContrast, this);
      }
      return this;
    }

    /**
     * Establece el estado de alto contraste
     */
    setContrast(enabled) {
      this.state.highContrast = !!enabled;
      this._applyContrast();
      this._saveState();
      this._updateUI();
      
      if (typeof this.options.onContrastChange === 'function') {
        this.options.onContrastChange(this.state.highContrast, this);
      }
      return this;
    }

    /**
     * Resetea a valores por defecto
     */
    reset() {
      this.state.fontSize = this.options.fontSizeDefault;
      this.state.highContrast = false;
      this._applyFontSize();
      this._applyContrast();
      this._saveState();
      this._updateUI();
      
      if (typeof this.options.onReset === 'function') {
        this.options.onReset(this);
      }
      return this;
    }

    /**
     * Obtiene el estado actual
     */
    getState() {
      return { ...this.state };
    }

    /**
     * Obtiene las opciones actuales
     */
    getOptions() {
      return this._mergeDeep({}, this.options);
    }

    /**
     * Actualiza opciones en tiempo de ejecución
     */
    setOptions(newOptions) {
      this.options = this._mergeDeep(this.options, newOptions);
      this.state.fontSize = Math.max(
        this.options.fontSizeMin,
        Math.min(this.options.fontSizeMax, this.state.fontSize)
      );
      this._render();
      this._saveState();
      return this;
    }

    // ============================================
    // MÉTODOS PRIVADOS - ESTILOS
    // ============================================
    
    _createStyles() {
      const style = document.createElement('style');
      style.id = 'easynav---styles';
      style.textContent = this._generateCSS();
      document.head.appendChild(style);
    }

    _updateStyles() {
      const style = document.getElementById('easynav---styles');
      if (style) {
        style.textContent = this._generateCSS();
      }
    }

    _render() {
      this._teardown();
      this._createStyles();
      this._createHTML();
      this._applyState();
      this._initEvents();

      if (this.options.floatingEnabled) {
        this._handleScroll();
      }
    }

    _teardown({ removeDynamicStyles = false } = {}) {
      window.removeEventListener('scroll', this._handleScroll);
      window.removeEventListener('resize', this._handleResize);
      document.removeEventListener('mousemove', this._handleMouseMove);
      document.removeEventListener('mouseup', this._handleMouseUp);

      if (this.elements.container) {
        this.elements.container.removeEventListener('mousedown', this._handleMouseDown);
      }

      const container = document.getElementById('easynav---main');
      const styles = document.getElementById('easynav---styles');

      if (container) container.remove();
      if (styles) styles.remove();

      if (removeDynamicStyles) {
        const dynamicStyles = document.getElementById('easynav---dynamic-font-styles');
        if (dynamicStyles) dynamicStyles.remove();
      }

      this.elements = {};
      this.state.isFloating = false;
      this.state.isDragging = false;
    }

    _generateCSS() {
      const o = this.options;
      const pos = o.position === 'bottom' ? 'bottom: 0;' : 'top: 0;';
      const borderPos = o.position === 'bottom' ? 'border-top' : 'border-bottom';
      
      return `
        /* Easynav Custom Styles */
        .easynav---container {
          position: relative;
          ${o.position === 'bottom' ? 'position: fixed; bottom: 0; left: 0;' : ''}
          width: 100%;
          background: ${o.backgroundColor};
          ${borderPos}: 1px solid ${o.borderColor};
          z-index: ${o.zIndex};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          box-sizing: border-box;
        }

        .easynav---container * {
          box-sizing: border-box;
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
          color: ${o.textColor} !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-right: auto;
          text-decoration: none;
          transition: color 0.2s;
        }

        .easynav---label:hover {
          color: ${o.primaryColor} !important;
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
          color: ${o.textColor};
          background: ${o.buttonBackground};
          border: 1px solid ${o.buttonBorder};
          border-radius: ${o.borderRadius};
          cursor: pointer;
          transition: all 0.2s;
        }

        .easynav---font-btn:hover:not(:disabled) {
          background: ${o.primaryColor};
          border-color: ${o.primaryColor};
          color: white;
        }

        .easynav---font-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .easynav---font-btn--small { font-size: 12px; }
        .easynav---font-btn--large { font-size: 16px; }

        .easynav---contrast-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: ${o.buttonBackground};
          border: 1px solid ${o.buttonBorder};
          border-radius: ${o.borderRadius};
          cursor: pointer;
          transition: all 0.2s;
          padding: 4px;
        }

        .easynav---contrast-btn:hover {
          background: ${o.primaryColor};
          border-color: ${o.primaryColor};
        }

        .easynav---contrast-btn:hover svg path {
          fill: white;
        }

        .easynav---contrast-btn.easynav---active {
          background: ${o.primaryColor};
          border-color: ${o.primaryColor};
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
          border-radius: ${o.borderRadius};
          cursor: not-allowed;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .easynav---reset-btn.easynav---active {
          color: ${o.textColor};
          border-color: ${o.buttonBorder};
          background: ${o.buttonBackground};
          cursor: pointer;
        }

        .easynav---reset-btn.easynav---active:hover {
          background: ${o.primaryColor};
          border-color: ${o.primaryColor};
          color: white;
        }

        .easynav---reset-btn span:first-child {
          font-size: 18px;
        }

        /* Alto Contraste */
        html.easynav---high-contrast,
        html.easynav---high-contrast body {
          background-color: ${o.contrastBackground} !important;
          color: ${o.contrastText} !important;
        }

        html.easynav---high-contrast * {
          background-color: ${o.contrastBackground};
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
        html.easynav---high-contrast nav:not(.easynav---container),
        html.easynav---high-contrast main,
        html.easynav---high-contrast aside,
        html.easynav---high-contrast td,
        html.easynav---high-contrast th,
        html.easynav---high-contrast i {
          color: ${o.contrastText} !important;
          background-color: transparent;
        }

        html.easynav---high-contrast a:hover {
          color: ${o.contrastLinkHover} !important;
        }

        html.easynav---high-contrast img {
          filter: grayscale(100%);
          background-color: ${o.contrastBackground} !important;
        }

        html.easynav---high-contrast *:not(.easynav---container):not(.easynav---container *) {
          background-image: none !important;
          background-color: ${o.contrastBackground} !important;
        }

        html.easynav---high-contrast h1:not(.easynav---container *),
        html.easynav---high-contrast h2:not(.easynav---container *),
        html.easynav---high-contrast h3:not(.easynav---container *),
        html.easynav---high-contrast h4:not(.easynav---container *),
        html.easynav---high-contrast h5:not(.easynav---container *),
        html.easynav---high-contrast h6:not(.easynav---container *),
        html.easynav---high-contrast p:not(.easynav---container *),
        html.easynav---high-contrast span:not(.easynav---container *),
        html.easynav---high-contrast a:not(.easynav---container *) {
          background-color: transparent !important;
        }

        html.easynav---high-contrast input,
        html.easynav---high-contrast textarea,
        html.easynav---high-contrast select {
          border: 1px solid ${o.contrastText} !important;
          background-color: ${o.contrastBackground} !important;
        }

        html.easynav---high-contrast button,
        html.easynav---high-contrast [role="button"] {
          border: 1px solid ${o.contrastText} !important;
        }

        /* Easynav en modo contraste */
        html.easynav---high-contrast .easynav---container {
          background-color: #1a1a1a !important;
          border-color: ${o.contrastText} !important;
        }

        html.easynav---high-contrast .easynav---font-btn,
        html.easynav---high-contrast .easynav---contrast-btn,
        html.easynav---high-contrast .easynav---reset-btn {
          background-color: ${o.contrastBackground} !important;
          border-color: ${o.contrastText} !important;
          color: ${o.contrastText} !important;
        }

        html.easynav---high-contrast .easynav---label {
          color: ${o.contrastText} !important;
        }

        /* Modo Flotante */
        .easynav---container.easynav---floating {
          position: fixed;
          ${this._getFloatingPosition()}
          width: auto;
          border-radius: 12px;
          border: 1px solid ${o.borderColor};
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          cursor: ${o.floatingDraggable ? 'move' : 'default'};
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
          margin: 0;
          width: 100%;
          justify-content: center;
          widht: 100%;
        }

        .easynav---container.easynav---floating.easynav---dragging {
          opacity: 0.9;
          cursor: grabbing;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
        }

        /* Mobile */
        @media (max-width: ${o.mobileBreakpoint}px) {
          .easynav---container.easynav---floating {
            position: relative;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            left: auto !important;
            width: 100%;
            border-radius: 0;
            box-shadow: none;
            cursor: default;
          }

          .easynav---bar {
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px 12px;
          }

          .easynav---label {
            font-size: 11px;
          }

          .easynav---font-btn {
            width: 28px;
            height: 28px;
          }

          .easynav---contrast-btn {
            width: 28px;
            height: 28px;
          }

          .easynav---reset-btn span:last-child {
            display: none;
          }
        }

        /* Animaciones */
        @keyframes easynav-scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `;
    }

    _getFloatingPosition() {
      const pos = this.options.floatingPosition;
      switch (pos) {
        case 'top-left': return 'top: 20px; left: 20px;';
        case 'bottom-right': return 'bottom: 20px; right: 20px;';
        case 'bottom-left': return 'bottom: 20px; left: 20px;';
        case 'top-right':
        default: return 'top: 20px; right: 20px;';
      }
    }

    // ============================================
    // MÉTODOS PRIVADOS - HTML
    // ============================================
    
    // Helper para obtener texto traducido
    _t(key) {
      const o = this.options;
      // Si autoDetectLanguage está deshabilitado y hay un label personalizado, usarlo
      if (!o.autoDetectLanguage && o.labels[key]) {
        return o.labels[key];
      }
      // Usar traducción automática
      return t(key);
    }
    
    _createHTML() {
      const o = this.options;
      const nav = document.createElement('nav');
      nav.id = 'easynav---main';
      nav.className = 'easynav---container';
      nav.setAttribute('aria-label', this._t('ariaLabel'));

      let html = '<div class="easynav---bar">';

      // Brand/Label (NO CUSTOMIZABLE - siempre accessibility.cl con i18n)
      if (o.showBrand) {
        html += `<a href="https://accessibility.cl" target="_blank" rel="noopener" class="easynav---label">${this._t('brand')}</a>`;
      }

      // Font controls
      if (o.showFontControls && o.fontSizeEnabled) {
        html += `
          <div class="easynav---fonts">
            <button 
              id="easynav---decrease-font" 
              class="easynav---font-btn easynav---font-btn--small"
              aria-label="${this._t('decreaseFont')}"
              title="${this._t('decreaseFont')}"
            >A</button>
            <button 
              id="easynav---increase-font" 
              class="easynav---font-btn easynav---font-btn--large"
              aria-label="${this._t('increaseFont')}"
              title="${this._t('increaseFont')}"
            >A</button>
          </div>
        `;
      }

      // Contrast button
      if (o.showContrastButton && o.contrastEnabled) {
        html += `
          <button 
            id="easynav---toggle-contrast" 
            class="easynav---contrast-btn"
            aria-label="${this._t('toggleContrast')}"
            title="${this._t('toggleContrast')}"
          >
            <svg class="easynav---contrast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9791 4.40469e-05C9.60981 8.46401e-05 7.29378 0.70267 5.32384 2.01896C3.3539 3.33524 1.81852 5.20611 0.91186 7.39499C0.00519581 9.58386 -0.232033 11.9924 0.230172 14.3161C0.692377 16.6398 1.83326 18.7743 3.50854 20.4496C4.61892 21.5709 5.93992 22.4619 7.39566 23.0711C8.85139 23.6804 10.4132 23.9961 11.9913 24C13.5694 24.0038 15.1327 23.6959 16.5914 23.0938C18.0501 22.4917 19.3755 21.6073 20.4914 20.4914C21.6072 19.3755 22.4916 18.0502 23.0938 16.5915C23.6959 15.1328 24.0038 13.5695 24 11.9914C23.9961 10.4133 23.6804 8.85155 23.0711 7.39583C22.4618 5.94011 21.5709 4.61912 20.4496 3.50875C19.3398 2.39288 18.0197 1.50821 16.5658 0.90594C15.1118 0.303669 13.5528 -0.00423756 11.9791 4.40469e-05V4.40469e-05ZM1.71112 11.9792C1.71112 6.31743 6.31725 1.71135 11.9791 1.71135V22.247C6.31725 22.247 1.71112 17.6409 1.71112 11.9792Z" fill="currentColor"/>
            </svg>
          </button>
        `;
      }

      // Reset button
      if (o.showResetButton) {
        html += `
          <button 
            id="easynav---reset" 
            class="easynav---reset-btn"
            aria-label="${this._t('resetConfig')}"
            disabled
          >
            <span aria-hidden="true">↻</span>
            <span>${this._t('reset')}</span>
          </button>
        `;
      }

      html += '</div>';
      nav.innerHTML = html;

      // Insertar en el DOM
      if (this.options.position === 'bottom') {
        document.body.appendChild(nav);
      } else {
        document.body.insertBefore(nav, document.body.firstChild);
      }

      // Guardar referencias
      this.elements.container = nav;
      this.elements.decreaseBtn = document.getElementById('easynav---decrease-font');
      this.elements.increaseBtn = document.getElementById('easynav---increase-font');
      this.elements.contrastBtn = document.getElementById('easynav---toggle-contrast');
      this.elements.resetBtn = document.getElementById('easynav---reset');
    }

    // ============================================
    // MÉTODOS PRIVADOS - ESTADO
    // ============================================

    _loadState() {
      if (!this.options.persistence) return;
      
      const saved = localStorage.getItem(this.options.storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.state.fontSize = parsed.fontSize ?? this.options.fontSizeDefault;
          this.state.highContrast = parsed.highContrast ?? false;
        } catch (e) {
          console.warn('Easynav: Error al cargar estado', e);
        }
      }
    }

    _saveState() {
      if (!this.options.persistence) return;
      
      localStorage.setItem(this.options.storageKey, JSON.stringify({
        fontSize: this.state.fontSize,
        highContrast: this.state.highContrast
      }));
    }

    _applyState() {
      this._applyFontSize();
      this._applyContrast();
      this._updateUI();
    }

    _applyFontSize() {
      const scale = this.state.fontSize / 100;
      
      let dynamicStyle = document.getElementById('easynav---dynamic-font-styles');
      if (!dynamicStyle) {
        dynamicStyle = document.createElement('style');
        dynamicStyle.id = 'easynav---dynamic-font-styles';
        document.head.appendChild(dynamicStyle);
      }
      
      if (this.state.fontSize === 100) {
        dynamicStyle.textContent = '';
        document.body.style.zoom = '';
      } else {
        document.body.style.zoom = scale;
        dynamicStyle.textContent = `.easynav---container { zoom: ${1 / scale}; }`;
      }
    }

    _applyContrast() {
      if (this.state.highContrast) {
        document.documentElement.classList.add('easynav---high-contrast');
      } else {
        document.documentElement.classList.remove('easynav---high-contrast');
      }
    }

    _updateUI() {
      const { decreaseBtn, increaseBtn, contrastBtn, resetBtn } = this.elements;
      const hasChanges = this.state.fontSize !== this.options.fontSizeDefault || this.state.highContrast;

      if (resetBtn) {
        if (hasChanges) {
          resetBtn.classList.add('easynav---active');
          resetBtn.disabled = false;
        } else {
          resetBtn.classList.remove('easynav---active');
          resetBtn.disabled = true;
        }
      }

      if (decreaseBtn) {
        decreaseBtn.disabled = this.state.fontSize <= this.options.fontSizeMin;
      }

      if (increaseBtn) {
        increaseBtn.disabled = this.state.fontSize >= this.options.fontSizeMax;
      }

      if (contrastBtn) {
        if (this.state.highContrast) {
          contrastBtn.classList.add('easynav---active');
        } else {
          contrastBtn.classList.remove('easynav---active');
        }
      }
    }

    // ============================================
    // MÉTODOS PRIVADOS - EVENTOS
    // ============================================

    _initEvents() {
      const { decreaseBtn, increaseBtn, contrastBtn, resetBtn, container } = this.elements;

      if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => this.decreaseFontSize());
      }

      if (increaseBtn) {
        increaseBtn.addEventListener('click', () => this.increaseFontSize());
      }

      if (contrastBtn) {
        contrastBtn.addEventListener('click', () => this.toggleContrast());
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.reset());
      }

      // Modo flotante
      if (this.options.floatingEnabled) {
        window.addEventListener('scroll', this._handleScroll, { passive: true });
        window.addEventListener('resize', this._handleResize);
        
        if (this.options.floatingDraggable) {
          container.addEventListener('mousedown', this._handleMouseDown);
          document.addEventListener('mousemove', this._handleMouseMove);
          document.addEventListener('mouseup', this._handleMouseUp);
        }
      }
    }

    _handleScroll() {
      const container = this.elements.container;
      const o = this.options;

      if (window.innerWidth <= o.mobileBreakpoint && !o.mobileFloating) {
        container.classList.remove('easynav---floating');
        this._resetPosition();
        return;
      }

      if (window.scrollY > o.floatingThreshold) {
        if (!container.classList.contains('easynav---floating')) {
          container.classList.add('easynav---floating');
          this._resetPosition();
          this.state.isFloating = true;
          
          if (typeof o.onFloatingChange === 'function') {
            o.onFloatingChange(true, this);
          }
        }
      } else {
        if (container.classList.contains('easynav---floating')) {
          container.classList.remove('easynav---floating');
          this._resetPosition();
          this.state.isFloating = false;
          
          if (typeof o.onFloatingChange === 'function') {
            o.onFloatingChange(false, this);
          }
        }
      }
    }

    _handleMouseDown(e) {
      const container = this.elements.container;
      if (!container.classList.contains('easynav---floating')) return;
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

      this.state.isDragging = true;
      container.classList.add('easynav---dragging');

      const rect = container.getBoundingClientRect();
      this._dragState = {
        startX: e.clientX,
        startY: e.clientY,
        initialX: rect.left,
        initialY: rect.top
      };

      e.preventDefault();
    }

    _handleMouseMove(e) {
      if (!this.state.isDragging) return;

      const container = this.elements.container;
      const { startX, startY, initialX, initialY } = this._dragState;

      let newX = initialX + (e.clientX - startX);
      let newY = initialY + (e.clientY - startY);

      const rect = container.getBoundingClientRect();
      newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));

      container.style.right = 'auto';
      container.style.bottom = 'auto';
      container.style.left = newX + 'px';
      container.style.top = newY + 'px';
    }

    _handleMouseUp() {
      if (!this.state.isDragging) return;
      this.state.isDragging = false;
      this.elements.container.classList.remove('easynav---dragging');
    }

    _handleResize() {
      if (window.innerWidth <= this.options.mobileBreakpoint) {
        this.elements.container.classList.remove('easynav---floating');
        this._resetPosition();
      }
    }

    _resetPosition() {
      const container = this.elements.container;
      container.style.left = '';
      container.style.top = '';
      container.style.right = '';
      container.style.bottom = '';
    }

    // ============================================
    // UTILIDADES
    // ============================================

    _mergeDeep(target, source) {
      const output = Object.assign({}, target);
      if (this._isObject(target) && this._isObject(source)) {
        Object.keys(source).forEach(key => {
          if (this._isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, { [key]: source[key] });
            } else {
              output[key] = this._mergeDeep(target[key], source[key]);
            }
          } else {
            Object.assign(output, { [key]: source[key] });
          }
        });
      }
      return output;
    }

    _isObject(item) {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }
  }

  // ============================================
  // INICIALIZACIÓN AUTOMÁTICA VIA DATA ATTRIBUTES
  // ============================================
  
  function initFromDataAttributes() {
    const script = document.currentScript || document.querySelector('script[data-easynav]');
    if (!script) return null;

    const options = {};
    
    // Parsear data attributes
    const attrs = {
      'data-theme': 'theme',
      'data-position': 'position',
      'data-primary-color': 'primaryColor',
      'data-background-color': 'backgroundColor',
      'data-text-color': 'textColor',
      'data-font-min': 'fontSizeMin',
      'data-font-max': 'fontSizeMax',
      'data-font-step': 'fontSizeStep',
      'data-floating': 'floatingEnabled',
      'data-floating-threshold': 'floatingThreshold',
      'data-floating-position': 'floatingPosition',
      'data-draggable': 'floatingDraggable',
      'data-persistence': 'persistence',
      'data-contrast': 'contrastEnabled',
      'data-z-index': 'zIndex',
    };

    Object.keys(attrs).forEach(attr => {
      const value = script.getAttribute(attr);
      if (value !== null) {
        const path = attrs[attr].split('.');
        let target = options;
        
        for (let i = 0; i < path.length - 1; i++) {
          if (!target[path[i]]) target[path[i]] = {};
          target = target[path[i]];
        }
        
        // Convertir tipos
        let finalValue = value;
        if (value === 'true') finalValue = true;
        else if (value === 'false') finalValue = false;
        else if (!isNaN(value) && value !== '') finalValue = Number(value);
        
        target[path[path.length - 1]] = finalValue;
      }
    });

    return options;
  }

  // ============================================
  // EXPOSICIÓN GLOBAL
  // ============================================
  
  // Merge con configuración global si existe
  const globalConfig = window.EasynavConfig || {};
  const dataConfig = initFromDataAttributes() || {};
  const mergedConfig = { ...globalConfig, ...dataConfig };

  // Crear instancia
  const instance = new EasynavCustom(mergedConfig);

  // Auto-inicializar si no está deshabilitado
  if (mergedConfig.autoInit !== false) {
    instance.init();
  }

  // Exponer API global
  window.Easynav = instance;
  window.EasynavCustom = EasynavCustom;

  return EasynavCustom;
});
