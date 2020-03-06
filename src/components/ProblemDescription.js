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
import {AppContext} from '../providers';
import "../css/styles.css";

class ProblemDescription extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    debugger;
  }

// Change image source in line 45 after saving the .jpg file in the images directory - If not desired, delete line 45
  render(){
    return (
      <div id = "page-wrap" >
      <h2 align="center"> Facility Location Optimization Demo </h2>
      <p> &nbsp; </p>
      <p align="justify"> <b> Problem Statement: </b>Optimally assign 5 products to the 25 existing facilities,
      where each facility can manufacture at most one product.<br/>
      <b> Objective: </b>Minimize three types of cost by deciding which facilities should remain open or be closed and assigning products to eligible facilities.
      <ul align="justify">
      <li align="justify"> <b> Fixed Cost: </b>Cost for keeping a facility open or closing a facility. This cost is incurred one time. </li>
      <li align="justify"> <b> Variable Cost: </b>Cost for manufacturing assigned products at a facility. This cost varies with per unit of product that is assigned to the facility.</li>
      <li align="justify"> <b> Total Cost: </b>Total cost for operating and closing facilities, i.e., the sum of fixed and variable costs.</li>
      </ul>
      </p>
      <p> &nbsp; </p>
      <img src={require('../images/FL_image1.jpg')} width="800" height="500" alt='app_pic'/>
      </div>
    );
  }
};
export default ProblemDescription;
