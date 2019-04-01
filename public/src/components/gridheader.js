import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setItemPerPage, getAllAds } from '../actions/index'
import load from '../utils/load.js'
import { parseQueryString } from '../helpers'
import { API_ENDPOINT } from './../helpers/Constant'
import Button from './button/button'

import ComboboxCont from '../containers/combobox'

class GridHeader extends React.Component{
    constructor(props) {
        super(props)
        this.changeItemPerPage = this.changeItemPerPage.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    changeItemPerPage(e) {
        this.props.setItemPerPage(Number(e.target.value))
    }

    onExit() {
        const parameters = {
            item_per_page: this.props.itemPerPage
        }
        const queryString = parseQueryString(parameters)
        const { getAllAds } = this.props
        const url = API_ENDPOINT + 'getData.php' + queryString

        load(url)
        .then(ads => {
            getAllAds(JSON.parse(ads));
            this.setState({adsIsLoad: true})
        })

    }

    render() {
        const { itemPerPage, getAllAds } = this.props
        return(
            <div>

                <label htmlFor="item_per_page">Количество объявлений на странице </label>
                <input id="item_per_page" type="text" placeholder="Количество обявлений" defaultValue={itemPerPage} onChange={this.changeItemPerPage} onBlur={this.onExit} /> <br></br>
                <label htmlFor="">Количество объявлений на странице </label>
                <ComboboxCont />

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        itemPerPage : state.itemPerPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch),
        setItemPerPage: bindActionCreators(setItemPerPage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridHeader)
