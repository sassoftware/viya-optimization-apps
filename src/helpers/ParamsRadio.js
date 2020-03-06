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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class _ParamsRadio extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      objType   : props.objType
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      objType : nextProps.objType
    });
  }
  componentDidMount () {
    debugger;
  }

  componentDidUpdate () {
    console.log(this.state.objType)
  }

  // Change statement in line 67, Change objType values and options in lines 74-76
  render() {
    const { classes} = this.props;
    debugger;
    return (
      <div>
      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend"><Typography variant="h6" color = "black" >What type of cost would you like to minimize?</Typography></FormLabel>
      <RadioGroup
      aria-label="objType"
      name="objType"
      value={this.state.objType}
      onChange={(e) => this.setState({ objType: e.target.value })}
      >
      <FormControlLabel value="1" control={<Radio color="black"/>} label={<Typography variant="h6" color = "black" >Variable Costs Only</Typography>} />
      <FormControlLabel value="2" control={<Radio color="black"/>} label={<Typography variant="h6" color = "black" >Fixed Costs Only</Typography>}  />
      <FormControlLabel value="3" control={<Radio color="black"/>} label={<Typography variant="h6" color = "black" >Total Cost (Fixed and Variable Costs)</Typography>} />
      </RadioGroup>
      </FormControl>
      </div>
    )
  };
}

_ParamsRadio.propTypes = {
  classes: PropTypes.object.isRequired,
};

let ParamsRadio = withRouter(_ParamsRadio);
export default withStyles(styles)(ParamsRadio);
