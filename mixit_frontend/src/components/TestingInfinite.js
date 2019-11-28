// An experiment on testing infinite scroll. Not currently being used, leave here in case want to try working on again.

// import React, {Component} from 'react'
// import {Route, Switch} from 'react-router-dom';
// import { connect } from 'react-redux';
// import DrinkCard from './DrinkCard' 


// import {showProps} from '../constants'
// class TestingInfinite extends Component {
    
//     // The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.
//     // window.innerHeight is the height of the viewport (excludes your browser search bar and crap)
//     // .offsetHeight takes the height of element including padding and borders
//     //documentElement is the root element of document (ex. for html, returns <html>)
//     //     if (
//         // if the height of the window + how much the element is scrolled veritcally === whole height of element
//         // then we should load more items
//         //         window.innerHeight + document.documentElement.scrollTop
//         //         === document.documentElement.offsetHeight
//         //       ) {
//             //         loadUsers();
//             //       }
//             //     }, 100);
//             //   }
            
            
//             state = {  itemLimit: 5, loading: false }

//             componentDidMount() {
//                 // Detect when scrolled to bottom.
//                 this.refs.myscroll.addEventListener("scroll", () => {
//                   if (
//                     this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
//                     this.refs.myscroll.scrollHeight
//                   ) {
//                     this.loadMore();
//                   }
//                 });
//               }


//             drinksToLoad = () => {
//                 let drinks = []
//                 for (var i = 0; i < this.state.itemLimit; i++) {
//                     drinks.push(
//                         <DrinkCard 
//                 key={this.props.allDrinks[i].id}
//                 drinkId={this.props.allDrinks[i].id}
//                 imgUrl={this.props.allDrinks[i].attributes.picture_url}
//                 name={this.props.allDrinks[i].attributes.name}
//                 />);
//                   }
//                   return drinks;
//             }

//             loadMore = () => {
//                 this.setState({loading: true})
//                 setTimeout(() => {
//                     this.setState({ itemLimit: this.state.itemLimit + 5, loading: false });
//                   }, 2000);
//             }
//             render() {
//     // console.log(this.state.allDrinks)

//     return (
//             <div ref="myscroll" style={{height:"300px"}}>
//             <h1>All Drinks TESTING INFINITE--</h1>

//         <div className="card-deck">
//             {this.props.allDrinks.length ? this.drinksToLoad(): null}
//         </div>
//         <button onClick={() => showProps(this)}>Console.log props (TestingInfinite)</button>
//             </div>
//     );
// }
// }

// function mapStateToProps(state){
// return {allDrinks: state.allDrinks}
// }
// export default connect(mapStateToProps)(TestingInfinite);



// export default TestingInfinite;