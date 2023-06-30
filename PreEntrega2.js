const producto = [
        { nombre: "sorrentinos", precio: 1600 },
        { nombre: "ravioles", precio: 1300 },
        { nombre: "tallarines", precio: 1100 },
        { nombre: "salsa", precio: 800 },
        { nombre: "ñoquis", precio: 1000 }
];
let mostrarCarrito;
let elegirProducto;
let seguirComprando;
let cantidad;
let totalAcumulado = 0;
let totalFinal;
const aplicarDescuento = (total) => { return total - total*0.15 };
alert('Bienvenido a "La Tata" fabrica de pastas.\nHoy tenemos 15% de descuento en tu compra superando los $5000.');
do {
        mostrarCarrito = producto.map((item, index) => `${index + 1}) ${item.nombre} = $${item.precio}`);
        elegirProducto = parseInt(prompt(`Selecciona el numero correspondiente al producto que desees comprar: \n${mostrarCarrito.join("\n")}`));
        while (elegirProducto <= 0 || elegirProducto > producto.length || isNaN(elegirProducto)) {
                alert("Opcion incorrecta, ingrese una opcion valida")
                elegirProducto = parseInt(prompt(`Bienvenido a 'La Tata' fabrica de pastas. A continuacion selecciona el numero correspondiente al producto que desees comprar: \n${mostrarCarrito.join("\n")}`));
        }
        cantidad = parseInt(prompt("Ingrese la cantidad que desee llevar del producto elegido"));
        while (cantidad <= 0 || isNaN(cantidad)) {
                alert("Ingrese una cantidad valida")
                cantidad = parseInt(prompt("Ingrese la cantidad que desee llevar del producto elegido"));
        }
        totalAcumulado = totalAcumulado + producto[elegirProducto - 1].precio*cantidad;
        alert (`Monto parcial a pagar: $${totalAcumulado}`);
        seguirComprando = parseInt(prompt(`Ingrese => 1 - si desea agregar mas productos\nIngrese => 2 - si desea finalizar su compra`));
} while (seguirComprando == 1)
if (totalAcumulado >= 5000){
        totalFinal = aplicarDescuento(totalAcumulado);
        alert (`El total de su compra con descuento es de $${totalFinal}`);
} else {
        alert (`El total de su compra sin descuento es de $${totalAcumulado}`);
}
alert("Gracias por elegirnos! vuelva pronto...");
