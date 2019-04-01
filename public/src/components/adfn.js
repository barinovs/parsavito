import React from 'react'
import Prices from './prices'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Adfn = props => {
    const { del } = props.ad
    const { ad } = props
    const classDel = (del=="1") ? "del" : ""

    const toggle = () => {
        console.log('oggle');
    }

    return (
        <tr className={classDel}>
            <td>{ad.id}</td>
            <td>
                <img src={"http://parsavito/public/img/"+ad.id+".jpg"} height="100" onClick={toggle}/>

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


            </td>
            <td><a href={props.ad.url} target="_blank">{ad.city}</a></td>
            <td>{ad.name}</td>
            <td>{ad.yearIssue}</td>
            <td>{ad.mileage}</td>
            <td><Prices prices={ad.prices} /></td>
            <td>{ad.phone_number}</td>
        </tr>
    )
}

export default Adfn
