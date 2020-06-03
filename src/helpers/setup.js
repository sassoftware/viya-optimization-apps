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
import ReactDOM from 'react-dom';
import restaf from '@sassoftware/restaf';
import setupViya from './lib/setupViya';
import {AppProvider} from './providers';
import './index.css';
import App from './App';
//import * as serviceWorker from 'serviceWorker';

// const $ = window.$;
// let appEnv = window.optUI.appEnv;
// debugger;
// let store = restaf.initStore();
// debugger;
// setupViya(store, appEnv, window.optUI.logonPayload)
//     .then ( (r) => {
//         ReactDOM.render(
//             <AppProvider value={{store: store, viya: r}}>
//                 <App />
//             </AppProvider>
//         , document.querySelector('#root'));
//     })
//     .catch(err => console.log(JSON.stringify(err, null, 4)))
