import React, {Component} from 'react'
// import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom'
import DrinkCard from './DrinkCard' 
// import MetaButton from './MetaButton' 


import Loader from './Loader' 

import {BACKEND_URL} from '../constants'
// import {showProps} from '../constants'

import '../css/ReactPaginate.css'
import '../css/AllDrinks.css'

class AllDrinks extends Component {
    state = { loading: true,
              drinkAndPageInfo: {},
              page: 1  }
    // drinkAndPageInfo

// eslint-disable-next-line
        // componentWillMount(){
        //     console.log("cdW")
        // }

    componentDidMount(){
        // The route '/drinks' (see DrinksContainer) will give AllDrinks a props of startingPage = 1
        //When a user types in url '/drinks'. This ensures that typing/clicking NavBar link 
        //always has drinks page start off on page 1
        // console.log("cDM says this.state.page is", this.state.page)
        this.getDrinksAndInfoFromPage(this.props.startingPage)
        console.log("component Mounted")
    }

    // componentDidUpdate(){
    //     console.log("AllDrinks updated")
    // }
   
    // drinkAndPageInfo format {drinks: Array(14), page: 1, pages: 5}
    
    getDrinksAndInfoFromPage = (page) => {
        // First get info from clicked page #
        
        // this.setState({loading:true})
        // console.log("Page's value in getDrinksAndInfo is ",page)
        fetch(BACKEND_URL+"/all_drinks_paginated/"+page,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
        )
        .then(res=> res.json())
        .then(json=> {
        // console.log("data retrieved from page "+page,json) //gets/shows new array of Drink objects
        
        // Then set dAPI to json, page to current page
        this.setState({drinkAndPageInfo: json, loading: false})
        
        // Could also do: this.setState({drinkAndPageInfo: json, page: json.drinks.page, loading: false}) to get data from backend for current page
          
        
    })
    // eslint-disable-next-line
    { //CAN PROBS DELETE THIS OLD CRAP, review later then toss
        //active starts off as 1 always, then changes based on url. Previous-Disabled doesn't follow this change
    //So if the url's page number is NOT 1, remove disabled so it can be clicked when correct page is active 
    // if (document.getElementsByClassName('active')[0].innerText === "1" && page !== 1) {
    //     // debugger
    //     document.getElementsByClassName('disabled')[0].classList.remove("disabled")
    //     //if we are going to go to the last page though, add disabled onto the Next button
    //     if (page === json.page_count) {
    //         document.getElementsByClassName('next')[0].classList.add("disabled")
    //     }
    // } 

    // document.getElementsByClassName('active')[0].classList.remove("active")
    // var headings = document.evaluate(`//li[contains(., ${page})]`, document, null, XPathResult.ANY_TYPE, null );
    // var thisHeading = headings.iterateNext()
    // thisHeading.className += " active")
    }
}

    

    allDrinks = () => {
        
        // console.log("PageAndDrink",this.state.drinkAndPageInfo)
        if (this.state.drinkAndPageInfo.drinks !== undefined) {
            return this.state.drinkAndPageInfo.drinks.map(drinkObj => <DrinkCard
                drink={drinkObj}
                key={drinkObj.id}
        />)
        } else {return null}
    }

    handlePageClick = (event) => {
        //Points to the route using page # as arg, Route loads AllDrinks using page # as startingPage prop
        //So when click page #, /drinks/all_drinks/# is route, startingPage is #
        // document.getElementsByClassName('active')[0].classList.remove("active")
        this.setState({loading:true})
        this.props.history.push("/drinks/all_drinks/"+(event.selected+1))
        console.log("page clicked",event)
        this.getDrinksAndInfoFromPage(event.selected+1)
    }
    // key={drinkObj.id}
    //     drinkId={drinkObj.id}
    //     imgUrl={drinkObj.attributes.picture_url}
    //     name={drinkObj.attributes.name}

    render() {
        // console.log("AllDrinks's name is", typeof this.constructor.name)
        console.log("RENDER: New state of AllDrinks",this.state)
        console.log("AllDrinks props",this.props)
        window.scroll(0,290)
        return (
            <div className="all-drinks">
            <h1>All Drinks</h1>

            <div style={{paddingBottom:"2%"}}>
                {this.state.loading ? 
                    <Loader/> : 
                    
                    <div>
                    `<ReactPaginate id="react-paginate"
                    // Labels
                    previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      //   classNames
                      containerClassName={'react-paginate'} //className for container
                      
                      previousClassName={'previous'}
                      previousLinkClassName={'previous-link'}
                      breakClassName={'break-me'}
                      nextClassName={'next'}
                      nextLinkClassName={'next-link'}
                      
                      pageClassName={'page'}
                      pageLinkClassName={'page-link'}

                      activeClassName={'active'} //className for activepage
                      disabledClassName={'disabled'}
                    //   
                      pageCount={this.state.drinkAndPageInfo.page_count} //total pages
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      forcePage={this.state.drinkAndPageInfo.page-1}  
                       
                      onPageChange={(event) => {this.handlePageClick(event)} /*Fxn when page clicked*/}
                      disableInitialCallback={true}
                    />`
                        <div className="card-deck"style={{width:"90%",marginLeft:"8.5em"}}>
                            
                            {this.allDrinks()}
                        </div>
                    </div>
                }
            </div>
            {/* <button onClick={() => showProps(this)}>Console.log props (AllDrinks)</button> */}
            {/* <MetaButton pCompName={"AllDrinks"} pCompProps={this.props} pCompState={this.state}/> */}
            </div>
        );
    }
}



// function mapStateToProps(state){
//     return {allDrinks: state.allDrinks}
//   }
  export default withRouter(AllDrinks);

// export default AllDrinks;