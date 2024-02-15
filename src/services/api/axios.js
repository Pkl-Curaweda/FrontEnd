import axios from 'axios'
import { refreshToken } from './refresh_token'
import { authStore } from 'src/stores/auth'
import { realtimeNotif } from './realtime_notif'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  async (res) => res,
  async (err) => {
    const { response } = err
    if (response.status == 403) {
      const mainPath = authStore().getMainPath()
      window.location.replace(mainPath)
    }

    if (response.status == 401) {
      console.log('401 ni mas')
      if (!err.config.sent) {
        console.log('apa coba')
        err.config.sent = true      
        console.log('gak sampe sini?')  
        const new_token = await refreshToken()
        if (new_token != null) {
          err.config.headers = {
            ...err.config.headers,
            Authorization: `Bearer ${new_token}`
          }
        }

        return axios(err.config)
      }
    }

    throw err
  }
)

export default myAxios
