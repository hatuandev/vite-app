import axios from 'axios'
import { supabaseConfig } from './supabaseConfig'

const appSupabase = axios.create({
  baseURL: supabaseConfig.url,
  headers: {
    apikey: supabaseConfig.apikey,
    Authorization: 'Bearer ' + supabaseConfig.authorization,
    contentRange: 'content-range',
  }
})

export default appSupabase
