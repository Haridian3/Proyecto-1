let carrito = [];

function agregarAlCarrito(producto) {
  const existe = carrito.findIndex(p => p.id === producto.id);
  if (existe !== -1) {
    carrito[existe].cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const dropdownCarrito = document.getElementById('dropdown-carrito');
  dropdownCarrito.innerHTML = ''; // Limpiar el contenido actual del dropdown del carrito

  let totalItems = 0;
  let total = 0;
  carrito.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('carrito-item');
    div.innerHTML = `
      ${producto.nombre} - Precio: ${producto.precio}€ - Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span>
      <button onclick="cambiarCantidad('incrementar', ${producto.id})">+</button>
      <button onclick="cambiarCantidad('decrementar', ${producto.id})">-</button>
      <button onclick="eliminarDelCarrito(${producto.id})">X</button>
    `;

    dropdownCarrito.appendChild(div);
    total += producto.precio * producto.cantidad;
    totalItems += producto.cantidad;
  });

  document.getElementById('cart-count').innerText = totalItems;

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total-en-carrito');
  totalDiv.innerHTML = `<strong>Total:</strong> ${total.toFixed(2)}€`;
  dropdownCarrito.appendChild(totalDiv);

  

// Condición para añadir botón de vaciar carrito si hay productos
if (carrito.length > 0) {
  const vaciarCarritoBtn = document.createElement('button');
  vaciarCarritoBtn.textContent = 'Vaciar Carrito';
  vaciarCarritoBtn.onclick = vaciarCarrito;
  vaciarCarritoBtn.classList.add('boton-vaciar'); // Asignar clase para el botón Vaciar Carrito
  dropdownCarrito.appendChild(vaciarCarritoBtn);
}
// Botón de ejecutar compra
const botonCompra = document.createElement('button');
botonCompra.textContent = 'Comprar';
botonCompra.onclick = ejecutarCompra;
botonCompra.classList.add('boton-comprar'); // Asignar clase para el botón Comprar
totalDiv.appendChild(botonCompra);
}

function cambiarCantidad(accion, idProducto) {
  const indiceProducto = carrito.findIndex(p => p.id === idProducto);
  if (indiceProducto !== -1) {
    if (accion === 'incrementar') {
      carrito[indiceProducto].cantidad += 1;
    } else if (accion === 'decrementar') {
      carrito[indiceProducto].cantidad -= 1;
      if (carrito[indiceProducto].cantidad < 1) {
        carrito.splice(indiceProducto, 1);
      }
    }
    actualizarCarrito();
  }
}

function eliminarDelCarrito(idProducto) {
  const indiceProducto = carrito.findIndex(p => p.id === idProducto);
  if (indiceProducto !== -1) {
    carrito.splice(indiceProducto, 1);
  }
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function ejecutarCompra() {
  if (carrito.length > 0) {
    alert('Compra realizada con éxito!');
    vaciarCarrito(); // Opcional: vaciar carrito después de la compra
    // Aquí se podría incluir lógica adicional para procesar la compra
  } else {
    alert('Tu carrito está vacío.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.producto button');
  botones.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      const producto = boton.closest('.producto');
      const id = index; // Simplificación para el ejemplo, idealmente cada producto tendría un ID único.
      const nombre = producto.querySelector('h3').textContent;
      const precio = parseFloat(producto.querySelector('.precio-producto span').textContent.replace('€', ''));
      const cantidad = parseInt(producto.querySelector('.input-producto input').value);
      agregarAlCarrito({ id, nombre, precio, cantidad });
    });
  });
});

document.querySelector('.cart-item a').addEventListener('click', function() {
  document.getElementById('dropdown-carrito').classList.toggle('show-dropdown');
});

// Opcional: Cerrar el desplegable si se hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('.fas.fa-shopping-cart')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show-dropdown')) {
        openDropdown.classList.remove('show-dropdown');
      }
    }
  }
};
