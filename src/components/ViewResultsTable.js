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
import {AppContext} from '../providers';
import fetchResultsTable from '../lib/fetchResultsTable'
import "../css/styles.css";

//Defining react component to be rendered
class ViewResultsTable extends React.Component {
  //Leave this line as is - brings in app specific Variables
  static contextType = AppContext;
  //Define properties of the react component
  constructor(props) {
    super(props);
    this.state = {
      data      : props.data,
      sortName  : null,
      sortOrder : null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  // Add the async function (e.g. fetchResultsTable) to fetch data to be displayed in table
  componentDidMount () {
    debugger;
    let {store, viya} = this.context;
    console.log(this.context)
    debugger;
    fetchResultsTable(viya.appEnv, viya.session, store)
    .then(r =>{
      this.setState({
        data: r
      })
    })
    .catch(err =>{
      alert("Table not found!")
    })
  }

  // Function to format cell value to $xx.xx format
  priceFormatter = (cell, row) => {
    return '$' + cell.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  //Function to format cell value to number with 2 decimal places
  numFormatter = (cell, row) => {
    return  Number(cell).toFixed(0);
  }

  onSortChange = (sortName, sortOrder) => {
    this.setState({
      sortName,
      sortOrder
    });
  }
  createCustomToolBar = props => {
    return (
      <div style={ { margin: '15px' } }>
      { props.components.btnGroup }
      <div className='col-md-4 col-md-8'>
      { props.components.searchPanel }
      </div>
      </div>
    );
  }
  onAfterDeleteRow = (rowKeys) =>{
    debugger;
    let data = this.state.data;
    debugger;
    const filtered = data.filter(r => r['_Index_'] !== rowKeys[0]);
    console.log(filtered)
    this.setState({
      data: filtered
    });
  }

  // Finally render the table - change the fieldnames, column headers and add various formats in lines 161-165 or add more
  render() {
    debugger;
    // Last row showing sum of a specific column
    const footerData = [
      [
        //Change column index to show label 'Total'
        {
          label: 'Total',
          columnIndex: 0
        },
        //Change column index and field name in data (e.g. variableCosts) to show label the total value
        {
          label: 'Total value',
          columnIndex: 4,
          align: 'center',
          formatter: (tableData) => {
            let label = 0;
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              label += tableData[i].variableCosts;
            }
            return (
              <strong>${label.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong>
            );
          }
        }
      ]
    ]

    //Property for selecting row
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)"
    }

    //Miscellaneous table properties
    const options = {
      sortName: this.state.sortName,
      afterDeleteRow: this.onAfterDeleteRow,
      sortOrder: this.state.sortOrder,
      onSortChange: this.onSortChange,
      sizePerPage: 25,
      searchPosition: 'left'
    };

    return (
      <div id = "page-wrap">
      <h2>Optimal Assignment</h2>
      <BootstrapTable data={this.state.data}
      options={ options }
      search
      exportCSV
      deleteRow
      selectRow={selectRowProp}
      striped
      hover
      condensed
      footerData={ footerData }
      footer
      pagination
      >
      <TableHeaderColumn width='10%' dataField='_Index_' isKey dataAlign="center" dataSort={ true }>Index</TableHeaderColumn>
      <TableHeaderColumn width='30%'dataField='product' dataAlign="center" dataSort={ true }>Product Name</TableHeaderColumn>
      <TableHeaderColumn width='30%'dataField='site' dataAlign="center" dataSort={ true }>Facility Name</TableHeaderColumn>
      <TableHeaderColumn width='30%'dataField='Units' dataAlign="center" dataSort={ true } dataFormat={this.numFormatter}>Number of Units Produced</TableHeaderColumn>
      <TableHeaderColumn width='30%'dataField='variableCosts' dataAlign="center" dataSort={ true } dataFormat={this.priceFormatter}>Variable Cost</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  };
};


export default ViewResultsTable;
