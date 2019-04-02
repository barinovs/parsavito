import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux'
import { Dropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem,
         } from 'reactstrap'

import { TableHeaders } from '../helpers'
import ComboboxCont from '../containers/combobox'
import axios from 'axios'

import { getAllAds } from '../actions/index'

import { API_ENDPOINT } from '../helpers/Constant'

import { parseQueryString } from '../helpers'

class Filter extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            title: 'ID',
            itemPerPage: this.props.itemPerPage
        }
        this.toggle = this.toggle.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeTitle(sender) {

        const newState = {
          title: sender.currentTarget.getAttribute("dropdownvalue")
        }

        this.setState(newState)
        if (!!this.props.onChange) {
          this.props.onChange(newState.dropDownValue);
        }
    }

    refresh() {

        const itemPerPage = this.itemPerPageInput.value

        const params = {
            adQueryID: 2
        }

        const queryString = parseQueryString(params)

        console.log('itemPerPage: ' + itemPerPage);
        console.log('queryString: ' + queryString);


        // axios.get(API_ENDPOINT + 'getData.php'  + queryString,
        //           {
        //               headers: { 'Content-Type': 'application/json' }
        //           })
        // .then(response => {
        //     getAllAds(response.data, params.adQueryID)
        //     filterAds(response.data.records)
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }

    render() {
        return(
            <div>
                <Row>
                    <input type="button" value="Обновить" className="btn btn-refresh" onClick={this.refresh} />
                </Row>
                <Row>
                  <Col sm="3"><ComboboxCont /></Col>
                  <Col sm="3">Объявлений на странице <input ref={(input) => this.itemPerPageInput = input}/></Col>
                  <Col sm="3">
                      Упорядочить по полю
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                              {this.state.title}
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    TableHeaders.map( (item, idx) => {
                                        return <DropdownItem key={idx} onClick={this.changeTitle} dropdownvalue={item.title}>{item.title}</DropdownItem>
                                    } )
                                }
                            </DropdownMenu>
                        </Dropdown>
                  </Col>
                </Row>
                <Row>
                    Строка
                </Row>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
         itemPerPage: state.itemPerPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch)
    }
}
//export default connect(null, null)(Filter)
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
