let carrito = [];
let arrayProductos = [];

async function traerProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos.');
        }
        const data = await response.json();
        arrayProductos = data || arrayProductos;

        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado && carritoGuardado.length > 0) {
            carrito = carritoGuardado;
            actualizarTablaCarrito();
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Carrito vacio',
                text: 'Agrega productos al carrito haciendo clic en el boton "Agregar".',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar productos',
            text: 'Ha ocurrido un error al cargar los productos.',
            showConfirmButton: false,
            timer: 1500
        });
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

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${nombreProducto} ha sido agregado al carrito.`,
        showConfirmButton: false,
        timer: 1500 
    });
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
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro de resetear el carrito?',
        text: 'Todos los productos del carrito seran eliminados.',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, resetear',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarTablaCarrito();
            localStorage.removeItem('carrito');
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';

            Swal.fire({
                icon: 'success',
                title: 'Carrito reseteado',
                text: 'El carrito ha sido reseteado correctamente.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

const resetearBoton = document.getElementById('resetear-carrito');
resetearBoton.addEventListener('click', resetearCarrito);
