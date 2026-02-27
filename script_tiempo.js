// Casos que faltan Benjamin Bustos Morales y José Segundo Veloso Araya y Domingo Perez San Martin

// Inicio mapa
var mapa = L.map('mapa').setView([-39.95, -72.8], 9);

// Capa OSM
var positron = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }
);
positron.addTo(mapa)



// Alternar entre páginas al pulsar botones
document.querySelectorAll('.tab-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        // Ocultar todas
        document.querySelectorAll('.panel-page').forEach(page => {
            page.classList.remove('active');
        });
        document.querySelectorAll('.tab-dot').forEach(d => {
            d.classList.remove('active');
        });
        // Mostrar la seleccionada
        const tab = dot.getAttribute('data-tab');
        document.getElementById(tab).classList.add('active');
        dot.classList.add('active');
    });
});

// Función para abrir panel con cuatro contenidos
function openPanel(content1, content2, content3, content4) {
    const panel = document.getElementById('info-panel');
    document.getElementById('info-content').innerHTML = content1 || '';
    document.getElementById('extra-content').innerHTML = content2 || '';
    document.getElementById('third-content').innerHTML = content3 || '';
    document.getElementById('fourth-content').innerHTML = content4 || '';
    panel.classList.add('open');
    document.querySelectorAll('.panel-page').forEach(p => p.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
    // Activar el punto de la página 1
    document.querySelectorAll('.tab-dot').forEach(d => d.classList.remove('active'));
    document.querySelector('.tab-dot[data-tab="page1"]').classList.add('active');
}

// Cerrar panel
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-panel').classList.remove('open'); 
    setAnio('');
});


function setAnio(texto) {
    const anioDiv = document.getElementById('info-anio');
    console.log('setAnio llamado:', texto); // ⬅️ Debug
    console.log('Elemento encontrado:', anioDiv); // ⬅️ Debug
    
    if (anioDiv) {
        anioDiv.innerHTML = texto ? texto : '';
        anioDiv.style.display = texto ? 'block' : 'none'; // ⬅️ Oculta si está vacío
    }
}


function openLibroPDF(page = 1) {
    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.id = 'pdf-overlay-libro';  // ← ID único
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    
    // Crear ventana del PDF
    const pdfWindow = document.createElement('div');
    pdfWindow.style.cssText = `
        width: 90%;
        max-width: 1000px;
        height: 90%;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        display: flex;
        flex-direction: column;
    `;
    
    pdfWindow.innerHTML = `
        <button onclick="closePDFOverlay('pdf-overlay-libro')" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: #1b2734;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            z-index: 10;
        ">✕</button>
        <iframe src="./libro.pdf#page=${page}&zoom=page-width&toolbar=1" style="
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 10px;
        "></iframe>
    `;
    
    overlay.appendChild(pdfWindow);
    document.body.appendChild(overlay);
    
    // Cerrar al hacer click fuera del PDF
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePDFOverlay('pdf-overlay-libro');
        }
    });
}



function openRutaPDF(page = 1) {
    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.id = 'pdf-overlay-ruta_memoria';  // ← ID único
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Crear ventana del PDF
    const pdfWindow = document.createElement('div');
    pdfWindow.style.cssText = `
        width: 90%;
        max-width: 1000px;
        height: 90%;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        display: flex;
        flex-direction: column;
    `;
    
    pdfWindow.innerHTML = `
        <button onclick="closePDFOverlay('pdf-overlay-ruta_memoria')" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: #1b2734;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            z-index: 10;
        ">✕</button>
        <iframe src="./ruta_memoria.pdf#page=${page}&zoom=85-width&toolbar=1" style="
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 10px;
        "></iframe>
    `;
    
    overlay.appendChild(pdfWindow);
    document.body.appendChild(overlay);
    
    // Cerrar al hacer click fuera del PDF
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePDFOverlay('pdf-overlay-ruta_memoria');
        }
    });
}

function closePDFOverlay(overlayId) {
    const overlay = overlayId ? document.getElementById(overlayId) : document.getElementById('pdf-overlay');
    if (overlay) {
        overlay.remove();
    }
}
// Barra Tiempo


const anioActual = new Date().getFullYear();
const slider = document.getElementById('slider-anio');
slider.max = anioActual;
slider.value = anioActual;
document.getElementById('slider-label').innerHTML = 'Hoy';

document.getElementById('slider-anio').addEventListener('input', function() {
    const anioSeleccionado = parseInt(this.value);   
    document.getElementById('slider-label').innerHTML =
        anioSeleccionado === anioActual ? 'Hoy' : anioSeleccionado;

    filtrarMarcadores(anioSeleccionado);
});

const titulo = document.getElementById('info-titulo');
titulo.style.position = 'fixed';
titulo.style.display = 'block';

const leyenda = document.getElementById('info-leyenda');
leyenda.style.position = 'fixed';
leyenda.style.display = 'block';

var memorial = L.icon({ 
    iconUrl: './clavel.png', 
    iconSize: [35, 35],
    popupAnchor: [-1, -10]
});

var CCDD = L.icon({ 
    iconUrl: './detenido.png', 
    iconSize: [25, 25],
    popupAnchor: [-1, -10]
});




// =============================================
// ARRAY GLOBAL DE MARCADORES
// =============================================
var markers = [];

// =============================================
// FUNCIÓN DE FILTRO POR AÑO
// =============================================
function filtrarMarcadores(anioSeleccionado) {
    markers.forEach(function(m) {
        if (m.anio <= anioSeleccionado) {
            if (!mapa.hasLayer(m)) m.addTo(mapa);
        } else {
            if (mapa.hasLayer(m)) mapa.removeLayer(m);
        }
    });
}


// Inicializar slider con año actual

// MARCADORES - VALDIVIA
// =============================================

// CNI Valdivia / Casa de la Memoria
var marker = L.marker([-39.817309, -73.246849], {icon: memorial});
marker.anio = 1981;
marker.on('click', function() {
    setAnio('1981 - 1988');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/recinto-cni-en-calle-perez-rosales-no-764-valdivia/" target="_blank">Recinto CNI Valdivia / Hoy Casa de la Memoria</a></h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 30px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(124)">
                <img src="./portada.jpg" alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(10)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 175px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
            </div>
        </div>
        <div style="text-align:center; margin: 20px 0;">
            <iframe width="80%" height="315"
                style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"
                src="https://www.youtube.com/embed/G6yOp5Kl-Oo" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
        </div>
        <p style="font-style: italic;">"Ubicado en calle Pérez Rosales 764<br><br>
        Hubo testimonios de ex presos políticos que denunciaron haber estado en este recinto, ubicado en Pérez Rosales 764 en Valdivia, entre los años 1981 y 1988. La mayor cantidad de detenidos en este lugar se consignó en el año 1986.<br><br>
        La existencia de este centro fue reconocida públicamente en 1984, por la publicación en el Diario Oficial del Decreto Supremo N° 594 del 14 de junio de 1984.<br><br>
        De acuerdo a los testimonios recibidos, esta Comisión pudo establecer que, luego de ser detenidos por este organismo de seguridad, los presos eran conducidos hasta el subterráneo de este recinto, en donde fueron sometidos a interrogatorios y torturas, permanentemente vendados, amarrados y desnudos."</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p409</p>`,

        `<h3>Arpilleras de la Memoria</h3><br>
        <div style="text-align:center; margin: 20px 0;">
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/TobTr6ehhMw" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/DU-OxsAvABk" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/SE_d2a7kFwg" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/gKymlZGmyxY" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/7CdY9wQLYuE" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/dYIK14S_vHI" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="80%" height="315" style="max-width: 800px; border: 3px solid #1b2734; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" src="https://www.youtube.com/embed/snoS7-Btu28" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`,

        `<h3>Testimonios</h3><br>`,

        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Isla Teja
var marker = L.marker([-39.814784, -73.258046], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-isla-teja/" target="_blank">Retén de carabineros de Isla Teja</a></h3>
        <p>El Retén de Carabineros, Isla Teja fue utilizado para la detención de presos políticos de la región.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Cárcel Isla Teja
var marker = L.marker([-39.813046, -73.263345], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1989');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/carcel-de-valdivia-carcel-de-isla-teja/" target="_blank">Cárcel Isla Teja</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(21)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>Hoy Sitio de Memoria Complejo Penitenciario Ex Cárcel de Isla Teja</p>
        <p style="font-style: italic;">"En este recinto, ubicado en la Isla Teja, se concentraron los detenidos políticos en el año 1973, 
        y en menor número hasta el año 1989."</p>
        br>
<br>Los testimonios consignan que se trataba de un edificio de construcción nueva, inaugurado en 1973. 
Hombres y mujeres permanecían separados. En 1973 los prisioneros
políticos no tenían permiso para ver a sus familiares ni para trabajar. Con el tiempo esta
situación cambió y se permitieron las visitas los días sábado y facilidades para trabajar
en un taller de carpintería.<br>
<br>Los detenidos llegaban en su mayoría en muy malas condiciones físicas y anímicas,
debido a que desde el mismomomento de su detención eran sometidos a malos tratos
e intensos interrogatorios. Ellos procedían de los diversos retenes y comisarías de la
provincia, así como de recintos militares habilitados para este propósito.<br>
<br>De acuerdo a los testimonios recibidos, en 1973 los detenidos eran sometidos a constantes
amenazas. En varias oportunidades, los guardias hacían descargas de metralletas en la
madrugada, simulando operativos de liberación; sufrieron simulacros de fusilamiento,
golpes, fueron obligados a permanecer en prolongadas posiciones forzadas y fueron
hostigados permanentemente. <br>
Los detenidos eran sacados del penal durante la noche, por personal del Servicio de
Inteligencia Militar (SIM), que los trasladaban a otros recintos en los cuales eran interrogados y torturados.
 Los sitios de tortura más frecuentes, según los testimonios, eran
el Regimiento Cazadores, en cuyo interior funcionaba la Fiscalía Militar, y el cuartel
del Servicio de Inteligencia Militar (SIM) de calle Errázuriz. Volvían a la cárcel en muy
malas condiciones. En el traslado eran también golpeados y amenazados, muchas veces
vendados y amarrados."</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 407</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Primera Comisaría / Fiscalía de Carabineros
var marker = L.marker([-39.817372, -73.235384], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-calle-beaucheff-valdivia/" target="_blank">Primera Comisaria de Valdivia / Fiscalia de Carabineros</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(19)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"El mayor número de detenidos se concentró durante 1973. 
        Los declarantes señalaron quese trataba de un recinto de reclusión transitorio. Muchos de los detenidos provenían de
otros retenes y comisarías de pueblos y ciudades de la provincia. Luego de permanecer
por un breve período en ese lugar, fueron trasladados a otros, en la misma ciudad de
Valdivia.<br>
<br> Cabe señalar que en el mismo recinto, en otras dependencias, funcionó el Servicio de
Inteligencia de Carabineros (SICAR), que también mantuvo detenidos.<br>
A los detenidos les vendaban los ojos y los amarraban. Al principio permanecían en calabozos tan hacinados que debían dormir de pie. Frecuentemente eran sacados al patio,
donde eran interrogados y torturados.<br>

Sufrieron privación de agua y de alimentos, fueron obligados a permanecer en celdas
permanentemente mojadas con aguas servidas y en posiciones forzadas por tiempo
prolongado. En la década de 1980, relataron, se les aplicó electricidad en diversas partes
del cuerpo y fueron sometidos a tormentos psicológicos." </p>


        Los ex presos políticos denunciaron haber sido sometidos a golpes, aplicación de electricidad en la parrilla y picana,
         colgamientos, amenazas, simulacros de fusilamiento, el submarino seco y el mojado."</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 399</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Tenencia Gil de Castro
var marker = L.marker([-39.832340, -73.201687], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('25 de Octubre de 1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/centros-de-detencion/x-region/tenencia-de-carabineros-gil-castro" target="_blank">Tenencia de Carabineros Gil de Castro</a></h3>
        <p style="font-style: italic;">"El 25 de octubre de 1973 fueron ejecutados en la ciudad de Valdivia por personal de Carabineros y probablemente del Ejército, tres jóvenes ninguno de ellos con
militancia política: <br><br>
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/chavez-oyarzun-cosme-ricardo/" target="_blank">Cosme Ricardo Chavez Oyarzun</a>, 18 años<br>
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/gatica-coronado-victor-joel/" target="_blank">Victor Joel Gatica Coronado</a><br>
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/romero-corrales-victor-enrique/" target="_blank">Victor Enrique Romero Coralles</a>, 22 años"</p>
        Los hermanos Fierro Pérez fueron detenidos el 20 de octubre de 1973 en su
domicilio, por efectivos de Carabineros y militares, y llevados a la Tenencia Gil
de Castro.  Inostroza Ñanco lo fue el día 21 de octubre de 1973, en la Feria Libre
de Valdivia, por la misma clase de efectivos.  Los tres fueron ejecutados en
circunstancias no precisadas el día 25 de octubre de 1973, indicando los
certificados de defunción como lugar la vía pública.  Los cuerpos pudieron ser
sepultados por sus familiares.<br>

  
<br>  El 8 de noviembre de 1973, por sentencia del Consejo de Guerra Rol Nº 1572-73
de Valdivia, fueron ejecutadas las siguientes personas, acusadas de asaltar la
Tenencia de Carabineros Gil de Castro, de la misma ciudad, el día 13 de
septiembre de 1973:<br>

<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/chavez-oyarzun-cosme-ricardo/" target="_blank">Cosme Ricardo Chavez Oyarzun</a> 18 años, obrero pintor
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/gatica-coronado-victor-joel/" target="_blank">Victor Joel Gatica Coronado</a>, comerciante ambulante
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/romero-corrales-victor-enrique/" target="_blank">Victor Enrique Romero Coralles</a>, 22 años, orbero"</p>

        <p style="font-style: italic; text-align: right;">Informe Rettig p 396-397</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-valdivia-n4/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Recinto SIM "Palacio de la Risa"
var marker = L.marker([-39.820803, -73.230224], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1975');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/recinto-sim-palacio-de-la-risa-valdivia/" target="_blank">Recinto SIM "Palacio de la Risa"</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(18)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
<p style="font-style: italic;">Estaba ubicado en Av. Ramón Picarte N° 1451. Funcionó entre septiembre de 1973
y el año 1975.

Los detenidos provenían de la ciudad de Valdivia y de otras comunas de la provincia. Unos
permanecían vendados y amarrados y otros en calabozos sin alimento ni agua. Luego, la mayoría era trasladada a otros centros de reclusión, principalmente a la cárcel. Los testimonios
dieron cuenta de diversos tormentos físicos y psicológicos. Sufrieron golpes, aplicación de
electricidad, amenazas, simulacros de fusilamiento, colgamientos y el submarino.</p>
<p style="font-style: italic; text-align: right;"> Comisión Valech p397 </p><br> 

        <p style="font-style: italic;">Estaba ubicado en Av. Ramón Picarte N° 1451. Funcionó entre septiembre de 1973 y el año 1975. Los testimonios dieron cuenta de diversos tormentos físicos y psicológicos.</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 397</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Regimiento Cuartel Bueras
var marker = L.marker([-39.827105, -73.231834], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Regimiento Cuartel Bueras</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(16)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>En este recinto funcionaron:
        <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/regimiento-de-artilleria-n-2-maturana-valdivia/" target="_blank">El Regimiento de Artillería N°2 Maturana</a> /
        <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/regimiento-de-caballeria-blindada-no-2-cazadores/" target="_blank">El Regimiento Caballería Blindada N°2 Cazadores</a> /
        <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/fiscalia-militar-de-valdivia/" target="_blank">La Fiscalia Militar de Valdivia</a></p>
        <p style="font-style: italic;">"El mayor número de detenidos se dio entre septiembre y octubre del año 1973.
        
        <br>Se trata de un recinto que concentraba cuatro regimientos ubicados en la ciudad de
Valdivia. Muchos de los prisioneros, hombres y mujeres, fueron trasladados desde
recintos como la cárcel o comisarías de Valdivia y otras ciudades. Varios eran traídos
luego de ser detenidos durante operativos militares en zonas rurales, especialmente
en la precordillera de Valdivia. Los declarantes afirmaron que llegaban en camiones,
hacinados y en muy malas condiciones físicas. Por las características del lugar, es
probable que los detenidos no supieran con certeza en cual de los tres regimientos
se encontraban.<br>
<br>Se los mantuvo al interior del regimiento en el gimnasio, en galpones y en las caballerizas,
incomunicados, encapuchados durante varios días, privados de alimento yagua. Hay víctimas que denunciaron haber sido rapadas al ingresar.<br>
La Fiscalía Militar de Valdivia funcionó en el Regimiento N° 2 Cazadores, por lo cual
muchos prisioneros fueron llevados desde la cárcel u otros recintos por personal del
Servicio de Inteligencia Militar (SIM) para ser interrogados.<br>
<br>Ex presos políticos denunciaron haber sufrido golpes, algunos con varillas de mimbre;
aplicación de electricidad, simulacros de fusilamiento, el submarino en agua con inmundicias, extracción de uñas, obligación de permanecer en posiciones forzadas, colgamientos
y quemaduras con cigarrillos.<br>
Luego de un tiempo eran trasladados a la Comisaría de Valdivia, a la cárcel o al recinto
de reclusión ubicado en el gimnasio del Banco del Estado-Cendyr . </a>
<p style="font-style: italic; text-align: right;">Comision Valech p 396</p><br>


En el regimiento de la caballeria blindada, fue asesinado 
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/buchhorsts-fernandez-jose-gaston/" target="_blank">José Gastón Buchhorsts Fernandez</a> de 19 años
<br>
<p style="font-style: italic;">"Esta persona desaparece desde ese recinto militar, luego de quedar detenido al
presentarse con días de retraso, después de un permiso.  Su familia declara que en
dicho Regimiento, fue informada verbalmente, que había sido ejecutado luego de
intentar una fuga.  Sin embargo, sus restos nunca fueron entregados y su muerte
no se encuentra registrada oficialmente.</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p388 </p>

"</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p 396</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Campamento Prisioneros / Gimnasio Cendyr
var marker = L.marker([-39.82898931783156, -73.22762137804432], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/gimnasio-del-cendyr-valdivia/" target="_blank">Campamento de Prisioneros Valdivia (Actual Gimnasio Cendyr)</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(15)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"Durante 1973 este recinto, que estaba a cargo del Ejército, se utilizó para la reclusión de presos políticos.
        <br>Los detenidos, hombres y mujeres, provenían en su mayoría de otros recintos. Durante su
permanencia eran mantenidos en una sala del gimnasio de 36 por 26 metros, con camarotes
o camas de campaña, dormían en las graderías del gimnasio. No se les permitía salir al
aire libre y en cuanto ingresaban se les asignaba un número, a modo de identificación;
por ese número serían llamados durante toda su permanencia en el lugar. <br> <br>
Los conducían a interrogatorios al regimiento de caballería, al SIM de Valdivia en la calle Errázuriz y al
cuartel de Investigaciones de esta ciudad. Algunos denunciaron haber sido trasladados
en camiones cerrados.
Los declarantes denunciaron también golpes, simulacros de fusilamiento y aplicación
de electricidad."</p>
"</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 398</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Cuartel de Investigaciones Valdivia
var marker = L.marker([-39.83331435, -73.215387142], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1975');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/cuartel-de-investigaciones-valdivia/" target="_blank">Cuartel de investigaciones</a></h3>
      
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(15)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});;
marker.addTo(mapa);
markers.push(marker);

// Tenencia Los Jazmines
var marker = L.marker([-39.821043, -73.211172], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-los-jazmines/" target="_blank">Tenencia de carabineros Los Jazmines</a></h3>
        <p>La Tenencia de Carabineros, Los Jazmines fue utilizada para la detención de presos políticos de la región.</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 413</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Collico
var marker = L.marker([-39.806373, -73.208712], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-collico/" target="_blank">Retén de Carabineros Collico</a></h3>
        <p>El retén de carabineros de Collico fue utilizado para la detención de presos políticos de la región.</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 413</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Las Ánimas
var marker = L.marker([-39.816662, -73.226129], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-las-animas/" target="_blank">Ex Retén de Carabineros de las Ánimas</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(26)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div></p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Ex Cuartel de Investigacion 
var marker = L.marker([-39.813565, -73.241661], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1975');
    openPanel(
        `<h3>Ex Cuartel de Investigacion</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(25)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div
        >`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Ex Cuartel General IV División Ejército
var marker = L.marker([-39.82048071854145, -73.22936427083401], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Ex Cuartel General de la IV División del Ejército</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(17)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria"
                 style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                 onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Llancahue
var marker = L.marker([-39.848117, -73.197300], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial de Llancahue</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(120)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(12)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
        <p style="font-style: italic;">"Los días 3 y 4 de octubre de 1973, fueron ejecutados en cumplimiento de una sentencia del Consejo de Guerra de Valdivia, las siguientes personas, en su mayoría militantes del MIR-MCR,  <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barria-ordonez-pedro-purisimo/" target="_blank">Pedro Purísimo Barria Ordóñez</a>, 22 años 
<br> <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barrientos-warner-jose-rene/" target="_blank">José René Barrientos Warner</a>, 29 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/bravo-aguilera-sergio-jaime/" target="_blank">Sergio Jaime Bravo Aguilera</a>, 21 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/garcia-morales-santiago-segundo/" target="_blank">Santiago Segundo Garcia Morales</a>,26 años
<br> <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/liendo-vera-jose-gregorio/" target="_blank">José Gregorio Liendo Vera "Comandante Pepe"</a>, 28 años 
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/guzman-soto-luis-enrique-del-carmen/" target="_blank">Luis Enrique del Carmen Guzman Soto</a>, 21 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/krauss-iturra-victor-fernando/" target="_blank">Fernando Krauss Iturra</a>, 24 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/pezo-jara-luis-hernan" target="_blank">Luis Hernán Pezo Jara</a>, 29 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/rudolf-reyes-victor-eugenio/" target="_blank">Víctor Eugenio Rudolf Reyes</a>, 32 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/saavedra-bahamondes-rudemir/" target="_blank">Rudemir Saavedra Bahamondes</a>, 29 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/saavedra-munoz-victor-segundo/" target="_blank">Víctor Segundo Saavedra Muñoz</a>, 19 años
 <br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/valenzuela-ferrada-luis-mario/" target="_blank">Luis Mario Valenzuela Ferrada</a>, 20 años

<br><br>Múltiples versiones de prensa de la época hacen referencia a la tramitación de este
Consejo de Guerra.  Una comunicación oficial de sus ejecuciones señala que se
les habría acusado de varios delitos, entre ellos, el asalto al Retén de Neltume." "</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p389</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/caso-caravana-episodio-valdivia/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Aerodromo Las Marías
var marker = L.marker([-39.800118, -73.244429], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Aerodromo las Marías</h3>
        <p style="font-style: italic;">"El 5 de octubre de 1973 fue muerto en Valdivia, por personal del Ejército,
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carreno-zuniga-victor-hugo/" target="_blank">Victor Hugo Carreño Zuñiga</a>, 21 años, estudiante, Presidente Regional de la Juventud Socialista. La prensa informó que fue muerto, en horas de toque de queda, cuando se arrancó
de la patrulla militar que lo llevaba detenido. ©
Se ha acreditado ante esta Comisión que esta persona fue detenida en su
domicilio, ante testigos, el día 4 de octubre de 1973 por funcionarios del Ejército."</p>"</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p390</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Población Huachocopihue
var marker = L.marker([-39.837134, -73.239760], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Población Huachocopihue</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(24)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>El día 28 de septiembre el Diario El Mercurio informa la detención del ex diputado del Partido Socialista 
        <a href="https://www.memoriaviva.com/ejecutados-politicos/espinoza-villalobos-luis-uberlindo" target="_blank">Luis Espinoza Villalobos</a> de 33 años.
         el Médico mirista Bruno García Morales, en un allanamiento practicado en el domicilio del médico. El
radiograma llegado a la policía civil dice que ambos estaban escondidos en laPoblación ‘Huachocopihue’, calle Inglaterra 471 hasta el dia de hoy.
<br<br>
Posteriormente <a href="https://interactivos.museodelamemoria.cl/victimas/?p=490" target="_blank">Luis Espinoza Villalobos</a> 
fue asesinado ”
  fue asesinado en el regimiento de Puerto Montt </p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Sitio de interés N°1</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Campamento Chorrillos
var marker = L.marker([-39.837502, -73.222107], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Campamento Chorrillos</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(24)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Escuela Mexico
var marker = L.marker([-39.817788, -73.232166], {icon: memorial});
marker.anio = 1989;
marker.on('click', function() {
    setAnio('1989');
    openPanel(
        `<h3>Escuela Mexico</h3>
        <p style="font-style: italic;">"El 15 de diciembre de 1989 en una manifestación de celebración del triunfo de don Patricio Aylwin en las elecciones presidenciales, murió
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/rivas-ovalle-sebastian/" target="_blank">Sebastián Rodrigo Rivas Ovalle</a>."</p>
        
Los hechos ocurrieron en el sector de Escuela México (Valdivia), hasta donde llegaron efectivos de
Carabineros.  Los manifestantes decidieron no huir, pero - según relata un testigo - "a Sebastián lo
distinguieron porque iba con la camiseta puesta (la de la candidatura de Aylwin)"; posteriormente,
según las mismas versiones, fue golpeado por los carabineros.  Llegó a su casa con señales de golpes
en todo el cuerpo.  Al día siguiente fue trasladado a un hospital, donde falleció a causa de una
contusión hemorrágica, meningo encefálica, traumatismo encéfalo craneano, según reza el certificado
de defunción.  La versión de Carabineros fue que se produjeron violentos incidentes, ante lo cual
intervino la fuerza pública, y que era posible que el afectado hubiese recibido algún bastonazo, pero
que también había otras posibles causas de las lesiones en esas circunstancias, independientes de la
acción de Carabineros.
Aunque hubiese habido alguna necesidad de intervención de Carabineros en este caso, la Comisión,
sopesando los antecedentes reunidos, de modo particular los testimonios de personas más cercanas a
los hechos, presume que los agentes del Estado violaron el derecho a la vida de Rodrigo Rivas, al
excederse en el uso de la fuerza. ©</a>
</p>        
        <p style="font-style: italic; text-align: right;">Informe Rettig p398</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/sebastian-rivas-ovalle/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Plazuela Carlos Lorca
var marker = L.marker([-39.830120, -73.209806], {icon: memorial});
marker.anio = 1975;
marker.on('click', function() {
    setAnio('1975');
    openPanel(
        `<h3>Plazuela Carlos Lorca</h3>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial UACH
var marker = L.marker([-39.806129, -73.248338], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial UACH</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(20)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>La Piedra Recordatoria a Estudiantes Víctimas de Violación a los Derechos Humanos, recuerda a los jóvenes alumnos de la Universidad Austral de Chile que fueron asesinados
         por agentes del Estado.</p>

         Los estudiantes conmemorados son: 
<br>
<br><a href="https://www.memoriaviva.com/detenidos-desaparecidos/appel-de-la-cruz-jose-luis/" target="_blank">José Luis Appel</a>, 20 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barrientos-warner-jose-rene/" target="_blank">José René Barrientos Warner</a>, 29 años
<br><a href="https://www.memoriaviva.com/detenidos-desaparecidos/delard-cabezas-carmen-angelica/" target="_blank">Carmen Angélica Delard Cabezas</a>, 23 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/krauss-iturra-victor-fernando/" target="_blank">Fernando Krauss Iturra</a>, 24 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/liendo-vera-jose-gregorio/" target="_blank">José Gregorio Liendo Vera</a>, 28 años
<br> Mario Alejandro Mellado Manríquez
<br><a href="https://www.memoriaviva.com/ejecutados-politicos/valenzuela-salazar-hector-dario/" target="_blank">Héctor Darío Valenzuela, 27 años</a>
<br><a href="https://www.memoriaviva.com/detenidos-desaparecidos/pardo-pedemonte-sergio-raul/" target="_blank">Sergio Raúl Pardo Pedemonte, 25 años</a>
<br><a href="https://www.memoriaviva.com/ejecutados-politicos/vasquez-martinez-hugo-rivol/" target="_blank">Hugo Ribol Vásquez, 21 años</a>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°11 tramo Valdivia</p>
        El 10 de enero de 1977, <br><a href="https://www.memoriaviva.com/detenidos-desaparecidos/appel-de-la-cruz-jose-luis/" target="_blank">José Luis Appel</a>, 20 años fue secuestrado por un grupo de
civiles armados, en plena vía pública de la ciudad de Cipolletti, provincia de Neuquén,
Argentina, ante los ojos de su cónyuge Carmen Angélica DELARD CABEZAS y de su
hija.  Carmen Delard desapareció en la Comisaría de esa ciudad al hacer la denuncia de la
desaparición de su cónyuge.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 872 </p>`
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Puente Estancilla
var marker = L.marker([-39.843286, -73.292629], {icon: memorial});
marker.anio = 1984;
marker.on('click', function() {
    setAnio('1984');
    openPanel(
        `<h3>Memorial Puente Estancilla</h3>
        <div style="display: flex; justify-content: space-around; gap: 25px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(92)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(22)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
  <p style="font-style: italic; text-align: left;">
"Entre el 23 y el 24 de agosto de 1984 la CNI, con agentes enviados desde Santiago,
ejecutó una operación destinada a eliminar a los dirigentes del MIR en la zona sur del país,
específicamente en Concepción, Los Angeles y Valdivia.  Muchos de ellos habían ingresado
ilegalmente al país y se encontraban realizando trabajo clandestino.  Todos estaban siendo
seguidos por agentes de seguridad con anterioridad y por lo mismo éstos tenían claridad
absoluta sobre sus actividades.[...]<br><br>

El 23 de agosto murieron en el camino que une a Valdivia con Niebla, Raúl
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/barrientos-matamala-raul-jaime/" target="_blank">Raúl Jaime  Barrientos Matamala</a> y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-t/tapia-de-la-fuente-rogelio-humberto/" target="_blank">Rogelio Tapia de la Puente</a>,
empleado e ingeniero forestal respectivamente.  En esta oportunidad también se informó
oficialmente de la existencia de un enfrentamiento y de la huida de una tercera persona del
lugar, lo que es del todo improbable dadas las condiciones del terreno. La Comisión tiene
información de que las víctimas habrían sido detenidas en Valdivia y conducidas a ese lugar
para su ejecución por los agentes de la CNI.<br><br>
El 24 de agosto se produjo el último de los hechos, el que le costó la vida a <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/boncompte-andreu-juan-jose/" target="_blank">Juan Boncompte Andreu</a>, de profesión economista. El fue sorprendido en su domicilio
por un elevado número de agentes.  Juan Boncompte intentó huir por la parte trasera de la
casa pero fue cercado, disparándosele luego en repetidas ocasiones, a consecuencia de lo
cual falleció de manera inmediata.  Varios relatos de testigos indican que no hubo ningún
tipo de resistencia por parte de la víctima y que ésta se encontraba a merced de los agentes
cuando fue muerta.</p></p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/caso-caravana-episodio-valdivia/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial de la Mano
var marker = L.marker([-39.840809, -73.215964], {icon: memorial});
marker.anio = 1984;
marker.on('click', function() {
    setAnio('1984');
    openPanel(
        `<h3>Memorial de la Mano</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(119)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(12)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
        <p>En recuerdo de <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/boncompte-andreu-juan-jose/" target="_blank">Juan José Boncompte Andreu</a>, asesinado el 24 de agosto de 1984 en la Población Rubén Darío (operación alfa carbón).</p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°4 tramo Valdivia</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/caso-caravana-episodio-valdivia/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial por la Vida
var marker = L.marker([-39.829300, -73.215533], {icon: memorial});
marker.anio = 2001;
marker.on('click', function() {
    setAnio('2001');
    openPanel(
        `<h3>Memorial por la vida</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(110)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(10)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Puente Pichoy
var marker = L.marker([-39.686294, -73.101902], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial Puente Pichoy</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(116)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(23)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>

        <p style="font-style: italic;">"El día 12 de octubre de 1973, en el Puente Pichoy, Valdivia, fueron ejecutados
por carabineros, tres de las siguientes personas, mientras la otra falleció producto
de las torturas recibidas:<br>

<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-cortes-jose-manuel/" target="_blank">José Manuel Arriagada Cortes</a>, 19 años
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-zuniga-jose-gabriel/" target="_blank">José Gabriel Arriagada Zuñiga</a>, 30 años
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carrasco-torres-jose-manuel/" target="_blank">José Manuel Carrasco Torres</a>, 19 años
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-o/ortega-alegria-gilberto-antonio/" target="_blank">Gilberto Antonio Ortega Alegria</a>, 39 años

<br><br>Todos ellos fueron detenidos el día 10 de octubre de 1973 por Carabineros de
Malalhue y de Lanco, y conducidos al Retén de Malalhue, siendo trasladados
posteriormente a la Tenencia de Lanco, donde permanecieron hasta el día 12 de
octubre de 1973.  <br><br>En dicho recinto, producto de las torturas, falleció <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-o/ortega-alegria-gilberto-antonio/" target="_blank">Gilberto Antonio Ortega Alegria</a>, en presencia de testigos.  Al cabo de pocas horas, los
otros tres detenidos y el cuerpo de Ortega fueron sacados de la Tenencia para ser
trasladados a Valdivia.<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-zuniga-jose-gabriel/" target="_blank">José Gabriel Arriagada Zuñiga</a> fue amarrado con <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-cortes-jose-manuel/" target="_blank">José Manuel Arriagada Cortes</a>, y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carrasco-torres-jose-manuel/" target="_blank">José Manuel Carrasco Torres</a> con el cuerpo de Ortega.
Al llegar al Puente Pichoy, los detenidos fueron ejecutados.  Todos los cuerpos
registraban múltiples impactos de bala.  <br><br>Sus restos fueron entregados a sus
familiares para su sepultación.  Versiones verbales entregadas a las familias por
autoridades de Carabineros dieron como razón de la muerte el que los detenidos
habrían intentado fugarse, sin dar explicaciones mas circunstanciadas sobre ello.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 394 </p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-pichoy/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Maiquillahue
var marker = L.marker([-39.461455, -73.232988], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial de Maiquillahue</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(121)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(56)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
   El 31 de octubre de 1973, en el sector de Maiquillahue, San José de la Mariquina,
fue muerto por militares <a href="https://www.memoriaviva.com/ejecutados-politicos/nanco-jose-matias" target="_blank">José Matías Ñanco Lillo</a>, 60 años, pescador, predicador
protestante, simpatizante de izquierda.<br><br>
En la localidad señalada efectivos militares realizaron un operativo y detuvieron a
alrededor de trece personas, formándolas en fila.  José Ñanco se negó a obedecer
dirigiéndose en términos duros a los militares y forzó el arma de uno de ellos,
entonces le dispararon y le dieron muerte.  El mismo uniformado ordenó levantar
el cuerpo, a lo que se negaron los demás detenidos, por lo que los propios
militares lo llevaron hacia un lugar que se desconoce.</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p 396</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/jose-matias-nanco/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// PANGUIPULLI
// =============================================

// Comisaría Panguipulli
var marker = L.marker([-39.641441, -72.336967], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-panguipulli/" target="_blank">Quinta Comisaria de carabineros de Panguipulli</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(39)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"La mayor cantidad de detenidos en este recinto se registró en el año 1973.Parte de
los presos, según los testimonios, provenía de retenes de la precordillera (Neltume,
Futrono, Liquiñe y Choshuenco) y fueron detenidos en operativos conjuntos con el
Ejército en asentamientos campesinos y en la zona del Complejo Maderero Panguipulli.<br>
<br> A la comisaría ingresaron en muy malas condiciones físicas, fueron desnudados,
mojados y encerrados en calabozos muy húmedos. Los declarantes señalaron que
permanecieron siempre incomunicados y muchos amarrados con alambre de púas.
<br> Eran conducidos al subterráneo del recinto o a las caballerizas para ser sometidos a
interrogatorios y torturas; aunque muchos denunciaron que ni siquiera se les interrogaba, sino que sólo eran torturados.<br>
<br> Desde aquí, por lo general, eran trasladados a
la ciudad de Valdivia, a la cárcel, al Servicio de Inteligencia Militar (SIM), al regimiento
o a campos de prisioneros.Los ex presos políticos denunciaron haber sufrido el submarino, golpes con co1igües,
haber sido pisoteados y amenazados constantemente."</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 403</p>

<p style="font-style: italic; text-align: left;"> "
  <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/matus-hermosilla-victoriano/" target="_blank">Victoriano Matus Hermosilla</a>
  , de 39 años, era obrero del Complejo Maderero y Forestal Panguipulli.
Sin tener militancia política, había estado vinculado con algunos miembros del Movimiento Campesino
Revolucionario (MCR) y con militantes del Movimiento de Izquierda Revolucionaria, MIR.  Fue detenido con
posterioridad al 11 de septiembre de 1973, recuperando días después su libertad.  Según testimonios recibidos,
el 15 de enero de 1974, fue nuevamente detenido por Carabineros de Panguipulli.  Al cabo de algunos días, su
familia fue informada de su traslado a Valdivia, adonde nunca llegó, pues resultó muerto en el camino en
circunstancias que no se han podido determinar."</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p 1172 </p><br>        
        
        `,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/harry-cohen-vera/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Gimnasio Municipal Panguipulli
var marker = L.marker([-39.64158180366318, -72.33180351941546], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Gimnasio municipal Edgardo Brevis de Panguipulli</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(38)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>El 1 de diciembre de 2017 se realizó el acto de instalación de una placa recordatoria en el Gimnasio Municipal Eduardo Brevis Aravena, recinto deportivo utilizado como centro de detención y tortura tras el golpe de Estado de 1973.</p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°10 tramo Cordillerano</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Población Llonquellén
var marker = L.marker([-39.642274570, -72.3419559], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Población Llonquellén</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(40)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
   </p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Casa Administración Fundo Releco
var marker = L.marker([-39.627591, -72.138181], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/casa-de-administracion-fundo-releco/" target="_blank">Casa de Administración Fundo Releco</a></h3>
        <p>La Casa de Administración Fundo "Releco" en Panguipulli fue utilizada como lugar de detención de presos políticos.</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// LIQUIÑE / NELTUME / CORDILLERA
// =============================================

// Campamento Militar Liquiñe
var marker = L.marker([-39.731076, -71.852518], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/campamento-militar-liquine/" target="_blank">Campamento militar de Liquiñe</a></h3>
        <p>El Campamento Militar Liquiñe fue utilizado como lugar de detención de presos políticos.</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Liquiñe
var marker = L.marker([-39.747389, -71.855621], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-liquine/" target="_blank">Retén de carabineros de Liquiñe</a></h3>
        <p>El retén de Liquiñe fue utilizado como lugar de detención de presos políticos.</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Neltume
var marker = L.marker([-39.851113, -71.947269], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-neltume/" target="_blank">Retén de carabineros de Neltume</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(32)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"Este retén fue utilizado en el año 1973. 
        La mayoría de los testimonios recibidos sobre ese año fueron hombres del Complejo Maderero Panguipulli., detenidos en operativos conjuntos de carabineros
y militares, también con la participación de algunos civiles. Según dichos testimonios,
se les interrogaba en relación con el asalto del retén de Neltume. <br>
<br> Ingresados al recinto, eran mantenidos en calabozos o en las pesebreras con cerdos y caballos, incomunicados,
con los ojos vendados y amarrados mientras eran interrogados y torturados.
Los ex prisioneros denunciaron haber sufrido golpes, amenazas, introducción de líquido
a presión por la nariz, azotes con ramas de ortiga y pinchazos de agujas en los testículos.
Varios testigos denunciaron haber sido obligados a permanecer en una casa de perro."</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 404</p>
        
"Valdivia, Complejo Maderero y
Forestal Panguipulli, se produjo una tentativa fracasada de asalto al retén de
Neltume.  La realizaron elementos de izquierda extrema de aquel complejo,
especialmente miembros del Movimiento Campesino Revolucionario (MCR),
rama del MIR, que tras su fracaso y sin que hubiera víctimas, se dispersaron sin
efectuar nuevas operaciones.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 94 </p><br>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Campamento Puerto Fuy / Pirihueico
var marker = L.marker([-39.871893, -71.893167], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/campamento-militar-puerto-fuy-pirihueico/" target="_blank">Campamento militar Puerto Fuy / Pirehueico</a></h3>
        <p>El Campamento Militar Puerto Fuy / Pirihueico fue utilizado por el Ejército para la detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Tenencia Pirihueico
var marker = L.marker([-40.025581, -71.721359], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-de-pirehueico-panguipulli/" target="_blank">Tenencia fronteriza de carabineros de Pirihueico</a></h3>
        <p>En diciembre de 1973, fue asesinado el cabo <a href="https://memoriaviva.com/ejecutados-politicos/barria-umana-luis-arturo" target="_blank">Luis Barra Umaña</a>.</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Choshuenco
var marker = L.marker([-39.837410, -72.084467], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 / 1981');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-choshuenco/" target="_blank">Reten de carabineros de Choshuenco</a></h3>
        <p style="font-style: italic;">"De acuerdo con los antecedentes, este retén se utilizó en el año 1973. 
        Sólo se denunciaron algunos casos en la década de 1980.
        Según los testimonios, al igual que en el caso del retén de Neltume, la mayoría de los
hombres detenidos en 1973 provenían del Complejo Maderero Panguipulli y 
apresados durante la ocupación militar de la zona, en operativos en los que participaban
militares, civiles y carabineros de los retenes de este sector precordillerano de la provincia
de Valdivia.
Los testigos denunciaron que en el cuartel policial actuaba personal del Ejército, interrogando y torturando a los prisioneros.<br>
<br> Los casos del año 1981 se relacionaron con detenciones de militantes del MIR que
ingresaron clandestinamente a la zona del complejo. Los detenidos, luego de haber
permanecido un tiempo en este recinto, fueron conducidos a Panguipulli y a Valdivia.
Los testimonios señalan que sufrieron golpes, vejaciones sexuales, amenazas, fueron
amarrados y mojados con agua fría, padecieron simulacro de fusilamiento y corte de
pelo y bigotes con yataganes. </p>"</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 404</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Ex-Hotel Pirihueico
var marker = L.marker([-40.026590, -71.724451], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Ex-Hotel Pirihueico</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(33)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>El Hotel Pirehueico fue un lugar donde en los días posteriores al Golpe de Estado los militares llevaban a obreros y trabajadores del Complejo Forestal y Maderero Panguipulli, los que eran torturados en los subterráneos del inmueble.</p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria hito N°5 tramo Cordillerano</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Liquiñe
var marker = L.marker([-39.746590, -71.852240], {icon: memorial});
marker.anio = 1995;
marker.on('click', function() {
    setAnio('1995');
    openPanel(
        `<h3>Memorial de Liquiñe</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(102)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(37)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
        <p>Recuerda a 15 personas detenidas en Liquiñe, Trafun y Paimun, ejecutados en el puente Toltén, el 10 de octubre de 1973.
        
        ecuerda a 15 personas detenidas en Liquiñe, Trafun y Paimun, ejecutados en el puente Toltén, el 10 de octubre de 1973. 
Casi todos los ejecutados y desaparecidos pertenecían al Complejo Forestal y Maderero Panguipulli.

Aquí el detalle de los nombres de cada uno de ellos,
 quienes representan plenamente a la AFDD-AFEP por el hecho de haber sido ejecutados
 y luego desaparecidos sus cuerpos en el puente sobre el río Toltén, testigo de su asesinato:<br>

 <br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/rivera-catricheo-luis-alfredo" target="_blank">Luis Alfredo Rivera Catricheo</a>, 52 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/tracanao-pincheira-miguel-jose" target="_blank">Miguel José Tracanao Pincheira</a> ,25 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/tracanao-pincheira-eliseo-maximiliano" target="_blank">Eliseo Maximiliano Tracanao Pincheira</a>, 16 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/alamos-rubilar-salvador" target="_blank">Salvador Alamos Rubilar</a>, 45 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/borquez-levican-jose-hector" target="_blank">José Héctor Bórquez Levicán</a>, 30 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/reinante-raipan-alberto-segundo" target="_blank">Alberto Segundo Reinante Raipán</a>, 41 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/reinante-raipan-modesto-juan" target="_blank">Modesto Juan Reinante Raipán, 18 años</a>
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/reinante-raipan-ernesto" target="_blank">Ernesto Reinante Raipán</a>, 29 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/lagos-torres-luis-armando" target="_blank">Luis Armando Lagos Torres</a>, 50 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/tracanao-pincheira-alejandro-antonio" target="_blank">Alejandro Antonio Tracanao Pincheira</a>, 22 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/figueroa-zapata-carlos-segundo" target="_blank">Carlos Segundo Figueroa Zapata</a>, 46 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/curinanco-reyes-mauricio-segundo" target="_blank">Mauricio Segundo Curiñanco Reyes</a>, 31 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/fuentealba-calderon-isaias-jose" target="_blank">Isaías José Fuentealba Calderón</a>, 29 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/castro-lopez-daniel-antonio" target="_blank">Daniel Antonio Castro López</a>, 68 años
<br>   <a href="https://memoriaviva.com/detenidos-desaparecidos/cayuman-cayuman-carlos-alberto" target="_blank">Carlos Alberto Cayumán Cayumán</a>, 31 años

<p style="font-style: italic; text-align: right;">Ruta de la memoria</p></p>

<p style="font-style: italic;">"Se ha podido acreditar que las detenciones fueron practicadas por personal
uniformado, quienes portaban una lista con los nombres de los detenidos,
confeccionada por civiles que también participaron en éstas.  Los agentes
aprehensores  fueron  guiados  por  el  sector  por  algunos  funcionarios  de
Carabineros de la dotación del Retén de Liquiñe.<br>
Los efectivos militares vestían uniforme de combate y se identificaron como
"militares" ante los familiares, señalando que los detenidos regresarían a sus casas
tan pronto como prestaran algunas declaraciones.  Testimonios recibidos por esta
Comisión permiten presumir que los uniformados pertenecían al Grupo Nº 3 de
Helicópteros Maquehua ubicado en la ciudad de Temuco y pertenecientes a la
Fuerza Aérea.<br>
Se movilizaban en un vehículo particular, una camioneta del Servicio Agrícola y
Ganadero (SAG), un vehículo policial y en la ambulancia del Retén de Liquiñe;
contaron también con el apoyo de un helicóptero.<br>
Actuaron divididos en varios grupos, que se juntaron en el cruce de Coñaripe,
cercano a todos los lugares en que se practicaron las detenciones.  Allí tomaron el
camino a Villarrica y en el puente sobre el río Toltén, ubicado a la entrada de la
ciudad, les dieron muerte y arrojaron sus cuerpos a las aguas.  Dos de ellos fueron
reconocidos por los lugareños, antes de sumergirse definitivamente en el río."</p>

<p style="font-style: italic; text-align: right;"> Informe Rettig p 393 </p><br>`,

        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-liquine/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Neltume
var marker = L.marker([-39.850383, -71.945767], {icon: memorial});
marker.anio = 1997;
marker.on('click', function() {
    setAnio('1997');
    openPanel(
        `<h3>Memorial de Neltume</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(108)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(30)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Museo de la Memoria Neltume
var marker = L.marker([-39.849068592154566, -71.94588809927382], {icon: memorial});
marker.anio = 1990;
marker.on('click', function() {
    setAnio('1990');
    openPanel(
        `<h3>Museo de la memoria Neltume</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(30)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Paine / Miguel Cabrera
var marker = L.marker([-39.836791, -72.0838169], {icon: memorial});
marker.anio = 1981;
marker.on('click', function() {
    setAnio('1981');
    openPanel(
        `<h3>Memorial de <a href = "https://memoriaviva.com/ejecutados-politicos/cabrera-fernandez-miguel"target="_blank"> Miguel Cabrera "Paine"</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(35)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Remeco Alto
var marker = L.marker([-39.817188171939335, -71.94666915089196], {icon: memorial});
marker.anio = 1981;
marker.on('click', function() {
    setAnio('1981');
    openPanel(
        `<h3>Remeco Alto</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(34)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
      

Este fue el camino elegido por los integrantes del “Destacamento Guerrillero
Toqui Lautaro”, para instalar la resistencia. En 1980 ingresaron desde el exilio con
el objetivo de construir un frente guerrillero en la cordillera de Neltume y sumar
fuerzas en la lucha frontal en contra de la dictadura.<br><br>
De acuerdo al Informe Rettig, en junio de 1981 fue denunciada por campesinos
de la zona de Neltume, la existencia de un campamento de guerrilleros en ese
sector. Se trataba de militantes del MIR ingresados clandestinamente al país como
parte de la llamada Operación Retorno, quienes intentaban establecer una base en
la zona cordillerana del sur el país, donde se instalaría a futuro la dirigencia de su
colectividad. A raíz de esta información se inició un intenso operativo con agentes
de la CNI enviados desde Santiago y personal de Carabineros y del Ejército. <br><br>
En julio de 1981 el campamento fue descubierto por los efectivos de
seguridad, mientras se encontraba en etapa de construcción. En esa oportunidad
fue incautada una gran cantidad de material y documentación. Por esa fecha el
grupo se dividió y tres de ellos se dirigieron al sector de Remeco Alto, a casa de
una pariente de uno de ellos, con el fin de obtener alimentos. Los militares fueron
alertados de la presencia de estas personas por los propios moradores de la casa y
los sorprendieron mientras dormían, dándoles muerte. <br><br>
Fallecieron así los obreros
<a href="https://memoriaviva.com/ejecutados-politicos/calfuquir-henriquez-patricio-alejandro" target="_blank">Patricio Alejandro Calfuquir Henríquez</a> de 28 años y
<a href="https://memoriaviva.com/ejecutados-politicos/guzman-soto-prospero-del-carmen" target="_blank">Próspero del Carmen Guzmán Soto</a> de 27 años
  en el interior de la vivienda, la que quedó totalmente
destruida por los disparos. 
<a href="https://memoriaviva.com/ejecutados-politicos/monsalve-sandoval-jose-eugenio" target="_blank">José Eugenio Monsalve Sandoval</a> de 27 años, también obrero,
alcanzó a huir algunos metros de la casa, siendo alcanzado y ejecutado. Le consta
a la Comisión que en ninguna de estas muertes hubo resistencia previa por parte
de las víctimas. Todo esto sucedió el 20 de septiembre de 1981 y en el año 2001 se
levantó en el lugar un memorial en recuerdo de lo ocurrido.<br><br>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria hito N°6 tramo Cordillerano</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Fundo Carranco
var marker = L.marker([-39.776294604, -71.8093068], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Fundo Carranco</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(36)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Riñihue
var marker = L.marker([-39.819882, -72.442796], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-rinihue/" target="_blank">Retén de carabineros de Riñihue</a></h3>
        <p>El retén de carabineros de Riñihue fue utilizado como lugar de detención de presos políticos.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 413</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Ñancul Alto
var marker = L.marker([-39.749328, -72.431395], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Ñancul Alto</h3>
        <p style="font-style: italic;"><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/cofre-catril-juana-del-carmen/" target="_blank">Juana del Carmen Cofre Catril</a> de 22 años, 
        era empleada administrativa en el Complejo Maderero y Forestal Panguipulli y militante del Partido Socialista.Se encontraba oculta en la localidad de Huellelhe, dentro del Complejo, pues estaba siendo intensamente
buscada por las autoridades militares de Valdivia, acusada de realizar actos subversivos.  De acuerdo a los
antecedentes recabados, se habría suicidado en Huellelhue, presionada por la situación en que se encontraba, y
habría sido enterrada por terceras personas en un lugar cercano.
La Comisión no pudo formarse convicción sobre su calidad de víctima por no haber podido confirmar este
hecho.
</a></p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p 1165</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Caso Molco
var marker = L.marker([-39.823737, -72.082169], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Caso Molco</h3>

       <p style="font-style: italic;">"El 23 de diciembre de 1973 fueron ejecutados por carabineros en el sector de
Molco, Choshuenco, en el Complejo Panguipulli, dos personas:<br>


<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/
ejecutados-politicos-v/vasquez-martinez-hugo-rivol/" target="_blank">Hugo Rivol Vasquez Martinez</a>
<br><a href="https://memoriaviva.com/ejecutados-politicos/superby-jeldres-mario-edmundoejecutados-politicos-v/vasquez-martinez-hugo-rivol/" target="_blank">Mario Edmundo Superby Jeldres</a>
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/romero-corrales-victor-enrique/" target="_blank">Victor Enrique Romero Coralles</a><br>


<br>se se encontraban internados en la montaña, en el sector de Choshuenco,
desde  donde  bajaban  al  pueblo  esporádicamente  a  alimentarse.    Según
información de prensa de la época, "dos extremistas fueron muertos durante el
transcurso de un operativo que hicieron a las 23,45 horas funcionarios de
Choshuenco  al  lugar  denominado  Molco.    En  momentos  que  Carabineros
patrullaba el sector fueron atacados con disparos de armas por los extremistas,
repeliendo de inmediato el ataque.  Durante la balacera fue muerto con impactos
en el tórax Hugo Rivol Vásquez Martínez, 21 años, el que portaba un rifle marca
Winchester de repetición.  Andaba con otro sujeto apodado "El Braulio", quién
fue herido en las piernas y mientras era conducido al Hospital de Panguipulli dejó
de existir en el camino".</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p398</p><br>"</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p398</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// FUTRONO
// =============================================

// Comisaría Futrono
var marker = L.marker([-40.127781, -72.393749], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1974');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-futrono/" target="_blank">Comisaria de carabineros de Futrono</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(53)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"Según consta de los antecedentes, la gran mayoría de casos se registró en los años 1973 y 1974.
        <br>En el año 1973 las detenciones se produjeron en los asentamientos campesinos y en el
Complejo Maderero Panguipulli, durante operativos militares realizados en conjunto
con Carabineros y civiles, según señalaron los declarantes. Esta comisaría se constituyó
en un recinto de tránsito, interrogatorios y torturas. De acuerdo a los testimonios,
un gran número de campesinos fue traído en helicópteros desde la isla Huapi, en el
Lago Ranco. Al interior de la comisaría eran interrogados y torturados por militares
en el sector de las caballerizas; el resto del tiempo eran mantenidos en calabozos,
hacinados y sucios, incomunicados, vendados, sin alimento, sin baño ni agua." </p>
"</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 403</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/harry-cohen-vera/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Colegio María Deogracia
var marker = L.marker([-40.131416, -72.389006], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Colegio Maria Deogracia</h3>
<p>Durante el operativo de gran envergadura en el sector denominado “Baños de Chihuío”, por parte de la IV División del Ejercito, 
 en el cual participaron miembros de la Fuerza Aérea, boinas Verdes de la Escuela de Montaña (con asiento en Temuco), conscriptos del Regimiento “Cazadores” y “Maturana” y civiles de la localidad, 
  detuvieron y dieron muerte a 18 personas, en su mayoría miembros del Sindicato Campesino “Esperanza del Obrero”.<br>
  La caravana militar se hospedo en Futrono en la Escuela Particular Nº 45 Maria DeoGracia en Balmaceda 280,
 Futrono (hoy Colegio Maria DeoGracia). <br> Esta escuela era perteneciente a las religiosas Franciscanas del Sagrado Corazón de Purulón, 
 y por invitación directa de las mojas que dirigían dicho establecimiento educacional los militares utilizaron este recinto para la detencion
 y tortura de presos politicos. <br>

<br> El testimonio de uno de los conscripto del Regimiento “Cazadores” que participo en dicho operativo, 
asegura que ellos albergaron en esta escuela a invitación de las religiosas, donde se hicieron asados y comilonas, 
mientras los presos políticos de la localidad, que habían sido trasladado desde la Comisaría de Carabineros de Futrono, 
eran interrogados en las aulas de la escuela.</p>
        <p style="font-style: italic; text-align: right;">Memoria Viva</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Sede Sindicato Chabranco
var marker = L.marker([-40.233055, -71.958596], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/centros-de-detencion/x-region/bodega-edifico-del-sindicato-esperanza-del-obrero-chabranco" target="_blank">Sede Sindicato esperanza del obrero de Chabranco</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(54)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>La Bodega del edificio del Sindicato “Esperanza del Obrero” se ubica en las cercanías
de Chabranco. Fue utilizada como centro de detención y tortura, específicamente,
de los miembros del mismo Sindicato, antes de ser asesinados en el fundo “Chihuío”.
<br>
Los delitos fueron calificados en la acusación de oficio como secuestro y fueron
perpetrados en la localidad de Chabranco, las víctimas de estos delitos fueron:<br>
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/acuna-inostroza-carlos-maximiliano/" target="_blank">Carlos Maximiliano Acuña Inostroza</a>, 46 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/garcia-cancino-narciso-segundo/" target="_blank">Narciso Segundo Garcia Cancino</a>, 31 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mendez-mendez-daniel/" target="_blank">Daniel Mendez Mendez</a>, 42 años
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-r/roa-montana-fernando-adrian/" target="_blank">Fernando Adrián Mora Gutierrez</a>, 17 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mora-osses-sebastian/" target="_blank">Sebastián Mora Osses</a>, 47 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-v/vargas-quezada-ruben/" target="_blank">Rubén Vargas Quezada</a>, 56 años
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-b/barriga-soto-jorge-eusebio/" target="_blank">José Orlando Barriga Soto</a>, 32 años
<br>
<br>
Todos ellos trabajaban en el Complejo Forestal y Maderero Panguipulli y eran
integrantes del Sindicato Campesino “Esperanza del Obrero”. Varios de ellos no
tenían militancia política, pero si participaban activamente en esta organización.
Fueron detenidos el 9 de octubre de 1973 en la localidad de Chabranco, por
efectivos militares de los Regimientos Cazadores y Maturana, quienes los trasladaron
hasta el sector de los Baños de Chihuío. Allí les dieron muerte y los sepultaron
clandestinamente. A fines del año 1978, los cadáveres fueron desenterrados por
personal de civil y posteriormente se encargaron de hacerlos desaparecer.
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Sitio de interés N°1</p></p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Sitio de interés N°1</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Casa Administración Fundo Chihuio
var marker = L.marker([-40.194129, -71.935565], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/casa-de-administracion-del-fundo-chihuio/" target="_blank">Casa de Administración Fundo Chihuio</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(52)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>L    La noche del 9 de Octubre de 1973  la casa de administración del fundo Chihuio, de propiedad de Américo González, 
    se convirtió en el centro de exterminio donde se perpetró la matanza de Chihuio. <br>
    <br>Un convoy militar recorrió las localidades de Futrono, Llifén, Curriñe, Arquilhue y Chabranco, deteniendo a trabajadores del Complejo Maderero Panguipulli, 
     muchos de ellos miembros del Sindicato Campesino Esperanza del Obrero. La misión, parte de la llamada "Operación Leopardo", 
    estaba enfocada en eliminar una supuesta guerrilla rural que estaba en la zona.<br><br>
    Los prisioneros, detenidos de sus hogares y lugares de trabajo, fueron llevados al sector de Baños de Chihuío. Allí, 
    en una casa patronal, fueron torturados y luego ejecutados a corta distancia de la vivienda. 
    Entre los asesinados se encontraba Fernando Mora Gutiérrez, un joven de tan solo 17 años, 
    quien fue detenido junto a su padre tras intentar ayudar a desatascar uno de los camiones militares que transportaba prisioneros.<br>

<br>Tras las ejecuciones, los cuerpos de las víctimas fueron cubiertos y abandonados en el lugar. Cerca de cinco años después,
 en marco de la operación "Retiro de Televisores", los restos fueron desenterrados y hechos desaparecer por civiles bajo las órdenes del Ejército.
  Esta operación buscaba eliminar las pruebas de los crímenes cometidos por la dictadura.
   Hasta la fecha, muchos de los restos aún no han sido encontrados.<br>


<p style="font-style: italic; text-align: left;"> El 9 de Octubre de 1973, en el sector denominado Baños de Chihuío, personal del
Ejército dio muerte a las siguientes personas, en su mayoría miembros del
Sindicato Campesino Esperanza del Obrero:

<br>   
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-f/ferrada-sandoval-luis-arnoldo/" target="_blank">Luis Arnaldo Ferrada Sandoval</a>, 42 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/acuna-inostroza-carlos-maximiliano/" target="_blank">Carlos Maximiliano Acuña Inostroza</a>, 46 años.
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-b/barriga-soto-jorge-eusebio/" target="_blank">José Orlando Barriga Soto</a> de 32 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/cortes-diaz-justo-benedicto/" target="_blank">José Rosamel Cortes Diaz</a> de 35 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-d/duran-zuniga-neftali-ruben/" target="_blank">Rubén Neftalí Duran Zuñiga</a> de 22 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-f/freire-caamano-eliecer-sigisfredo/" target="_blank">Eliacer Sigisfredo Freire Camaño</a> de 20 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/garcia-cancino-narciso-segundo/" target="_blank">Narciso Segundo Garcia Cancino</a> de 31 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/gonzalez-delgado-juan-walter/" target="_blank">Juan Walter Gonzalez Delgado </a> de 31 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mendez-mendez-daniel/" target="_blank">Daniel Mendez Mendez</a> de 42 años
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-r/roa-montana-fernando-adrian/" target="_blank">Fernando Adrián Mora Gutierrez</a> de 17 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mora-osses-sebastian/" target="_blank">Sebastián Mora Osses</a> de 47 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-p/pedreros-ferreira-pedro-segundo/" target="_blank">Pedro Segundo Prederos Ferreira</a>, de 48 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/rebolledo-mendez-rosendo/" target="_blank">Rosendo Rebolledo Mendez</a> de 40 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/ruiz-rodriguez-ricardo-segundo/" target="_blank">Ricardo Segundo Ruiz Rodriguez</a> de 24 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/salinas-flores-carlos-vicente/" target="_blank">Carlos Vicente Salinas Flores</a> de 21 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/sepulveda-rebolledo-manuel-jesus/" target="_blank">Manuel Jesús Sepulveda Rebolledo</a> de 28 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-v/vargas-quezada-ruben/" target="_blank">Rubén Vargas Quezada, 56 años</a> de 56 años


<p style="font-style: italic; text-align: left;">
  Ese día 9 de octubre, un convoy militar procedente de los Regimientos Cazadores
y Maturana, ambos con asiento en la ciudad de Valdivia, compuesto por varios
vehículos entre jeeps y camiones y con una dotación aproximada de noventa
personas, inició una caravana hacia el Sector Sur del Complejo Maderero
Panguipulli.<br>
En  las  localidades  de  Chabranco,  Curriñe,  Llifén  y  Futrono  los  militares
detuvieron desde sus domicilios o lugares de trabajo, o recibieron de manos de
Carabineros, a los campesinos antes indicados.<br>
<br>La noche del mismo 9 de octubre de 1973 se les condujo a un fundo de propiedad
de un civil en el sector cordillerano denominado Baños de Chihuío.  En una hora
no precisada, los prisioneros fueron sacados de la casa patronal de ese fundo y
llevados a las inmediaciones a una distancia aproximada de 500 metros, lugar en
el cual se les ejecutó.<br>
Al día siguiente, esto es, el 10 de octubre de 1973, un testigo reconoció en ese
lugar a varias de las víctimas y pudo percibir que la mayoría los cuerpos tenían
cortes en las manos, en los dedos, en el estómago e incluso algunos se
encontraban degollados y con sus testículos cercenados, sin poder observar
huellas de impactos de bala en los restos.<br><br>
Los cadáveres de los ejecutados permanecieron en el lugar de su ejecución
durante   varios   días,   cubiertos   tan   sólo   con   algunas   ramas   y   troncos.
Aproximadamente unos quince días después de la ejecución, fueron enterrados
por los efectivos militares en fosas de diferentes dimensiones.<br><br>
En fecha que no es posible precisar, pero que podría corresponder a fines del año
1978 o principios de 1979, en horas de la noche, personas de civil llegaron hasta
la casa patronal del Fundo Chihuío y exigieron al dueño que les indicara el lugar
en que se encontraban las fosas.  Estos civiles, asociados de otros que les
acompañaban,  excavaron  durante  toda  la  noche  en  el  lugar  de  las  fosas,
trasladando los restos a un lugar que hasta la fecha de este informe ha sido
imposible de determinar.<br><br>
La circunstancia del fallecimiento de las personas ejecutadas en la localidad de
Chihuío  consta  inexplicablemente  en  certificados  de  defunción,  sin  haber
existido© entrega de cadáver ni sepultación.  En todos ellos se indica que la data
de fallecimiento es de fecha 9 de octubre de 1973, en la localidad de "Liquiñe",
por causas no precisadas, acreditándose el fallecimiento mediante el testimonio de
dos personas singulares (testigos de la defunción).
</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p 390</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-chihuio/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Llifén
var marker = L.marker([-40.198930, -72.259331], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973 - 1976');
    openPanel(
        `<h3><a href="https://memoriaviva.com/centros-de-detencion/x-region/reten-de-carabineros-llifen/" target="_blank">Retén de carabineros de Llifén</a></h3>
        <p style="font-style: italic;">"Este retén fue utilizado entre septiembre del año 1973 y mayo del año 1976."</p>
        <p style="font-style: italic; text-align: right;">Comisión Valech p 404</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Chihuio
var marker = L.marker([-40.231556, -71.970582], {icon: memorial});
marker.anio = 1998;
marker.on('click', function() {
    setAnio('1998');
    openPanel(
        `<h3>Memorial de Chihuio</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(112)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(51)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
        <p>“El caso” Chihuío es un crimen de lesa humanidad donde 18 personas fueron detenidas, torturadas y asesinadas por efectivos militares en las termas de Chihuío el 09 de octubre de 1973. 
Sus cuerpos fueron inhumados clandestinamente y luego exhumados y arrojados al mar. <br>
<br>La mayoría de las víctimas estaba asociada al Complejo Forestal y Maderero Panguipulli (COFOMAP). 
Los crímenes han sido confirmados por sendas investigaciones judiciales, algunas aún en curso , 
en cuyos fallos se detalla el asesinato de numerosos obreros forestales y dirigentes sindicales, 
además de militantes del Movimiento de Izquierda Revolucionario (MIR).
<br><br>
El memorial recuerda a 18 campesinos y obreros madereros de las localidades de Futrono, Llifén, Curriñe y Chabranco pertenecientes, en su mayoría,
 al sindicato Esperanza del Obrero del Complejo Forestal y Maderero de Panguipulli, comuna de Futrono. Las víctimas fueron:<br>
 
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-f/ferrada-sandoval-luis-arnoldo/" target="_blank">Luis Arnaldo Ferrada Sandoval</a>, 42 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/acuna-inostroza-carlos-maximiliano/" target="_blank">Carlos Maximiliano Acuña Inostroza</a>, 46 años.
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-b/barriga-soto-jorge-eusebio/" target="_blank">José Orlando Barriga Soto</a> de 32 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/cortes-diaz-justo-benedicto/" target="_blank">José Rosamel Cortes Diaz</a> de 35 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-d/duran-zuniga-neftali-ruben/" target="_blank">Rubén Neftalí Duran Zuñiga</a> de 22 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-f/freire-caamano-eliecer-sigisfredo/" target="_blank">Eliacer Sigisfredo Freire Camaño</a> de 20 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/garcia-cancino-narciso-segundo/" target="_blank">Narciso Segundo Garcia Cancino</a> de 31 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-g/gonzalez-delgado-juan-walter/" target="_blank">Juan Walter Gonzalez Delgado </a> de 31 años.
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mendez-mendez-daniel/" target="_blank">Daniel Mendez Mendez</a> de 42 años
<br> <a href="https://memoriaviva.com/nuevaweb/criminales/criminales-r/roa-montana-fernando-adrian/" target="_blank">Fernando Adrián Mora Gutierrez</a> de 17 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mora-osses-sebastian/" target="_blank">Sebastián Mora Osses</a> de 47 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-p/pedreros-ferreira-pedro-segundo/" target="_blank">Pedro Segundo Prederos Ferreira</a>, de 48 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/rebolledo-mendez-rosendo/" target="_blank">Rosendo Rebolledo Mendez</a> de 40 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/ruiz-rodriguez-ricardo-segundo/" target="_blank">Ricardo Segundo Ruiz Rodriguez</a> de 24 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/salinas-flores-carlos-vicente/" target="_blank">Carlos Vicente Salinas Flores</a> de 21 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/sepulveda-rebolledo-manuel-jesus/" target="_blank">Manuel Jesús Sepulveda Rebolledo</a> de 28 años
<br> <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-v/vargas-quezada-ruben/" target="_blank">Rubén Vargas Quezada, 56 años</a> de 56 años

<br><p style="font-style: italic;">Ese día 9 de octubre, un convoy militar procedente de los Regimientos Cazadores
y Maturana, ambos con asiento en la ciudad de Valdivia, compuesto por varios
vehículos entre jeeps y camiones y con una dotación aproximada de noventa
personas, inició una caravana hacia el Sector Sur del Complejo Maderero
Panguipulli.<br>
En  las  localidades  de  Chabranco,  Curriñe,  Llifén  y  Futrono  los  militares
detuvieron desde sus domicilios o lugares de trabajo, o recibieron de manos de
Carabineros, a los campesinos antes indicados.
<br>br>
La noche del mismo 9 de octubre de 1973 se les condujo a un fundo de propiedad
de un civil en el sector cordillerano denominado Baños de Chihuío.  En una hora
no precisada, los prisioneros fueron sacados de la casa patronal de ese fundo y
llevados a las inmediaciones a una distancia aproximada de 500 metros, lugar en
el cual se les ejecutó.<br><br>
Al día siguiente, esto es, el 10 de octubre de 1973, un testigo reconoció en ese
lugar a varias de las víctimas y pudo percibir que la mayoría los cuerpos tenían
cortes en las manos, en los dedos, en el estómago e incluso algunos se
encontraban degollados y con sus testículos cercenados, sin poder observar
huellas de impactos de bala en los restos.<br>
Los cadáveres de los ejecutados permanecieron en el lugar de su ejecución
durante   varios   días,   cubiertos   tan   sólo   con   algunas   ramas   y   troncos.
Aproximadamente unos quince días después de la ejecución, fueron enterrados
por los efectivos militares en fosas de diferentes dimensiones.<br><br>
En fecha que no es posible precisar, pero que podría corresponder a fines del año
1978 o principios de 1979, en horas de la noche, personas de civil llegaron hasta
la casa patronal del Fundo Chihuío y exigieron al dueño que les indicara el lugar
en que se encontraban las fosas.  Estos civiles, asociados de otros que les
acompañaban,  excavaron  durante  toda  la  noche  en  el  lugar  de  las  fosas,
trasladando los restos a un lugar que hasta la fecha de este informe ha sido
imposible de determinar.
<br><br>
La circunstancia del fallecimiento de las personas ejecutadas en la localidad de
Chihuío  consta  inexplicablemente  en  certificados  de  defunción,  sin  haber
existido© entrega de cadáver ni sepultación.  En todos ellos se indica que la data
de fallecimiento es de fecha 9 de octubre de 1973, en la localidad de "Liquiñe",
por causas no precisadas, acreditándose el fallecimiento mediante el testimonio de
dos personas singulares (testigos de la defunción).
</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p 390-393</p><br></p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p390-393</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-chihuio/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Fundo Arquilhue
var marker = L.marker([-40.195466, -72.043643], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Fundo Arquilhue</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(50)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Siscahue
var marker = L.marker([-40.205396, -72.103042], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Siscahue</h3>
        <p style="font-style: italic;">"El día 7 de octubre de 1973 fue ejecutado por personal del Ejército, 
        <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/silva-silva-andres/" target="_blank">Andres Silva Silva</a>, 33 años, obrero maderero en el Complejo Maderero y Forestal Panguipulli.
        El afectado fue detenido en el hogar de sus padres, el día 6 de octubre de 1973,
por un contingente militar que se lo llevaron a un Fundo del Sector de Nilahue.
Al día siguiente, los mismos militares lo condujeron a su domicilio y allanaron el
lugar.  Posteriormente fue ejecutado en el sector denominado Sichahue, y su
cuerpo sin vida abandonado en un pequeño bosque de ese lugar.  Carabineros de
Llifén prohibió darle sepultura y los familiares, después de dos meses, decidieron
inhumarlo, contra las órdenes, en razón de que los perros ya habían destrozado
completamente el cuerpo.  En la causa tramitada por el Ministro en Visita sobre
los hechos de Chihuío se exhumaron sus restos.
"</p>"</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig p 390</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// LAGO RANCO
// =============================================

// Memorial Lago Ranco
var marker = L.marker([-40.31953, -72.47661], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial Lago Ranco</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(47)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"El 16 de octubre de 1973, fueron muertos a bordo del vapor Laja, por personal de la Gobernación Marítima de Valdivia, las siguientes personas, cuyos cuerpos fueron arrojados a las aguas del lago Ranco."</p>
        <p style="font-style: italic; text-align: right;">Informe Rettig 395</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/caso-lago-ranco/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Tenencia Lago Ranco
var marker = L.marker([-40.31986, -72.47661], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-de-lago-ranco/" target="_blank">Tenencia de Carabineros de Lago Ranco</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(47)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p style="font-style: italic;">"La Tenencia de Carabineros de Lago Ranco era un recinto de tránsito, interrogación y tortura de prisioneros."</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p405</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/caso-lago-ranco/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Isla Huapi
var marker = L.marker([-40.2245019, -72.382421], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Isla Huapi</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(53)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>Según consta de los antecedentes, la gran mayoría de casos se registró en los años 1973
y 1974.<br> 
<br>En el año 1973 las detenciones se produjeron en los asentamientos campesinos y en el
Complejo Maderero Panguipulli, durante operativos militares realizados en conjunto
con Carabineros y civiles, según señalaron los declarantes. Esta comisaría se constituyó
en un recinto de tránsito, interrogatorios y torturas. De acuerdo a los testimonios,
un gran número de campesinos fue traído en helicópteros desde la isla Huapi, en el
Lago Ranco. Al interior de la comisaría eran interrogados y torturados por militares
en el sector de las caballerizas; el resto del tiempo eran mantenidos en calabozos,
hacinados y sucios, incomunicados, vendados, sin alimento, sin baño ni agua." </p>

<p style="font-style: italic; text-align: right;"> Informe Valech p 403</p
</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Puente Riñinahue
var marker = L.marker([-40.329849, -72.225219], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Puente Riñinahue</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(48)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>Desde la Tenencia de Carabineros de San Pablo, en La Unión se da la orden del
Teniente Nelson Rodríguez de detener a todos los partidarios de la Unidad Popular.
Las personas eran interrogadas y trasladadas a la Fiscalía Militar y no a la 3º Comisaría
y ese terror recorrió todas las comunas que son parte de esta provincia, llegando
hasta los lugares más apartados, como es el caso de Riñinahue.<br><br>

<a href="https://www.memoriaviva.com/detenidos-desaparecidos/ancacura-manquian-cardenio" target="_blank">Cardenio Ancacura Manquian</a> 
        de 20 años fue detenido por Carabineros de Lago Ranco y trasladado a la tenencia del lugar. Ffue detenido por Carabineros de Lago Ranco
y trasladado a la tenencia del lugar. Desde allí fue sacado el 16 de octubre, por
efectivos de la Gobernación Marítima de Valdivia, dependiente de la Armada de
Chile; lo subieron a bordo del vapor “Laja” y lo ejecutaron, lanzando su cuerpo al
lago. Él era agricultor, casado y con cuatro hijos. Actualmente sigue desaparecido.</p>
        <p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°6 tramo del Ranco</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Riñinahue
var marker = L.marker([-40.323342, -72.210104], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Retén de Riñinahue</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(49)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Puente Nilahue
var marker = L.marker([-40.285166, -72.171522], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Puente Nilahue</h3>
  <p style="font-style: italic;">"El 20 de septiembre de 1973, fue muerto <a href="https://memoriaviva.com/detenidos-desaparecidos/huaiqui-barria-roberto" target="_blank">Roberto Huaiqui Barria</a> 17
años,  hijo  del  presidente  comunal  campesino  de  Lago  Ranco,  estudiante
secundario, militante socialista. <br><br>
El afectado había salido de Lago Ranco el 11 de septiembre de 1973, junto a otras
personas, con la intención de cruzar la cordillera para dirigirse a Argentina.
Cuando iban cruzando el río Nilahue, les dispararon desde una avioneta tripulada
por civiles, dándole muerte e hiriendo en la espalda a uno de los acompañantes,
quien fue recogido y llevado a un hospital.  El cuerpo sin vida de Roberto Huaiqui
cayó al río y fue impulsado aguas abajo por la corriente, sin que pudiese ser
recuperado.

"</p>

<p style="font-style: italic; text-align: right;"> Informe rettig p 998 </p><br>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// RIO BUENO Y LA UNION
// =============================================

// Comisaría Río Bueno
var marker = L.marker([-40.335495, -72.957977], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-rio-bueno/" target="_blank">Comisaría de Rio Bueno</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(46)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
    
<p style="font-style: italic;" text-align: left;"> "Los hombres y mujeres que estuvieron detenidos en este lugar denunciaron haber sido tratados con violencia desde el mismo momento de su detención.
Varios declarantes fueron golpeados frente a sus hijos pequeños y a sus mujeres. Luego, 
durante el trayecto hasta la comisaría, fueron maltratados.<br>

<br>Al llegar, eran amarrados, algunos con alambre de púas, se les vendaban los ojos y los encerraban en calabozos a los que se lanzaba agua constantemente. 
En esas condiciones permanecían durante varios días, sin alimento, incomunicados e interrogados y torturados. 
Desde aquí eran trasladados a Valdivia, la mayoría a la Cárcel de esa ciudad, en camiones militares,
amarrados unos con otros y en muy malas condiciones físicas.<br>

<br> En la década de 1980, según los detenidos que estuvieron allí, la CNI participó en la Comisaría,
trasladándolos a un recinto ubicado en la ciudad de Valdivia. Los testimonios de detenidos en este recinto en 1973,
refieren la aplicación de electricidad, golpes, posturas forzadas, amenazas de detención y tortura a sus familiares, 
simulacro de fusilamiento, el submarino, introducción de agua a presión por la boca y la nariz, golpes con martillos en las uñas,
fueron obligados a escuchar torturas infligidas a otros detenidos y soportaron vejación y violación sexual."</p>
<p style="font-style: italic; text-align: right;">Comision Valech p 400</p><br>

<p style="font-style: italic;" text-align: left;">
El 6 de octubre de 1973 fue detenido por carabineros del Retén Carimallín, de la
localidad de Mantilhue, <a href="https://www.memoriaviva.com/detenidos-desaparecidos/huentequeo-almonacid-reinaldo-segundo" target="_blank">Reinaldo Huentequeo Almonacid</a>, 30 años,
Secretario del Comité de Pequeños Agricultores.<br>
Tras su arresto fue trasladado a la Comisaría de Río Bueno.  Desde allí es sacado
junto a otros detenidos y llevado al puente colgante sobre el río Pilmaiquén,
donde se les fusiló.  Huentequeo pudo saltar al agua instantes antes de recibir las
descargas, pero le dispararon hacia el río y recibió heridas a bala en su pierna
izquierda.  A pesar de ello logró salir del agua y refugiarse en casa de unos
campesinos de la zona, desde donde envió un mensaje a sus padres informando
sobre el lugar en que se hallaba. <br>
<br> Cuando la familia llegó a ese lugar, supo que la
noche anterior había vuelto a ser detenido por carabineros de la Comisaría de Río
Bueno, lo que también ocurrió ante testigos.  Con posterioridad a ello, no hubo
más noticias acerca del afectado, quien permanece hasta la fecha desaparecido.
Personeros religiosos de la zona denunciaron este hecho a las autoridades
militares de la época." </p>                                                      
<p style="font-style: italic; text-align: right;"> Informe Rettig p 407</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Crucero
var marker = L.marker([-40.419208, -72.786062], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-crucero/" target="_blank">Reten de Carabineros de Crucero</a></h3>
        <p>El Retén de carabineros de Crucero funcionó como centro de detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Vivanco
var marker = L.marker([-40.374884, -72.621354], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-vivanco/" target="_blank">Retén de Carabineros de Vivanco</a></h3>
        <p>El Retén de carabineros de Vivanco funcionó como centro de detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 413</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Cárcel Río Bueno
var marker = L.marker([-40.334607, -72.962581], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/carcel-de-rio-bueno/" target="_blank">Cárcel de Río Bueno</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(45)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>La Cárcel de Río Bueno funcionó como centro de detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Hospital La Unión
var marker = L.marker([-40.284640, -73.076326], {icon: memorial});
marker.anio = 1977;
marker.on('click', function() {
    setAnio('1977');
    openPanel(
        `<h3>Hospital de La Unión</h3>
  <p style="font-style: italic;">"El 18 de agosto de 1977, fue detenido <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-l/leal-diaz-sergio-hernan/" target="_blank">Sergio Hernán Leal Diaz</a> 
, pequeño industrial de Río Bueno, militante del Partido Socialista. Su aprehensión se produjo al momento de llegar
al Hospital de la Unión, donde se encontraban las dependencias del Servicio de Sanidad, ante
testigos, por parte de agentes de civil.</a></p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p 1014</p><br>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Comisaría La Unión
var marker = L.marker([-40.293143, -73.085891], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-la-union/" target="_blank">Comisaria de carabineros de La Unión</a></h3>
        <p style="font-style: italic;">"Este recinto concentró en el año 1973 la mayor cantidad de detenidos."</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 401</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Cuartel Investigaciones La Unión
var marker = L.marker([-40.291996, -73.081155], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/cuartel-de-investigaciones-la-union/" target="_blank">Ex Cuartel de investigaciones de La Unión (Hoy Delegación presidencial)</a></h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(43)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <p>El cuartel de investigaciones de la Unión funcionó como centro de detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Cárcel La Unión
var marker = L.marker([-40.29321, -73.08455], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://www.memoriaviva.com/centros-de-detencion/x-region/carcel-de-la-union" target="_blank">Cárcel de La Unión</a></h3>
        <p>La cárcel de la Unión funcionó como centro de detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Puente Pilmaiquén
var marker = L.marker([-40.383681, -73.002411], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Puente Pilmaiquén</h3>
        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(44)">
            <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// =============================================
// RESTO (LOS LAGOS, LANCO, MARIQUINA, CORRAL, PAILLACO)
// =============================================

// Comisaría Los Lagos
var marker = L.marker([-39.862216, -72.812525], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-n-2-los-lagos/" target="_blank">Comisaria de Los Lagos</a></h3>
        <p style="font-style: italic;">"Según consta de los antecedentes recabados por la Comisión, fue en el año 1973 cuando se registraron la casi totalidad de las detenciones en ese lugar."</p>
        <p style="font-style: italic; text-align: right;">Comision Valech p 400</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Tenencia Lanco
var marker = L.marker([-39.452502, -72.772324], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-lanco/" target="_blank">Tenencia de carabineros de Lanco</a></h3>
    <p style="font-style: italic; text-align: left;">"El día 12 de octubre de 1973, en el Puente Pichoy, Valdivia, fueron ejecutados
por carabineros, tres de las siguientes personas, mientras la otra falleció producto
de las torturas recibidas:<br>
  
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-cortes-jose-manuel/" target="_blank">José Manuel Arriagada Cortes</a>, 19 años<
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-zuniga-jose-gabriel/" target="_blank">José Gabriel Arriagada Zuñiga</a>, 30 años
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carrasco-torres-jose-manuel/" target="_blank">José Manuel Carrasco Torres</a>, 19 años
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-o/ortega-alegria-gilberto-antonio/" target="_blank">Gilberto Antonio Ortega Alegria</a>, 39 años
<br>
<br>Todos ellos fueron detenidos el día 10 de octubre de 1973 por Carabineros de
Malalhue y de Lanco, y conducidos al Retén de Malalhue, siendo trasladados
posteriormente a la Tenencia de Lanco, donde permanecieron hasta el día 12 de
octubre de 1973.  <br><br>En dicho recinto, producto de las torturas, falleció <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-o/ortega-alegria-gilberto-antonio/" target="_blank">Gilberto Antonio Ortega Alegria</a>, en presencia de testigos.  Al cabo de pocas horas, los
otros tres detenidos y el cuerpo de Ortega fueron sacados de la Tenencia para ser
trasladados a Valdivia.<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-zuniga-jose-gabriel/" target="_blank">José Gabriel Arriagada Zuñiga</a> fue amarrado con <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-cortes-jose-manuel/" target="_blank">José Manuel Arriagada Cortes</a>, y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carrasco-torres-jose-manuel/" target="_blank">José Manuel Carrasco Torres</a> con el cuerpo de Ortega.
Al llegar al Puente Pichoy, los detenidos fueron ejecutados.  Todos los cuerpos
registraban múltiples impactos de bala.  <br><br>Sus restos fueron entregados a sus
familiares para su sepultación.  Versiones verbales entregadas a las familias por
autoridades de Carabineros dieron como razón de la muerte el que los detenidos
habrían intentado fugarse, sin dar explicaciones mas circunstanciadas sobre ello.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 394 </p>

<p style="font-style: italic; text-align: left;">
Los declarantes establecieron en sus testimonios que esta tenencia fue un recinto de
tránsito, donde los prisioneros eran torturados y luego conducidos a la ciudad de Valdivia. En el año 1973, según algunos testigos, presenciaron la muerte de un prisionero por
los golpes sufridos y otros relataron que cuatro detenidos que eran llevados a Valdivia
fueron asesinados en el trayecto, con el pretexto de la ley de fuga.
Los ex presos políticos denunciaron que sufrieron golpes, fueron pisoteados, amenazados
y expuestos a fuerte presión psicológica. </p>
<p style="font-style: italic; text-align: right;"> Informe Valech p 405</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/episodio-pichoy/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Malalhue
var marker = L.marker([-39.544432, -72.503030], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-malalhue/" target="_blank">Retén de carabineros de Malalhue</a></h3>
        <p>El retén de carabineros de Malalhue fue utilizado para la detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 412</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Comisaría San José de la Mariquina
var marker = L.marker([-39.540736, -72.960657], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-san-jose-de-la-mariquina/" target="_blank">Comisaria de Carabineros San José de la Mariquina</a></h3>
        <p>La comisaría de carabineros de San José de la Mariquina fue utilizada para la detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Retén Corral
var marker = L.marker([-39.889087, -73.426458], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-corral/" target="_blank">Retén de Corral</a></h3>
        <p>El retén de carabineros de Corral fue utilizado para la detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Tenencia Paillaco
var marker = L.marker([-40.069418, -72.873192], {icon: CCDD});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-paillaco/" target="_blank">Tenencia de carabineros de Paillaco</a></h3>
        <p>La tenencia de carabineros de Paillaco fue utilizada para la detención de presos políticos en los meses subsiguientes al 11 de Septiembre 1973.</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p 411</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`, `<h3>Expedientes</h3>`
    );
});
marker.addTo(mapa);
markers.push(marker);

// Memorial Maiquillahue / Mariquina
var marker = L.marker([-39.461455, -73.232988], {icon: memorial});
marker.anio = 1973;
marker.on('click', function() {
    setAnio('1973');
    openPanel(
        `<h3>Memorial de Maiquillahue</h3>
        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(121)">
                <img src="./portada.jpg" alt="Portada Libro" style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(56)">
                <img src="./portada_ruta.jpg" alt="Portada Ruta de la Memoria" style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            </div>
        </div>
      
Recuerda a <a href="https://www.memoriaviva.com/ejecutados-politicos/nanco-jose-matias" target="_blank">José Matías Ñanco Lillo</a>
, ejecutado a sangra fría frente a más de 10 testigos y luego su cuerpo hecho desaparecer por militares el 31 de octubre de 1973.

«[…] Se trata de un asesinato de un prisionero, de una persona detenida por la fuerza militar armada que capturó en sus domicilios,
 torturó y trasladó hasta Valdivia a más de veinte campesinos mapuches de la comunidad de Maquillahue, 
 en una jornada que por su brutalidad es recordada con lujo de detalles por todos los comuneros hasta la fecha,
 marcando para siempre a sus habitantes.[…]<br><br>
 
 
 El 31 de octubre de 1973, en el sector de Maiquillahue, San José de la Mariquina,
fue muerto por militares <a href="https://www.memoriaviva.com/ejecutados-politicos/nanco-jose-matias" target="_blank">José Matías Ñanco Lillo</a>, 60 años, pescador, predicador
protestante, simpatizante de izquierda.<br><br>
En la localidad señalada efectivos militares realizaron un operativo y detuvieron a
alrededor de trece personas, formándolas en fila.  José Ñanco se negó a obedecer
dirigiéndose en términos duros a los militares y forzó el arma de uno de ellos,
entonces le dispararon y le dieron muerte.  El mismo uniformado ordenó levantar
el cuerpo, a lo que se negaron los demás detenidos, por lo que los propios
militares lo llevaron hacia un lugar que se desconoce.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 396</p>`,
        `<h3>Registros</h3>`, `<h3>Testimonios</h3>`,
        `<h3>Expedientes</h3>
        <div style="text-align: center; margin-top: 15px;">
            <a href="https://expedientesdelarepresion.cl/causa/jose-matias-nanco/" target="_blank">
                <img src="./logo-expedientes-de-la-represion.png" style="max-width: 80%;">
            </a>
        </div>`
    );
});
marker.addTo(mapa);
markers.push(marker);