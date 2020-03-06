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
import {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import loadParamsData from '../lib/loadParamsData';
import {AppContext} from '../providers';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ParamsButtonGroup from '../helpers/ParamsButtonGroup';
import TextField from '@material-ui/core/TextField';
import "../css/styles.css";

//Function to check for infeasibility if same facility is selected for more than one pproduct
const checkInfeasible = (data, keyname, value, row) => {
  debugger;
  console.log(data, keyname, value)
  let flg = false;
  for (var i = 0; i<data.length; i++){
    if (data[i][keyname] === value & row['_Index_'] !== i+1){
      console.log(keyname, value)
      if (value === 'None'){
          flg = false
      }
      else{
          flg = true
      }

    }
  }
  console.log(flg)
  return flg
}
const styles = theme => ({
  root: {
    display: 'flex',
  },
});

//Defining react component to be rendered
class _ViewParamsTable extends React.Component {
  //Leave this line as is - brings in app specific Variables
  static contextType = AppContext;
  //Define properties of the react component
  constructor(props) {
    super(props);
    this.state = {
      data        : props.data,
      scenario    : 'Optimal Solution',
      viable_sites: props.viable_sites,
      objType     : "1"
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data        : nextProps.data,
      scenario    : nextProps.scenario,
      viable_sites: nextProps.viable_sites,
      objType     : nextProps.objType
    });
  }

  // Add the async function (e.g. loadParamsData) to fetch data to be displayed in table
  // viableSitesArr is also defined from results
  componentDidMount () {
    debugger;
    let {store, viya} = this.context;
    console.log(this.context)
    debugger;
    loadParamsData(viya.appEnv, viya.session, store)
    .then(result => {
      console.log('result', result)
      let viableSitesArr = {};
      for (var i =0; i < result [0].length; i++){
        viableSitesArr[result [0][i].Product_Name] = [];
        debugger;
        console.log('viable_sites1 = ', viableSitesArr)
        viableSitesArr[result [0][i].Product_Name].push('None')
        for (var j =0; j < result[1].length; j++){
          console.log('viable_sites2= ', viableSitesArr)
          if(result[1][j].Product_Name === result [0][i].Product_Name){
            viableSitesArr[result [0][i].Product_Name].push(result[1][j].facility_name)
            console.log('viable_sites3 = ', viableSitesArr)
          }
        }
      }
      debugger;
      this.setState({
        data: result[0],
        viable_sites: viableSitesArr
      })
      debugger;
    })
    .catch(err =>{
      alert(JSON.stringify(err, null, 4))
    })
  }

  componentDidUpdate () {
    console.log(this.state.objType)
    console.log(this.state.data)
  }

  //Function to format cell value to number with 2 decimal places
  numFormatter = (cell, row) => {
    return  Number(cell);
  }

//Customize this function to catch errors when table cells are changed before saving it
  onBeforeSaveCell = (row, cellName, cellValue) => {
    debugger;
    if (isNaN(cellValue) & cellName === 'demand'){
      alert('Invalid datatype. Please enter a number.')
      console.log(row)
      return false;
    }
    else if (cellName === 'facility_name' & checkInfeasible(this.state.data, cellName, cellValue, row) === true) {
      debugger;
      alert('This facility has already been dedicated to another product and will make your model infeasible. Please assign this product to another facility.')
      return false;
    }
  }

//Customize this function to update the table data after cell edit
  onAfterSaveCell = (row, cellName, cellValue) => {
    debugger;
    let data = this.state.data;
    console.log('New cell', row)
    const result = data.map((r) => {
      if (row['_Index_'] === r['_Index_']) {
        if (cellName === 'demand'){
          r[cellName] = Number(cellValue);
        }
        else {
          r[cellName] = cellValue;
        }
      }
      return r;
    });
    this.setState({
      data: result
    });
  }

//Handles what happens when row is deleted -- NOT USED
  onAfterDeleteRow = (rowKeys) =>{
    debugger;
    let data = this.state.data;
    debugger;
    const filtered = data.filter(r => r['Product_Name'] !== rowKeys[0]);
    console.log(filtered)
    this.setState({
      data: filtered
    });
  }

//Sorts the values of fixed facilities to be displayed as options for drop down menu
  fixedFacility = (row) =>{
    return this.state.viable_sites[row.Product_Name].sort()
  }

  render() {
    // const { classes} = this.props;
    debugger;
    const mycellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell,
      afterSaveCell: this.onAfterSaveCell
    };
    return (
      <div id ="page-wrap">
        <h2>Input Optimization Parameters</h2>
        &nbsp;
        <div>
          <Typography variant="h6" color = "black" >Enter the number of units required per product and assign a fixed facility for the products if desired: </Typography>
            <div>
              <Typography variant="h6" color = "black" >Enter scenario name:  </Typography>
              <TextField
                value={this.state.scenario}
                onChange={(e) => this.setState({ scenario: e.target.value })}
              />
              &nbsp;
              <BootstrapTable data={this.state.data}
                cellEdit={mycellEditProp}
                striped
                hover
                condensed
                >
                <TableHeaderColumn width='35%' dataField='Product_Name' isKey dataAlign="center" dataSort={ true } >Product Name</TableHeaderColumn>
                <TableHeaderColumn width='30%'dataField='demand' dataAlign="center" dataSort={ true } dataFormat={this.numFormatter}>Required Number of Units</TableHeaderColumn>
                <TableHeaderColumn width='35%' dataField='facility_name'  dataAlign="center" editable={ { type: 'select', options: { values: this.fixedFacility } } } dataSort={ true }>Assign Facility</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
          <div>
            <ParamsButtonGroup data = {this.state.data} objType = {this.state.objType} scenario={this.state.scenario} />
          </div>
      </div>
    )
  };
}

_ViewParamsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

let ViewParamsTable = withRouter(_ViewParamsTable);
export default withStyles(styles)(ViewParamsTable);
