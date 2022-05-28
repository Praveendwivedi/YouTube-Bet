import logo from './logo.svg';
import './App.css';
import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Player1  from "./Player1.jsx";
import Player2  from "./Player2.jsx";
// import TeamA from './TeamA.jsx';
import { Component } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App  extends Component{
  constructor(){
    super(); //This is needed in every constructor to allow the use of 'this'//We define the two variables we need in the state of our component, so they can be updated
    this.state = {
      web3 : '',
      address: '',
    };
  }
  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        console.log("acc:",results.web3);
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  render(){
      return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
      <div>
          Welcome on my Ethereum Betting website <br/>
        Your Wallet address is {this.state.address}
        {/* <Player1 /> */}
        </div>
        <Container>
          <Row>
            <Col xs={6} sm={6}>
              <Player1 />
            </Col>
            <Col xs={6} sm={6}>
              <Player2 />
            </Col>
          </Row>
        </Container>
    </div>
  );
  }
}
export default App;
