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
import ReactDOM from 'react-dom';
import {AppContext} from '../providers';
import {withRouter} from 'react-router-dom';
import optimize from '../lib/optimize';
import loadInput from '../lib/loadInput';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  button: {
    background: 'linear-gradient(45deg, #1d649b 30%, #0e4772 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

class _ParamsButton extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      data      : props.data,
      objType   : props.objType
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      objType : nextProps.objType
    });
  }
  componentDidMount () {
    debugger;
  }

  componentDidUpdate () {
    console.log(this.state.objType)
    console.log(this.state.data)
  }


  handleClick = () => {
    debugger;
    console.log(this.state.objType)
    debugger;
    if(this.state.objType) {
      let {store, viya} = this.context;
      loadInput( store, viya.session, this.state.data, viya.appEnv.WORKLIBNAME, viya.appEnv.OPTABLENAME)
      .then(r =>{
        console.log(JSON.stringify(r.items(),null,4))
        optimize(this.context.store, this.context.viya.session, this.state.objType, this.context.viya.appEnv)
        .then(result =>{
          this.props.history.push('/optimalSoln');
        })
        .catch(err =>{
          alert(err)
        })
      })
      .catch(err =>{
        alert(err)
      })
    }
    else {
      alert ('Please Select a Cost function!')
    }
  }

  render() {
    const {classes} = this.props;
    debugger;
    return (
      <div>
      <Button
      variant="contained"
      color="primary"
      classes={{
        root: classes.button,
        label: classes.label,
      }}
      type="submit"
      onClick={this.handleClick}
      >
      Optimize
      </Button>
      </div>
    )
  };
}

_ParamsButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

let ParamsButton = withRouter(_ParamsButton);
export default withStyles(styles)(ParamsButton);
