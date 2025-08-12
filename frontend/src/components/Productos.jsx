import { useState , useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'
import productosService from '../services/service.productos'
import Fila from './Fila'

function Productos() {

    useEffect(()=>{obtenerProductos()},[])  
    const [productos, setProductos] = useState([])
    const {register,handleSubmit} = useForm()

    const obtenerProductos = async(searchdata)=>{
        const data = await productosService.obtenerProductos(searchdata)
        setProductos(data)
    }
        const onSubmit = async(searchdata) => {
        //console.log('form Buscar:',data)
        //searchdata.orden = 'id'; // Siempre ordenar por id descendente
        await obtenerProductos(searchdata)
    }

  return (
    <>
          <h3 className='text-center p-4  bg-dark text-light'>Stock de productos en casa</h3>
    <div className='container'>
    <div className='container pt-5 pb-5'>
        <form className="row d-flex justify-content-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-auto m-2">
            <label className="visually-hidden"  htmlFor="autoSizingInput">Producto</label>
            <input type="text" className="form-control" id="autoSizingInput" placeholder="producto" {...register('producto')}/>
        </div>

        <div className="col-auto m-2">
            <label className="visually-hidden" htmlFor="autoSizingSelect">categoria</label>
            <select className="form-select" id="autoSizingSelect" {...register('categoria')}>
            <option value="">Todas las categorías</option>
            <option value="Bebida">Bebida</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Mercaderia">Mercaderia</option>
            <option value="Higiene">Higiene</option>
            <option value="Carnes">Carnes</option>
            <option value="Lacteos">Lacteos</option>
            <option value="Fiambres">Fiambres</option>
            <option value="Panaderia">Panaderia</option>
            <option value="Verduleria">Verduleria</option>
            <option value="Especias">Especias</option>
            <option value="Otros">Otros</option>
            </select>
        </div>
        <div className="col-auto m-2">
            <button type="submit" className="btn btn-primary"><i className='bi bi-search'></i>Buscar</button>
        </div>
        <div className='col-auto m-2'>
            <Link to="/producto/0" className='btn btn-success'>
            <i className='bi bi-plus-circle'></i>
            Agregar producto
            </Link>
          </div>
        </form>
    </div>
      <div className='row container text-center'>
            <div className='table-responsive'>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p)=>(
                        <tr key={p.id}>
                            <Fila id={p.id} producto={p.producto} categoria={p.categoria} cantidad={p.cantidad} obtenerProductos={obtenerProductos}/>
                            <td>
                                <Link to={`/producto/${p.id}`} className='btn btn-primary'>
                                    <i className='bi bi-pencil'></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </>
  )
}

export default Productos
