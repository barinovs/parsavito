import React from 'react'
import ReactSVG from 'react-svg'


class PreloadImage extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="cover-div" style={{height:"100%"}}>
                <ReactSVG src='public/src/assets/829.svg' style={{marginLeft:"500px"}} />
            </div>
        )
    }

}
export default PreloadImage
