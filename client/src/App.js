import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";

import Header from "./components/Header";

import { connect } from "react-redux";

import * as actions from "./actions";

import Landing from "./components/Landing";

const Dashboard = () => {
  return <div>Dashbaord</div>;
};

const SurveyNew = () => {
  return <div>SurveyNew</div>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
