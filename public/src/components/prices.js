import React from 'react'


class Prices extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const { prices } = this.props
        // const prices = this.props.prices.slice(0,1)
        return(
            <span>
                {
                    prices.map( (item, idx) => {
                        return <li key={idx}>{`${item.price} ${item.datechange}`}</li>
                    } )
                }
            </span>
        )
    }

}
export default Prices
