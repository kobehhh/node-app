import axios from '@/utils/http.js'
import qs from 'qs'

const user = '/users'

export const login = params => {
  return axios.post(`${user}/login`,params).then(res => {
    return res.data
  })
}

export const register = params => {
  return axios.post(`${user}/register`,params).then(res => {
    return res.data
  })
}