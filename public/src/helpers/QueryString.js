import { DEFAULT_ITEM_PER_PAGE, DEFAULT_ORDER_BY, DEFAULT_ORDER_TYPE, DEFAULT_PAGE, DEFAULT_NAME, DEFAULT_AD_QUERY_ID } from './Pagination';

export function parseQueryString(parameters = {})
{
    let queryString = '?';
    const itemPerPage = (parameters.itemPerPage != null) ? parameters.itemPerPage : DEFAULT_ITEM_PER_PAGE;

    queryString += 'item_per_page=' + itemPerPage + '&';

    const orderBy = (parameters.orderBy != null) ? parameters.orderBy : DEFAULT_ORDER_BY;
    queryString += 'order_by=' + orderBy + '&';

    const orderType = (parameters.orderType != null) ? parameters.orderType : DEFAULT_ORDER_TYPE;
    queryString += 'order_type=' + orderType + '&';

    const page = (parameters.page != null) ? parameters.page : DEFAULT_PAGE;
    queryString += 'page=' + page + '&';

    const adQueryID = (parameters.adQueryID != null) ? parameters.adQueryID : DEFAULT_AD_QUERY_ID;
    queryString += 'ad_query_id=' + adQueryID + '&';

    const city = (parameters.city != null) ? parameters.city : "";
    queryString += 'city=' + city + '&';

    const name = (parameters.name != null) ? parameters.name : "";
    queryString += 'name=' + name + '&';

    const yearMin = (parameters.yearMin != null) ? parameters.yearMin : "";
    queryString += 'year_min=' + yearMin + '&';

    const yearMax = (parameters.yearMax != null) ? parameters.yearMax : "";
    queryString += 'year_max=' + yearMax + '&';

    const mileageMin = (parameters.mileageMin != null) ? parameters.mileageMin : "";
    queryString += 'mileage_min=' + mileageMin + '&';

    const mileageMax = (parameters.mileageMax != null) ? parameters.mileageMax : "";
    queryString += 'mileage_max=' + mileageMax + '&';

    const priceMin = (parameters.priceMin != null) ? parameters.priceMin : "";
    queryString += 'price_min=' + priceMin + '&';

    const priceMax = (parameters.priceMax != null) ? parameters.priceMax : "";
    queryString += 'price_max=' + priceMax + '&';

    queryString = queryString.substr(0, queryString.length - 1);
    return queryString;
}
