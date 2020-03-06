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
import AppContext from './AppContext';

class AppProvider extends React.Component {
    //  in case we want to set other globals
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            value: props.value
        }
    }
    render() {
        debugger;
        return (
            <AppContext.Provider value={this.state.value}>
               {this.props.children}
            </AppContext.Provider>
        );
    }
}
export default AppProvider;
