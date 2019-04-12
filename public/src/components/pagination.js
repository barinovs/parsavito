import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import load from '../utils/load.js'
import { div } from '../utils/foo.js'
import styles from './paginationStyles.js'
import { API_ENDPOINT } from './../helpers/Constant'
import { parseQueryString } from '../helpers'
import { getAllAds, setAdsNoLoad } from '../actions/index'
import axios from 'axios'


class PaginationComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {currentPage:0}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, index) {

        const {adQueryID, getAllAds, setAdsNoLoad} = this.props

        e.preventDefault();

        setAdsNoLoad()

        this.setState({
          currentPage: index
        })

        const { filterParams } = this.props
        //var _filterParams = Object.assign({}, filterParams)
        filterParams.page = index
        const queryString = parseQueryString(filterParams)
        console.log(queryString);

        axios.get(API_ENDPOINT + 'getData.php'  + queryString,
                  {
                      headers: { 'Content-Type': 'application/json' }
                  })
        .then(response => {
            getAllAds(response.data, filterParams.adQueryID)
        })
        .catch(error => {
            console.log(error);
        })

    }

    render() {
        const { adsCount, adQueryID, ads } = this.props
        const { currentPage } = this.state
        const itemPerPage = this.props.filterParams.itemPerPage

        // console.log('Количество ссылок в пагинации ' + div(adsCount, itemPerPage));

        let paginationArray = new Array()
        for (let i = 1; i <= div(adsCount, itemPerPage); i++) {
            paginationArray.push(i)
        }

        return (
            <div>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                      <PaginationLink
                        previous
                        href="#"
                        onClick={e => this.handleClick(e, currentPage - 1)}
                      />
                    </PaginationItem>

                    { paginationArray.map( (page, idx) =>
                        <PaginationItem active={idx === currentPage} key={idx}>
                          <PaginationLink onClick={e => this.handleClick(e, idx)} href="#">
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink
                        next
                        href="#"
                        onClick={e => this.handleClick(e, currentPage + 1)}
                      />
                    </PaginationItem>
                </Pagination>
                {
                    paginationArray.map( (item, idx) => {
                        const params = {
                            page: idx+1,
                            adQueryID: adQueryID
                        }

                        {/*return <a style={styles.aComponent} href={API_ENDPOINT + 'getData.php' + queryString} key={idx}>{item}</a>
                        return <div className="btn-pagination" style={{float:"left", marginLeft:"15px"}} key={idx}>{item}</div>*/}
                    } )
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ads : state.ads,
        adsCount: state.adsCount,
        filterParams: state.filterParams,
        adQueryID: state.adQueryID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch),
        setAdsNoLoad: bindActionCreators(setAdsNoLoad, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)
