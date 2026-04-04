/* ============================================
   L2INT.RU — Основной JavaScript файл
   ============================================ */

(function () {
  'use strict';

  /* ---------- Тема ---------- */
  var THEME_KEY = 'l2wiki-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    // Обновить иконку
    var btn = document.getElementById('theme-btn');
    if (btn) btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
  }

  function toggleTheme() {
    var cur = getTheme();
    var next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /* ---------- Сайдбар (мобильный) ---------- */
  function initSidebar() {
    var menuBtn = document.getElementById('menu-btn');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');

    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      });
    }
  }

  /* ---------- Активная ссылка ---------- */
  function markActiveLinks() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link, .topbar-nav a').forEach(function (el) {
      var href = el.getAttribute('href') || '';
      if (href === path || (path === 'index.html' && (href === '/' || href === 'index.html' || href === ''))) {
        el.classList.add('active');
      }
    });
  }

  /* ---------- Фильтры ---------- */
  function initFilters() {
    document.querySelectorAll('.filters').forEach(function (filterGroup) {
      var target = filterGroup.dataset.target;
      filterGroup.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterGroup.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var val = btn.dataset.filter;
          if (target) {
            filterRows(target, val);
          }
        });
      });
    });
  }

  function filterRows(tableId, filterVal) {
    var rows = document.querySelectorAll('#' + tableId + ' tbody tr[data-filter]');
    rows.forEach(function (row) {
      if (filterVal === 'all') {
        row.style.display = '';
      } else {
        var rowFilters = row.dataset.filter.split(' ');
        row.style.display = rowFilters.indexOf(filterVal) !== -1 ? '' : 'none';
      }
    });
    // Section headers visibility
    var sections = document.querySelectorAll('#' + tableId + ' .section-row');
    sections.forEach(function (sec) {
      if (filterVal === 'all') {
        sec.style.display = '';
      } else {
        var secFilter = sec.dataset.section;
        sec.style.display = (secFilter === filterVal) ? '' : 'none';
      }
    });
  }

  /* ---------- Поиск ---------- */
  function initSearch() {
    document.querySelectorAll('.search-input').forEach(function (input) {
      var tableId = input.dataset.table;
      input.addEventListener('input', function () {
        var q = input.value.toLowerCase().trim();
        if (!tableId) return;
        var rows = document.querySelectorAll('#' + tableId + ' tbody tr:not(.section-row)');
        rows.forEach(function (row) {
          var text = row.textContent.toLowerCase();
          row.style.display = (q === '' || text.indexOf(q) !== -1) ? '' : 'none';
        });
      });
    });

    // Hero search
    var heroInput = document.getElementById('hero-search-input');
    var heroBtn = document.getElementById('hero-search-btn');
    if (heroBtn && heroInput) {
      heroBtn.addEventListener('click', function () {
        var q = heroInput.value.trim();
        if (q) window.location.href = 'quests.html?q=' + encodeURIComponent(q);
      });
      heroInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') heroBtn.click();
      });
    }

    // URL query
    var params = new URLSearchParams(window.location.search);
    var qParam = params.get('q');
    if (qParam) {
      var searchInputs = document.querySelectorAll('.search-input');
      searchInputs.forEach(function (inp) {
        inp.value = qParam;
        inp.dispatchEvent(new Event('input'));
      });
    }
  }

  /* ---------- Модальные окна ---------- */
  function initModals() {
    // Open
    document.querySelectorAll('[data-modal]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = el.dataset.modal;
        var modal = document.getElementById(modalId);
        if (modal) modal.classList.add('open');
      });
    });

    // Close button
    document.querySelectorAll('.modal-close, .modal-bg').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target === el) {
          document.querySelectorAll('.modal-bg').forEach(function (m) { m.classList.remove('open'); });
        }
      });
    });

    // ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-bg').forEach(function (m) { m.classList.remove('open'); });
      }
    });
  }

  /* ---------- Строки таблицы — клик для модалки ---------- */
  function initTableRows() {
    document.querySelectorAll('.wiki-table tbody tr[data-modal]').forEach(function (row) {
      row.addEventListener('click', function () {
        var modalId = row.dataset.modal;
        var modal = document.getElementById(modalId);
        if (modal) modal.classList.add('open');
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getTheme());

    var themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    initSidebar();
    markActiveLinks();
    initFilters();
    initSearch();
    initModals();
    initTableRows();
  });

})();
