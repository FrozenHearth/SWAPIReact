import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Debounce from 'react-debounce-component';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SearchDropDown from '../searchDropDown/searchDropDown';
import '../../styles/Header/header.css';
import { base_URL } from '../../constants/index';

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
    float: 'left',
    cursor: 'pointer'
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    axios.get(`${base_URL}/people/?search=${value}`).then(res => {
      this.setState({
        searchResults: res.data.results
      });
    });
  };
  goToHomePage = () => {
    const { history, location } = this.props;
    if (location) {
      history.push('/');
      // Navigate to the homepage, only if not on the homepage. Otherwise, do nothing
    } else {
      return;
    }
  };
  render() {
    const { classes } = this.props;
    const { searchTerm, searchResults } = this.state;
    return (
      <AppBar className={classes.appBarColor} position="static">
        <Toolbar>
          <Typography
            onClick={this.goToHomePage}
            variant="h6"
            className={classes.banner}
            noWrap
          >
            Star Wars
          </Typography>
          <div className="search-box-container">
            <div className="search-icon-container">
              <SearchIcon />
            </div>
            <InputBase
              name="searchTerm"
              autoComplete="off"
              onChange={this.handleChange}
              className={`${classes.searchBar} search-input`}
              placeholder="Search for people…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
            />
          </div>
          {searchTerm !== '' ? (
            <Debounce ms={1000}>
              <SearchDropDown searchResults={searchResults} />
            </Debounce>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
