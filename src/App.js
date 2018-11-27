import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import MainPage from './containers/mainPage/mainPage';
import {Route, Switch, Redirect} from 'react-router-dom';
import AboutAuthor from './containers/aboutAuthor/aboutAuthor'
import Authorization from './containers/Authorization/Authorization'

class App extends Component {

    checkLogg(isLogg){
        this.setState({
            isLoggIn: isLogg
        });
    }

  render() {
    return (
        <Layout changeLink={this.checkLogg.bind(this)} >
             <Switch>
                 <Route path="/" exact component={Authorization} />
                 <Route path="/main_page" component={MainPage}  />
                 <Route path="/about_author" component={AboutAuthor} />
                 <Redirect to={'/'} />
            </Switch>
         </Layout>

    );
  }
}

export default App;
