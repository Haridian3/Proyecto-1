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

  let totalItems = 0; // Nuevo: contar el total de productos
  let total = 0;
  carrito.forEach((producto) => {
      const div = document.createElement('div');
      div.classList.add('carrito-item');
      div.innerHTML = `
    ${producto.nombre} - Precio: ${producto.precio}€ - Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span>
    <button onclick="cambiarCantidad('incrementar', ${producto.id})">+</button>
    <button onclick="cambiarCantidad('decrementar', ${producto.id})">-</button>
    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
`;

      dropdownCarrito.appendChild(div);
      total += producto.precio * producto.cantidad;
      totalItems += producto.cantidad; // Sumar la cantidad de este producto al total
  });
  
  document.getElementById('cart-count').innerText = totalItems; // Actualizar el contador del carrito
  
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total:</strong> ${total.toFixed(2)}€`;
  dropdownCarrito.appendChild(totalDiv);

// Botón para vaciar el carrito
if (carrito.length > 0) {
  const vaciarCarritoBtn = document.createElement('button');
  vaciarCarritoBtn.textContent = 'Vaciar Carrito';
  vaciarCarritoBtn.onclick = vaciarCarrito;
  dropdownCarrito.appendChild(vaciarCarritoBtn);
}

}




document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.producto button');
  
  botones.forEach((boton, index) => {
      boton.addEventListener('click', () => {
          const producto = boton.closest('.producto');
          const id = index; // Esta es una simplificación. Idealmente, cada producto tendría un ID único.
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

function cambiarCantidad(accion, idProducto) {
  const indiceProducto = carrito.findIndex(p => p.id === idProducto);
  if (indiceProducto !== -1) {
      if (accion === 'incrementar') {
          carrito[indiceProducto].cantidad += 1;
      } else if (accion === 'decrementar') {
          carrito[indiceProducto].cantidad -= 1;
          if (carrito[indiceProducto].cantidad < 1) {
              // Eliminar producto si la cantidad es 0
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


