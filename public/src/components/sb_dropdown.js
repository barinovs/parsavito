import React from 'react'

import { Dropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem,
         } from 'reactstrap'

class dropDown extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            title: 'ID'
        }
        this.toggle = this.toggle.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
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

    render() {
        return(
            <div></div>
        )
    }

}
export default DropDown
