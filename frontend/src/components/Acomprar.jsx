import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import productosService from '../services/service.productos';

function Productos() {
  const [productos, setProductos] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async (searchdata) => {
    const data = await productosService.obtenerProductos(searchdata);
    setProductos(data);
  };

  const onSubmit = async (searchdata) => {
    await obtenerProductos(searchdata);
  };

  // Filtramos una sola vez para evitar cálculos repetidos
  const productosAgotados = productos.filter(p => p.cantidad == 0);

  return (
    <div>
      <h3 className="text-center p-4 bg-dark text-light">
        ¿Qué productos se agotaron?
      </h3>
      <div className="container mt-5">
        <div className="row">
          {productosAgotados.length == 0 ? (
            <div className="col-12 text-center">
              <p className="alert alert-info">
                No hay productos agotados
              </p>
            </div>
          ) : (
            productosAgotados.map((p) => (
              <div className="col-md-12" key={p.id}>

                  <div className="row justify-content-center">
                    <div className="col-md-5 ">
                      <div className="card rounded text-dark bg-light mb-3">
                        <div className="rounded p-3 bg-danger text-center text-white"><h5 className='m-0'>{p.producto}</h5></div>
                        <div className="card-body">
                          <h5 className="card-title bg-light">Categoría: {p.categoria}</h5>
                          <p className="card-text">Cantidad: {p.cantidad}</p>
                          <p className="card-text">
                          <small className="text-muted">
                            Última actualización:{' '}
                            {new Date(p.updatedAt).toLocaleString()}
                          </small>
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Productos;

