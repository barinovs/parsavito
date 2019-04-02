import { DEFAULT_ITEM_PER_PAGE, DEFAULT_ORDER_BY, DEFAULT_ORDER_TYPE, DEFAULT_PAGE, DEFAULT_SEARCH, DEFAULT_AD_QUERY_ID } from './Pagination';

export function parseQueryString(parameters = {})
{
    let queryString = '?';
    const itemPerPage = (parameters.itemPerPage != null) ? parameters.itemPerPage : DEFAULT_ITEM_PER_PAGE;

    queryString += 'item_per_page=' + itemPerPage + '&';

    const orderBy = (parameters.orderBy != null) ? parameters.orderBy : DEFAULT_ORDER_BY;
    queryString += 'order_by=' + orderBy + '&';

    const orderType = (parameters.orderType != null) ? parameters.orderType : DEFAULT_ORDER_TYPE;
    queryString += 'order_type=' + orderType + '&';

    const search = (parameters.search != null) ? parameters.search : DEFAULT_SEARCH;
    queryString += 'name=' + search + '&';

    const page = (parameters.page != null) ? parameters.page : DEFAULT_PAGE;
    queryString += 'page=' + page + '&';

    const adQueryID = (parameters.adQueryID != null) ? parameters.adQueryID : DEFAULT_AD_QUERY_ID;
    queryString += 'ad_query_id=' + adQueryID + '&';

    queryString = queryString.substr(0, queryString.length - 1);
    return queryString;
}
