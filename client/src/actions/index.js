import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatcher => {
        const res = await axios.get('/api/me')
        dispatcher({type: FETCH_USER, payload: res.data})        
    };
