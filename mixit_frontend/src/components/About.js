import React, {Component} from 'react'
import '../css/About.css'

class About extends Component {
    //TURN THIS INTO SLC?

    render() {
        window.scroll(0,0)

        
        return (
            <div className="about">
                <div className="about-links-container">
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><span onClick={()=>{window.scrollTo(0,140)}}>Overview</span></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><span onClick={()=>{window.scrollTo(0,740)}}>Exploring a Drink</span></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><span onClick={()=>{window.scrollTo(0,1440)}}>Utilized Software</span></h3>
                    <span className="about-link-separator">■</span>
                </div>

                <div id="overview" className="about-chunk" >
                    <h3>Overview</h3>
                        <p>
                            Welcome to Mixit! This application is for those interested in the field of mixology. 
                            Feel free to peruse through the library of all of our drinks, or simply hit the Random Drink link
                            to load one of the drinks in our database with ease. 
                        </p>
                        <br></br>
                        <p>
                            Using this application, you can favorite a drink, mark a drink as having been made. 
                            You can also choose to review a drink as well.
                        </p>
                        <br></br>
                        {/* <p>
                            We also have an in progress alcohol section, where you can learn more about the alcohols that make up each drink. 
                        </p> */}
                        <p>
                            We hope that by using this application, your interest in mixology will grow and you will have dozens of new alcoholic experiences ahead of you. 
                        </p>
                </div>

                <div id="explore" className="about-chunk" >
                    <h3>Exploring a Drink</h3>
                        <p>
                            Each drink has various aspects to it. They are displayed when you visit a drink's page. The chart below describes each aspect
                        </p>
                        <div className="drink-breakdown">
                            <h4>Breakdown of Drink Qualities</h4>
                            <ul>    
                                <li><span className="about-stat">Name</span>: The drink's name.</li>
                                <li><span className="about-stat">Alcohols</span>: The alcohols used to make the drink. Listed with the alcohol of the highest volume first. (In the event there is no prominent alcohol, a random one is listed first).</li>
                                <li><span className="about-stat">Flavors</span>: The flavors of the drink, to get a feel of the taste.</li>
                                <li><span className="about-stat">Types</span>: Various qualities that relate to the drink in some way. For example, preparation difficulty, etc.</li>
                                <li><span className="about-stat">Color</span>: The color of the drink.</li>
                                <li><span className="about-stat"></span></li>
                                <li><span className="about-stat"></span></li>
                                <li><span className="about-stat"></span></li>
                            </ul>
                        </div>
                        <p>After you've marked some drinks as favorited, made, or of interest, go to your Profile to check them out!</p>
                        <br></br>
                </div>
                <div id="utilized-software" className="about-chunk" >
                    <h3>Utilized Software</h3>
                        <h4 className="list-header">Frontend</h4>
                            <ul className="method-list">
                                <li><span>-</span>React</li>
                                <li><span>-</span>React-paginate: frontend pagination bar to display paginated data</li>
                                <li><span>-</span>Redux (with persist)</li>
                                <li><span>-</span>React Auth (with JWT)</li>
                            </ul>
                            <h4 className="list-header">Backend</h4>
                            <ul className="method-list">
                                <li><span>-</span>Ruby on Rails</li>
                                <li><span>-</span>Ruby gem: will_paginate to paginate backend data</li>
                                <li><span>-</span>Use of environmental variables to provide secret key to JWT</li>
                                <li><span>-</span>Sorting algorithm to obtain top 3 drinks, accounting for ties on each level.</li>
                            </ul>
                </div>
            </div>
        );  
    }
}

export default About;




