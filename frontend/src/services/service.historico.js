import axios from 'axios'

const URL = 'http://localhost:3200/api/historico'

const obtenerHistoricos= async(searchData) => {
    try {
        const queryString = new URLSearchParams(searchData).toString() //convertir el objeto a una cadena de consulta
        const historicos = await axios.get(`${URL}?${queryString}`) // Hacer la petición GET a la API con los parámetros de búsqueda
        return historicos.data.data // Retornar los datos de los historicos obtenidos

    } catch (error) {
    return [];
    }
}

const obtenerHistorico = async(id) => {
    try {
        const historico = await axios.get(`${URL}/${id}`)
        return historico.data.data
    } catch (error) {
        
    }
}

const agregarHistorico = async(data) => {
    try {
        console.log('Agregar', data)
        const historico = await axios.post(`${URL}`, data)
        return historico.data.data
    } catch (error) {
        
    }
}

export default {obtenerHistoricos, obtenerHistorico, agregarHistorico} // Exportar las funciones para ser utilizadas en otros componentes