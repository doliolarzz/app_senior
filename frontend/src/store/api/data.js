import axios from 'axios';
import config from '../../rain_config';

export const getMetricsData = ({ dt }) => {
    return axios.get(`${config.apiUrl}/rain/metrics?dt=${dt}`)
}

export const getImagesData = ({ dt, itype, n }) => {
    return axios.get(`${config.apiUrl}/rain/data?dt=${dt}&itype=${itype}&n=${n}`)
}