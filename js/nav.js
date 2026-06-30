(function () {
    var page = location.pathname.split('/').pop() || 'index.html';
    if (page === '') page = 'index.html';

    function act(p) { return page === p ? ' cf-active' : ''; }

    var html = '\
<header class="cf-topbar">\
  <div class="cf-topbar-inner">\
    <a href="index.html" class="cf-logo-link">\
      <img src="img/Logo_empresa.png" alt="ALAMOSOFT" class="cf-topbar-logo">\
    </a>\
    <div style="flex:1"></div>\
    <div class="cf-nav-dept-wrap">\
      <button class="cf-nav-dept" id="cfBtnDept" onclick="cfToggleDept(event)"><span id="cfLblDept">Departamento</span> &#9660;</button>\
      <div class="cf-nav-dropdown" id="cfDdDept"></div>\
    </div>\
    <div class="cf-nav-dept-wrap">\
      <button class="cf-nav-dept" id="cfBtnCity" onclick="cfToggleCity(event)" disabled><span id="cfLblCity">Ciudad</span> &#9660;</button>\
      <div class="cf-nav-dropdown" id="cfDdCity"></div>\
    </div>\
    <a href="#" class="cf-nav-cliente">CLIENTE</a>\
    <a href="#" class="cf-nav-account">\
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>\
        <circle cx="12" cy="7" r="4"/>\
      </svg>\
      <span>Mi Cuenta</span>\
    </a>\
  </div>\
</header>\
<nav class="cf-orange-nav">\
  <div class="cf-orange-nav-inner">\
    <a href="index.html" class="cf-onav-item' + act('index.html') + '">INICIO</a>\
    <a href="contabilidad.html" class="cf-onav-item' + act('contabilidad.html') + '">Contabilidad</a>\
    <a href="facturacion.html" class="cf-onav-item' + act('facturacion.html') + '">Facturaci\xF3n</a>\
    <a href="nomina.html" class="cf-onav-item' + act('nomina.html') + '">N\xF3mina</a>\
    <a href="hoteleria.html" class="cf-onav-item' + act('hoteleria.html') + '">Hoteler\xEDa</a>\
    <a href="presupuesto-publico.html" class="cf-onav-item' + act('presupuesto-publico.html') + '">Presupuesto P\xFAblico</a>\
    <a href="pos.html" class="cf-onav-item' + act('pos.html') + '">Sistema POS</a>\
    <a href="parqueaderos.html" class="cf-onav-item' + act('parqueaderos.html') + '">Parqueaderos</a>\
    <a href="auto-venta.html" class="cf-onav-item' + act('auto-venta.html') + '">Auto-Venta / Cartera</a>\
  </div>\
</nav>';

    document.currentScript.insertAdjacentHTML('beforebegin', html);

    /* ── Colombia: departamentos y municipios ── */
    var CF_DEPTS = {
        'Amazonas':                 ['Leticia', 'Puerto Nariño', 'La Chorrera', 'La Pedrera'],
        'Antioquia':                ['Medellín', 'Bello', 'Envigado', 'Itagüí', 'Rionegro', 'Apartadó', 'Caucasia', 'Turbo', 'Sabaneta', 'La Estrella'],
        'Arauca':                   ['Arauca', 'Saravena', 'Tame', 'Fortul', 'Arauquita', 'Cravo Norte'],
        'Atlántico':                ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Baranoa', 'Galapa', 'Puerto Colombia'],
        'Bolívar':                  ['Cartagena', 'Magangué', 'El Carmen de Bolívar', 'Mompós', 'Turbaco', 'Arjona'],
        'Boyacá':                   ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Monguí', 'Villa de Leyva'],
        'Caldas':                   ['Manizales', 'Villamaría', 'Riosucio', 'La Dorada', 'Chinchiná', 'Manzanares'],
        'Caquetá':                  ['Florencia', 'San Vicente del Caguán', 'Puerto Rico', 'Belén de los Andaquíes'],
        'Casanare':                 ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Paz de Ariporo', 'Monterrey'],
        'Cauca':                    ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía', 'Guapi'],
        'Cesar':                    ['Valledupar', 'Aguachica', 'Bosconia', 'Codazzi', 'La Jagua de Ibirico'],
        'Chocó':                    ['Quibdó', 'Istmina', 'Condoto', 'Bahía Solano', 'Nuquí', 'Riosucio'],
        'Córdoba':                  ['Montería', 'Lorica', 'Sahagún', 'Cereté', 'Montelíbano', 'Planeta Rica'],
        'Cundinamarca':             ['Bogotá D.C.', 'Soacha', 'Facatativá', 'Zipaquirá', 'Mosquera', 'Madrid', 'Chía', 'Fusagasugá', 'Girardot', 'La Mesa'],
        'Guainía':                  ['Inírida', 'Barranco Minas', 'Mapiripana'],
        'Guaviare':                 ['San José del Guaviare', 'Calamar', 'El Retorno', 'Miraflores'],
        'Huila':                    ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'Palermo'],
        'La Guajira':               ['Riohacha', 'Maicao', 'Uribia', 'Manaure', 'San Juan del Cesar', 'Fonseca'],
        'Magdalena':                ['Santa Marta', 'Ciénaga', 'Fundación', 'Plato', 'El Banco', 'Aracataca'],
        'Meta':                     ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'Puerto Gaitán', 'Restrepo'],
        'Nariño':                   ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres', 'La Unión', 'Samaniego'],
        'Norte de Santander':       ['Cúcuta', 'Ocaña', 'Villa del Rosario', 'Los Patios', 'Pamplona', 'Tibú'],
        'Putumayo':                 ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy', 'Valle del Guamuez'],
        'Quindío':                  ['Armenia', 'Calarcá', 'Montenegro', 'La Tebaida', 'Circasia', 'Filandia'],
        'Risaralda':                ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Belén de Umbría'],
        'San Andrés y Providencia': ['San Andrés', 'Providencia', 'Santa Catalina'],
        'Santander':                ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'Socorro'],
        'Sucre':                    ['Sincelejo', 'Corozal', 'Sampués', 'San Marcos', 'Tolú', 'Morroa'],
        'Tolima':                   ['Ibagué', 'Espinal', 'Melgar', 'Honda', 'Líbano', 'Chaparral'],
        'Valle del Cauca':          ['Cali', 'Buenaventura', 'Palmira', 'Tuluá', 'Buga', 'Cartago', 'Yumbo', 'Jamundí'],
        'Vaupés':                   ['Mitú', 'Carurú', 'Taraira'],
        'Vichada':                  ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
    };

    /* ── Dropdown Departamento ── */
    window.cfToggleDept = function (e) {
        e.stopPropagation();
        var dd = document.getElementById('cfDdDept');
        var dd2 = document.getElementById('cfDdCity');
        if (dd2) dd2.style.display = 'none';
        if (!dd.innerHTML) {
            dd.innerHTML = Object.keys(CF_DEPTS).sort().map(function (d) {
                return '<div class="cf-dd-item" onclick="cfSelectDept(\'' + d.replace(/'/g, "\\'") + '\')">' + d + '</div>';
            }).join('');
        }
        dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
    };

    window.cfSelectDept = function (dept) {
        var lbl = document.getElementById('cfLblDept');
        if (lbl) lbl.textContent = dept;
        var dd = document.getElementById('cfDdDept');
        if (dd) dd.style.display = 'none';
        var cities = CF_DEPTS[dept] || [];
        var dd2 = document.getElementById('cfDdCity');
        if (dd2) {
            dd2.innerHTML = cities.map(function (c) {
                return '<div class="cf-dd-item" onclick="cfSelectCity(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</div>';
            }).join('');
        }
        var btn = document.getElementById('cfBtnCity');
        if (btn) {
            btn.disabled = false;
            var lbl2 = document.getElementById('cfLblCity');
            if (lbl2) lbl2.textContent = 'Ciudad';
        }
    };

    window.cfToggleCity = function (e) {
        e.stopPropagation();
        var dd = document.getElementById('cfDdCity');
        if (dd) dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
    };

    window.cfSelectCity = function (city) {
        var lbl = document.getElementById('cfLblCity');
        if (lbl) lbl.textContent = city;
        var dd = document.getElementById('cfDdCity');
        if (dd) dd.style.display = 'none';
    };

    /* ── Cerrar dropdowns al hacer clic afuera ── */
    document.addEventListener('click', function () {
        var d1 = document.getElementById('cfDdDept');
        var d2 = document.getElementById('cfDdCity');
        if (d1) d1.style.display = 'none';
        if (d2) d2.style.display = 'none';
    });

    /* ── Navegar al catálogo con búsqueda ── */
    window.irACatalogo = function (q) {
        var url = 'catalogo.html';
        if (q && q.trim()) url += '?q=' + encodeURIComponent(q.trim());
        window.location.href = url;
    };

    /* ── Leer parámetro q en catalogo.html y pre-rellenar input ── */
    window.addEventListener('DOMContentLoaded', function () {
        var params = new URLSearchParams(window.location.search);
        var q = params.get('q');
        if (q) {
            var inp = document.getElementById('topSearchInput');
            if (inp) inp.value = q;
            if (typeof filtrarCatalogo === 'function') filtrarCatalogo(q);
        }

        /* Sincronizar carrito desde localStorage */
        var count = parseInt(localStorage.getItem('cfCartCount') || '0');
        var badge = document.getElementById('navCartCount');
        if (badge) badge.textContent = count;
    });
})();
