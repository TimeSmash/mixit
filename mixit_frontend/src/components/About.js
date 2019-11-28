import React, {Component} from 'react'
import '../css/About.css'

class About extends Component {
    //TURN THIS INTO SLC?

    render() {
        return (
            <div className="about">
                <div className="about-links-container">
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><a href="#overview">Overview</a></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link"><a href="#explore">Exploring a Drink</a></h3>
                    <span className="about-link-separator">■</span>
                    <h3 className="about-link">???</h3>
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
                        <p>
                            We also have an in progress alcohol section, where you can learn more about the alcohols that make up each drink. 
                        </p>
                        <br></br>
                        <p>
                            We hope that by using this application, your interest in mixology will grow and you will have dozens of new alcoholic experiences ahead of you. 
                        </p>
                </div>

                <div id="explore" className="about-chunk" >
                    <h3>Exploring a Drink</h3>
                        <p>
                            In this section, we will discuss the various aspects of a drink's page.
                        </p>
                        
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Proin sagittis nisl rhoncus mattis rhoncus urna. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Eget felis eget nunc lobortis mattis. Bibendum enim facilisis gravida neque convallis. Neque sodales ut etiam sit amet nisl purus. Sed adipiscing diam donec adipiscing. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Neque vitae tempus quam pellentesque nec nam. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Neque ornare aenean euismod elementum nisi. Enim praesent elementum facilisis leo. Nunc eget lorem dolor sed viverra ipsum nunc. In tellus integer feugiat scelerisque varius morbi. Sollicitudin ac orci phasellus egestas tellus. Diam donec adipiscing tristique risus nec feugiat in fermentum. In massa tempor nec feugiat nisl pretium fusce id velit.</p>
                <p>Interdum consectetur libero id faucibus. Commodo quis imperdiet massa tincidunt. Morbi tempus iaculis urna id volutpat lacus laoreet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Mauris in aliquam sem fringilla ut. Egestas maecenas pharetra convallis posuere morbi leo. Velit euismod in pellentesque massa. Dui nunc mattis enim ut tellus elementum sagittis vitae et. At augue eget arcu dictum varius duis at consectetur lorem. Eu turpis egestas pretium aenean pharetra magna ac. Nunc sed augue lacus viverra. Elit pellentesque habitant morbi tristique senectus et.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat s eget nunc lobortis mattis. Bibendum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <br></br>
                </div>
            </div>
        );
    }
}

export default About;