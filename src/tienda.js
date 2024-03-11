document.getElementById('filtro-categoria').addEventListener('change', function() {
    var valorSeleccionado = this.value; // La categoría seleccionada del <select>
  
    // Obtiene todas las categorías
    var categorias = document.querySelectorAll('.categoria');
  
    categorias.forEach(function(categoria) {
      if (valorSeleccionado === 'todos') {
        categoria.style.display = ''; // Muestra todas las categorías si se selecciona "Todos"
      } else {
        // Muestra solo la categoría que coincide con la selección
        if (categoria.getAttribute('data-categoria') === valorSeleccionado) {
          categoria.style.display = '';
        } else {
          categoria.style.display = 'none'; // Oculta las demás categorías
        }
      }
    });
  });
  