const sorrentinos = 1600;
const ravioles = 1300;
const tallarines = 1100;
const salsa = 800;
const ñoquis = 1000;
let cantidad;
let totalParcial;
let totalAcumulado = 0;
let totalDescuento = 0;
let continuar;

function calcularTotalParcial(producto,cantidad) {
        return totalParcial = producto*cantidad
};

do {
let opcion = parseInt (prompt (`Bienvenido a "La Tata" fábrica de pastas!
Hoy tenemos 15% de descuento en tu compra superando los $5000.
Ingresa el número correspondiente al producto que deseas comprar:
1) Sorrentinos $1600
2) Ravioles $1300
3) Tallarines $1100
4) Salsa $800
5) Ñoquis $1000`));
        switch (opcion) {
                case 1: cantidad = parseInt(prompt ("Ingresa la cantidad del producto que deseas comprar: "));
                        calcularTotalParcial (sorrentinos, cantidad);
                        alert ("$"+totalParcial);
                        totalAcumulado += totalParcial;
                        break;
                case 2: cantidad = parseInt(prompt ("Ingresa la cantidad del producto que deseas comprar: "));
                        calcularTotalParcial (ravioles, cantidad);
                        alert ("$"+totalParcial);
                        totalAcumulado += totalParcial;
                        break;
                case 3: cantidad = parseInt(prompt ("Ingresa la cantidad del producto que deseas comprar: "));
                        calcularTotalParcial (tallarines, cantidad);
                        alert ("$"+totalParcial);
                        totalAcumulado += totalParcial;
                        break;
                case 4: cantidad = parseInt(prompt ("Ingresa la cantidad del producto que deseas comprar: "));
                        calcularTotalParcial (salsa, cantidad);
                        alert ("$"+totalParcial);
                        totalAcumulado += totalParcial;
                        break;
                case 5: cantidad = parseInt(prompt ("Ingresa la cantidad del producto que deseas comprar: "));
                        calcularTotalParcial (ñoquis, cantidad);
                        alert ("$"+totalParcial);
                        totalAcumulado += totalParcial;
                        break;
                default: alert ("Debes ingresar una de las opciones"); 
        }
        continuar = parseInt (prompt ("Desea agregar mas productos? 1=SI  2=NO"));          
} while ( continuar === 1 );

if (totalAcumulado >= 5000) {
        totalDescuento = totalAcumulado - totalAcumulado*0.15;
        alert("El total con el descuento aplicado es de: $"+totalDescuento);
}else {
        alert ("El monto final es de : $"+totalAcumulado);
}
alert ("Gracias por elegirnos!");
