/* PAS - script unico del sitio. Sin dependencias. Cargar con defer.
   Cada bloque comprueba que su elemento exista, para poder usar el mismo
   archivo en todas las paginas. */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Menu movil ------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setNav(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* 2. Cabecera al hacer scroll ----------------------------------------- */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress__bar');
  if (header || bar) {
    var ticking = false;
    var onScroll = function () {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 40);
      }
      /* 3. Barra de progreso de lectura (solo si la pagina la incluye) */
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  /* 4. Aparicion al entrar en pantalla ---------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < reveals.length; i++) {
        reveals[i].classList.add('is-visible');
      }
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      for (var j = 0; j < reveals.length; j++) { io.observe(reveals[j]); }
    }
  }

  /* 5. Formulario de contacto -> abre el cliente de correo --------------- */
  var form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) { return; }

      var val = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : '';
      };
      var nombre = val('nombre');
      var empresa = val('empresa');
      var correo = val('correo');
      var telefono = val('telefono');
      var servicio = val('servicio');
      var mensaje = val('mensaje');

      var asunto = 'Cotizacion - ' + (servicio || 'Consulta general') +
        (empresa ? ' - ' + empresa : '');

      var cuerpo = [
        'Nombre: ' + nombre,
        'Empresa: ' + (empresa || '(no indicada)'),
        'Correo: ' + correo,
        'Telefono: ' + (telefono || '(no indicado)'),
        'Servicio de interes: ' + (servicio || '(no indicado)'),
        '',
        'Mensaje:',
        mensaje
      ].join('\r\n');

      var destino = form.getAttribute('data-email');
      var url = 'mailto:' + destino +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);

      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Abriendo tu aplicacion de correo… Si no se abre, ' +
          'escribenos directamente a ' + destino;
      }
      window.location.href = url;
    });
  }

  /* 6. Ano actual en el pie --------------------------------------------- */
  var years = document.querySelectorAll('[data-year]');
  for (var k = 0; k < years.length; k++) {
    years[k].textContent = new Date().getFullYear();
  }

  /* 7. Filtro de categorias del blog ------------------------------------ */
  var filters = document.querySelector('.filters');
  if (filters) {
    var posts = document.querySelectorAll('[data-cat]');
    var empty = document.querySelector('.no-results');
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) { return; }

      var buttons = filters.querySelectorAll('.filter');
      for (var m = 0; m < buttons.length; m++) {
        buttons[m].setAttribute('aria-pressed', String(buttons[m] === btn));
      }

      var want = btn.getAttribute('data-filter');
      var shown = 0;
      for (var n = 0; n < posts.length; n++) {
        var ok = want === 'todas' || posts[n].getAttribute('data-cat') === want;
        posts[n].hidden = !ok;
        if (ok) { shown++; }
      }
      if (empty) { empty.hidden = shown > 0; }
    });
  }
})();
