import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import '../../styles/Header/header.css';

const styles = {
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '0 0.5em 0 3.1em',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.2)'
    }
  },
  appBarColor: {
    background: '#404040'
  },
  banner: {
    float: 'left'
  }
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBarColor} position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.banner} noWrap>
            Star Wars
          </Typography>
          <div className="search-box-container">
            <div className="search-icon-container">
              <SearchIcon />
            </div>
            <InputBase
              className={`${classes.searchBar} search-input`}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    peopleResults: state.personsList.data.results || []
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Header));
