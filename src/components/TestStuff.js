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
import {withRouter} from 'react-router-dom';
import {AppContext} from '../providers';
import "../css/styles.css";

class _TestStuff extends React.Component {
  static contextType = AppContext;
  render() {
    debugger;
    let appEnv = this.context.viya.appEnv;
    console.log(appEnv);
    return (
      <div id="page-wrap">
        <pre> {JSON.stringify(appEnv, null,4)}</pre>
      </div>
    )
  }c
}

let TestStuff = withRouter(_TestStuff);
export default TestStuff;
