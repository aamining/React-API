import React, { Component } from 'react';
import './App.css';
import Stockinfo from './components/StockInfo';
import {loadQuoteForStock, loadLogoForStock} from './api/iex';


class App extends Component {
  state = {
    symbol: 'F',
    quote: null,
    logo: null,
    hasError: false
  }

  componentDidMount() {
    this.loadQuote()
    this.loadLogo()
  }

  componentDidUpdate(){
    console.log("I am in componentDidUpdate");
  }

  componentDidCatch() {
    this.setState({ hasError: true})
  }

  loadQuote() {

    loadQuoteForStock(this.state.symbol)
      .then((quote) => {
        console.log(quote)
        this.setState({ quote: quote })
        // setState is a react method which able to change state
        // find more in following link:
        //https://reactjs.org/docs/state-and-lifecycle.html
      })
      .catch((err) => {console.log(err);
        this.componentDidCatch ();
      })


    }

  loadLogo(){

    loadLogoForStock(this.state.symbol)
      .then((logo) => {
        //console can not show logo
        //console.log(logo)
      this.setState({ logo: logo.url})
      })
  }


  handleSymbolChange = (event) => {
    //const target = event.target;
    //const symbol = target.value;
    const symbol = event.target.value;
    this.setState({ symbol: symbol });
    console.log(event);
  }

  handleButtonClick = (event) => {
    console.log(event.target);
    this.loadQuote();
    this.loadLogo();
  }

  render() {
    console.log(`state is: ${this.state.symbol}`)

    if(this.state.hasError) {
      return (
        <div className="App">
          <h2>Sorry, wrong input :-( </h2>
          <p>Refresh the page and try again</p>
        </div>
      );
    }






     return (
       <div className="App">
         <h1>Wolf of React</h1>
         <input
            value={ this.state.symbol }
            placeholder="Enter symbol"
            onChange={this.handleSymbolChange}
          />
          <button onClick = { this.handleButtonClick }>Get Quote</button>

          <Stockinfo{...this.state.quote}/>

          

          <img src={this.state.logo} />

       </div>
     );
   }
}

export default App;
