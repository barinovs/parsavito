import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class table extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div></div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ads : state.ads,
        filteredAds : state.filteredAds
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        : bindActionCreators(, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)
