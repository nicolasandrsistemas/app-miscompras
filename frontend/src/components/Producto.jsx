import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import productosService from '../services/service.productos'

function Producto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    useEffect(() => { obtenerProducto(id) }, [])

    const volver = () => {
        navigate('/productos') // Navegar de vuelta a la lista de productos
    }

    const obtenerProducto = async (id) => {
        if (parseInt(id) !== 0) { // Si el id es 0, no se hace la consulta
            const producto = await productosService.obtenerProducto(id) // Obtener la pintura por su id
            setValue('id', producto.id) // Asignar el id de la pintura al formulario
            setValue('producto', producto.producto)
            setValue('categoria', producto.categoria)
            setValue('cantidad', producto.cantidad)
            setValue('precio', producto.precio)
        }
    }
    const onSubmit = async (data) => {
        if (parseInt(id) === 0) {
            productosService.agregarProducto(data) // Si el id es 0, se agrega una nueva pintura
        } else {
            productosService.modificarProducto(id, data) // Si el id es diferente de 0, se modifica la pintura existente
        }

        volver() // Navegar de vuelta a la lista de pinturas
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="card mt-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset>
                                    <legend className="mb-5">Datos Producto</legend>
                                    <div className="mt-3"><label htmlFor="producto" className="form-label">Producto</label>
                                        <input type="text" name="producto" className='form-control'
                                            {...register('producto', { required: 'El producto es requerido' })} />
                                        {errors.producto && <span className='text-danger'>{errors.producto.message}</span>}
                                    </div>
                                    <div className="mt-3"><label htmlFor="cantidad" className="form-label">Cantidad</label>
                                        <input type="text" name="cantidad" className='form-control'
                                            {...register('cantidad', { required: 'La cantidad es requerida',
                                            min: { value: 1, message: 'La cantidad debe ser mayor o igual a 1' },
                                             })} />
                                        {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="categoria" className="form-label">Categoría</label>
                                        <select
                                            name="categoria"
                                            className="form-select"
                                            {...register('categoria', { required: 'La categoría es requerida' })}
                                        >
                                                        <option value="">Agregar</option>
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
                                        {errors.categoria && <span className='text-danger'>{errors.categoria.message}</span>}
                                    </div>
                                    <div className="mt-3"><label htmlFor="precio" className="form-label">Precio $</label>
                                        <input type="text" name="precio" className='form-control'
                                            {...register('precio', {
                                                required: 'El precio es requerido',
                                                min: { value: 100, message: 'El precio debe ser mayor o igual a 100' },
                                            })} />
                                        {errors.precio && <span className='text-danger'>{errors.precio.message}</span>}
                                    </div>
                                </fieldset>
                                <div className='mt-5'>
                                    <input type="submit" value="Guardar" className='btn btn-success ms-2' />
                                    <button type="button" onClick={volver} className="btn btn-warning ms-2">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Producto
