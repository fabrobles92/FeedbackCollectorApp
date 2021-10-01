import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

export const fetchUser = () => async dispatcher => {
        const res = await axios.get('/api/me')
        dispatcher({type: FETCH_USER, payload: res.data})        
    };

export const handleToken = token => async dispatcher => {
    const res = await axios.post('/api/stripe', token)
    dispatcher({type: FETCH_USER, payload: res.data})
}

export const submitSurvey = (values, history) => async dispatcher => {
    const res = await axios.post('/api/surveys', values);
    dispatcher({type: FETCH_USER, payload: res.data})
    history.push('/surveys'); //this history object is passed by the withRouter helper, and is supossed to be used by elements that are not react components and to access the BrowserRouters defined un App.js Component. 
}

export const fetchSurveys = () => async dispatcher => {
    const res = await axios.get('/api/surveys')

    dispatcher({ type: FETCH_SURVEYS, payload: res.data })
}