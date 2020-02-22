import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Debounce from 'react-debounce-component';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchDropDown from '../searchDropDown/searchDropDown';
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
    axios.get(`https://swapi.co/api/people/?search=${value}`).then(res => {
      this.setState({
        searchResults: res.data.results
      });
    });
  };
  render() {
    const { classes } = this.props;
    const { searchTerm, searchResults } = this.state;
    return (
      <AppBar className={classes.appBarColor} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.banner} noWrap>
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

const mapStateToProps = state => {
  return {
    peopleResults: state.personsList.data.results || []
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Header));
