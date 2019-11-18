import React, {Component} from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom'
import DrinkCard from './DrinkCard' 
import DrinkCard2 from './DrinkCard2' 

import Loader from './Loader' 

import {BACKEND_URL} from '../constants'
import {showProps} from '../constants'

import '../css/ReactPaginate.css'

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
        // console.log("cDM says this.state.page is", this.state.page)
        this.getDrinksAndInfoFromPage(this.props.startingPage)
    }

    // componentDidUpdate(){
    //     console.log("AllDrinks updated")
    // }
   
    // drinkAndPageInfo format {drinks: Array(14), page: 1, pages: 5}
    getDrinksAndInfoFromPage = (page) => {
        // First get info from clicked page #
        
        // this.setState({loading:true})
        
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
        // console.log("data retrieved from page "+page,json) //gets new array of Drink objects
        // Then set dAPI to json, page to current page
        this.setState({drinkAndPageInfo: json, loading: false})
        // Could also do: this.setState({drinkAndPageInfo: json, page: json.drinks.page, loading: false}) to get data from backend for current page
        // this.setState({drinkAndPageInfo: json, loading: false})    
        if (document.getElementsByClassName('active')[0].innerText === "1" && page !== 1) {
            document.getElementsByClassName('disabled')[0].classList.remove("disabled")
        }    
        document.getElementsByClassName('active')[0].classList.remove("active")
        var headings = document.evaluate(`//li[contains(., ${page})]`, document, null, XPathResult.ANY_TYPE, null );
        var thisHeading = headings.iterateNext()
        thisHeading.className += " active"
    })
}

    // click cuse this.state.page = whatever NUM
    // setState triggers rerender
    // 

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
        document.getElementsByClassName('active')[0].classList.remove("active")


        this.props.history.push("/drinks/all_drinks/"+(event.selected+1))
        console.log("page clicked",event)
        this.getDrinksAndInfoFromPage(event.selected+1)
    }
    // key={drinkObj.id}
    //     drinkId={drinkObj.id}
    //     imgUrl={drinkObj.attributes.picture_url}
    //     name={drinkObj.attributes.name}

    render() {
        console.log("RENDER: New state of AllDrinks",this.state)
        console.log("AllDrinks props",this.props)
        
        return (
            <div>
            <h1>All Drinks--</h1>

            <div>
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

                      pageClassName={'page'}
                      pageLinkClassName={'page-link'}

                      activeClassName={'active'} //className for activepage
                      disabledClassName={'disabled'}
                    //   
                      pageCount={this.state.drinkAndPageInfo.page_count} //total pages
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                    
                       //a page is treated like an item in array, therefore [0] is the 1st page
                      onPageChange={(event) => {this.handlePageClick(event)} /*Fxn when page clicked*/}
                      disableInitialCallback={true}
                    />`
                        <div className="card-deck"style={{width:"90%",marginLeft:"8.5em"}}>
                            
                            {this.allDrinks()}
                        </div>
                    </div>
                }
                            </div>
            <button onClick={() => showProps(this)}>Console.log props (AllDrinks)</button>
            </div>
        );
    }
}

// function mapStateToProps(state){
//     return {allDrinks: state.allDrinks}
//   }
  export default withRouter(AllDrinks);

// export default AllDrinks;