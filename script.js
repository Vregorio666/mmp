// Casos que faltan Benjamin Bustos Morales y José Segundo Veloso Araya

// Inicio mapa
var mapa = L.map('mapa').setView([-39.95, -72.8], 9);

// Capa OSM
var osm = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 9,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});
osm.addTo(mapa);

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
    anioDiv.innerHTML = texto ? texto : '';
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

// Valdivia
var marker = L.marker([-39.817309, -73.246849], {icon: memorial}).addTo(mapa); 
marker.on('click', function() {
    setAnio('1981 - 1988');
    openPanel(
        `<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/recinto-cni-en-calle-perez-rosales-no-764-valdivia/" target="_blank">Recinto CNI Valdivia / Hoy Casa de la Memoria</a></h3>

        <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(124)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>

            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(10)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 175px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


        <h4><p style="font-style: italic; text-align: left;">"Ubicado en calle Pérez Rosales 764<br><br>
        Hubo testimonios de ex presos políticos que denunciaron haber estado en este recinto, ubicado en Pérez Rosales 764 en Valdivia, entre los años 1981 y 1988. La mayor cantidad de detenidos en este lugar se consignó en el año 1986.<br><br>
        La existencia de este centro fue reconocida públicamente en 1984, por la publicación en el Diario Oficial del Decreto Supremo N° 594 del 14 de junio de 1984.<br><br>
        De acuerdo a los testimonios recibidos, esta Comisión pudo establecer que, luego de ser detenidos por este organismo de seguridad, los presos eran conducidos hasta el subterráneo de este recinto, en donde fueron sometidos a interrogatorios y torturas, permanentemente vendados, amarrados y desnudos. Se encontraban incomunicados sin comida, agua ni condiciones higiénicas mínimas.<br>
        Las denuncias consignaron que sufrieron golpes, el teléfono, aplicación de electricidad y amenazas, entre otras, de ser lanzados al mar; simulacro de fusilamiento; eran obligados a presenciar torturas de otros detenidos; soportaban inmersión en líquidos con excrementos; ahogamiento con bolsas plásticas amarrada en la cabeza; colgamiento; debían permanecer amarados y con los ojos vendados; se les amenazaba con perros; permanecían en posiciones forzadas; recibían golpes en las plantas de los pies y amenazas de detención, tortura o muerte a familiares.<br><br>
        También consta que fueron conducidos luego de su detención a recintos de la CNI en Niebla (en noviembre de 1984), y otros a un recinto CNI en caleta Miramar, Pelluco, (noviembre de 1988), en Puerto Montt. No fue posible, sin embargo, obtener más antecedentes respecto a estos lugares."</p>
        <p style="font-style: italic; text-align: right;">Informe Valech p409</p></h4>

        <h4><p style="font-style: italic;">El 25 de octubre de 1973 fueron ejecutados en la ciudad de Valdivia por personal de Carabineros y probablemente del Ejército, tres jóvenes, ninguno de ellos con militancia política:<br><br>
        <a href="https://memoriaviva.com/ejecutados-politicos/fierro-perez-juan-bautista" target="_blank">Juan Bautista Fierro Pérez</a><br>
        <a href="https://memoriaviva.com/ejecutados-politicos/fierro-perez-pedro-robinson" target="_blank">Pedro Robinson Fierro Pérez</a><br>
        <a href="https://memoriaviva.com/ejecutados-politicos/inostroza-nanco-jose-victor" target="_blank">Jose Victor Inostroza Ñanco</a><br><br>
        Los hermanos Fierro Pérez fueron detenidos el 20 de octubre de 1973 en su domicilio, por efectivos de Carabineros y militares, y llevados a la Tenencia Gil de Castro. Inostroza Ñanco lo fue el día 21 de octubre de 1973, en la Feria Libre de Valdivia, por la misma clase de efectivos. Los tres fueron ejecutados en circunstancias no precisadas el día 25 de octubre de 1973, indicando los certificados de defunción como lugar la vía pública. Los cuerpos pudieron ser sepultados por sus familiares.</p></h4>`,  

        `<h3>Registros</h3><br>
        <div style="text-align:center;">
            <iframe width="100%" height="315"
                src="https://www.youtube.com/embed/BvJWuSVc8PU"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <img src="https://afdd-afep-valdivia.cl/wp-content/uploads/2022/01/Captura-de-Pantalla-2022-01-27-a-las-15.29.23.png" 
             style="width:100%; border-radius:10px; margin-top:10px;">
        <p style="font-size:13px; text-align:center;">Memorial de Chiuio</p>`,
        
        `<h3>Testimonios</h3><br>
        <div class="pdf-thumb" onclick="openRutaPDF(6)">
            <iframe src="./ruta_memoria.pdf#page=6&zoom=80"></iframe>
            <div class="pdf-overlay">Ver documento completo</div>
        </div>`,
        
        `<h3>Expedientes</h3>`
    );
});

 var marker = L.marker([-39.814784, -73.258046], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel( ` <h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-isla-teja/" target="_blank">Retén de carabineros de Isla Teja</a></h3>

      <h4> El Retén de Carabineros, Isla Teja fue utilizado para la detencion de presos politcos de la region.<h4>
      <p style="font-style: italic; text-align: right;"> Informe Valech p 412 </p></h4><br>`,
`<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,
      );
});

 var marker = L.marker([-39.813046, -73.263345], {icon: memorial}).addTo(mapa)
 ;marker.on('click', function() {
  setAnio('1973 - 1989');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/carcel-de-valdivia-carcel-de-isla-teja/" target="_blank">Cárcel Isla Teja</a><h3>


          <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(21)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

     <h4>  Hoy Sitio de Memoria Complejo Penitenciario Ex Cárcel de Isla Teja 
<p style="font-style: italic; text-align: left;">
"En este recinto, ubicado en la Isla Teja, se concentraron los detenidos políticos en el
año 1973, y en menor número hasta el año 1989.
<br>
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
vendados y amarrados."</p><h4>
  
  <p style="font-style: italic; text-align: right;"> Informe Valech p 407 </p><br></h4></h4>
  `,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,
    
  );
});
 
 var marker = L.marker([-39.817372, -73.235384], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-calle-beaucheff-valdivia/" target="_blank">Primera Comisaria de Valdivia / Fiscalia de Carabineros</a><h3>
    
      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(19)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

      <h4>
<p style="font-style: italic;"> "El mayor número de detenidos se concentró durante 1973. Los declarantes señalaron que
se trataba de un recinto de reclusión transitorio. Muchos de los detenidos provenían de
otros retenes y comisarías de pueblos y ciudades de la provincia. Luego de permanecer
por un breve período en ese lugar, fueron trasladados a otros, en la misma ciudad de
Valdivia.<br>
<br> Cabe señalar que en el mismo recinto, en otras dependencias, funcionó el Servicio de
Inteligencia de Carabineros (SICAR), que también mantuvo detenidos.<br>
A los detenidos les vendaban los ojos y los amarraban. Al principio permanecían en calabozos tan hacinados que debían dormir de pie. Frecuentemente eran sacados al patio,
donde eran interrogados y torturados.<br>
<br>Los ex presos políticos denunciaron haber sido sometidos a golpes, aplicación de electricidad en la parrilla y picana, colgamientos, chico tazo s y quemaduras de cigarrillos en la
planta de los pies, amenazas, simulacros de fusilamiento, el submarino seco y el mojado.
Sufrieron privación de agua y de alimentos, fueron obligados a permanecer en celdas
permanentemente mojadas con aguas servidas y en posiciones forzadas por tiempo
prolongado. En la década de 1980, relataron, se les aplicó electricidad en diversas partes
del cuerpo y fueron sometidos a tormentos psicológicos." </p>
<p style="font-style: italic; text-align: right;"> Comisión Valech p399 </p><br></h4>

El mayor número de detenidos se concentró en este recinto en el año 1973
y quienes allí estuvieron denunciaron que se trataba de un lugar de reclusión
transitorio, puesto que, muchos de los detenidos provenían de otros retenes y
comisarías de pueblos y ciudades de la provincia, los que luego de permanecer
por un breve período, eran trasladados a otros recintos. Además, en dependencias
cercanas, funcionó el Servicio de Inteligencia de Carabineros (SICAR), donde
también se mantuvieron detenidos.<br><br>
Quienes estuvieron allí recluidos eran vendados de ojos y amarrados,
permanecían en calabozos con un nivel tal de hacinamiento que estaban obligados
a dormir de pie, y frecuentemente eran sacados al patio, donde eran interrogados
y torturados.<br><br>
Los ex presos políticos denunciaron haber sido sometidos a golpes, aplicación
de electricidad en la parrilla y picana, colgamientos, chicotazos y quemaduras
de cigarrillos en la planta de los pies, amenazas, simulacros de fusilamiento, el
submarino seco y el mojado. En la permanencia en este recinto, los detenidos
fueron privados de agua y de alimentos, obligados a permanecer en celdas
permanentemente mojadas con aguas servidas y en posiciones forzadas por
tiempo prolongado. En la década de 1980, según consta en testimonios del Informe
Valech, se les aplicó electricidad en diversas partes del cuerpo, el submarino y
fueron sometidos a diversos tormentos psicológicos.<br><br>
Te sugerimos que camines por Picarte en dirección a la Isla Teja. Puedes llegar
hasta la Universidad Austral de Chile en las micros 4 - 5 y 20. Cuando estés ahí,
avanza hasta llegar a la Dirección de Asuntos Estudiantiles (DAE), frente a un
estacionamiento y al Edificio Pabellón Docente, podrás encontrar las esculturas de
piedras que constituyen el Memorial a los estudiantes de esta casa de estudios que
fueron asesinados en dictadura
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Hito N°10 Tramo Valdivia </p><br></h4>
`,  
`<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,
 { maxWidth: 600 } )
 });;

  var marker = L.marker([-39.832340, -73.201687],{icon: CCDD}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3> <a href="https://memoriaviva.com/centros-de-detencion/x-region/tenencia-de-carabineros-gil-castro" target="_blank">Tenencia de Carabineros Gil de Castro</a></h3><br>

<h4> <p/ style="font-style: italic;">"

  El 25 de octubre de 1973 fueron ejecutados en la ciudad de Valdivia por personal
de Carabineros y probablemente del Ejército, tres jóvenes, ninguno de ellos con
militancia política:<br>
<br>
<a href="https://memoriaviva.com/ejecutados-politicos/fierro-perez-juan-bautista" target="_blank">Juan Bautista Fierro Pérez</a><br>
<a href="https://memoriaviva.com/ejecutados-politicos/fierro-perez-pedro-robinson" target="_blank">Pedro Robinson Fierro Pérez</a><br>
<a href="https://memoriaviva.com/ejecutados-politicos/inostroza-nanco-jose-victor" target="_blank">Jose Victor Inostroza Ñanco</a><br>  
  <br>
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

<p style="font-style: italic; text-align: right;"> Informe Rettig p396-397 </p><br>
 <h4>
 `)
});


 var marker = L.marker([-39.820803, -73.230224], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973-1975');
    openPanel(` <h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/recinto-sim-palacio-de-la-risa-valdivia/" target="_blank">Recinto SIM "Palacio de la Risa"</a><h3>
<h4>


      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(18)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<p style="font-style: italic;">Estaba ubicado en Av. Ramón Picarte N° 1451. Funcionó entre septiembre de 1973
y el año 1975.
Los detenidos provenían de la ciudad de Valdivia y de otras comunas de la provincia. Unos
permanecían vendados y amarrados y otros en calabozos sin alimento ni agua. Luego, la mayoría era trasladada a otros centros de reclusión, principalmente a la cárcel. Los testimonios
dieron cuenta de diversos tormentos físicos y psicológicos. Sufrieron golpes, aplicación de
electricidad, amenazas, simulacros de fusilamiento, colgamientos y el submarino.</p>
<p style="font-style: italic; text-align: right;"> Comisión Valech p397 </p><br></h4> 

    <h4><p style="font-style: italic;">Mujer, detenida en septiembre de 1973. Relato de su reclusión en las
dependencias del Ejército en que operaba el Servicio de Inteligencia Militar en
Valdivia: <br>
“...siento un cosquilleo en mi cuerpo, el cual iba en aumento y sentía dolores
y los músculos se me contraían, me mordía la lengua, sangraba, el corazón como que
se detenía y luego taquicardia. Me desmayé, me hicieron reaccionar a golpes, otra
descarga y así creo perdí la noción de las voces y me desmayé. Desperté tirada sobre
paja en la pieza grande, tenía náuseas, me dolía todo, sentía olor y sabor a sangre en
mi boca y un sabor como a metal. Escucho que llega un tipo y me pone un estetoscopio
y luego le dice a otro: ¡Basta por hoy, dénle dos Valium de 10 miligramos y agua!”.
Hombre, detenido en octubre de 1973. Relato de su reclusión en el Cuartel
del Servicio de Inteligencia Militar (SIM), en Valdivia (“Palacio de la Risa”): “[...]
repetidas veces gatillaron un revólver en mí sien diciendo que jugaban a la ruleta rusa
y mis sesos iban a estallar[...]”
<p style="font-style: italic; text-align: right;"> Testimonio Ruta de la Memoria </p><br></h4>`,
    `<h3> Expedientes </h3>`, { maxWidth: 600 })
 });;

 var marker = L.marker([-39.827105, -73.231834],  {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3>Regimiento Cuartel Bueras </h3>
<h4>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(16)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>



 En este recinto funcionaron:
 
<a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/regimiento-de-artilleria-n-2-maturana-valdivia/" target="_blank"> El Regimiento de Artillería N°2 Maturana</a> /
<a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/regimiento-de-caballeria-blindada-no-2-cazadores/" target="_blank">El Regimiento Caballería Blindada N°2 Cazadores</a> /
<a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/regimiento-de-telecomunicaciones-no-4-membrillar-valdivia/" target="_blank">El Regimiento de Telecomunicaciones Nº4 Membrillar</a> /
<a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/fiscalia-militar-de-valdivia/" target="_blank">La Fiscalia militar de Valdivia</a><br>



<br><p style="font-style: italic;">" Según los datos recabados, el mayor número de detenidos se dio entre septiembre y
octubre del año 1973.<br>
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p388 </p><h4>


En este recinto funcionaron el Regimiento de Telecomunicaciones Nº4
Membrillar, el Regimiento Caballería Blindada N°2 Cazadores, el Regimiento de
Artillería N°2 Maturana y la Fiscalía Militar de Valdivia.
Según antecedentes recabados por la Comisión Valech el mayor número de
detenidos en los recintos militares de la ciudad de Valdivia se concentró entre
los meses de septiembre y octubre del año 1973, momento en que los cuatro
regimientos actuaban coordinadamente. Hasta este lugar fueron trasladados
muchos de los prisioneros, hombres y mujeres, desde recintos como la Cárcel Isla
Teja, retenes y comisarías de Valdivia y otras ciudades, o bien, luego de ser detenidos
durante operativos militares en zonas rurales, especialmente en la precordillera,
eran traídos en camiones, hacinados y en muy malas condiciones físicas.
Un número importante de detenidos denuncia que fueron rapados al arribar
al regimiento, donde luego eran incomunicados, encapuchados, privados de
alimento y agua durante varios días, ya sea en el gimnasio, en los galpones o en
las caballerizas.
La Fiscalía Militar de Valdivia funcionó en el año 1973 en el Regimiento N°2
Cazadores, lo que significó que muchos prisioneros fueran llevados por personal del
Servicio de Inteligencia Militar (SIM), desde la cárcel u otros lugares de detención
hacia este recinto para ser interrogados.
Ex Presos Políticos denunciaron haber sido torturados en sus inmediaciones,
siendo objeto de golpizas (algunos con varillas de mimbre), aplicación de
electricidad, simulacros de fusilamiento, el submarino en aguas servidas, extracción
de uñas, obligación de permanecer en posiciones forzadas, colgamientos y
quemaduras con cigarrillos.
De acuerdo a lo señalado en el Informe Valech, a los detenidos se les recluyó
transitoriamente en el gimnasio, se realizaron interrogatorios en el casino del
recinto y se les mantuvo detenidos en galpones y caballerizas. Posteriormente, los
detenidos eran trasladados a la Comisaría de Valdivia, a la Cárcel Isla Teja o bien al
Gimnasio CENDYR.

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°7 Tramo Valdivia</p><h4>

`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, { maxWidth: 800 })
 });;


 var marker = L.marker([-39.82898931783156, -73.22762137804432], {icon: memorial}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/gimnasio-del-cendyr-valdivia/" target="_blank">Campamento de Prisioneros Valdivia (Actual Gimansio Cendyr)</a></h3>
<br>
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(15)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

      <h4>
<p style="font-style: italic;">"Durante 1973 este recinto, que estaba a cargo del Ejército, se utilizó para la reclusión
de presos políticos.<br>
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

<p style="font-style: italic; text-align: right;"> Comisión Valech p398</p><br><h4>

De acuerdo a testimonios recabados en el Informe Valech, este recinto fue
utilizado en el año 1973 por personal del Ejército para la reclusión y tortura de presos
políticos, hombres y mujeres, quienes durante su permanencia eran mantenidos
en una sala del gimnasio de 36 x 26 metros, durmiendo en las graderías del recinto.
A los prisioneros aquí recluidos, les estaba prohibido salir al aire libre y en cuanto
ingresaban se les asignaba un número, por el cual sería identificado durante toda
su estadía en el lugar.<br><br>
En el Gimnasio CENDYR los detenidos fueron sometidos a golpizas y torturas,
simulacros de fusilamiento y aplicación de electricidad, para luego ser trasladados
a interrogatorios al regimiento de caballería, al SIM (Servicio de Inteligencia
Militar) y al cuartel de Investigaciones de la ciudad de Valdivia, generalmente en
camiones cerrados.<br><br>
Este inmueble está identificado en el Catastro de la Memoria, de acuerdo a la
nómina de inmuebles incluidos por la Comisión Nacional sobre Prisión Política y
Tortura, de modo que presenta una connotación socio-histórica relevante.<br><br>

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°6 tramo Valdivia</p><br><h4>
`


,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{ maxWidth: 600 }
 )
 });;

 var marker = L.marker([-39.83331435, -73.215387142], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973 - 1975');
    openPanel(`<h3><br><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/cuartel-de-investigaciones-valdivia/" target="_blank">Cuartel de investigaciones</a></h3>
<h4>
<h4>
Según consta de los antecedentes recabados por la Comisión Valech, el mayor número de detenidos se registró entre los años 1973 y 1975.
Sin embargo, esta casona de dos pisos fue demolida y actualmente se encuentra una
feria artesanal llamada Mi Pueblito.

Los denunciantes relataron que los detenidos, hombres y mujeres, eran mantenidos en
calabozos en el subterráneo del edificio y en una pequeña sala para aislamiento. PermaneCÍan vendados e incomunicados durante todo el tiempo.
En los testimonios se consignó que sufrieron golpes, aplicación de electricidad, vejaciones
y amenazas.
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria</p><h4>`,  
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{ maxWidth: 600 })
 });;


 var marker = L.marker([-39.821043, -73.211172], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-los-jazmines/" target="_blank">Tenencia de carabineros Los Jazmines</a></h3>
<h4>
 La Tenencia de Carabineros, Los Jazmines fue utilizada para la detencion de presos politicos de la región.<h4>
  <p style="font-style: italic; text-align: right;"> Comisión Valech p 413</p><h4>`,
   `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{ maxWidth: 600 })
 });;

 var marker = L.marker([-39.806373, -73.208712], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-collico/" target="_blank">Retén de Carabineros Collico </a></h3>
<h4> El retén de carabineros de Collico fue utilizado para la detencion de presos politicos de la región.<h4>
   <p style="font-style: italic; text-align: right;"> Comisión Valech p413</p><h4>`,  
    `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{ maxWidth: 600 })
 });;

var marker = L.marker([-39.816662, -73.226129], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-las-animas/" target="_blank"> Ex Retén de Carabineros de las Ánimas</a></h3>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(26)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

      <h4>El antiguo retén de Carabineros estaba ubicado a un costado del puente Calle
Calle y fue utilizado para la detención y tortura de presos políticos de la región de
los Ríos, durante la dictadura cívico-militar.<br><br>
De acuerdo a los testimonios recabados, se señala que los detenidos, hombres
y mujeres, eran mantenidos en calabozos en el subterráneo de la construcción y en
una pequeña sala de aislamiento, vendados e incomunicados. En los testimonios se
consignó que sufrieron golpizas, aplicación de electricidad, vejaciones y amenazas.
Actualmente, es ocupado por la Agrupación de Monitores de Prevención de
Alcohol y Drogas (AMPAD), que tiene una concesión de uso gratuito por 5 años,
desde el año 2019 
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Sitio de interés N°4</p><h4><h4>

</h4>`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{ maxWidth: 600 })
 });


   var marker = L.marker([-39.848117, -73.197300],{icon: memorial}).addTo(mapa) ;marker.on('click', function() {
        setAnio('1973');
    openPanel(`<h3>Memorial de Llancahue</h3>
<h4>


 <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(21)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(12)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
  Este memorial es uno de los más recientes en la ciudad de Valdivia. Se
encuentra ubicado en la actual cárcel del sector de Llancahue. Contó con el apoyo
de Gendarmería para su construcción, gestionada por la AFDD que permite su 
concreción. Este memorial busca recordar los enjuiciamientos realizados por la
Caravana de la Muerte en el territorio cordillerano.
De acuerdo a los relatos, el 04 de octubre de 1973, son sacados de la Cárcel
Pública de Valdivia, <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barria-ordonez-pedro-purisimo/" target="_blank">Pedro Purísimo Barria Ordóñez</a>, 
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barrientos-warner-jose-rene/" target="_blank">José René Barrientos Warner</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/bravo-aguilera-sergio-jaime/" target="_blank">Sergio Jaime Bravo Aguilera</a>,
<a href=https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/garcia-morales-santiago-segundo/" target="_blank">Santiago Segundo Garcia Morales</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/liendo-vera-jose-gregorio/" target="_blank">José Gregorio Liendo Vera</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/guzman-soto-luis-enrique-del-carmen/" target="_blank">Luis Enrique del Carmen Guzman Soto</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/krauss-iturra-victor-fernando/" target="_blank">Fernando Krauss Iturra</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/pezo-jara-luis-hernan" target="_blank">Luis Hernán Pezo Jara</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/rudolf-reyes-victor-eugenio/" target="_blank">Víctor Eugenio Rudolf Reyes</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/saavedra-bahamondes-rudemir/" target="_blank">Rudemir Saavedra Bahamondes</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/saavedra-munoz-victor-segundo/" target="_blank">Víctor Segundo Saavedra Muñoz</a>,
<a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/valenzuela-ferrada-luis-mario/" target="_blank">Luis Mario Valenzuela Ferrada</a>, a quienes
se les condujo al predio militar de Llancahue, al polígono de tiro de la Guarnición
Militar de Valdivia, donde se les fusiló luego de una sentencia pronunciada en un
Consejo de Guerra. Este memorial denuncia la acción desmedida de la Caravana
de la Muerte y lo que hizo la dictadura
<p style="font-style: italic; text-align: right;"> Triptico</p><br>



<p style="font-style: italic;">"Los días 3 y 4 de octubre de 1973, fueron ejecutados en cumplimiento de una
sentencia del Consejo de Guerra de Valdivia, las siguientes personas, en su
mayoría militantes del MIR-MCR (Movimiento Campesino Revolucionario),
todos acusados de asaltar el Retén de Carabineros de Neltume el día 12 de
septiembre de 1973:</p>

 <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barria-ordonez-pedro-purisimo/" target="_blank">Pedro Purísimo Barria Ordóñez</a>, 22 años 
<br> <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/barrientos-warner-jose-rene/" target="_blank">José René Barrientos Warner</a>, 29 años
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/bravo-aguilera-sergio-jaime/" target="_blank">Sergio Jaime Bravo Aguilera</a>, 21 años
 <br><a href=https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-b/garcia-morales-santiago-segundo/" target="_blank">Santiago Segundo Garcia Morales</a>,26 años
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
les habría acusado de varios delitos, entre ellos, el asalto al Retén de Neltume."

<p style="font-style: italic; text-align: right;"> Informe Rettig p389 </p><br>

`)
});

 // Panguipulli

 var marker = L.marker([-39.641441, -72.336967], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-panguipulli/" target="_blank">Quinta Comisaria de carabineros de Panguipulli</a></h3>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(39)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


      <h4>

<p style="font-style: italic; text-align: left;"> "La mayor cantidad de detenidos en este recinto se registró en el año 1973. Parte de
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
<p style="font-style: italic; text-align: right;"> Comisión Valech p 403 </p><br>

<p style="font-style: italic; text-align: left;"> "
  <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/matus-hermosilla-victoriano/" target="_blank">Victoriano Matus Hermosilla</a>
  , de 39 años, era obrero del Complejo Maderero y Forestal Panguipulli.
Sin tener militancia política, había estado vinculado con algunos miembros del Movimiento Campesino
Revolucionario (MCR) y con militantes del Movimiento de Izquierda Revolucionaria, MIR.  Fue detenido con
posterioridad al 11 de septiembre de 1973, recuperando días después su libertad.  Según testimonios recibidos,
el 15 de enero de 1974, fue nuevamente detenido por Carabineros de Panguipulli.  Al cabo de algunos días, su
familia fue informada de su traslado a Valdivia, adonde nunca llegó, pues resultó muerto en el camino en
circunstancias que no se han podido determinar."</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p1172 </p><br>

<h4> <p/ style="font-style: italic;">"
La mayor cantidad de recluidos en este recinto se registró en el año 1973,
provenientes de los retenes de Carabineros emplazados en la precordillera (Neltume,
Futrono, Liquiñe y Choshuenco), detenidos en operativos conjuntos realizados por
Carabineros, el Ejército y algunos civiles en asentamientos campesinos y en la zona
del Complejo Maderero Panguipulli.
<br><br>
Los detenidos ingresaban al recinto en muy malas condiciones físicas. Eran
desnudados, mojados y encerrados en calabozos húmedos, incomunicados en
todo momento y muchos de ellos amarrados con alambre de púas.<br><br>
De acuerdo a los testimonios recogidos, en varias ocasiones los detenidos
fueron llevados al subterráneo del recinto o a las caballerizas, lugares en los que
eran sometidos a interrogatorios y torturas. Por otro lado, muchas de las víctimas
denunciaron que ni siquiera se les interrogaba, siendo exclusivamente torturados.
<br><br>
En este recinto los presos políticos denuncian la aplicación del submarino y
golpes con coligües, además de ser pisoteados y amenazados constantemente.
Desde aquí, por lo general, eran trasladados a la ciudad de Valdivia, a la Cárcel
Isla Teja, al SIM (Servicio  de Inteligencia Militar), al Regimiento Bueras o a
campos de prisionero

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°11 tramo Cordillerano/p><br>
 <h4>


<h4>`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{maxWidth: 800 } 
 )
 });;


 var marker = L.marker([-39.627591, -72.138181], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/casa-de-administracion-fundo-releco/" target="_blank">Casa de Administración Fundo Releco</a><h3>

<h4>
 La Casa de Administración Fundo "Releco" en Panguipulli fue utilizada  
como lugar de detencion de presos politicos.
  <p style="font-style: italic; text-align: right;">Comision Valech p411</p><br>
<h4>`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;

 var marker = L.marker([-39.731076, -71.852518], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/campamento-militar-liquine/" target="_blank">Campamento militar de Liquiñe</a><h3>
<h4>
 El Campamento Militar Liquiñe fue utilizado como lugar de detención de presos politicos.
   <p style="font-style: italic; text-align: right;">Comision Valech p412</p><h4>`, 
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth:600})
 });;

 var marker = L.marker([-39.747389, -71.855621], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-liquine/" target="_blank">Retén de carabineros de Liquiñe</a><h3>
<h4>
El retén de Liquiñe fue utilizado como lugar de detención de presos politicos.
   <p style="font-style: italic; text-align: right;">Comision Valech p412</p><br><h4>`, 
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`

, {maxWidth:800})
 });;

 var marker = L.marker([-39.851113, -71.947269],{icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-neltume/" target="_blank"></a>Retén de carabineros de Neltume</a><h3>

       <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(32)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>   

<h4>
<p style="font-style: italic; text-align: left;">  "Este retén fue utilizado en el año 1973. La mayoría de los testimonios recibidos sobre ese año fueron hombres
del Complejo Maderero Panguipulli, detenidos en operativos conjuntos de carabineros
y militares, también con la participación de algunos civiles. Según dichos testimonios,
se les interrogaba en relación con el asalto del retén de Neltume. <br>
<br> Ingresados al recinto, eran mantenidos en calabozos o en las pesebreras con cerdos y caballos, incomunicados,
con los ojos vendados y amarrados mientras eran interrogados y torturados.
Los ex prisioneros denunciaron haber sufrido golpes, amenazas, introducción de líquido
a presión por la nariz, azotes con ramas de ortiga y pinchazos de agujas en los testículos.
Varios testigos denunciaron haber sido obligados a permanecer en una casa de perro."
</p>
<p style="font-style: italic; text-align: right;"> Informe Valech p 404 </p><br><h4>


"Valdivia, Complejo Maderero y
Forestal Panguipulli, se produjo una tentativa fracasada de asalto al retén de
Neltume.  La realizaron elementos de izquierda extrema de aquel complejo,
especialmente miembros del Movimiento Campesino Revolucionario (MCR),
rama del MIR, que tras su fracaso y sin que hubiera víctimas, se dispersaron sin
efectuar nuevas operaciones.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 94 </p><br><h4>

`,  
`<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth:800})
 });;

 var marker = L.marker([-39.871893, -71.893167], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/campamento-militar-puerto-fuy-pirihueico/" target="_blank">Campamento militar Puerto Fuy / Pirehueico</a><h3>
<h4>
 El Campamento Militar Puerto Fuy / Pirihueico fue utilizado
  "por el Ejercito para la detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973."
  <p style="font-style: italic; text-align: right;">Comision Valech p412</p><br><h4>`, 
     `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`,{maxWidth:800})
 });;

 var marker = L.marker([-40.025581, -71.721359], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-de-pirehueico-panguipulli/" target="_blank">Tenencia fronteriza de carabineros de Pirihueico</a><h3>


<h4>
En diciembre de 1973, en un enfrentamiento entre las mismas fuerzas policiales  dentro de la Tenencia de Carabineros de Pirehueico, 
fue asesinado el cabo
 <a href="https://memoriaviva.com/ejecutados-politicos/barria-umana-luis-arturo" target="_blank">Luis Barra Umaña</a>"`
,{maxWidth:800})
 });;

 var marker = L.marker([-39.837410, -72.084467], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973 / 1981');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-choshuenco/" target="_blank">Reten de carabienros de Choshuenco</a><h3>
<h4>
<p style="font-style: italic; text-align: left;"> 
De acuerdo con los antecedentes, este retén se utilizó en el año 1973. Sólo se denunciaron
algunos casos en la década de 1980.<br>
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
pelo y bigotes con yataganes. </p>
<p style="font-style: italic; text-align: right;"> Informe Valech p 404 </p>`, 
 `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, { maxWidth: 600 })
 });;

 var marker = L.marker([-39.819882, -72.442796], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-rinihue/" target="_blank">Retén de carabienros de Riñihue</a><h3>
<h4>
El retén de carabineros de Riñihue fue utilizado como lugar de detencion de presos politicos.
<p style="font-style: italic; text-align: right;"> Informe Valech p 413 </p>`, 
 `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, { maxWidth: 600 })
 });;

 // FUTRONO

 var marker = L.marker([-40.127781, -72.393749], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973-1974');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-futrono/" target="_blank">Comisaria de carabineros de Futrono</a><h3>

      
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(53)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>
<p style="font-style: italic; text-align: left;"> "
Según consta de los antecedentes, la gran mayoría de casos se registró en los años 1973
y 1974.<br> 
<br>En el año 1973 las detenciones se produjeron en los asentamientos campesinos y en el
Complejo Maderero Panguipulli, durante operativos militares realizados en conjunto
con Carabineros y civiles, según señalaron los declarantes. Esta comisaría se constituyó
en un recinto de tránsito, interrogatorios y torturas. De acuerdo a los testimonios,
un gran número de campesinos fue traído en helicópteros desde la isla Huapi, en el
Lago Ranco. Al interior de la comisaría eran interrogados y torturados por militares
en el sector de las caballerizas; el resto del tiempo eran mantenidos en calabozos,
hacinados y sucios, incomunicados, vendados, sin alimento, sin baño ni agua." </p>

<p style="font-style: italic; text-align: right;"> Informe Valech p 403</p>

<p style="font-style: italic; text-align: left;"> "
La gran mayoría de los casos registrados en la Comisaría de Futrono se
concentraron en los años 1973 y 1974 en el marco de las detenciones realizadas en
los asentamientos campesinos cercanos y en el Complejo Maderero Panguipulli.
De acuerdo a los testimonios recogidos por la Comisión Valech, un gran número
de campesinos fue traído en helicópteros al Retén de Futrono desde la Isla Huapi,
ubicada en el lago Ranco.<br><br>
En dicho contexto, la Comisaría de Carabineros de Futrono es catalogada
como un recinto de tránsito, no obstante que en este lugar los detenidos fueron
sometidos a interrogatorios y torturas, las que eran realizadas por militares en el
sector de las caballerizas. Durante el tiempo de detención, los prisioneros políticos
eran confinados a calabozos insalubres y sometidos a un régimen de hacinamiento,
incomunicados, vendados, sin alimento, sin baño ni agua. " </p>

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°12 tramo del Ranco</p>


<h4>`, 
   `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;

 var marker = L.marker([-40.131416, -72.389006], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href=https://memoriaviva.com/centros-de-detencion/x-region/escuela-no45-maria-deogracia-futrono target="_blank">Colegio Maria Deogracia</a><h3>
        
<h4>
 Durante el operativo de gran envergadura en el sector denominado “Baños de Chihuío”, por parte de la IV División del Ejercito, 
 en el cual participaron miembros de la Fuerza Aérea, boinas Verdes de la Escuela de Montaña (con asiento en Temuco), conscriptos del Regimiento “Cazadores” y “Maturana” y civiles de la localidad, 
  detuvieron y dieron muerte a 18 personas, en su mayoría miembros del Sindicato Campesino “Esperanza del Obrero”.<br>
  La caravana militar se hospedo en Futrono en la Escuela Particular Nº 45 Maria DeoGracia en Balmaceda 280,
 Futrono (hoy Colegio Maria DeoGracia). <br> Esta escuela era perteneciente a las religiosas Franciscanas del Sagrado Corazón de Purulón, 
 y por invitación directa de las mojas que dirigían dicho establecimiento educacional los militares utilizaron este recinto para la detencion
 y tortura de presos politicos. <br>

<br> El testimonio de uno de los conscripto del Regimiento “Cazadores” que participo en dicho operativo, 
asegura que ellos albergaron en esta escuela a invitación de las religiosas, donde se hicieron asados y comilonas, 
mientras los presos políticos de la localidad, que habían sido trasladado desde la Comisaría de Carabineros de Futrono, 
eran interrogados en las aulas de la escuela.
<p style="font-style: italic; text-align: right;">Memoria Viva</p>
<h4>
  `,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600 } ) });;

 var marker = L.marker([-40.233055, -71.958596], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href=https://memoriaviva.com/centros-de-detencion/x-region/bodega-edifico-del-sindicato-esperanza-del-obrero-chabranco target="_blank">Sede Sindicato esperanza del obrero de Chabranco</a></h3>
<h4>


    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(54)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
La Bodega del edificio del Sindicato “Esperanza del Obrero” se ubica en las cercanías
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
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Sitio de interés N°1</p> `,
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxwith: 600})
 });;

 var marker = L.marker([-40.194129, -71.935565],{icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/casa-de-administracion-del-fundo-chihuio/" target="_blank">Casa de Administración Fundo Chihuio</a><h3>
    

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(52)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>
     La noche del 9 de Octubre de 1973  la casa de administración del fundo Chihuio, de propiedad de Américo González, 
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p 390</p><br>



`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 800})
 });;

var marker = L.marker([-40.198930, -72.259331
], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973-1976');
    openPanel(`<h3> <br> <a href="https://memoriaviva.com/centros-de-detencion/x-region/reten-de-carabineros-llifen/" target="_blank">Retén de carabineros de Llifén</a><br><h3>
<h4><p style="font-style: italic; text-align: left;">"
Este retén fue utilizado entre septiembre del año 1973 y mayo del año 1976. La mayoría
de los casos se produjo en el año 1973. Durante 1975 no se registraron detenidos en este
recinto.<br><br>
Los detenidos fueron conducidos hasta este retén amarrados o encadenados y en la
misma condición permanecieron en él, encerrados en calabozos con agua sucia, muchos
de ellos completamente desnudos.
Los declarantes denunciaron que sufrieron golpes, el submarino seco y el mojado y amenazas."</p> <h4>
  <p style="font-style: italic; text-align: right;">Comisión Valech p 404</p><br>
  `,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;


 //LAGO RANCO
 var marker = L.marker([-40.31953, -72.47661], {icon: memorial}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> Memorial Lago Ranco<h3>

<h4>
La Tenencia de Carabineros de Lago Ranco era un recinto de tránsito, interrogación
y tortura de prisioneros, en su mayoría campesinos del mismo sector, los que luego
de ser detenidos y conducidos al retén eran trasladados a la Comisaría de Río Bueno,
donde se les mantuvo incomunicados, siendo interrogados y torturados.
Las condiciones a las que fueron sometidos los presos políticos en este cuartel
eran de hacinamiento, frío, privación de alimento y agua, permaneciendo amarrados
y con los ojos vendados. Los presos políticos denunciaron haber sufrido golpes,
amenazas de fusilamiento, obligados a beber agua con orina y excrementos, y eran
permanentemente amenazados.
La mayor actividad del Retén de Lago Ranco como centro de detención e
interrogatorio de presos políticos se concentró en el año 1973. Entre los prisioneros
estuvieron Arturo Vega González, Teófilo González Calfulef, Manuel Jesús Hernández
Inostroza y Cardenio Ancacura Manquián, todos detenidos en sus domicilios el día
16 de octubre de 1973, para luego, en la noche de ese día, ser conducidos al Vapor
“Laja”, donde fueron ejecutados y sus restos lanzados al Lago Ranco, desaparecidos
hasta la fecha.
Para continuar el circuito, debes dirigirte al puente Riñinahue y para hacerlo,
debes tomar la ruta T-85 y continuar camino a Llifén. Acá verás el puente Riñinahue
sobre el río Pichi.

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°5 tramo del Ranco</p><br>



<p style="font-style: italic; text-align: left;">
"La Tenencia de Carabineros de Lago Ranco era un recinto de tránsito, 
interrogación y tortura de prisioneros, la mayoría eran campesinos del mismo sector de Lago Ranco que, 
luego de ser detenidos y conducidos al retén fueron trasladados a la Comisaría de Río Bueno. <br><br>
Allí se les mantuvo incomunicado,se les interrogó y torturó. Las condiciones de  vida en este cuartel eran similares a las de muchos otros: hacinamiento, frío,
privación de alimento y agua. Allí permanecían amarrados y con los ojos vendados. <br>
Los declarantes denunciaron haber sufrido golpes, amenazas de fusilamiento, fueron obligados a beber agua con orina y excrementos y recibían amenazas permanente."</p>

<p style="font-style: italic; text-align: right;"> Comision Valech p405</p><br>

<p style="font-style: italic;">"El 16 de octubre de 1973, fueron muertos a bordo del <a href="https://memoriaviva.com/centros-de-detencion/x-region/vapor-laja-valdivia" target="_blank">vapor Laja</a>, por personal de
la Gobernación Marítima de Valdivia, dependiente de la Armada de Chile, las
siguientes personas, cuyos cuerpos fueron arrojados a las aguas del lago Ranco:<br>

<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-v/vega-gonzalez-arturo/" target="_blank">Arturo Vega González, 20 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-g/gonzalez-calfulef-teofilo-zaragozo/" target="_blank">Teófilo González Calfulef, 24 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-h/hernandez-inostroza-manuel-jesus/" target="_blank">Manuel Jesús Hernández Inostroza, 42 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-a/ancacura-manquian-cardenio/" target="_blank">Cardenio Ancacura Manquian, 20 años</a> <br>

  <br>Todos fueron detenidos el día 16 de octubre de 1973 en sus domicilios de Lago
Ranco y conducidos a la Tenencia de Carabineros de dicho pueblo.  En la noche
de ese día fueron subidas al vapor Laja, donde fueron ejecutadas.  Sus cuerpos
fueron lanzados al lago, sin que hayan sido encontrados hasta la fecha."</p> 
<p style="font-style: italic; text-align: right;"> Informe Rettig 395</p><br>
    `,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 
 });;

  var marker = L.marker([-40.31986, -72.47661], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-de-lago-ranco/" target="_blank">Tenencia de Carabineros de Lago Ranco</a><h3>

      
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(47)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>

<p style="font-style: italic; text-align: left;">
"La Tenencia de Carabineros de Lago Ranco era un recinto de tránsito, 
interrogación y tortura de prisioneros, la mayoría eran campesinos del mismo sector de Lago Ranco que, 
luego de ser detenidos y conducidos al retén fueron trasladados a la Comisaría de Río Bueno. <br><br>
Allí se les mantuvo incomunicado,se les interrogó y torturó. Las condiciones de  vida en este cuartel eran similares a las de muchos otros: hacinamiento, frío,
privación de alimento y agua. Allí permanecían amarrados y con los ojos vendados. <br>
Los declarantes denunciaron haber sufrido golpes, amenazas de fusilamiento, fueron obligados a beber agua con orina y excrementos y recibían amenazas permanente."</p>

<p style="font-style: italic; text-align: right;"> Comision Valech p405</p><br>

<p style="font-style: italic;">"El 16 de octubre de 1973, fueron muertos a bordo del <a href="https://memoriaviva.com/centros-de-detencion/x-region/vapor-laja-valdivia" target="_blank">vapor Laja</a>, por personal de
la Gobernación Marítima de Valdivia, dependiente de la Armada de Chile, las
siguientes personas, cuyos cuerpos fueron arrojados a las aguas del lago Ranco:<br>

<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-v/vega-gonzalez-arturo/" target="_blank">Arturo Vega González, 20 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-g/gonzalez-calfulef-teofilo-zaragozo/" target="_blank">Teófilo González Calfulef, 24 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-h/hernandez-inostroza-manuel-jesus/" target="_blank">Manuel Jesús Hernández Inostroza, 42 años</a>
<br><a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-a/ancacura-manquian-cardenio/" target="_blank">Cardenio Ancacura Manquian, 20 años</a> <br>

  <br>Todos fueron detenidos el día 16 de octubre de 1973 en sus domicilios de Lago
Ranco y conducidos a la Tenencia de Carabineros de dicho pueblo.  En la noche
de ese día fueron subidas al vapor Laja, donde fueron ejecutadas.  Sus cuerpos
fueron lanzados al lago, sin que hayan sido encontrados hasta la fecha."</p> 
<p style="font-style: italic; text-align: right;"> Informe Rettig 395</p><br>
    `,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 
 });;


 //RIO BUENO y LA UNION

 var marker = L.marker([-40.335495, -72.957977], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><br><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-rio-bueno/" target="_blank"> Comisaría de Rio Bueno </a><h3>
<h4>


    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(46)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p 407</p>

<p style="font-style: italic;" text-align: left;">
De acuerdo al Informe Valech sobre Prisión Política y Tortura, los hombres y
mujeres que estuvieron detenidos en la comisaría de carabineros de Río Bueno
denunciaron haber sido tratados con violencia desde el momento de su detención.
Varios de ellos fueron golpeados frente a sus hijos pequeños y a sus mujeres y luego,
durante el trayecto hasta la comisaría, permanentemente maltratados.<br><br>
Una vez en la comisaría, los detenidos eran amarrados, algunos con alambre
de púas, vendados y encerrados en calabozos, recintos en los que se les lanzaba
agua constantemente, permaneciendo durante varios días sin alimento alguno,
incomunicados, sujetos a interrogatorios y torturas, para luego ser trasladados en
camiones militares, amarrados unos con otros y en muy malas condiciones físicas, a
la ciudad de Valdivia. La mayoría de los detenidos eran llevados a la cárcel.
<br><br>
Los testimonios de detenidos en este recinto en 1973, hacen referencia a la
aplicación de electricidad, golpes, posturas forzadas, amenazas de detención y tortura
a sus familiares, simulacro de fusilamiento, el submarino, introducción de agua a
presión por la boca y la nariz, golpes con martillos en las uñas; obligados a escuchar
torturas infligidas a otros detenidos y sometidos a vejación y violación sexual.<br><br>
Hombre, detenido en septiembre de 1973. Relato de su reclusión en la Comisaría
de Río Bueno: [...] En otra sesión de interrogatorio las preguntas iban precedidas
de martillazos sobre las uñas de los dedos de ambas manos, uno a uno, hasta que
quedaban completamente inflamados y por lo tanto insensibles, por tal razón creo que
cambié todas mis uñas.
<br><br>
En la década de 1980, nuevamente la comisaría de carabineros de Río Bueno
fue un lugar de reclusión, y de acuerdo a testimonios de quienes estuvieron allí
detenidos, fueron objeto de torturas y amenazas permanentes con participación
de personal de la CNI, para luego ser trasladados en pésimas condiciones a otros
recintos en la ciudad de Valdivia.
<br><br>
Para salir desde la comisaría de Río Bueno debes seguir por esta calle hacia el
norte y te encontrarás con la línea del tren; sigue por la ruta T-85 camino a la comuna
de Lago Ranco, emplazada a la orilla del lago del mismo nombre. Se caracteriza por
ser una pequeña ciudad con un alto porcentaje de población Mapuche. Al llegar a la
ciudad verás que la cruza la Ruta T-85. Debes tomar la calle Linares y bajar hasta calle
Valparaíso, ahí te encontrarás con la plaza y la Municipalidad. " </p>                                                      
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°4 tramo del Ranco</p>
<h4>`,  
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;

  var marker = L.marker([-40.419208, -72.786062], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-crucero/" target="_blank">Réten de Carabineros de Crucero</a><h3>
<h4>
  El Retén de carabineros de Crucero funcionó como centro de detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973.<br>
  <p style="font-style: italic;" text-align: right;"> Informe Valech p 412</p>
  <h4>` , {maxWidth: 600})
 });;

   var marker = L.marker([-40.374884, -72.621354], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-vivanco/" target="_blank">Retén de Carabineros de Vivanco</a><h3>
<h4>
  El Retén de carabineros de Vivanco funcionó como centro de detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973.
    <p style="font-style: italic; text-align: right;"> Informe Valech p 413</p>
  <h4>` , {maxWidth: 600})
 });;

 var marker = L.marker([-40.334607, -72.962581], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/carcel-de-rio-bueno/" target="_blank">Cárcel de Río Bueno</a></h3>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(45)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>



      <h4> La Carcel de Rio Bueno funcionó como centro de detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973.<h4>
    <p style="font-style: italic; text-align: right;"> Informe Valech p 412</p>
        <p style="font-style: italic;" text-align: left;">
    La Cárcel de Río Bueno, al igual que las otras cárceles, fueron los centros de
detención del territorio. Aquí llegaron recluidos desde Osorno y Valdivia, militantes
de diversos partidos políticos que fueron perseguidos por la dictadura. Respecto de
este centro los entrevistados recuerdan que a este lugar llegaban desde Valdivia y
también desde otras ciudades los presos políticos.
Luego de visitar la cárcel, te recomendamos volver a la calle Patricio Lynch, para
continuar al norte y llegar a la Avda. Arturo Prat, donde debes tomar a la izquierda
hasta encontrarte con la Comisaría y luego seguir por esa calle para salir de Río
Bueno hacia Lago Ranco.
 <p style="font-style: italic;" text-align: right;"> Ruta de la Memoria Hito N°3 tramo del Ranco</p><h4>
    ` , {maxWidth: 600})
 });;



 var marker = L.marker([-40.293143, -73.085891], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-la-union/" target="_blank">Comisaria de carabineros de La Unión</a><h3>
<h4><p style="font-style: italic; text-align: left;">"Este recinto concentró en el año 1973 la mayor cantidad de detenidos.
Se trató de un lugar de tránsito desde donde, según los testimonios, luego de un tiempo
de interrogatorios y torturas, eran trasladados a distintos centros de reclusión en la ciudad
de Valdivia. Varios prisioneros políticos habían sido detenidos en operativos conjuntos
de carabineros, militares y civiles, en sectores rurales o en poblaciones populares de la
ciudad.<br><br>
Los detenidos, hombres y mujeres, permanecían en esta comisaría incomunicados en
calabozos mojados, hacinados, sin acceso a baño, sin alimento ni agua.<br><br>
Los detenidos que estuvieron e
n este lugar denunciaron haber sufrido golpes, simulacro
de fusilamiento, amenazas, el teléfono, introducción de agua a presión por nariz y boca,
aplicación de electricidad y corte de pelo a cuchillo"</p>
  <p style="font-style: italic; text-align: right;"> Informe Valech p 401</p>`,
  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, 
 ) 
 });;

 var marker = L.marker([-40.291996, -73.081155], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/cuartel-de-investigaciones-la-union/" target="_blank"> Ex Cuartel de investigaciones de La Unión (Hoy Delegación presidencial)</a><h3>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(43)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

      <h4> El cuartel de investigaciones de la Unión funcionó como centro de detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973.<h4><br>
    <p style="font-style: italic; text-align: right;"> Informe Valech p 411</p>

    El cuartel de la PDI funcionaba en un edificio donde hoy están instaladas
distintas reparticiones públicas, como son la Gobernación del Ranco, INDAP, entre
otros. En este edificio funcionó el cuartel de la Policía de Investigaciones de Chile,
específicamente, en el primer piso, donde hoy funciona el Departamento de Patentes
de la Municipalidad de La Unión. En este lugar se detuvieron y torturaron a un gran
número de personas de las cuales algunos fueron a la cárcel de Río Bueno y otros al
regimiento en Valdivia.
 <p style="font-style: italic; text-align: right;"> Ruta de la Memoria Hito N°1 tramo del Ranco</p>

  `
 , {maxWidth: 600})
 });;

  var marker = L.marker([-40.29321, -73.08455], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://www.memoriaviva.com/centros-de-detencion/x-region/carcel-de-la-union" target="_blank">Cárcel de La Unión</a><h3>
<h4> La cárcel de la Unión funcionó como centro de detencion de presos politcos en los meses subsiguientes al 11 de Septiembre 1973.<h4><br>
    <p style="font-style: italic; text-align: right;"> Informe Valech p 411</p>
  `
 , {maxWidth: 600})
 });;

 

 // Resto
 var marker = L.marker([-39.862216, -72.812525], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-n-2-los-lagos/" target="_blank">Comisaria de Los Lagos </a> <h3>
<h4>
<p style="font-style: italic; text-align: left;"> "Según consta de los antecedentes recabados por la Comisión, fue en el año 1973 cuando
se registraron la casi totalidad de las detenciones en ese lugar.
En el trayecto hacia la comisaría, luego de ser detenidos, algunos debieron caminar
más de 20 kilómetros sometidos a torturas y simulacros de fusilamiento durante el
trayecto. También les hicieron caminar desde la comisaría hasta la ciudad de Valdivia,
por caminos interiores.
Los detenidos, hombres y mujeres, eran interrogados en bodegas del recinto o en las
caballerizas y luego recluidos en calabozos sin luz ni baño. Allí permanecían amarrados,
vendados e incomunicados. La mayoría fue llevada desde aquí a otros recintos de reclusión
en la ciudad de Valdivia."</p>
<p style="font-style: italic; text-align: right;"> Comision Valech p 400</p><br>
<h4>`
 , {maxWidth: 600})
 });;

 var marker = L.marker([-39.452502, -72.772324], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-lanco/" target="_blank">Tenencia de carabineros de Lanco</a> <h3>
<h4>
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
<p style="font-style: italic; text-align: right;"> Informe Valech p 405</p> <h4>


<p style="font-style: italic; text-align: left;">
La Tenencia de Carabineros de Lago Ranco era un recinto de tránsito, interrogación
y tortura de prisioneros, en su mayoría campesinos del mismo sector, los que luego
de ser detenidos y conducidos al retén eran trasladados a la Comisaría de Río Bueno,
donde se les mantuvo incomunicados, siendo interrogados y torturados.
<br><br>
Las condiciones a las que fueron sometidos los presos políticos en este cuartel
eran de hacinamiento, frío, privación de alimento y agua, permaneciendo amarrados
y con los ojos vendados. Los presos políticos denunciaron haber sufrido golpes,
amenazas de fusilamiento, obligados a beber agua con orina y excrementos, y eran
permanentemente amenazados.
<br><br>
La mayor actividad del Retén de Lago Ranco como centro de detención e
interrogatorio de presos políticos se concentró en el año 1973. Entre los prisioneros
estuvieron Arturo Vega González, Teófilo González Calfulef, Manuel Jesús Hernández
Inostroza y Cardenio Ancacura Manquián, todos detenidos en sus domicilios el día
16 de octubre de 1973, para luego, en la noche de ese día, ser conducidos al Vapor
“Laja”, donde fueron ejecutados y sus restos lanzados al Lago Ranco, desaparecidos
hasta la fecha. 
<p style="font-style: italic; text-align: right;"> ruta de la Memoria Hito N°5 tramo del Ranco</p> <h4>
`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600} )
 });;

  var marker = L.marker([-39.544432, -72.503030], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-malalhue/" target="_blank">Retén de carabineros de Malalhue</a><h3>
<h4> El retén de carabineros de Malalhue fue utilizado para la detencion de presos politicos en los meses subsiguientes al 11 de Septiembre 1973. 
      <p style="font-style: italic; text-align: right;"> Informe Valech p 412</p></h4>`,
`<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;

 var marker = L.marker([-39.540736, -72.960657], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/comisaria-de-carabineros-san-jose-de-la-mariquina/" target="_blank">Comisaria de Carabineros San José de la Mariquina</a></h3>

<h4> La comisarsia de carabineros de San José de la Mariquina fue utilizada para la detencion de presos politicos en los meses subsiguientes al 11 de Septiembre 1973. 
      <p style="font-style: italic; text-align: right;"> Informe Valech p 411</p></h4>`,  `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
 });;

 var marker = L.marker([-39.889087, -73.426458], {icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3><a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/reten-de-carabineros-corral/" target="_blank"> Retén de Corral</a> <h3>
<h4>
<h4> El retén de carabineros de Corral fue utilizado para la detencion de presos politicos en los meses subsiguientes al 11 de Septiembre 1973. <h4>
  <p style="font-style: italic; text-align: right;"> Informe Valech p 411</p></h4>`, 
   `<h3>Registros</h3>`,
    `<h3> Testimonios </h3>`,
    `<h3> Expedientes </h3>`, {maxWidth: 600})
});;

 var marker = L.marker([-40.069418, -72.873192],{icon: CCDD}).addTo(mapa)
 ;marker.on('click', function() {
    setAnio('1973');
    openPanel(`<h3> <a href="https://memoriaviva.com/nuevaweb/centros-de-detencion/x-region/tenencia-de-carabineros-paillaco/" target="_blank"> Tenencia de carabineros de Paillaco</a> <h3>
<h4>
 La tenencia de carabineros de Pailaco fue utilizada para la detencion de presos politcos en los
  meses subsiguientes al 11 de Septiembre 1973.<h4>
   <p style="font-style: italic; text-align: right;"> Informe Valech p 411</p></h4>`
 , {maxWidth: 600})
 });;


 /////// MEMORIALES //////

   var marker = L.marker([-39.843286, -73.292629],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {    setAnio('1973');
    openPanel(`<h3>Memorial Puente Estancilla</h3><br>



  <div style="display: flex; justify-content: space-around; gap: 25px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1; margin-left: 5px;" onclick="openLibroPDF(92)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>

            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(22)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>
"Este memorial nació como una cruz de madera en honor a <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-t/tapia-de-la-fuente-rogelio-humberto/" target="_blank">Rogelio Tapia de la Puente</a> y a 
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/barrientos-matamala-raul-jaime/" target="_blank">Raúl Jaime  Barrientos Matamala</a>
asesinados por la CNI en agosto de 1984 en el puente Estancilla. <br>
<br>La cruz fue varias veces destruida y repuesta, 
hasta que finalmente el memorial fue reforzado con concreto y metal por gestión de los familiares e instalando una placa 
que recuerda además a:
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/boncompte-andreu-juan-jose/" target="_blank">Juan Boncompte Andreu</a> de 30 años, acribillado en Valdivia en la población Rubén Dario,
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-m/mujica-barros-mario-ernesto/" target="_blank">Mario Mujica Barros</a> de 32 años, asesinado en Los Ángeles, y
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/aedo-arias-luciano-humberto/" target="_blank">Luciano Aedo Arias</a>;
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-l/lagos-rodriguez-mario-octavio/" target="_blank">Mario Lagos Rodriguez</a>;
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-h/herrera-riveros-nelson-adrian/ target="_blank">Nelson Herrera Riveros</a>, asesiandos en Concepción.
   Todos asesinados por la CNI en la operación «Alfa carbón».<br><br>  
  Los jóvenes pertenecían a una unidad del MIR de la zona sur. Dos años más tarde,
 en agosto de 1986 se crearía la Agrupación de Familiares de Ejecutados Políticos (AFEP) de Valdivia.

 

"El memorial hace alusión a los ejecutados del MIR, en el marco de la operación
Alfa Carbón que desarrolló la CNI, en virtud de la cual se realizaron asesinatos en
las ciudades de Concepción, Temuco, Los Ángeles y Valdivia. En ésta última el 23
de agosto de 1984, fueron asesinados: <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-t/tapia-de-la-fuente-rogelio-humberto/" target="_blank">Rogelio Tapia de la Puente</a> 
y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/barrientos-matamala-raul-jaime/" target="_blank">Raúl Jaime  Barrientos Matamala</a> 
en el sector del puente Estancilla, camino a Niebla.

<br><br>Los ejecutados formaban parte de la Operación Retorno, ejecutada por el MIR
con el objetivo de reorganizar a los miristas que se encontraban en el exilio para
volver a Chile, específicamente, en el sur y así poder crear un contingente necesario
para poder rearticular la resistencia en contra de la dictadura cívico-militar.<br><br>

En el sector en donde está emplazado el memorial, en el Puente Estancilla,
fueron ejecutados <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-t/tapia-de-la-fuente-rogelio-humberto/" target="_blank">Rogelio Tapia de la Puente</a> 
y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/barrientos-matamala-raul-jaime/" target="_blank">Raúl Jaime  Barrientos Matamala</a>. El
primero, estudió Ingeniería Forestal en la Universidad Austral de Chile, en donde
comenzó su militancia en partidos universitarios de izquierda y posteriormente su
militancia en el MIR. Al momento de su asesinato, Rogelio vivía en Paillaco, tenía 31
años, estaba casado y era padre de dos hijos. Por su parte Raúl Barrientos Matamala,
era empleado de una tienda en Valdivia donde se desempeñaba como cobrador; al
momento de su asesinato tenía 23 años.
El levantamiento del memorial se logró gracias a las gestiones de la Unión
Nacional de Estudiantes Democráticos (UNED), quienes levantaron una cruz de
madera en honor a los ejecutados en el sector. Frente a esto, los aparatos represores,
principalmente la CNI, botaron la cruz, la cual fue nuevamente levantada por la
gente. Posteriormente, se levantó una cruz de fierro, hecha con un riel de ferrocarril
con el fin de poner más resistencia, pero de igual forma fue echada abajo y vuelta a
levantar. Con la llegada de la democracia, la cruz quedó definitivamente erigida en
Estancilla, con más elementos y detalles en el memorial.
El 23 de agosto de cada año se realiza una romería y velatón en el memorial en
recuerdo de los ejecutados.
 <p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°13 tramo Valdivia</p>



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
cuando fue muerta.</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p 997</p><br> </h4> `);

});


   var marker = L.marker([-39.746590, -71.852240],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de Liquiñe</h3><br>

     <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(102)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
S
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(37)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>



<h4>
Recuerda a 15 personas detenidas en Liquiñe, Trafun y Paimun, ejecutados en el puente Toltén, el 10 de octubre de 1973. 
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

<p style="font-style: italic; text-align: right;">Ruta de la memoria</p>

    
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

<p style="font-style: italic; text-align: right;"> Informe Rettig p 393 </p><br>



    El 10 de octubre de 1973 fueron detenidos en el caserío de Liquiñe unos 15
trabajadores del Complejo Forestal Maderero Panguipulli, entre ellos varios
miembros de las familias Tracanao y Reinante, José Fuentealba, jefe del predio
Trafún, y Bernarda Vera Contardo, casada, una hija, profesora de la Escuela de
Puerto Fuy en el Complejo Maderero y Forestal Panguipulli, y militante del MIR.
Fue detenida el 10 de octubre de 1973 por efectivos de la FACH que pertenecían al
Grupo N°3 de Helicópteros “Maquehue” ubicado en Temuco.<br>
La detención ocurrió en la localidad de Trafún, provincia de Valdivia, donde
Bernarda había buscado refugio debido a que era intensamente buscada. Sus
familiares habían recibido información de que se le buscaba por el asalto frustrado
al Retén de Neltume. Versiones de testigos sobrevivientes dicen que ella no había
participado en el frustrado asalto, pero que, debido a su militancia en el MIR y su
relación con otras personas asociadas a este, a las que también se les responsabilizó
por ese hecho, fue acusada de asalto.<br>
Dos días antes de su detención, en la zona de Panguipulli, Neltume y
Choshuenco se había iniciado un vasto operativo de militares, efectivos de la
Fuerza Aérea y Carabineros. Diariamente la prensa informaba sobre la búsqueda
de “los extremistas”, haciendo mención especial al nombre de Bernarda Vera. Un
reportaje de la época titula: “La Bernarda huye acosada por hambre y enfermedades”.
La autoridad militar al más alto nivel de la zona informaba del resultado de los
operativos, señalando el número de los detenidos.<br>
Ese mismo día 10 de octubre, se registran otras 15 personas detenidas que
permanecen hasta hoy en calidad de detenidos desaparecidos. Los nombres
son: Luis Rivera Catricheo, Eliseo Tracanao Pincheira, José y Alejandro Tracanao
Pincheira, Salvador Alamos Rubilar, José Borquez Levicán, Alberto, Ernesto y
Modesto Reinante Raipán, Luis Lagos Torres, Carlos Figueroa Zapata, Mauricio
Curiñanco Reyes, Isaías Fuentealba Calderón y Daniel Castro López.<br>
Como los vehículos en que se movilizaban los militares no eran suficientes,
fueron a buscar al pueblo de Liquiñe a un señor de apellido Carmache, a quien le
pidieron su camioneta, llevando como chofer a Sixto Díaz. Por orden de los militares,
alrededor de las dos de la madrugada del día 11 de octubre, subieron al vehículo
a un grupo de prisioneros y los trasladaron hasta el puente Villarrica, sobre el río
Toltén, lugar en el que los hicieron bajarse y obligaron a retirarse del lugar al chofer
Sixto Díaz, a quien el vehículo le fue devuelto completamente ensangrentado. No
se tuvo más información de las personas detenidas ese 10 de octubre de 1973.<br>
De acuerdo a testimonios recabados, la detención fue realizada por miembros de
la FACH, Carabineros y civiles, en especial Luis García, quien facilitó las instalaciones
para torturar a las personas. Luego se dirigieron al Puente de río Toltén, camino a
Villarrica. A eso de las 2 de la madrugada los ejecutaron, lanzando los cuerpos al
río en sacos con piedras para que no flotaran, los que, de igual forma subieron
a la superficie. En cuanto Carabineros se percató de la situación los empujaron
nuevamente a la corriente, logrando hacerlos desaparecer.

<br><br>En marzo de 1995, los familiares de las víctimas de Liquiñe inauguraron el
primer memorial: una tumba colectiva por los detenidos desaparecidos del día 10
de octubre. El monolito es un acto simbólico, ya que no se han encontrado los
restos. La gestión de este monolito fue realizada por los familiares de las víctimas,
encabezados por la viuda del desaparecido Mauricio Curiñanco, quien consiguió el
terreno donde se emplaza.</p><br>
<p style="font-style: italic; text-align: right;"> Ruta de la memoria Hito N°9 tramo Cordillerano </p>


`)
});


   var marker = L.marker([-39.850383, -71.945767],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de Neltume</h3>

     <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(108)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>

            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(30)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>
El memorial de Neltume hace alusión a los 70 trabajadores detenidos
desaparecidos y ejecutados políticos del Complejo Forestal y Maderero Panguipulli
durante el período comprendido entre 1973 y 1981. Fue instalado en 1998 por
compañeros y amigos de las 12 víctimas de Neltume fusilados en Valdivia y por
gestiones realizadas por la AFDD-AFEP representada por Ida Sepúlveda y por
CODEPU. Ese mismo año se instala una escultura en memoria de las víctimas del
Complejo en la avenida principal de la localidad de Neltume, la que fue realizada
por Alejandro Verdi, como iniciativa de rescate a la Memoria.<br><br>
En la actualidad, la mantención y gestión del memorial, como actividades
vinculadas al Complejo Forestal y Maderero, están a cargo del Comité Memoria
Neltume 81.
<p style="font-style: italic; text-align: right;"> Ruta de la memoria Hito N°2 tramo Cordillerano </p>

`)
});

   var marker = L.marker([-39.829300, -73.215533],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial por la vida</h3>


     <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(110)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>

            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(10)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>
Recuerda a las 116 víctimas de crímenes de lesa humanidad perpetrados por la última dictadura civil-militar de la entonces provincia de Valdivia. 
La escultura fue diseñada por Alejandro Verdi. 
Cada 11 de septiembre se realiza una romería al memorial donde se hace un acto conmemorativo.<br>
<br>
El memorial ubicado en el Cementerio Municipal de Valdivia hace referencia
a los detenidos desaparecidos y ejecutados políticos de la provincia de Valdivia,
y tiene su origen en la investigación que realiza el ministro de fuero juez Juan
Guzmán sobre el paso de “La Caravana de la Muerte” en la región de Los Ríos, en
cuyo contexto fueron exhumadas las osamentas encontradas en Chihuío desde el
Cementerio Municipal de Valdivia, lugar en el cual se encontraban sepultadas.<br><br>
En el Servicio Médico Legal de Santiago no se logró establecer con claridad
las identidades de los cuerpos, en vista de lo cual, la Agrupación de Detenidos
Desaparecidos y Ejecutados Políticos de Valdivia levanta de manera simbólica
el memorial en honor a las 116 víctimas de la dictadura cívico-militar, iniciativa
aprobada en agosto del año 2000.<br><br>
Con recursos del Fondo Social de la Presidencia de la República y el programa
de DD.HH, ambos del Ministerio del Interior, más el Centro de Investigación
y Promoción de los DD.HH “CINPRODH” de Temuco y el diseño del escultor
Alejandro Verdi, se realizó la construcción del Memorial con más de 6 placas de
mármol con los nombres de las 116 víctimas de la provincia, el cual fue terminado
en diciembre de 2001.
<p style="font-style: italic; text-align: right;"> Ruta de la memoria Hito N°5 tramo Valdivia</p>

`)
});


 var marker = L.marker([-40.231556, -71.970582],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de Chihuio</h3>



     <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(112)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>

            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(51)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>
“El caso” Chihuío es un crimen de lesa humanidad donde 18 personas fueron detenidas, torturadas y asesinadas por efectivos militares en las termas de Chihuío el 09 de octubre de 1973. 
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p390-393</p><br>

El “Memorial de Violaciones a los Derechos a la Vida, Víctimas de Chihuío”,
fue inaugurado en su segunda etapa el 8 de abril de 2006; en él se estamparon
los nombres de los 18 ejecutados políticos. Este Memorial fue iniciativa de la
Agrupación de Familiares de Detenidos Desaparecidos y Ejecutados Políticos de la
provincia de Valdivia y fue financiado por el Programa de Derechos Humanos del
Ministerio del Interior.
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°9 tramo del Ranco </p><br>
`)
});


   var marker = L.marker([-39.686294, -73.101902],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial Puente Pichoy</h3>

 <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(116)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(23)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>

  <p style="font-style: italic;">El memorial recuerda el asesinato a mansalva del suplementero y militante
comunista <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-cortes-jose-manuel/" target="_blank">José Manuel Arriagada Cortes</a>;
 el topógrafo y militante socialista <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-a/arriagada-zuniga-jose-gabriel/" target="_blank">José Gabriel Arriagada Zuñiga</a>; 
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carrasco-torres-jose-manuel/" target="_blank">José Manuel Carrasco Torres</a>, contador y militante
comunista; y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-o/ortega-alegria-gilberto-antonio/" target="_blank">Gilberto Antonio Ortega Alegria</a>, empleado, dirigente sindical y
militante socialista.
De acuerdo a los testimonios de testigos, sistematizados en el Informe Valech,
los detenidos en el Retén de Carabineros de Lanco fueron torturados, golpeados,
pisoteados, amenazados y expuestos a intensa presión psicológica, para luego ser
trasladados a la ciudad de Valdivia. Estos prisioneros fueron asesinados durante el
trayecto con el pretexto de la ley de fuga en las cercanías del puente Pichoy, lugar
donde se levantó este memorial.</p>

<p style="font-style: italic; text-align: right;">Ruta de la memoria p 42</p><br>

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
<p style="font-style: italic; text-align: right;"> Informe Rettig p 394 </p>

`)
});


   var marker = L.marker([-39.840809, -73.215964],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de la Mano</h3>

 <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(119)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(12)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4>
En recuerdo de <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/boncompte-andreu-juan-jose/" target="_blank">Juan José Boncompte Andreu</a>, asesinado el 24 de agosto de 1984 en dicha población (operación alfa carbón). 
Su mujer, Inés embarazada de 7 meses, 
estaba con él en el momento del allanamiento de su casa y ejecución de parte de alrededor de 15 funcionarios de la CNI.
<br><br>
El memorial “La Mano”, emplazado en la Población Rubén Darío de la ciudad
de Valdivia, recuerda a los ejecutados del Movimiento de Izquierda Revolucionaria
(MIR) en el marco de la operación Alfa Carbón, que desarrolló la CNI durante el mes
de agosto de 1984, donde se llevaron a cabo los asesinatos de 9 personas en las
ciudades de Concepción, Temuco, Los Ángeles y Valdivia.<br><br>
En Valdivia, el 23 de agosto de 1984, <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-t/tapia-de-la-fuente-rogelio-humberto/" target="_blank">Rogelio Tapia de la Puente</a>
 y <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/barrientos-matamala-raul-jaime/" target="_blank">Raúl Jaime  Barrientos Matamala</a>, fueron ejecutados en el sector del puente Estancilla, camino a Niebla.
<br> <br>
Al día siguiente, el 24 de agosto, <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-b/boncompte-andreu-juan-jose/" target="_blank">Juan José Boncompte Andreu</a> es asesinado en su domicilio,
en el sector de Rubén Darío, lugar donde fue levantado el memorial gestionado por
la Agrupación de Detenidos Desaparecidos y Ejecutados Políticos de Valdivia, en
conjunto con la Corporación de Promoción y Defensa de los Derechos del Pueblo
(CODEPU) y la Municipalidad de Valdivia. Hasta hoy, cada 24 de agosto, se realiza
una velatón en memoria de los miristas asesinados. 
<p style="font-style: italic; text-align: right;"> Ruta de la memoria Hito N°4 tramo Valdivia </p>


`)
});



   var marker = L.marker([-39.461455, -73.232988],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de Maiquillahue</h3>
<h4>

 <div style="display: flex; justify-content: space-around; gap: 20px; margin-top: 20px;">
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openLibroPDF(121)">
                <img src="./portada.jpg" 
                     alt="Portada Libro"
                     style="width: 100%; max-width: 250px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 15px; margin-left: 5px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(56)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p 396 </p>
`)
});

 var marker = L.marker([-39.830120, -73.209806],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Plazuela Carlos Lorca</h3>
<h4>
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(56)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<a href="https://memoriaviva.com/detenidos-desaparecidos/lorca-tobar-carlos-enrique" target="_blank">Carlos Lorca Tobar</a>, 
fue un Diputado de la República de Chile, entre mayo de
1973 hasta la disolución del congreso en septiembre del mismo año. Estudiante
de medicina de la Universidad de Chile, fue Secretario General de la Federación
de Estudiantes de dicha casa de estudios. En 1971 se convirtió en el Secretario
General de las Juventudes Socialistas de Chile, siendo, posteriormente,
designado (a solicitud de la Juventudes Socialistas de Valdivia) como candidato
a Diputado por el distrito de Valdivia.<br><br>En 1975, Carlos Lorca se refugia en la
clandestinidad y es tomado prisionero en Santiago donde es derivado a Villa
Grimaldi, siendo éste su último paradero conocido, ya que aún permanece en
calidad de detenido desaparecido. 
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Hito N°4 tramo Valdivia </p>
`)
});

 var marker = L.marker([-39.806129, -73.248338],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial UACH</h3>
    
            <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(20)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4>
La Piedra Recordatoria a Estudiantes Víctimas de Violación a los Derechos
Humanos, recuerda a los jóvenes alumnos de la Universidad Austral de Chile que
en diferentes circunstancias fueron asesinados por agentes del Estado.<br><br>
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
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Hito N°11 tramo Valdivia </p>

El 10 de enero de 1977, <br><a href="https://www.memoriaviva.com/detenidos-desaparecidos/appel-de-la-cruz-jose-luis/" target="_blank">José Luis Appel</a>, 20 años fue secuestrado por un grupo de
civiles armados, en plena vía pública de la ciudad de Cipolletti, provincia de Neuquén,
Argentina, ante los ojos de su cónyuge Carmen Angélica DELARD CABEZAS y de su
hija.  Carmen Delard desapareció en la Comisaría de esa ciudad al hacer la denuncia de la
desaparición de su cónyuge.
<p style="font-style: italic; text-align: right;"> Informe Rettig p 872 </p>

`)
});


 var marker = L.marker([-39.849068592154566, -71.94588809927382],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Museo de la memoria Neltume</h3>


    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(30)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4>
Neltume fue escenario de graves actos de represión durante distintos períodos
de la dictadura. En un primer momento, durante los días 3 y 4 de octubre de 1973,
son ejecutados 12 hombres acusados de asaltar el 12 de de 1973, el Retén de
Carabineros de Neltume. Luego, en el mes de julio de 1981, es descubierto un
campamento del MIR, cuyos militantes ingresaron en forma clandestina a la zona
del Complejo Maderero Panguipulli en el contexto de la llamada Operación Retorno,
son ejecutados 9 en la montaña, 2 son detenidos desaparecidos y el sobreviviente
Mario Lagos es ejecutado por la CNI en 1984 durante la operación Alfa Carbón.
<br><br>
El Centro Cultural Museo y Memoria de Neltume, nace el 24 de noviembre de
2004, mediante una asamblea compuesta por diversos socios y socias (vecinos
y vecinas históricos de la zona, familias, amigos y amigas de expresos políticos,
ejecutados y sobrevivientes de la dictadura cívico-militar). Su intención fue crear
este espacio en base a trabajo comunitario y poner en valor la historia del territorio.
Este museo funciona actualmente en una de las 3 casas de la administración de
COFOMAP y, en su interior, comprende distintas salas entre las que están: Sala
Primeros Habitantes; Sala Vida y Trabajo en la Montaña; Sala del Aserradero; Sala
de la Memoria, Violencia Política y DD.HH y Sala de Archivo.
<br><br>
El Centro Cultural Museo y Memoria de Neltume presenta un recorrido histórico
sobre el territorio forestal y la comunidad cordillerana, de cómo el pueblo y otros 
ectores adyacentes se formaron en torno a diversas faenas de explotación
industrial del bosque nativo. Luego, se hace un recorrido por el siglo XX y los
procesos sociales y políticos en que se vio envuelta la localidad de Neltume, como
la reforma agraria, la represión militar, graves violaciones a los derechos humanos,
la lucha guerrillera contra el régimen y la devastación de los recursos naturales.
<br><br>El relato del museo se lee a través de testimonios de trabajadores, herramientas
y utensilios forestales y domésticos; fotografías y diversas piezas que han sido
aportadas por la comunidad y recopilados a través de un trabajo de más de 12 años.
El museo es una casona que ha sido testigo de las distintas etapas de historia
forestal a lo largo de casi un siglo. Entregada por el Ministerio de Bienes Nacionales
en concesión de uso gratuito por 30 años, pone en valor y transmite la historia y la
memoria loca.<br><br>
La declaratoria, publicada el 06 de julio de 2019, contempla 14 sitios y bienes
patrimoniales, el Centro Cultural Museo y Memoria de Neltume y todos los sitios
que se presentaron en la declaratoria de Monumento Histórico y Sitios de Memoria
de la localidad de Neltume, fueron declarados Monumento Nacional, en la categoría
de Monumento Histórico.<br><br>
Luego de estar en el Museo, te recomendamos seguir caminando por la
misma calle hacia el sur donde puedes observar con más detención el Memorial
de Neltume (hito 2), que es una monumental escultura ubicada en la mitad de la
avenida y que fue un trabajo realizado por Alejandro Verdi, reconocido escultor
chileno que ha realizado otra serie de memoriales a lo largo de Chile.
<p style="font-style: italic; text-align: right;"">Ruta de la Memoria hito N°1 tramo Cordillerano </p><br>

`)
});

 var marker = L.marker([-39.836791, -72.0838169],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Memorial de Miguel Cabrera “Paine”</h3>

    
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(35)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>Memorial levantado en recuerdo del militante del MIR Miguel Cabrera
Fernández, “Paine”, Jefe del Destacamento Guerrillero Toqui Lautaro, muerto
en combate el 15 de octubre de 1981 en el contexto de la “Operación Retorno”,
realizada por militantes del MIR que ingresaron clandestinamente al país con el
objetivo de establecer una base cordillerana en el sur del país, levantando un
campamento de guerrilleros, específicamente en la zona de Neltume.<br><br>
Los movimientos de los jóvenes milicianos son denunciados por dos campesinos
al Retén de Carabineros de Neltume, quienes a su vez informan a la IV División del
Ejército en Valdivia, desde donde en el mes de junio de 1981 sale un contingente
de militares y efectivos de la CNI fuertemente armados en busca de los insurgentes.<br><br>

De acuerdo al informe Rettig, “se desplegaron 2.500 soldados en la zona,
desembarcaron un gran material bélico en Liquiñe y Neltume, gran cantidad de
helicópteros y fuerzas especiales. Las fuerzas antiguerrilleras organizaron un cerco
que iba desde Liquiñe por el Alto hasta Neltume, Remeco y Carririñe, por el Lago
Neltume a Remeco y Pelotones. Desde el lago Pirehueico al Panguipulli y el camino
que une Choshuenco con Neltume”.
<br><br>
El 15 de octubre de 1981, al cruzar el puente Choshuenco, Miguel Cabrera
Fernández “Paine” y 2 insurgentes son emboscados por una patrulla Militar.
Cabrera ordena a sus compañeros escabullirse y escapar entre el follaje, mientras
él los cubriría, para finalmente caer abatido en el lugar donde se ha levantado este
memorial. Jaime Castillo Petruz, sobrevivientes de la Operación Retorno del MIR,
declaró frente al memorial:
<br><br>
“nuestros compañeros caídos son nuestras grandes fortalezas, pues ellos son los
que han nutrido nuestra resistencia y en eso el compañero Paine nos dejó un legado
fundamental, pues era un jefe de una humanidad y convicciones admirables(…) Por
eso el homenaje a los compañeros y las compañeras caídas no puede ser una cosa
abstracta, gaseosa, sino que tiene que ser un compromiso, un llamado a la lucha,
un llamado a la organización, un llamado a avanzar, a dar ese pasito adelante,
honrándolos con nuestra práctica. … ese es el mejor homenaje”.
<br><br>
De acuerdo con los antecedentes recopilados en el informe Valech sobre
Prisión Política y Tortura, el retén de Carabineros de Choshuenco se utilizó en un
primer momento en los días posteriores al Golpe de Estado de 1973 y al igual que
en el caso del Retén Neltume, la mayoría de los detenidos provenían del Complejo
Forestal y Maderero Panguipulli y fueron apresados durante la ocupación militar
de la zona en operativos donde participaban militares, civiles y carabineros de
los retenes del sector precordillerano de la provincia de Valdivia. Los testigos
denunciaron que los interrogatorios y torturas les fueron ejecutadas en el recinto
de Choshuenco participando personal del Ejército. Después de permanecer
un tiempo en este lugar, los detenidos eran conducidos a otros recintos en las
ciudades de Panguipulli y Valdivia."</p>
<p style="font-style: italic; text-align: right;""> Ruta de la Memoria Hito N°8 tramo Cordillerano </p><br>

 `)
});

 var marker = L.marker([-40.026590, -71.724451],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Ex-Hotel Pirihueico</h3>

        
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(33)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>De acuerdo al testimonio entregado por don José Israel Valenzuela, el Hotel
Pirehueico fue un lugar donde en los días posteriores al Golpe de Estado los
militares llevaban a obreros y trabajadores del Complejo Forestal y Maderero
Panguipulli, los que eran torturados en los subterráneos del inmueble:
<br><br>
<p style="font-style: italic;">“Cuando fue el Golpe Militar mucha gente se fue para Argentina, no había nada
de trabajo…Acá el Complejo paró todo, se acabó el trabajo… Acá se torturó mucha
gente, allá abajo en el Hotel, a toda a gente obrera nos venían a buscar en camión en la
noche, a las 3 de la mañana, nos llevaban al Hotel y allá nos torturaban. Los militares
se tomaron el Hotel.
Yo no era militante ni dirigente ni nada, y toda la gente igual eran puros
trabajadores. Llegaban los milicos y nos preguntaban dónde estaban los campos
militares de entrenamiento, y ¿de adonde poh?, no había nada acá.
En el subterráneo nos metían, nos tuvieron ahí incomunicados, golpeaban la puerta
‘ya te vamos a venir a matar, te falta poquito’, nos metían a un congelador grande que
había, antes de 5 minutos ya corrían lágrimas de dolor, nos ponían corriente en los
testículos, en los riñones, en el cerebro, era muy duro… eso no se olvida, nunca”.</p><br>
<br><br>
El Ex Hotel Pirehueico, se ubica en la localidad de Pirehueico, para acceder a
ella, hay que cruzar en la barcaza del lago del mismo nombre, trayecto que tiene
una duración aproximada de una hora y media. Luego de visitar Puerto Fuy te
recomendamos regresar por la misma ruta T-203 hacia Panguipulli, para luego
detenerse en Punahue, sector caracterizado por la presencia y ocupación resistente
de comunidades mapuche. 
<p style="font-style: italic; text-align: right;""> Ruta de la Memoria hito N°5 tramo Cordillerano</p><br>
 <h4>


 `)
});



 var marker = L.marker([-40.285166, -72.171522],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Puente Nilahue</h3><br>


<h4> <p/ style="font-style: italic;">"El 20 de septiembre de 1973, fue muerto <a href="https://memoriaviva.com/detenidos-desaparecidos/huaiqui-barria-roberto" target="_blank">Roberto Huaiqui Barria</a> 17
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

<p style="font-style: italic; text-align: right;"> Informe rettig p 998 </p><br>
 <h4>
 `)
});


 var marker = L.marker([-39.817188171939335, -71.94666915089196],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Remeco Alto</h3>

            
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(34)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4>Este fue el camino elegido por los integrantes del “Destacamento Guerrillero
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
<p style="font-style: italic; text-align: right;""> Ruta de la Memoria hito N°6 tramo Cordillerano</p><br>
 <h4> `)
});



 var marker = L.marker([-39.837134, -73.239760],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Calle Inglaterra 471</h3>
<br>
                
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(24)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> El día 28 de septiembre el Diario El Mercurio informa: “caen detenidos el ex
diputado del Partido Socialista 
<a href="https://interactivos.museodelamemoria.cl/victimas/?p=490" target="_blank">Luis Espinoza Villalobos</a> de 33 años
y el Médico mirista Bruno García Morales, en un allanamiento practicado en el domicilio del médico. El
radiograma llegado a la policía civil dice que ambos estaban escondidos en laPoblación ‘Huachocopihue’, calle Inglaterra 471 hasta el dia de hoy.
<br<br>
Posteriormente <a href="https://interactivos.museodelamemoria.cl/victimas/?p=490" target="_blank">Luis Espinoza Villalobos</a> 
fue asesinado ”
  fue asesinado en el regimiento de Puerto Montt
<p style="font-style: italic; text-align: right;">Ruta de la Memoria hito Sitio de interés N°1</p><br>
 <h4>
  
 `)
});


 var marker = L.marker([-39.813565, -73.241661],{icon: CCDD}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Ex Cuartel de Investigacion</h3>

                
                
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(25)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> Según consta en los antecedentes recabados por la Comisión Valech, el mayor
número de detenidos en este recinto se registró entre los años 1973 y 1975. Sin
embargo, esta casona de dos pisos fue demolida y actualmente se encuentra una
feria artesanal llamada Mi Pueblito.<br><br>
De acuerdo a los testimonios recabados, se señala que los detenidos, hombres
y mujeres, eran mantenidos en calabozos en el subterráneo del edificio y en una
pequeña sala de aislamiento, vendados e incomunicados. En los testimonios se
consignó que sufrieron golpizas, aplicación de electricidad, vejaciones y amenazas.
<p style="font-style: italic; text-align: right;"> Triptico </p><br>
 <h4>
 `)
});

 var marker = L.marker([-39.82048071854145, -73.22936427083401],{icon: CCDD}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Ex Cuartel General de la IV División del Ejército</h3>

                
                
    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(17)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

 `)
});


 var marker = L.marker([-39.837502, -73.222107],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Campamento Chorrillos</h3>

    <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(24)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> El Campamento Chorrillos constituye uno de los sectores emblemáticos en
cuanto a la pobreza, marginación, estigmatización, represión, resistencia anti
dictatorial y auto-organización popular para satisfacer necesidades comunitarias
durante la década de los ’80 en la ciudad de Valdivia y nace durante el movimiento
de los sin casa de la década de 1960.<br><br>
Las primeras ‘tomas urbanas’ de terreno en Valdivia fueron impulsadas por
el MIR. Si bien muchas poblaciones existentes en la ciudad de Valdivia fueron
consecuencia a las necesidades de los damnificados del terremoto de mayo de
1960, se sumó a ello la ausencia de soluciones habitacionales, dando origen a las
‘tomas’ de terrenos, siendo la primera de ellas, aquella emplazada en las cercanías
del cruce de las avenidas Picarte con Simpson, donde 10 jóvenes familias se
instalaron con sus “rucos”, dando origen al campamento Vietnam Heroico. Con los
días se les unieron más familias, alcanzando a cerca de 1.000 en total, las que, a lo
largo de los años, fueron desplazándose hacia el sector de la Pampa Krahmer
<br><br>
De acuerdo a testimonios rescatados por el trabajo de la antropóloga Bernarda Aucapan:<br>
<br><p style="font-style: italic; text-align: right;">“Se empieza a buscar gente capacitada dentro de la toma, con los dirigentes que
había del MIR y se hace como una asamblea con la gente y pasan a ser dirigentes
las personas que empiezan a no aceptar tragos dentro del campamento, una hora
de llegada, no peleas dentro de los matrimonios…porque la cosa tenía que ser bien
ordenada, de cocinarse a hacerse una olla común, donde todos podían participar y se
empiezan a entablar con las autoridades de turno en ese momento”.</p>

El Golpe de Estado de 1973 significó una fuerte intervención política, social y
de represión a los pobladores, que incluyó la designación de un miembro de las
Fuerzas Armadas como encargado del campamento y se reemplazó el nombre
de Vietnam Heroico por el del Campamento Batalla de Chorrillos, en alusión a la
batalla que enfrentó a chilenos y peruanos en la Guerra del Pacífico.<br><br>
Así como alguna vez en el “Campamento Chorrillos” se organizó la subsistencia,
en los años de la dictadura cívico-militar se organizó la resistencia, constituyéndose
en uno de los lugares emblemáticos en la provincia de Valdivia. Bernarda Cárdenas,
actual presidenta del Club Deportivo Chorrillos, relata que en 1989 fueron citadas
la totalidad de familias que habitaban el campamento al Gimnasio de la Escuela
N°6, actual Liceo Industrial, hasta el cual llegaron aproximadamente 600 personas.
<br><br>
Con la presencia del ministro de Vivienda y Urbanismo de la dictadura, Miguel
Ángel Poduje, se informó del modelo de las viviendas, la disposición de las calles
y la forma en que se entregarían. Dicha reunión tenía una finalidad informativa: la
nueva población se ubicaría detrás de la actual población Eduardo Yáñez Zabala
y llevaría el nombre de “Eduardo Yáñez Zabala 2”, dado que era la segunda etapa
de construcción de viviendas sociales para erradicar los campamentos. Pero este
nombre asignado no era del total agrado de los pobladores.
En plena asamblea, “surgió el nombre de Pablo Neruda, propuesta que después
de ser analizada no sin cierto rechazo y resquemor por las autoridades presentes y tras
ser avalada por la mayoría de los pobladores después de votación a mano alzada, se
transformó en realidad”, según Bernarda Cárdenas, “ese fue el primer acto democrático
en dictadura”.
<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Sitio de interés 2</p><br>
 <h4>
 `)
});

 var marker = L.marker([-40.383681, -73.002411],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Puente Pilmaiquén</h3>

        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(44)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4> El puente Pilmaiquén fue un espacio en el que decenas de campesinos, dirigentes y
pobladores de Osorno, San Pablo, La Unión y Río Bueno fueron torturados, estacados,
degollados, amarrados con alambres de púa y fusilados por personal militar.
<br><br>
En la ribera sur poniente del río Pilmaiquén, el 11 de septiembre de 2017, se
dieron cita familiares de ejecutados, detenidos desaparecidos, ex presos políticos
y personas vinculadas a la promoción y defensa de los derechos humanos para
inaugurar oficialmente un Mural denominado “En memoria a los caídos en 1973”.
La organización de esta actividad estuvo a cargo de la “Agrupación de Familiares de
Detenidos Desaparecidos y Ejecutados Políticos de Osorno” con la colaboración de la
Corporación de DD. HH Pilmaiquén y ex presos políticos de la zona (principalmente
de las comunas de Río Bueno, La Unión, Osorno, Entre Lagos y Valdivia).
<br><br>
De acuerdo al Informe Rettig, entre los casos de ejecutados en el puente
Pilmaiquén se señala el del 7 de septiembre de 1973, donde fue detenido por
Carabineros de la Comisaría de Rahue, previo al Golpe de Estado y a la salida de la
Penitenciaría de Osorno, César Osvaldo del Carmen Ávila Lara de 36 años, Director
Provincial de Educación y militante del Partido Socialista. Tras su arresto fue subido
a un furgón institucional y trasladado a la comisaría. Hubo varios testigos de su
detención. Desde esa fecha no se ha sabido de su paradero. Mientras en el cuartel
policial se negó siempre a su arresto, un testimonio recibido por la comisión permite
presumir que su cuerpo habría sido arrojado al río Pilmaiquén.
<br><br>
El 19 de septiembre de 1973 se ejecuta en el puente sobre el río
Pilmaiquén a Raúl Santana Alarcón de 29 años, auxiliar de la Universidad de
Chile, sede Osorno; Dirigente vecinal, Presidente del Comité de pobladores sin
casa y militante del Partido Socialista y de José Mateo Vidal Panguilef de 26 años,
obrero y militante socialista. 
<br><br>
El 29 de septiembre de ese mismo año, también fue detenido junto a su hermano
y en su domicilio de Osorno, Gustavo Bernardo Igor Sporman de 22 años, estudiante
y militante comunista. Sus aprehensores fueron carabineros de la 3º Comisaría de
Rahue, quienes le golpearon duramente al momento de su detención, llevándolo
inconsciente al cuartel policial. Meses después, el 14 de enero de 1974, el cuerpo sin
vida de la víctima apareció en la morgue, pudiendo ser reconocido por la familia, la
que se enteró por el parte policial que había sido hallado en el río Pilmaiquén.
<br><br>
En este lugar inauguraron un Memorial la Agrupación de Familiares de Detenidos
Desaparecidos de Osorno. Está en el límite regional y evidencia una estrategia usada
para desaparecer cuerpos de personas en la dictadura.
El puente Pilmaiquén, cruza el río del mismo nombre, siendo este río donde
drena el lago Puyehue. Lo encontrarás por la Ruta T-5 camino a Osorno, seguido
del río Bueno.
El memorial lo encontramos al lado sur de la ribera del río. Te sugerimos que
lo visites antes de entrar a la ciudad de Río Bueno para continuar con el viaje
hacia Lago Ranco.
Si bien administrativamente este hito se encuentra en la provincia de Osorno,
nos pareció pertinente mencionarlo, puesto que la forma de tortura que se realiza en
este sector es similar en la cuenca del Lago Ranco.
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Sitio de interés N°3 tramo del Ranco</p><br>
 <h4>
 `)
});

 var marker = L.marker([-40.329849, -72.225219],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Puente Riñinahue</h3>

        <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(48)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>
<h4> Desde la Tenencia de Carabineros de San Pablo, en La Unión se da la orden del
Teniente Nelson Rodríguez de detener a todos los partidarios de la Unidad Popular.
Las personas eran interrogadas y trasladadas a la Fiscalía Militar y no a la 3º Comisaría
y ese terror recorrió todas las comunas que son parte de esta provincia, llegando
hasta los lugares más apartados, como es el caso de Riñinahue.<br><br>
<br><a href="https://interactivos.museodelamemoria.cl/victimas/?p=1163" target="_blank">Cardenio Ancacura Manquian</a>  de 20 años
fue detenido por Carabineros de Lago Ranco
y trasladado a la tenencia del lugar. Desde allí fue sacado el 16 de octubre, por
efectivos de la Gobernación Marítima de Valdivia, dependiente de la Armada de
Chile; lo subieron a bordo del vapor “Laja” y lo ejecutaron, lanzando su cuerpo al
lago. Él era agricultor, casado y con cuatro hijos. Actualmente sigue desaparecido.

<p style="font-style: italic; text-align: right;"> Ruta de la Memoria Hito N°6 tramo del Ranco</p><br>
 <h4>
 `)
});


 var marker = L.marker([-40.195466, -72.043643],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Fundo Arquilhue</h3>

      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(50)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4> Ubicado en la precordillera, a casi 300 km. de Valdivia, el fundo “Chihuío”
sirvió como centro de detención y tortura para las fuerzas represivas de la región.
Campesinos de Futrono, Llifén, Curriñe, Arquilhue y Chabranco fueron llevados desde
sus hogares o lugares de trabajo hasta esta localidad, después de ser detenidos por
soldados pertenecientes a la IV División del Ejército, al mando del General Héctor
Bravo Muñoz y apoyados por civiles de la localidad, incluyendo a Américo González.
Los soldados habían llegado hasta las diferentes localidades con lista en mano.<br><br>
Según testigos, los detenidos fueron duramente golpeados durante su
detención y trasladados en camiones del ejército hasta el fundo “Chihuío”, donde
fueron salvajemente torturados y luego asesinados. Se cree que todos murieron
lentamente, a causa de las torturas.

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°8 tramo del Ranco</p><br>
 <h4>
 `)
});

 var marker = L.marker([-40.2245019, -72.382421],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Isla Huapi</h3>

      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(53)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> Esta localidad se destaca por ser parte de una Comunidad Mapuche que ha
habitado la Isla de manera ancestral. Recuerdan que para el año 1973, varios de los
jóvenes fueron detenidos acusados de militar en un partido de izquierda y fueron
transportados al Retén de Carabineros de Llifén y posteriormente, algunos de ellos,
trasladados a otros sectores. Se cuenta que varios de estos fueron arrojados al lago
desde un helicóptero.
 

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°11 tramo del Ranco</p><br>
 <h4>
 `)
});

 var marker = L.marker([-40.323342, -72.210104],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Retén de Riñinahue</h3>

    
      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(49)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> Este retén se encuentra localizado en la localidad de Riñinahue en la comuna
de Lago Ranco, y sirvió como centro de detención y tortura para las comunidades
mapuches que están en el sector.
<br><br>
El espacio del Retén Riñinahue era muy reducido, ya que abarcaba las instalaciones
de la empresa hidroeléctrica de Pilmaiquén y la población Endesa, que es donde
vivía la gente que trabaja en la empresa, que eran más o menos 30 casas.
La dotación estaba compuesta de 4 o 5 funcionarios, pero antes de 1973 llegaron
Carabineros de Río Bueno y La Unión a reforzar la custodia por temor a atentados. Una
noche posterior al 11 de septiembre de 1973, 2 meses después aproximadamente,
se le ordenó al contingente concurrir a una casa ubicada en el fundo. La casa estaba
sin luces y al parecer sus moradores estaban durmiendo, los carabineros Zapata y
Obando tocaron, alguien abrió la puerta y ellos se metieron a la casa y sacaron a una
persona. El detenido se quejaba y se lamentaba, no se defendió. 

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°7</p><br>
 <h4>
 `)
});

 var marker = L.marker([-39.800118, -73.244429],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Aerodromo las Marías</h3><br>

<h4> <p/ style="font-style: italic;">"El 5 de octubre de 1973 fue muerto en Valdivia, por personal del Ejército, 
  
  <a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/carreno-zuniga-victor-hugo/" target="_blank">Victor Hugo Carreño Zuñiga</a>, 
, 21 años, estudiante, Presidente Regional de la
Juventud Socialista.
La prensa informó que fue muerto, en horas de toque de queda, cuando se arrancó
de la patrulla militar que lo llevaba detenido. ©
Se ha acreditado ante esta Comisión que esta persona fue detenida en su
domicilio, ante testigos, el día 4 de octubre de 1973 por funcionarios del Ejército."</p>

<p style="font-style: italic; text-align: right;"> Informe Rettig p390 </p><br>

<br>
<p style="font-style: italic;">
En el fallo de primera instancia, el ministro en visita Álvaro Mesa Latorre dio por establecido los siguientes hechos:<br>
“El día 5 de octubre de 1973, una patrulla integrada por dos oficiales, Marco Augusto Aguirre Mendiboure y Alejandro Héctor Kraemer Pinochet
 y alrededor de 5 conscriptos, concurren al domicilio de Víctor Carreño Zúñiga, a quien subieron en la parte posterior de una camioneta 
 Pick Up en la que iban los soldados aludidos y, luego de realizar otros patrullajes, 
 Carreño Zúñiga, fue llevado hasta el aeropuerto Las Marías  de la ciudad de Valdivia, 
 lugar donde lo hicieron bajar y el oficial militar Marco Augusto Aguirre Mendiboure le efectuó diversos disparos
   que causaron la muerte, específicamente como consecuencia heridas a bala corporales múltiples, 
   transfixiantes complicadas con rotura de órganos, vísceras y esqueleto,
 disparos que fueron efectuados por terceros con arma de grueso calibre y a corta distancia, siendo posteriormente llevado a la morgue local”.
 </p>
<p style="font-style: italic; text-align: right;"> memoria viva </p><br>
 <h4>
 `)
});

 var marker = L.marker([-40.205396, -72.103042],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Siscahue </h3><br>

<h4> <p/ style="font-style: italic;">"El día 7 de octubre de 1973 fue ejecutado por personal del Ejército, 
  
<a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-s/silva-silva-andres/" target="_blank">Andres Silva Silva</a>
 33 años, obrero maderero en el Complejo Maderero y Forestal
Panguipulli.
El afectado fue detenido en el hogar de sus padres, el día 6 de octubre de 1973,
por un contingente militar que se lo llevaron a un Fundo del Sector de Nilahue.
Al día siguiente, los mismos militares lo condujeron a su domicilio y allanaron el
lugar.  Posteriormente fue ejecutado en el sector denominado Sichahue, y su
cuerpo sin vida abandonado en un pequeño bosque de ese lugar.  Carabineros de
Llifén prohibió darle sepultura y los familiares, después de dos meses, decidieron
inhumarlo, contra las órdenes, en razón de que los perros ya habían destrozado
completamente el cuerpo.  En la causa tramitada por el Ministro en Visita sobre
los hechos de Chihuío se exhumaron sus restos.
"</p>

<p style="font-style: italic; text-align: right;"> Informe Rettig p390 </p><br>
 <h4>
 `)
});



 var marker = L.marker([-39.823737, -72.082169],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Caso Molco</h3><br>

<h4> <p/ style="font-style: italic;">"El 23 de diciembre de 1973 fueron ejecutados por carabineros en el sector de
Molco, Choshuenco, en el Complejo Panguipulli, dos personas:<br>


<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/
ejecutados-politicos-v/vasquez-martinez-hugo-rivol/" target="_blank">Hugo Rivol Vasquez Martinez</a>
<br><a href="https://memoriaviva.com/ejecutados-politicos/superby-jeldres-mario-edmundoejecutados-politicos-v/vasquez-martinez-hugo-rivol/" target="_blank">Mario Edmundo Superby Jeldres</a>
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/romero-corrales-victor-enrique/" target="_blank">Victor Enrique Romero Coralles</a><br>


<br>s se encontraban internados en la montaña, en el sector de Choshuenco,
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
<p style="font-style: italic; text-align: right;"> Informe Rettig p398</p><br>
 <h4>
 `)
});

var marker = L.marker([-39.817788, -73.232166],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Escuela Mexico</h3><br>

<h4> <p/ style="font-style: italic;">"El 15 de diciembre de l989 en una manifestación de celebración del triunfo de don Patricio Aylwin en
las elecciones presidenciales, murió 
<br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-r/rivas-ovalle-sebastian/" target="_blank">Rivas Ovalle Sebastián Rodrigo</a>

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
<p style="font-style: italic; text-align: right;"> Informe Rettig p398</p><br>
 <h4>
 `)
});
-39.749328, -72.431395

var marker = L.marker([-39.749328, -72.431395],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Ñancul Alto</h3><br>

<h4> <p/ style="font-style: italic;"> <br><a href="https://memoriaviva.com/nuevaweb/ejecutados-politicos/ejecutados-politicos-c/cofre-catril-juana-del-carmen/" target="_blank"> Juana del Carmen Cofre Catril</a> de 22 años, era empleada administrativa en el Complejo Maderero y
Forestal Panguipulli y militante del Partido Socialista.
Se encontraba oculta en la localidad de Huellelhe, dentro del Complejo, pues estaba siendo intensamente
buscada por las autoridades militares de Valdivia, acusada de realizar actos subversivos.  De acuerdo a los
antecedentes recabados, se habría suicidado en Huellelhue, presionada por la situación en que se encontraba, y
habría sido enterrada por terceras personas en un lugar cercano.
La Comisión no pudo formarse convicción sobre su calidad de víctima por no haber podido confirmar este
hecho.
</a>
</p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p1165</p><br>
 <h4>
 `)
});

var marker = L.marker([-40.284640, -73.076326],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Hospital de La Unión</h3><br>

<h4> <p/ style="font-style: italic;">"El 18 de agosto de 1977, fue detenido <a href="https://memoriaviva.com/nuevaweb/detenidos-desaparecidos/desaparecidos-l/leal-diaz-sergio-hernan/" target="_blank">Sergio Hernán Leal Diaz</a> 
, pequeño industrial de Río Bueno, militante del Partido Socialista. Su aprehensión se produjo al momento de llegar
al Hospital de la Unión, donde se encontraban las dependencias del Servicio de Sanidad, ante
testigos, por parte de agentes de civil.</a></p>
<p style="font-style: italic; text-align: right;"> Informe Rettig p 1014</p><br>
 <h4>
 `)
});

var marker = L.marker([-39.776294604, -71.8093068],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Fundo Carranco</h3><br>

    
      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(36)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>


<h4> <p/ style="font-style: italic;">"
  La primera toma que se realiza el 26 de noviembre de 1970, fue la del fundo
de Carranco, uno de los fundos que visitó el Ministro Tohá buscando investigar
las denuncias de la Democracia Cristiana sobre la posible existencia de focos
guerrilleros en esa región. En el fundo Carranco trabajaban alrededor de 70 obreros.
Era la cuarta vez que había sido tomado. En 1944 y en 1953 los campesinos habían
sido desalojados con una violenta represión policial. La toma del fundo Carranco,
ocurrida el 26 de noviembre de 1970, a pocos días de asumir el poder Salvador
Allende, fue llamada «el grito de Carranco» que constituye uno de los primeros
hitos en la toma de los 24 fundos que componen lo que será el Complejo Forestal y
Maderero Panguipulli. Hoy en día son propiedad de la Forestal Neltume- Carranco,
que tiene su sede en Panguipulli. Pero no son lugares de libre acceso. Sin embargo,
para el Comité Memoria Neltume es importante tenerlo en cuenta, ya que forma
parte del origen del movimiento obrero forestal en el territorio. </a></p>

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°8 tramo Cordillerano/p><br>
 <h4>
 `)
});
 
var marker = L.marker([-39.64158180366318, -72.33180351941546],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Gimnasio municipal Edgardo Brevis de Panguipulli</h3><br>

    
      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(38)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> <p/ style="font-style: italic;">"
El 1 de diciembre de 2017, con la presencia de miembros de la Agrupación de
Ex Presos Políticos de la comuna de Panguipulli, autoridades regionales, comunales
y público en general, se realizó el acto de instalación de una placa recordatoria en
el Gimnasio Municipal Eduardo Brevis Aravena, recinto deportivo utilizado como
centro de detención y tortura tras el golpe de Estado de 1973.<br><br>
Roberto Alarcón, presidente de la Agrupación de Ex Presos Políticos, habló en
nombre de sus compañeros: “es una pequeña, pero no menos significativa ceremonia
de instalación de la placa en conmemoración de los ex presos políticos que fueron
torturados en este gimnasio y el sentimiento que me embarga es de reconciliación con
el pasado, con la mirada en el futuro para que nunca más vuelva a ocurrir algo similar.”
<br><br>
La placa, colocada en el ingreso al recinto deportivo, reza: “Este inmueble fue
un centro de detención en dictadura cívico-militar y es sitio de interés en la Ruta 
<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°10 tramo Cordillerano/p><br>
 <h4>
 `)
});

var marker = L.marker([-39.642274570, -72.3419559],{icon: memorial}).addTo(mapa) ;marker.on('click', function() 
  {openPanel(`<h3>Población Llonquellén</h3><br>

    
      <div style="text-align: center; cursor: pointer; flex: 1;" onclick="openRutaPDF(40)">
                <img src="./portada_ruta.jpg" 
                     alt="Portada Ruta de la Memoria"
                     style="width: 100%; max-width: 160px; border: 2px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s;"
                     onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'"
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                <p style="margin-top: 10px; font-size: 14px; color: #1b2734; font-weight: bold;">
            </div>
        </div>

<h4> <p/ style="font-style: italic;">"
Una vez que los vecinos del Complejo Forestal Maderero Panguipulli fueron
desplazados desde los distintos fundos, fueron construyendo viviendas en las
afueras de la comuna, lo que paulatinamente fue creciendo, conformándose hoy
como uno de los sectores más poblados de Panguipulli. Su calle principal conserva
el nombre del entonces presidente Salvador Allende.
<br><br>
En este aspecto es pertinente relevar el concepto de “desplazamientos forzados”,
en el contexto de la represión militar, se dan en todo el Complejo. Las familias
desplazadas, se movilizan hacia distintos puntos, tanto en la comuna, región y otras
regiones del país. Entre ellos, el sector donde se ubica la Población Lolquellén, es
uno de los más notables. Su instalación es un ejemplo de lucha y resistencia, pues
la propiedad de los terrenos era un tema controversial y el surgimiento de ésta
como una “toma”, despertó el repudio de la administración municipal designada
por la dictadura.
<br><br>
En cuanto a la propiedad de los terrenos, ésta era disputada por Felipe Barthou
(colono) y José Mercedes Vergara, viudo de una mujer mapuche que habría sido la
dueña. A raíz de esta disputa, Luis Emaldía, alcalde de Panguipulli inició un proceso
persecutorio contra Vergara, quien termina preso en la Cárcel de Valdivia, sufriendo
el deterioro de su salud.

<p style="font-style: italic; text-align: right;">Ruta de la Memoria Hito N°12 tramo Cordillerano/p><br>
 <h4>
 `)
});

