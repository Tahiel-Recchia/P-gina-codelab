const usuarios = document.getElementById("BDUsuarios");
const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
const estaLogueado = localStorage.getItem("estadoDeSesion");
const overlay = document.getElementById("JS-overlay");
const datosDeLosCursos = [
    {
        id: 1,
        nombre: "Iniciando en JavaScript",
        duracion: "60hs",
        precio: "1500",
        img: "../img/cardImages/JavaScript-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-programacion",
    },
    {
        id: 2,
        nombre: "Iniciando en C#",
        duracion: "120hs",
        precio: "3000",
        img: "../img/cardImages/cSharp-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-programacion",
    },
    {
        id: 3,
        nombre: "Iniciando en Illustrator",
        duracion: "40hs",
        precio: "1200",
        img: "../img/cardImages/illustrator-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-disenio",
    },
    {
        id: 4,
        nombre: "Iniciando en MySQL",
        duracion: "80hs",
        precio: "2300",
        img: "../img/cardImages/mysql-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-data",
    },
    {
        id: 5,
        nombre: "Iniciando en SQL",
        duracion: "80hs",
        precio: "2000",
        img: "../img/cardImages/sql-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-data",
    },
    {
        id: 6,
        nombre: "Iniciando en Photoshop",
        duracion: "50hs",
        precio: "1500",
        img: "../img/cardImages/photoshop-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-disenio",
    },
    {
        id: 7,
        nombre: "Iniciando en Python",
        duracion: "60hs",
        precio: "1800",
        img: "../img/cardImages/Python_logo_icon.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-programacion",
    },
    {
        id: 8,
        nombre: "Iniciando en VueJS",
        duracion: "70hs",
        precio: "1600",
        img: "../img/cardImages/vueJs-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-programacion",
    },
    {
        id: 9,
        nombre: "Iniciando en Scala",
        duracion: "60hs",
        precio: "1900",
        img: "../img/cardImages/Scala-logo.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-data",
    },
    {
        id: 10,
        nombre: "Iniciando en Express",
        duracion: "50hs",
        precio: "1300",
        img: "../img/cardImages/adobe-express.png",
        descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptate vitae, dolor provident minima consequuntur a inventore necessitatibus temporibus voluptatem",
        requisitos: "Ninguno",
        dataname: "item-disenio",
    },
];

localStorage.setItem("cursos", JSON.stringify(datosDeLosCursos));

function mostrarCursos() {
    const datosDeLosCursos = JSON.parse(localStorage.getItem("cursos"));
    const cursosContainer = document.getElementById("slider");
    cursosContainer.innerHTML = "";
    datosDeLosCursos.forEach((item) => {
        const ContenedorDeCurso = document.createElement("div");
        ContenedorDeCurso.classList.add("cursos-info-container");
        ContenedorDeCurso.dataset.name = item.dataname;
        ContenedorDeCurso.innerHTML = `<div class="contenedor-imagen__curso">
            <img src="${item.img}" alt="${item.nombre}" />
        </div>
        <div class="cursos-info__detalles">
            <p class="cursos-info__horas">${item.duracion}</p>
            <div class="cursos-info__contenedor__titulo-detalles">
                <p class="cursos-info__titulo">
                    ${item.nombre}
                </p>
                <a href="#js-descripcion__contenido" onclick="mostrarDetalles(${item.id})">Ver Detalles</a>
            </div>
        </div>
        <div class="precio-cursos">
        <button class="boton-inscripcion" id="JS-botonCompra" onclick="elegirCompra(${item.id})">Comprar</button>
        <p class="precio">$<span id="precioJavascript">${item.precio}</span></p>
        </div>
    </div>`;

        cursosContainer.appendChild(ContenedorDeCurso);
    });
}
mostrarCursos();

const botonesFiltro = document.querySelectorAll(".contenedor-filtros button");
const itemsFiltrables = document.querySelectorAll(".slider .cursos-info-container");
let carritoDeCompras;

if (estaLogueado) {
    carritoDeCompras = JSON.parse(localStorage.getItem(`carrito_${usuarioEnSesion.correo}`)) || [];
}

function agregarAlCarrito(id) {
    overlay.style.display = "none";
    const agregadoAlCarrito = document.getElementById("JS-agregadoAlCarrito");
    const curso = datosDeLosCursos.find((c) => c.id === id);
    if (curso) {
        const existe = carritoDeCompras.find((item) => item.id === curso.id);
        if (!existe) {
            carritoDeCompras.push(curso);
            actualizarContador();
            mostrarContadorDinamico();
            agregadoAlCarrito.classList.add("visible");
            setTimeout(() => {
                agregadoAlCarrito.classList.remove("visible");
            }, 2000);
            localStorage.setItem(
                `carrito_${usuarioEnSesion.correo}`,
                JSON.stringify(carritoDeCompras)
            );
        }
    }
}

function elegirCompra(id) {
    const eleccionCompraContenedor = document.createElement("div");
    overlay.style.display = "grid";
    let estadoDeSesion = localStorage.getItem("estadoDeSesion");

    if (estadoDeSesion) {
        eleccionCompraContenedor.classList.add("eleccion-compra-contenedor");
        eleccionCompraContenedor.innerHTML = `<h2 class="titulo-eleccion">Elige como comprar tu curso</h2>
                <div class="eleccion-compra">
                    <div class="particulares">
                        <h3>Particular</h3>
                        <img class="imagen-eleccion" src="img/particulares.png"/>
                        <button class="botones-eleccion" onclick="agregarAlCarrito(${id})">Comprar</button>
                    </div>
                    <div class="empresas">  
                        <h3>Para empresas</h3>
                        <img class="imagen-eleccion" src="img/empresa.png" />
                        <a class="boton-empresa" href="../pages/formulario_de_inscripcion.html"><button class="botones-eleccion" onclick="comprarParaEmpresas(${id})">Comprar</button></a>
                    </div>
                </div>
                <button class="botones-eleccion cerrar" onclick="cerrarOverlay()">Cerrar</button>
                </div>`;

        overlay.appendChild(eleccionCompraContenedor);
    } else {
        window.location.href = "../pages/login.html";
    }
}
const idDelCurso = JSON.parse(sessionStorage.getItem('cursoId'));
    console.log(idDelCurso);
function elegirCompraDetalles(){
    const idDelCurso = JSON.parse(sessionStorage.getItem('cursoId'));
    console.log(idDelCurso);
    const eleccionCompraContenedor = document.createElement("div");
    overlay.style.display = "grid";
    eleccionCompraContenedor.classList.add("eleccion-compra-contenedor");
    eleccionCompraContenedor.innerHTML = `<h2 class="titulo-eleccion">Elige como comprar tu curso</h2>
            <div class="eleccion-compra">
                <div class="particulares">
                    <h3>Particular</h3>
                    <img class="imagen-eleccion" src="../img/particulares.png"/>
                    <button class="botones-eleccion" onclick="agregarAlCarrito(${idDelCurso})">Comprar</button>
                </div>
                <div class="empresas">  
                    <h3>Para empresas</h3>
                    <img class="imagen-eleccion" src="../img/empresa.png" />
                    <a class="boton-empresa" href="../pages/formulario_de_inscripcion.html"><button class="botones-eleccion" onclick="comprarParaEmpresas(${idDelCurso})">Comprar</button></a>
                </div>
            </div>
            <button class="botones-eleccion cerrar" onclick="cerrarOverlay()">Cerrar</button>
            </div>`;
            overlay.appendChild(eleccionCompraContenedor);
}

function cerrarOverlay() {
    overlay.style.display = "none";
}

function comprarParaEmpresas(id) {
    const cursoParaComprar = datosDeLosCursos.find((c) => c.id === id);
    actualizarContadorEmpresa();
    localStorage.setItem(`CursosEmpresas_${usuarioEnSesion.correo}`, JSON.stringify(cursoParaComprar));
    console.log(JSON.parse(localStorage.getItem(`CursosEmpresas_${usuarioEnSesion.correo}`)));
}

const filtrarItems = (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    itemsFiltrables.forEach((item) => {
        item.classList.add("hide");
        if (
            item.dataset.name === e.target.dataset.name ||
            e.target.dataset.name === "all-courses"
        ) {
            item.classList.remove("hide");
        }
    });
};

botonesFiltro.forEach((button) => button.addEventListener("click", filtrarItems));

function mostrarDetalles(id) {
    const cursos = JSON.parse(localStorage.getItem("cursos"));
    const cursoSeleccionado = cursos.find((curso) => curso.id === id);
    cursoSeleccionado.innerHTML = "";

    if (cursoSeleccionado) {
        // Almacenar cada propiedad individual en sessionStorage
        sessionStorage.setItem("cursoId", cursoSeleccionado.id);
        sessionStorage.setItem("cursoNombre", cursoSeleccionado.nombre);
        sessionStorage.setItem("cursoImagen", cursoSeleccionado.img);
        sessionStorage.setItem("cursoPrecio", cursoSeleccionado.precio);
        sessionStorage.setItem("cursoDuracion", cursoSeleccionado.duracion);
        sessionStorage.setItem("cursoDescripcion", cursoSeleccionado.descripcion);
        sessionStorage.setItem("cursoRequisitos", cursoSeleccionado.requisitos);
    }

    const imagenCurso = document.getElementById("js-imagen-curso");
    const tituloCurso = document.getElementById("js-titulo-curso");
    const valorCurso = document.getElementById("js-valor-curso");
    const duracionCurso = document.getElementById("js-duracion-curso");
    const descripcionCurso = document.getElementById("js-descripcion-curso");
    const requisitosCurso = document.getElementById("js-requisitos-curso");

    if (
        imagenCurso != null &&
        tituloCurso != null &&
        valorCurso != null &&
        duracionCurso != null &&
        descripcionCurso != null &&
        requisitosCurso != null
    ) {
        imagenCurso.src = cursoSeleccionado.img;
        tituloCurso.innerHTML = cursoSeleccionado.nombre;
        valorCurso.innerHTML = cursoSeleccionado.precio;
        duracionCurso.innerHTML = cursoSeleccionado.duracion;
        descripcionCurso.innerHTML = cursoSeleccionado.descripcion;
        requisitosCurso.innerHTML = cursoSeleccionado.requisitos;
    } else if (localStorage.getItem("estadoDeSesion") == null) {
        window.location.href = "../pages/login.html";
    } else {
        window.location.href = "../pages/cursos.html";
    }
}

function actualizarContador() {
    // Obtiene el valor actual del contador desde sessionStorage o usa 0 si no existe
    let contador = parseInt(sessionStorage.getItem(`contador_${usuarioEnSesion.correo}`)) || 0;
    let carritoDeCompras =
        JSON.parse(localStorage.getItem(`carrito_${usuarioEnSesion.correo}`)) || [];
    contador = carritoDeCompras.length + 1;
    sessionStorage.setItem(`contador_${usuarioEnSesion.correo}`, contador); // Guarda el nuevo valor en sessionStorage
}

function actualizarContadorEmpresa() {
    // Obtiene el valor actual del contador desde sessionStorage o usa 0 si no existe
    let contador = parseInt(sessionStorage.getItem(`contador_${usuarioEnSesion.correo}`)) || 0;
    let carritoDeCompras =
        JSON.parse(localStorage.getItem(`carrito_${usuarioEnSesion.correo}`)) || [];
    contador++;
    sessionStorage.setItem(`contador_${usuarioEnSesion.correo}`, contador); // Guarda el nuevo valor en sessionStorage
}

document.addEventListener("DOMContentLoaded", () => {
    // Recuperar los datos del sessionStorage
    // sessionStorage.getItem("cursoId");

    let cursoSeleccionadoImg = sessionStorage.getItem("cursoImagen");
    let cursoSeleccionadoNombre = sessionStorage.getItem("cursoNombre");
    let cursoSeleccionadoPrecio = sessionStorage.getItem("cursoPrecio");
    let cursoSeleccionadoDuracion = sessionStorage.getItem("cursoDuracion");
    let cursoSeleccionadoDescripcion = sessionStorage.getItem("cursoDescripcion");
    let cursoSeleccionadoRequisitos = sessionStorage.getItem("cursoRequisitos");

    // Acceder a los elementos donde mostrar la información
    const imagenCurso = document.getElementById("js-imagen-curso");
    const tituloCurso = document.getElementById("js-titulo-curso");
    const valorCurso = document.getElementById("js-valor-curso");
    const duracionCurso = document.getElementById("js-duracion-curso");
    const descripcionCurso = document.getElementById("js-descripcion-curso");
    const requisitosCurso = document.getElementById("js-requisitos-curso");
    if (imagenCurso) {
        imagenCurso.src = cursoSeleccionadoImg;
        tituloCurso.innerHTML = cursoSeleccionadoNombre;
        valorCurso.innerHTML = cursoSeleccionadoPrecio;
        duracionCurso.innerHTML = cursoSeleccionadoDuracion;
        descripcionCurso.innerHTML = cursoSeleccionadoDescripcion;
        requisitosCurso.innerHTML = cursoSeleccionadoRequisitos;
    }
});

function mostrarContadorDinamico() {
    let contadorCarrito = document.querySelector(".contadorCarrito");
    if (usuarioEnSesion) {
        let contador = parseInt(sessionStorage.getItem(`contador_${usuarioEnSesion.correo}`)) || 0;
        contadorCarrito.innerHTML = `${contador}`;
    }
}

mostrarContadorDinamico();