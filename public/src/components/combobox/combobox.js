import React from 'react'
import axios from 'axios'
import ReactSVG from 'react-svg'

import { API_ENDPOINT } from './../../helpers/Constant'

import { parseQueryString } from '../../helpers'

import { Dropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem,
         Button,
         Modal,
         ModalHeader,
         ModalBody,
         ModalFooter,
         Form,
         FormGroup,
         Label,
         Input,
         FormText,
         Col  } from 'reactstrap'

class Combobox extends React.Component{
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.showModal = this.showModal.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeAdQueryURL = this.changeAdQueryURL.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
          dropdownOpen: false,
          title: 'Список запросов',
          modal: false,
          description: '',
          adQueryURL: '',
          adQueryID: 0,
          items: []
        }
    }

    toggle(e) {

      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));

      const queryString = ''
      const url = API_ENDPOINT + 'getAdsQuery.php' + queryString

      // Событие при открытии списка
      if (!this.state.dropdownOpen) {

          axios.get(url, {
              headers: { 'Content-Type': 'application/json' }
          })
          .then(response => {
              this.setState({
                  items: response.data
              })
          })
      }
      // Событие при выборе элемента списка
      else {

          // const { getAllAds, filterAds, setAdsNoLoad, setAdQueryID } = this.props
          const { setAdQueryID } = this.props

          // setAdsNoLoad()

          const adQueryID = e.currentTarget.getAttribute("id")

          const params = {
              adQueryID: adQueryID
          }

          setAdQueryID(adQueryID)

          // const queryString = parseQueryString(params)
          // console.log(API_ENDPOINT + 'getData.php'  + queryString)
          //
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

    showModal() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    changeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    changeAdQueryURL(e) {
        this.setState({
            adQueryURL: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        var params = new URLSearchParams();
        params.append('description', this.state.description);
        params.append('adQueryURL', this.state.adQueryURL);

        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/api/insertAdQuery.php',
            data: params
        })
        .then(function(response) {

        })
        .catch(function (error) {
            console.log(error);
        });

        this.showModal()


    }

    render() {
        const { items } = this.state
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.title}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Список запросов</DropdownItem>
                <DropdownItem onClick={this.showModal}>Новый запрос</DropdownItem>
                <DropdownItem divider></DropdownItem>
                {
                    items.map( (item, idx) => {
                        return <DropdownItem onClick={this.changeTitle} key={idx} id={item.id} dropdownvalue={item.description}>{item.description}</DropdownItem>
                    } )
                }

                <Modal isOpen={this.state.modal} toggle={this.showModal} className={this.props.className}>
                  <ModalHeader toggle={this.showModal}>Добавить новый запрос</ModalHeader>
                  <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="description" sm={2}>Описание запроса</Label>
                            <Col sm={10}>
                              <Input type="textarea" name="description" id="description" placeholder="Описание запроса"  onChange={this.changeDescription}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="adQueryURL" sm={2}>Адресная строка</Label>
                            <Col sm={10}>
                              <Input type="textarea" name="adQueryURL" id="adQueryURL" placeholder="Адресная строка" onChange={this.changeAdQueryURL} />
                            </Col>
                        </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Сохранить</Button>{' '}
                    <Button color="secondary" onClick={this.showModal}>Отмена</Button>
                  </ModalFooter>
                </Modal>

              </DropdownMenu>
            </Dropdown>
        )
    }

}
export default Combobox
