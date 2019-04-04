import React, { Component } from 'react'
import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css'
import '../css/slider2.css'

class Slider2 extends Component{
    constructor(props) {
        super(props)
        this.state = {
          value: {
              min: this.props.min,
              max: this.props.max }
        }
    }



    render() {
        const { min, max } = this.props
        return(
              <InputRange
                minValue={min}
                maxValue={max}
                value={this.state.value}
                onChange={value => { this.setState({ value }); this.props.setSliderValue({ value }) }} />
        )
    }

}
export default Slider2
