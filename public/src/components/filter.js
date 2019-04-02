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
import InputRange from 'react-input-range'

import { getAllAds } from '../actions/index'

import { API_ENDPOINT } from '../helpers/Constant'

import { parseQueryString, DEFAULT_ORDER_BY } from '../helpers'

class Filter extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            title: 'ID',
            itemPerPage: this.props.itemPerPage,
            orderBy: DEFAULT_ORDER_BY,
            value: { min: 2, max: 10 }
        }
        this.toggle = this.toggle.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {

        TableHeaders.forEach( el => {
            if (el.field == DEFAULT_ORDER_BY) {
                this.setState({
                    title: el.title
                })
            }
        } )

    }

    toggle(sender) {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));

        if (!this.state.dropdownOpen) {

        }
        else {
            this.setState({
                orderBy: sender.currentTarget.getAttribute("field")
            })
        }


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
        const city = this.cityInput.value
        const name = this.nameInput.value

        const { adQueryID } = this.props

        const params = {
            orderBy: this.state.orderBy,
            itemPerPage: itemPerPage,
            adQueryID: adQueryID,
            city: city,
            name: name
        }

        const queryString = parseQueryString(params)

        console.log('item_per_page: ' + itemPerPage);
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
                                        return <DropdownItem key={idx} field={item.field} onClick={this.changeTitle} dropdownvalue={item.title}>{item.title}</DropdownItem>
                                    } )
                                }
                            </DropdownMenu>
                        </Dropdown>
                  </Col>
                </Row>
                <Row>
                    <Col sm="3"><label htmlFor="city">Город</label><input id="city" ref={(input) => this.cityInput = input}/></Col>
                    <Col sm="3"><label htmlFor="name">Марка - модель</label><input id="name" ref={(input) => this.nameInput = input}/></Col>
                    <Col sm="3">
                        <form className="form">
                            <InputRange
                                      draggableTrack
                                      maxValue={20}
                                      minValue={0}
                                      onChange={value => this.setState({ value5: value })}
                                      onChangeComplete={value => console.log(value)}
                                      value={this.state.value} />
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
         itemPerPage: state.itemPerPage,
         adQueryID: state.adQueryID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAds: bindActionCreators(getAllAds, dispatch)
    }
}
//export default connect(null, null)(Filter)
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
