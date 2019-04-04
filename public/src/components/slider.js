import React, { Component } from 'react'

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class SliderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 10
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
        this.handleChangeStart = this.handleChangeStart.bind(this)
    }

    handleChangeStart() {
      console.log('Change event started')
    }

    handleChange(value) {
      this.setState({
        value: value
      })
    }

    handleChangeComplete() {
      console.log('Change event completed')
    }


    render() {
        const { value } = this.state
        const { className } = this.props
        return(
            <div className={'slider ' + className}>
              <Slider
                min={0}
                max={100}
                value={value}
                reverse={false}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
              <div className='value'>{value}</div>
            </div>
        )
    }

}
export default SliderComponent
