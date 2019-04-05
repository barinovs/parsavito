import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { refreshAds } from '../actions/index'
import Ad from './ad'
import Adfn from './adfn'
import Search from './search'
import Pagination from './pagination'
import load from '../utils/load.js'
import GridHeader from './gridheader'
import { Table } from 'reactstrap'
import ReactToExcel from 'react-html-table-to-excel'
// import ReactSVG from 'react-svg'
import PreloadImage from './preloadImg'

import { TableHeaders } from '../helpers'



class Grid extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.ads,
            sortBy: null,
            descending: false
        }
        this.sort = this.sort.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.props.ads) {
            this.setState({
                data: this.props.ads
            })
        }
    }

    sort(e) {

        const { refreshAds } = this.props

        const field = e.target.getAttribute('field')
        const data = this.props.filteredAds.slice();
        const descending = this.state.sortBy === field && !this.state.descending;
        const sortBy = this.state.sortBy

        if (field == "mileage") {
            data.sort(function(a, b) {
                return descending
                ? (Number(a[field]) < Number(b[field]) ? 1 : -1)
                : (Number(a[field]) > Number(b[field]) ? 1 : -1)
            })
        }else if (field == "price") {
            data.sort(function(a, b) {
                let _a = Number(a.prices[0].price)
                let _b = Number(b.prices[0].price)
                return descending
                ? (_a < _b ? 1 : -1)
                : (_a > _b ? 1 : -1)
            })
        }else{
            data.sort(function(a, b) {
                return descending
                ? (a[field] < b[field] ? 1 : -1)
                : (a[field] > b[field] ? 1 : -1)
            })
        }


        refreshAds(data)

        this.setState({
            sortBy: field,
            descending: descending,
        });

    }

    render() {
        const { adsIsLoad } = this.props
        // const ads = this.state.data
        const ads = this.props.ads

        const headers = TableHeaders

        if (!adsIsLoad) {
            return <PreloadImage />
        }else{
            return(
                <div>

                <Table dark size="sm" bordered id="tbl">
                <thead onClick={this.sort}>
                    <tr>
                        {
                            headers.map( (item, idx) => {
                                if (this.state.sortBy === item.field) {
                                    item.title += this.state.descending ? ' \u2193' : ' \u2191'
                                }
                                return <th field={item.field} key={idx}>{item.title}</th>
                            } )
                        }
                    </tr>
                </thead>
                <tbody>
                    <Search />
                    {
                        ads.map( (ad, idx) => {
                            return <Ad ad={ad} key={idx} className="bigImgModal"/>
                        })
                    }
                </tbody>
                </Table>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        ads : state.ads,
        filteredAds : state.filteredAds,
        adsIsLoad : state.adsIsLoad
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshAds: bindActionCreators(refreshAds, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
