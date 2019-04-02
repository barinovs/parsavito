import React from 'react'
import Prices from './prices'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Ad extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          modal: false
        }
        this.showModal = this.showModal.bind(this)
    }

    showModal(e) {
        // let img = e.target
        // console.log(img.src)

        var img = new Image()
        var imgWidth = 0
        img.onload = function() {
          imgWidth = this.width
        }
        img.src = e.target.src;



        this.setState(prevState => ({
          modal: !prevState.modal,
          imgWidth: img.width
        }));
    }

    render() {
        const { ad } = this.props
        const { del } = this.props.ad
        const classDel = (del=="1") ? "del" : ""
        const imgWidth = this.state.imgWidth + 35

        return(
            <tr className={classDel}>
                <td>{ad.id }</td>
                { /*<
                <td>
                    img src={"http://parsavito/public/img/"+ad.id+".jpg"} height="100" onClick={this.showModal}/>

                    <Modal style={{maxWidth:imgWidth}} isOpen={this.state.modal} toggle={this.showModal} >
                      <ModalHeader toggle={this.showModal}>{ad.name} - {ad.prices[0].price}</ModalHeader>
                      <ModalBody>
                        <img id="biImg" src={"http://parsavito/public/img/"+ad.id+".jpg"} />
                      </ModalBody>
                    </Modal>
                </td>
                 */}
                <td><a href={ad.url} target="_blank">{ad.city}</a></td>
                <td>{ad.name}</td>
                <td>{ad.yearIssue}</td>
                <td>{ad.mileage}</td>
                <td><Prices prices={ad.prices} /></td>
                <td>{ad.phone_number}</td>
                <td>{ad.dateAdded}</td>
            </tr>
        )
    }

}
export default Ad
