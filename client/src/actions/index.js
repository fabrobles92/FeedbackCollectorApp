import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatcher => {
        const res = await axios.get('/api/me')
        dispatcher({type: FETCH_USER, payload: res.data})        
    };

export const handleToken = token => async dispatcher => {
    const res = await axios.post('/api/stripe', token)
    dispatcher({type: FETCH_USER, payload: res.data})
}
