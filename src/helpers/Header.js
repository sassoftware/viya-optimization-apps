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
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemLink from './ListItemLink';

const styles = {
  list: {
    width: 250,
    color: 'white',
    align: 'center'
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: '#0068A3',
    color: 'white',
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#1d649b'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      title: props.title,
      leftMenu: props.menu
    };
  }

  componentWillReceiveProps (newProps) {
    this.setState({ leftMenu: newProps.menu })
  }

  _toggleDrawer = (s) => () => {
    debugger;
    this.setState({
      left: s,
    });
  };

  render () {
    const { classes } = this.props;
    debugger;
    let leftItems = this.state.leftMenu.map((m,key) => {
      return <ListItemLink to={m.path} primary={m.text} icon={null} key={key.toString()}></ListItemLink>
    })

    let leftList = (
      <div >
        <List>
          {leftItems}
        </List>
      </div>
    )

    debugger;
    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this._toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.state.title}
          </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this._toggleDrawer(false)}>
          <div
            classes={{
              paper: classes.drawerPaper,
            }}
            tabIndex={0}
            role="button"
            onClick={this._toggleDrawer(false)}
            onKeyDown={this._toggleDrawer(false)}
          >
            {leftList}
          </div>
        </Drawer>
      </div>
    );
  }
}

/*
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

export default withStyles(styles)(Header);
