import productosService from '../services/service.productos'

function Fila({id, producto, categoria, cantidad, obtenerProductos}) {

  const eliminarProducto = async(id) => {
    if(confirm('Desea eliminar el producto?')){
      await productosService.eliminarProducto(id)
      await obtenerProductos()
    }
  }

  const modificarCantidad = async(nuevaCantidad) => {
    if(confirm(`Desea modificar la cantidad a ${nuevaCantidad}?`)) {
      if (nuevaCantidad < 0) return; // Evita cantidades negativas
      console.log(`Modificando cantidad de ${producto} a ${nuevaCantidad}`);
      await productosService.modificarProducto(id, { cantidad: nuevaCantidad });
      await obtenerProductos();
    }
  }

  return (
    <>
      <td>{producto}</td>
      <td>{categoria}</td>
        <td>
          <div className="d-flex align-items-center justify-content-center">
            <span className="mx-2 fw-bold" style={{ minWidth: "24px", textAlign: "center" }}>{cantidad}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              style={{ minWidth: "32px" }}
              onClick={() => modificarCantidad(cantidad - 1)}
              title="Restar"
            >-</button>
          </div>
        </td>
      <td>
        <button className='btn btn-danger' onClick={() => eliminarProducto(id)}>
          <i className='bi bi-trash'></i>
        </button>
      </td>
    </>
  )
}

export default Fila
