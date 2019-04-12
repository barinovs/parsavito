import load from '../utils/load.js'

import { ACTION_GET_ALL_ADS,
        ACTION_SET_ITEM_PER_PAGE,
        ACTION_SET_ALL_ADS,
        ACTION_GET_ADS_QUERY,
        ACTION_REFRESH_ADS,
        ACTION_FILTER_ADS,
        ACTION_SET_ADS_NO_LOAD,
        ACTION_SET_AD_QUERY_ID,
        ACTION_SET_FILTER_PARAMS
    } from '../constants/action-types'

import { DEFAULT_ITEM_PER_PAGE,
         DEFAULT_ORDER_BY,
         DEFAULT_ORDER_TYPE,
         DEFAULT_PAGE,
         DEFAULT_SEARCH,
         DEFAULT_AD_QUERY_ID
     } from '../helpers/Pagination';


  const initialState = {
    ads: new Array(),
    filteredAds: new Array(),
    itemPerPage: DEFAULT_ITEM_PER_PAGE,
    adsQuery: new Array(),
    adsIsLoad: true,
    adQueryID: DEFAULT_AD_QUERY_ID,
    filterParams: {
        orderBy: 'id',
        itemPerPage: 30,
        adQueryID: 1,
        city: '',
        name: '',
        yearMin: 1940,
        yearMax: 2019,
        mileageMin: 0,
        mileageMax: 1000000,
        priceMin: 0,
        priceMax: 5000000
    }
}


export const rootReducer = (state = initialState, action) => {
    console.log(' Экшон тайп из 1 ' + action.type + ' ' + action.adsCount);
    switch (action.type) {
        case ACTION_GET_ALL_ADS: {
            return {...state,
                        ads: action.payload,
                        adsCount: parseInt(action.adsCount),
                        adsIsLoad: true,
                        adQueryID: action.adQueryID
                    }
        }
        case ACTION_SET_ALL_ADS: {
            return {...state,
                        adsCount: action.adsCount,
                        itemPerPage: action.itemPerPage
                    }
        }
        case ACTION_SET_ITEM_PER_PAGE: {
            console.log('action.itemPerPage ' + action.itemPerPage);
            return {...state,
                        itemPerPage: action.itemPerPage
                    }
        }
        case ACTION_GET_ADS_QUERY: {
            console.log('редюсер ACTION_GET_ADS_QUERY');
            return {...state,
                        adsQuery: action.adsQuery
                    }
        }
        case ACTION_REFRESH_ADS: {
            console.log('редюсер ACTION_REFRESH_ADS');
            return {...state,
                        ads: action.payload
                    }
        }
        case ACTION_FILTER_ADS: {
            console.log('редюсер ACTION_FILTER_ADS');
            return {...state,
                        filteredAds: action.payload
                    }
        }
        case ACTION_SET_ADS_NO_LOAD: {
            console.log('редюсер ACTION_SET_ADS_NO_LOAD');
            return {...state,
                        adsIsLoad: false
                    }
        }
        case ACTION_SET_AD_QUERY_ID: {
            console.log('редюсер ACTION_SET_AD_QUERY_ID');
            return {...state,
                        adQueryID: action.adQueryID
                    }
        }
        case ACTION_SET_FILTER_PARAMS: {
            console.log('редюсер ACTION_SET_FILTER_PARAMS');
            return {...state,
                        filterParams: action.params
                    }
        }
    }
    return state
}
