import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import ytbet from './contracts/ytbet.json';
import './App.css';

class Player2 extends Component {
    constructor (){
        super();
        this.state={
            web3: '',
            Amount: '',
            InputAmount: '',
            weiConversion : 1000000000000000000
        }
        this.getAmount = this.getAmount.bind(this); 
        this.Bet = this.Bet.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        getWeb3.then(results => {
          /*After getting web3, we save the informations of the web3 user by
          editing the state variables of the component */
          results.web3.eth.getAccounts( (error,acc) => {
            //this.setState is used to edit the state variables
            this.setState({
              web3: results.web3
            })
          });
          //At the end of the first promise, we return the loaded web3
          return results.web3
        }).then(results => {
          //In the next promise, we pass web3 (in results) to the getAmount function
          console.log("call getAmount",results);
          this.getAmount(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      getAmount(web3){
        //Get the contract
        const contract = require('truffle-contract');
        const Betting = contract(ytbet);
        console.log("contract",Betting);
        Betting.setProvider(web3.givenProvider);
        var BettingInstance;
        web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {//Instantiate the contract in a promise
          BettingInstance = instance}).then((result) => {
          //Calling the AmountOne function of the smart-contract
          return BettingInstance.getBetAmount.call({from: accounts[0]})
        }).then((result) => {
          //Then the value returned is stored in the Amount state var.
          //Divided by 10000 to convert in ether.
          console.log("amount",result);
          this.setState({
            Amount : 0
          })
        });
      })
      }

      Bet(){
        const contract = require('truffle-contract');
        const Betting = contract(ytbet);
        Betting.setProvider(this.state.web3.givenProvider);
        var BettingInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
            Betting.deployed().then((instance) => {
              BettingInstance = instance
            }).then((result) => {
              // Get the value from the contract to prove it worked.
              this.setState({Amount: 13})
              return BettingInstance.bet({from: accounts[0],
              value: 13})
            }).catch((e) => {
              console.log("Error with betting",e)
            })
          })
      }

      handleInputChange(e) {
        this.setState({InputAmount: e.target.value*this.state.weiConversion});
      }

      render(){
        return(
          <div>
            <h3>Player B</h3>
            <h4> Total amount : {this.state.Amount} ETH</h4>
            <button onClick={this.Bet}>Bet</button>
            </div>
            )
        }
}

export default Player2;