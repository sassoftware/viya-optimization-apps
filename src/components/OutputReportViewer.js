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
import React from 'react';
import {AppContext} from '../providers';
import loadOutputVAReport from '../lib/loadOutputVAReport';
import CircularIndeterminate from '../helpers/CircularIndeterminate';
import "../css/styles.css";

class OutputReportViewer extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      href: null,
      err : null,
      isLoading: true
    }
  }
  async componentDidMount() {
    debugger;
    if ( this.state.href === null) {
      let {store, viya} = this.context;
      let {appEnv, services} = viya;
      console.log()
      try {
        let href = await loadOutputVAReport(store, services, appEnv, appEnv.host);
        this.setState({href: href, error: null, isLoading: false});
      }
      catch(err){
        this.setState( {href: null, err: JSON.stringify(err, null,4)})
      }
    }
  }

  iframeLoaded = () =>{
    this.setState({
      isLoading: false
    });
  }

  render() {
    let show;
    if (this.state.isLoading === true) {
      show =
      <div>
      <h2>Optimal Solution Analysis</h2>
      <div class="page-wrap">
      <p>Fetching SAS Visual Analytics Report... <CircularIndeterminate/></p>
      </div>
      </div>
    }
    else if (this.state.err === null & this.state.isLoading === false) {
      show =
      <div>
      <h2>Optimal Solution Analysis</h2>
      <div class="embed-responsive embed-responsive-16by9 page-wrap">
      <iframe title = "outputReport" onLoad={this.iframeLoaded} class="embed-responsive-item" src={this.state.href} allowfullscreen></iframe>
      </div>
      </div>
    }
    else {
      show =  <pre> {this.state.err}</pre>
    }
    return <div id = "page-wrap">{show}</div>
  }

}

export default OutputReportViewer;
