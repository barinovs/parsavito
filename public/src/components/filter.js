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

import SliderComponent from './slider'

import Slider2 from './slider2'

import { getAllAds, setAdsNoLoad, setFilterParams } from '../actions/index'

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
            yearMinDefault: 1940,
            yearMaxDefault: 2019,
            yearMin: 1940,
            yearMax: 2019,
            mileageMinDefault: 0,
            mileageMaxDefault: 1000000,
            mileageMin: 0,
            mileageMax: 1000000,
            priceMinDefault: 0,
            priceMaxDefault: 1000000,
            priceMin: 0,
            priceMax: 1000000
        }
        this.toggle = this.toggle.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.refresh = this.refresh.bind(this)
        this.setSliderValue = this.setSliderValue.bind(this)
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

        const { yearMin, yearMax, mileageMin, mileageMax, priceMin, priceMax } = this.state

        const { adQueryID, getAllAds, setAdsNoLoad, setFilterParams } = this.props

        setAdsNoLoad()

        const params = {
            orderBy: this.state.orderBy,
            itemPerPage: itemPerPage,
            adQueryID: adQueryID,
            city: city,
            name: name,
            yearMin: yearMin,
            yearMax: yearMax,
            mileageMin: mileageMin,
            mileageMax: mileageMax,
            priceMin: priceMin,
            priceMax: priceMax
        }

        setFilterParams(params)

        const queryString = parseQueryString(params)

        console.log('item_per_page: ' + itemPerPage);
        console.log('queryString: ' + queryString);

        axios.get(API_ENDPOINT + 'getData.php'  + queryString,
                  {
                      headers: { 'Content-Type': 'application/json' }
                  })
        .then(response => {
            getAllAds(response.data, params.adQueryID)
        })
        .catch(error => {
            console.log(error);
        })
    }

    setSliderValue(value, paramType) {
        switch (paramType.paramType) {
            case "yearIssue": {
                this.setState({
                    yearMin: value.value.min,
                    yearMax: value.value.max
                })
            }break
            case "mileage": {
                this.setState({
                    mileageMin: value.value.min,
                    mileageMax: value.value.max
                })
            }break
            case "price": {
                this.setState({
                    priceMin: value.value.min,
                    priceMax: value.value.max
                })
            }
        }

    }

    render() {
        const { yearMinDefault, yearMaxDefault, mileageMinDefault, mileageMaxDefault, priceMinDefault, priceMaxDefault } = this.state
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
                        <label>Год выпуска</label>
                        <Slider2 min={yearMinDefault} max={yearMaxDefault} setSliderValue={this.setSliderValue} paramType="yearIssue" step={1}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm="3">
                        <span>Пробег</span>
                        <Slider2 min={mileageMinDefault} max={mileageMaxDefault} setSliderValue={this.setSliderValue} paramType="mileage" step={1000}/>
                    </Col>
                    <Col sm="3">
                        <span>Цена</span>
                        <Slider2 min={priceMinDefault} max={priceMaxDefault} setSliderValue={this.setSliderValue} paramType="price" step={5000}/>
                    </Col>
                    <Col sm="3"><span>Дата добавления</span></Col>
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
        getAllAds: bindActionCreators(getAllAds, dispatch),
        setAdsNoLoad: bindActionCreators(setAdsNoLoad, dispatch),
        setFilterParams: bindActionCreators(setFilterParams, dispatch)
    }
}
//export default connect(null, null)(Filter)
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
