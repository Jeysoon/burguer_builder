import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burguerbuilder from './containers/BurgerBuilder/BurguerBuilder';
import classes from './App.css';
class App extends Component {
  render() {

    let btnClass = classes.Button;
      return (
      <div>
        <Layout>
          <Burguerbuilder></Burguerbuilder>
        <button 
        className={btnClass}
        onClick={this.props.clicked}
        ></button>
        </Layout>
      </div>
    );
  }
}

export default App;
