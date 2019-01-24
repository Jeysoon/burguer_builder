import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burguerbuilder from './containers/BurgerBuilder/BurguerBuilder';
class App extends Component {
  render() {

      return (
      <div>
        <Layout>
          <Burguerbuilder></Burguerbuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
