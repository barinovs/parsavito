import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import load from '../utils/load.js'
import { div } from '../utils/foo.js'
import styles from './paginationStyles.js'
import { API_ENDPOINT } from './../helpers/Constant'
import { parseQueryString } from '../helpers'
import { getAllAds } from '../actions/index'

class Pagination extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const { adsCount, itemPerPage, adQueryID } = this.props

        // console.log('Количество ссылок в пагинации ' + div(adsCount, itemPerPage));

        let paginationArray = new Array()
        for (let i = 1; i <= div(adsCount, itemPerPage); i++) {
            paginationArray.push(i)
        }

        return (
            <div>
                {
                    paginationArray.map( (item, idx) => {
                        const params = {
                            page: idx+1,
                            adQueryID: adQueryID 
                        }
                        const queryString = parseQueryString(params)
                        return <a style={styles.aComponent} href={API_ENDPOINT + 'getData.php' + queryString} key={idx}>{item}</a>
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
        itemPerPage: state.itemPerPage,
        adQueryID: state.adQueryID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
