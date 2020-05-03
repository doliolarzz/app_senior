import axios from 'axios';
import config from '../../appConfig';

export const getCVITable = ({ cviType }) => {
    return axios.get(`${config.apiUrl}/get_cvi?category=${cviType}`)
}

export const getCompareRegion = ({ region }) => {
    return axios.get(`${config.apiUrl}/get_covid_cvi?area=${region}`)
}

export const getStatsByTime = () => {
    return axios.get(`https://covid19.th-stat.com/api/open/timeline`)
}

export const getMapShape = ({ province, mapType }) => {
    var url = 'get_each_province';
    if (mapType == 'province') {
        url = 'get_each_province';
    }
    else if (mapType == 'tambon') {
        url = 'get_province_tambon'
    }
    else if (mapType == 'amphoe') {
        url = 'get_province_amphoe'
    }
    return axios.get(`${config.apiUrl}/${url}?name=${province}`)
}

export const getMapOrder = ({ province, mapType }) => {
    var url = 'get_tambon_cvi';
    if (mapType == 'amphoe') {
        url = 'get_amphur_cvi';
    }
    return axios.get(`${config.apiUrl}/${url}?name=${province}`)
}

export const getRadar = ({ province, amphoe, tambon, mapType }) => {
    if (mapType == 'amphoe') {
        return axios.get(`${config.apiUrl}/get_amphur_data?name=${`${province}_${amphoe}`}`)
    }
    else if (mapType == 'tambon') {
        return axios.get(`${config.apiUrl}/get_tambon_data?name=${tambon}`)
    }
    else if (mapType == 'province') {
        return axios.get(`${config.apiUrl}/get_province_data?name=${province}`)
    }
}

export const getProvinceLine = ({ province }) => {
    return axios.get(`${config.apiUrl}/get_time_series?name=${province}`)
}