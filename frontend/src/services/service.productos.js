import axios from 'axios'

const URL = 'http://localhost:3200/api/productos'

const obtenerProductos= async(searchData) => {
    try {
        const queryString = new URLSearchParams(searchData).toString() //convertir el objeto a una cadena de consulta
        const pinturas = await axios.get(`${URL}?${queryString}`) // Hacer la petición GET a la API con los parámetros de búsqueda
        return pinturas.data.data // Retornar los datos de las pinturas obtenidas

    } catch (error) {
    return [];
    }
}

const obtenerProducto = async(id) => {
    try {
        const producto = await axios.get(`${URL}/${id}`)
        return producto.data.data
    } catch (error) {
        
    }
}

const agregarProducto = async(data) => {
    try {
        console.log('Agregar', data)
        const producto = await axios.post(`${URL}`, data)
        return producto.data.data
    } catch (error) {
        
    }
}
const modificarProducto = async(id, data) => {
    try {
        const producto = await axios.put(`${URL}/${id}`, data) // Hacer la petición PUT a la API para modificar el producto
        return producto.data  // Retornar los datos del producto modificado
    } catch (error) {
        setError("No se pudo modificar el producto. Intenta más tarde.");
    }
}
const eliminarProducto = async(id)=> {
    try {
        const resultado = await axios.delete(`${URL}/${id}`)
        return resultado
    } catch (error) {
        
    }
}

export default {obtenerProductos, modificarProducto, obtenerProducto,agregarProducto, eliminarProducto} // Exportar las funciones para ser utilizadas en otros componentes