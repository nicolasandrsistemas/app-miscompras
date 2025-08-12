import { useState , useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'
import historicoService from '../services/service.historico'

   const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString();
  };
function Historico() {

    useEffect(()=>{obtenerHistoricos({orden: 'id'})},[])  
    const [historico, setHistorico] = useState([])
    const {register,handleSubmit} = useForm()

    const obtenerHistoricos = async(searchdata)=>{
        const data = await historicoService.obtenerHistoricos(searchdata)
        setHistorico(data)
    }
        const onSubmit = async(searchdata) => {
        //console.log('form Buscar:',data)
        searchdata.orden = 'id'; // Siempre ordenar por id descendente
        await obtenerHistoricos(searchdata)
    }

  return (
    <>
           <h3 className='text-center p-4 bg-dark text-light'>Registro de compras</h3>
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
        </form>
    </div>
      <div className='row text-start'>
            <div className='table-responsive'>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Fecha de Creación</th>
                    <th>Fecha de Actualización</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {historico.map((p)=>(
                        <tr key={p.id}>
                                   
                                    <td>{p.producto}</td>
                                    <td>{p.categoria}</td>
                                    <td>{p.cantidad}</td>
                                    <td>${p.precio}</td>
                                  <td>{formatDate(p.createdAt)}</td>
                                  <td>{formatDate(p.updatedAt)}</td>
                                  <td></td>
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
export default Historico