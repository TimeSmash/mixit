import React, {Component} from 'react'
import '../css/About.css'

class About extends Component {
    //TURN THIS INTO SLC?


    render() {
        return (
            <div>
                <div className="about-links-container">
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link">Overview</h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link">Exploring a Drink</h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link">???</h3>
                    <span className="about-link-separator">■</span>
                </div>
            </div>
        );
    }
}

export default About;