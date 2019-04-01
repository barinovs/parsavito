import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import load from '../utils/load.js'
import { getAllAds, setAllAds, getAdsQuery } from '../actions/index'
import ReactSVG from 'react-svg'
// import axios from 'axios'
import { API_ENDPOINT } from './../helpers/Constant'
import { parseQueryString } from '../helpers'

import Pagination from './pagination'
import GridHeader from './gridheader'
import Filter from './filter'
import ReactToExcel from 'react-html-table-to-excel'
import Grid from './grid'


class MainComponent extends React.Component{
    constructor(props) {
      super(props);
      this.state = {ads: [], adsIsLoad: true};
      this.loadAds = this.loadAds.bind(this);
      this.loadAdsQuery = this.loadAdsQuery.bind(this);
    }



    componentDidMount() {
        // this.loadAds();
        // this.loadAdsQuery();
    }

    loadAds() {
        const queryString = parseQueryString()
        const { getAllAds, setAllAds } = this.props
        const params = {item_per_page:800}
        const url = API_ENDPOINT + 'getData.php' + queryString
        // getAllAds(params)
        // load('http://parsavito/api/getData.php')

        load(url)
        .then(data => {
            getAllAds(JSON.parse(data));
            setAllAds(JSON.parse(data).recordCount)
            this.setState({adsIsLoad: true})
        })
    }

    loadAdsQuery() {
        const { getAdsQuery } = this.props
        const url = API_ENDPOINT + 'getAdsQuery.php'
        load(url)
        .then(data => {
            getAdsQuery(JSON.parse(data))
        })
    }

    render() {
      const { adsIsLoad } = this.state
      const { ads } = this.props

      return(
          <div>
              <ReactToExcel
                  className = "btn"
                  table = "tbl"
                  filename = "excelFile"
                  sheet = "Sheet 1"
                  buttonText = "Excel"
              />
              <Filter />
              {/*<GridHeader /> */}
              <Pagination />

              <Grid />
          </div>
      )

    }
}

const mapStateToProps = (state) => {
    return {
        ads : state.ads,
        adsCount: state.adsCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch),
        setAllAds: bindActionCreators(setAllAds, dispatch),
        getAdsQuery: bindActionCreators(getAdsQuery, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)
