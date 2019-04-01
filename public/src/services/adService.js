import { API_ENDPOINT } from './../helpers/Constant'
// import axios from 'axios'
import { parseQueryString } from './../helpers/QueryString'

export default class AdService {
    static getAllAds(parameters) {
        console.log('отработал сервис, параметры ' + parameters.item_per_page)
        const queryString = parseQueryString(parameters);
        console.log('Строка запроса ' + API_ENDPOINT + 'getData.php' + queryString)
        // return axios({
        //     method: 'get',
        //     url: API_ENDPOINT + 'getData.php' + queryString,
        //     header: []
        // })
        // let ads = [1,2,3]

        // axios
        //   .get(API_ENDPOINT + 'getData.php' + queryString)
        //   .then( res => {
        //     var ads = res.data
        //   })
        //   .catch( error => {
        //     console.log(error);
        //  });
        //  console.log('Врзвращаемый из сервиса ads ' + ads.city);
        //  return ads
    }
}
