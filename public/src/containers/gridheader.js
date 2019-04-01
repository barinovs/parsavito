import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setItemPerPage } from '../actions/index'
import GridHeader from '../components/gridheader'


class GridHeaderCont extends React.Component{
    constructor(props) {
        super(props)
        this.changeItemPerPage = this.changeItemPerPage.bind(this);
    }

    changeItemPerPage(e) {
        console.log('Сработал онченч ' + e.target.value);
        this.props.setItemPerPage(77)
    }    

    render() {
        const { itemPerPage, getAllAds } = this.props
        return(
            <input type="text" placeholder="Количество обявлений" defaultValue={itemPerPage} onChange={this.changeItemPerPage} />
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
        setItemPerPage: bindActionCreators(setItemPerPage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridHeaderCont)
