/*
------------------------------------------------------------------------------------
Copyright © 2020, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
---------------------------------------------------------------------------------------
*/
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from '../helpers/Header.js';
import ProblemDescription from "./ProblemDescription"
import ViewResultsTable from "./ViewResultsTable";
import ViewParamsTable from "./ViewParamsTable";
import ReportViewer from "./ReportViewer";
import { AppContext } from '../providers';
import "../css/styles.css";
import loadInputVAReport from '../lib/loadInputVAReport';
import loadOutputVAReport from '../lib/loadOutputVAReport';
import startUp from '../lib/startUp';


class SideBar extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      inputReportUri: null,
      outputReportUri: null,
      err: null,
      isLoading: true,
      isOpen: true
    }
  }

  componentDidMount() {
    debugger;
    let { store, viya } = this.context;
    let { appEnv, services } = viya;
    //Performing startUp data steps
    startUp(appEnv, viya.session, store)
      .then(r => {
        console.log('Fetching the reports')
        loadInputVAReport(store, appEnv.INPUTREPORTNAME, services, appEnv.host)
          .then(href => {
            console.log('Input Report URI', href)
            this.setState({ inputReportUri: href, error: null, isLoading: false });
            loadOutputVAReport(store, services, appEnv, appEnv.host)
              .then(href => {
                console.log('Output Report URI', href)
                this.setState({ outputReportUri: href, error: null, isLoading: false });
              })
              .catch(err => {
                this.setState({ outputReportUri: null, err: JSON.stringify(err, null, 4) })
              })
          })
          .catch(err => {
            this.setState({ inputReportUri: null, err: JSON.stringify(err, null, 4) })
          })
      })
      .catch((err) => {
        alert(err);
      })
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }
  closeMenu() {
    // Using the parent component's state to keep track of the menu
    this.setState({ menuOpen: false });
  }
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    debugger;
    let { store, viya } = this.context;
    let { appEnv, services } = viya;
    //Add path names and text to display on sidebar
    let menu = [
      { path: '/', text: 'Home', icon: null },
      { path: '/inputReport', text: 'Analyze Input Data', icon: null },
      { path: '/parameters', text: 'Input Optimization Parameters', icon: null },
      { path: '/outputReport', text: 'Analyze Output Reports', icon: null },
    ];
    debugger;
    //Change header text in line 53
    //Define components for each path
    return (
      <Router>
        <div id="App">
          <Header menu={menu} title='SAS&reg; Optimization Demo'></Header>
          <Switch>
            <Route exact path="/" component={ProblemDescription} />
            <Route path="/inputReport" render={(props) => <ReportViewer {...props} reportUri={this.state.inputReportUri} url={appEnv.host} />}/>
            <Route path="/parameters" component={ViewParamsTable} />
            <Route path="/optimalSoln" component={ViewResultsTable} />
            <Route path="/outputReport" render={(props) => <ReportViewer {...props} reportUri={this.state.outputReportUri} url={appEnv.host} />}/>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }

}
export default SideBar;
// export default withAppContext(SideBar);
