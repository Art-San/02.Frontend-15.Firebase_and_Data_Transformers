import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

axios.defaults.baseURL = configFile.apiEndpoint

// Axios interceptors. Request. Модификация URL
// если есть файр байс то значит он иначе первый вариант
axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
        }
        // console.log(config.url)
        return config
<<<<<<< HEAD
    },
    function (error) {
=======
    }, function (error) {
>>>>>>> 06.Initialize_Mock_Data
        return Promise.reject(error)
    }
)

// Axios interceptors. Response. Трансформация данных
function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
<<<<<<< HEAD
              ...data[key]
          }))
=======
            ...data[key]
        }))
>>>>>>> 06.Initialize_Mock_Data
        : []
}

axios.interceptors.response.use(
    (res) => {
<<<<<<< HEAD
        if (configFile.isFireBase) {
            // Axios interceptors.  Response. Трансформация данных
=======
        if (configFile.isFireBase) { // Axios interceptors.  Response. Трансформация данных
>>>>>>> 06.Initialize_Mock_Data
            res.data = { content: transformData(res.data) }
        }
        return res
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            console.log(error)
            toast.error('Somthing was wrong. Try it leter')
        }
        return Promise.reject(error)
    }
)
const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
