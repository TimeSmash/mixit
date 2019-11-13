import React, {Component} from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import DrinkCard from './DrinkCard' 
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
        componentWillMount(){
            console.log("cdW")
        }

    componentDidMount(){
        console.log("cDM says this.state.page is", this.state.page)
        fetch(BACKEND_URL+"/all_drinks_paginated/"+this.state.page,
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
        console.log("cDM data after fetch",json)
        this.setState({drinkAndPageInfo: json, loading: false})
    }
    )}

    componentDidUpdate(){
        console.log("AllDrinks updated")
    }
    // drinkAndPageInfo format {drinks: Array(14), page: 1, pages: 5}
    //     fetch(BACKEND_URL+"/all_drinks")
    // .then(res=> res.json())
    // .then(json=> this.setState({drinkAndPageInfo: json.data, loading: false}))}
    //     .then(json=> console.log("thing", json.data)) 


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
        console.log("data retrieved from page "+page,json) //gets new array of Drink objects
        // Then set dAPI to json, page to current page
        this.setState({drinkAndPageInfo: json, page: page})
        // this.setState({drinkAndPageInfo: json, loading: false})        
    })
    }

    // click cuse this.state.page = whatever NUM
    // setState triggers rerender
    // 

    allDrinks = () => {
        
        // console.log("PageAndDrink",this.state.drinkAndPageInfo)
        if (this.state.drinkAndPageInfo.drinks !== undefined) {
            return this.state.drinkAndPageInfo.drinks.map(drinkObj => <DrinkCard 
                key={drinkObj.id}
                drinkId={drinkObj.id}
                imgUrl={drinkObj.picture_url}
                name={drinkObj.name}
        />)
        } else {return null}
    }

    handlePageClick = (event) => {
        console.log("page clicked",event)
        this.getDrinksAndInfoFromPage(event.selected+1)
    }
    // key={drinkObj.id}
    //     drinkId={drinkObj.id}
    //     imgUrl={drinkObj.attributes.picture_url}
    //     name={drinkObj.attributes.name}

    render() {
        console.log("RENDER: New state of AllDrinks",this.state)
        
        return (
            <div>
            <h1>All Drinks--</h1>

            <div>
                {this.state.loading ? 
                    <Loader/> : 
                    
                    <div>
                    <ReactPaginate id="react-paginate"
                    // Labels
                    previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      //   classNames
                      containerClassName={'react-paginate'} //className for container
                      previousClassName={'previous'}
                      nextClassName={'next'}
                      pageClassName={'page'}
                      activeClassName={'active'} //className for activepage
                      breakClassName={'break-me'}
                      pageLinkClassName={'page-link'}
                      disabledClassName={'disabled'}
                    //   
                      pageCount={this.state.drinkAndPageInfo.page_count} //total pages
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                    
                      initialPage={0} //a page is treated like an item in array, therefore [0] is the 1st page
                      onPageChange={(event) => {this.handlePageClick(event)} /*Fxn when page clicked*/}
                      disableInitialCallback={true}
                    />
                        <div className="card-deck">
                            {/* {this.getDrinksAndInfoFromPage(this.state.page)} */}
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
  export default AllDrinks;

// export default AllDrinks;