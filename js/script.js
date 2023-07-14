let carrito = [];
let arrayProductos = [];

arrayProductos.push(new productoPastas("Sorrentinos", 1600));
arrayProductos.push(new productoPastas("Ravioles", 1300));
arrayProductos.push(new productoPastas("Tallarines", 1100));
arrayProductos.push(new productoPastas("Ñoquis", 1000));
arrayProductos.push(new productoPastas("Salsa", 800));

function traerProductos() {
    arrayProductos = JSON.parse(localStorage.getItem('productos')) || arrayProductos;
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado && carritoGuardado.length > 0) {
        carrito = carritoGuardado;
        actualizarTablaCarrito();
    }
}
traerProductos();
const agregarBotones = document.querySelectorAll('.agregar-carrito');
agregarBotones.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(event) {
    const productoCard = event.target.parentNode;
    const nombreProducto = productoCard.querySelector('h2').textContent;
    const precioProducto = Number(productoCard.querySelector('p').textContent.replace(/\D/g, ''));

    const productoExistente = carrito.find((producto) => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
    } else {
        const producto = new productoPastas(nombreProducto, precioProducto);
        producto.cantidad = 1;
        producto.subtotal = precioProducto;
        carrito.push(producto);
    }

    actualizarTablaCarrito();
}

function actualizarTablaCarrito() {
    const tabla = document.getElementById('tablita');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    let precioTotal = 0;

    carrito.forEach((producto) => {
        const fila = document.createElement('tr');
        const nombreColumna = document.createElement('td');
        nombreColumna.textContent = producto.nombre;
        const precioColumna = document.createElement('td');
        precioColumna.textContent = `$${producto.precio}`;
        const cantidadColumna = document.createElement('td');
        cantidadColumna.textContent = producto.cantidad;
        const subtotalColumna = document.createElement('td');
        subtotalColumna.textContent = `$${producto.subtotal}`;

        fila.appendChild(nombreColumna);
        fila.appendChild(precioColumna);
        fila.appendChild(cantidadColumna);
        fila.appendChild(subtotalColumna);

        tbody.appendChild(fila);

        precioTotal += producto.subtotal;
    });

    const precioTotalElemento = tabla.querySelector('#precio-total');
    precioTotalElemento.textContent = `$${precioTotal}`;

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function resetearCarrito() {
    carrito = [];
    actualizarTablaCarrito();
    localStorage.removeItem('carrito');
}

const resetearBoton = document.getElementById('resetear-carrito');
resetearBoton.addEventListener('click', resetearCarrito);

window.addEventListener('load', traerProductos);