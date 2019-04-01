import {
            ACTION_GET_ALL_ADS,
            ACTION_SET_ALL_ADS,
            ACTION_SET_ITEM_PER_PAGE,
            ACTION_GET_ADS_QUERY,
            ACTION_REFRESH_ADS,
            ACTION_FILTER_ADS,
            ACTION_SET_ADS_NO_LOAD
        } from '../constants/action-types'

// import AdService from '../services/adService'
import { API_ENDPOINT } from './../helpers/Constant'
import { parseQueryString } from '../helpers'
// import axios from 'axios'


const queryString = parseQueryString()
const params = {item_per_page:5}
const url = API_ENDPOINT + 'getData.php' + queryString
// getAllAds(params)
// load('http://parsavito/api/getData.php')

// axios
//   .get(API_ENDPOINT + 'getData.php' + queryString)
//   .then( res => {
//     getAllAds(ads.data)
//   })
//   .catch( error => {
//     console.log(error);
//  });

export function getAllAds(data, adQueryID) {
    console.log('Сроботал экшон, количество записей ' + data.recordCount);
  return {
    type: ACTION_GET_ALL_ADS,
    payload: data.records,
    adsCount: data.recordCount,
    adQueryID: adQueryID
  }
}

export function refreshAds(data) {
    console.log('Сроботал экшон refreshAds');
  return {
    type: ACTION_REFRESH_ADS,
    payload: data
  }
}

export function filterAds(data) {
    console.log('Сроботал экшон filterAds');
  return {
    type: ACTION_FILTER_ADS,
    payload: data
  }
}

export function setAllAds(adsCount) {
  return {
    type: ACTION_SET_ALL_ADS,
    adsCount: adsCount,
    itemPerPage: adsCount
  }
}

export function setItemPerPage(itemPerPage) {
    console.log('Сработал экшон setItemPerPage ' + itemPerPage);
  return {
    type: ACTION_SET_ITEM_PER_PAGE,
    itemPerPage: itemPerPage
  }
}

export function getAdsQuery(adsQuery) {
    return {
        type: ACTION_GET_ADS_QUERY,
        adsQuery: adsQuery
    }
}

export function setAdsNoLoad() {
    console.log('Сработал экшон setAdsNoLoad ');
    return {
        type: ACTION_SET_ADS_NO_LOAD,
        adsIsLoad: false
    }
}
