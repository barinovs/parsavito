import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Combobox from '../components/combobox/combobox'

import { getAllAds, filterAds, setAdsNoLoad } from '../actions/index'

class ComboboxCont extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        // !!!! ВОТ ТУТ НЕ ЗАБУДЬ ДОБАВИТЬ НАЗВАНИЕ ФУНКЦИИ !!!!!!!!!!!!!!!!!!!!!!!!!!!
        const { adsQuery, getAllAds, filterAds, setAdsNoLoad } = this.props
        return(
            <Combobox items={adsQuery} getAllAds={getAllAds} filterAds={filterAds} setAdsNoLoad={setAdsNoLoad} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adsQuery : state.adsQuery
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch),
        filterAds: bindActionCreators(filterAds, dispatch),
        setAdsNoLoad: bindActionCreators(setAdsNoLoad, dispatch)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxCont)
