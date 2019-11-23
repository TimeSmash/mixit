import React, {Component} from 'react'
import Heart1 from '../images/Heart1.png'
import Heart2 from '../images/Heart2.png'
import InteractionBar from './InteractionBar'
class About extends Component {
    state = {heartImg: Heart1}


    render() {
        return (
            <div>
                <div className="about-links">
                    <h1>Overview</h1>
                    <h1>How To Use</h1>
                    <h1>???</h1>
                    <InteractionBar/>
                </div>
            </div>
        );
    }
}

export default About;