import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { filterAds } from '../actions/index'

class Search extends React.Component{
    constructor(props) {
        super(props)
        this.state = {ads: this.props.ads}
        this.search = this.search.bind(this);
    }

    search(e) {

        let _ads = this.props.ads.slice()
        const field = e.target.getAttribute('field')
        const searchValue = e.target.value
        //
        // var result = _ads.filter(function(o) {
        //   return Object.keys(o).some(function(k) {
        //     return o[k].toString().toLowerCase().indexOf('м') != -1;
        //   })
        // })

        var result = _ads.filter(function(o) {
            return o[field].toString().toLowerCase().indexOf(searchValue) != -1;
          }
        )


        this.props.filterAds(result)

    }

    render() {
        return(
            <tr>
                <td></td>
                <td><input type="text" onChange={this.search} field="city" /></td>
                <td><input type="text" onChange={this.search} field="name" /></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    }

}

const mapStateToProps = (state) => {
    return {
         ads: state.ads
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterAds: bindActionCreators(filterAds, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
