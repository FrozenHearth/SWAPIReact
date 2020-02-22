import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import '../../styles/searchDropDown/searchDropDown.css';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff'
  },
  characterName: {
    color: 'black !important'
  },
  itemLink: {
    textDecoration: 'none'
  }
};

class SearchDropDown extends Component {
  render() {
    const { classes, searchResults } = this.props;
    return (
      <div
        className={searchResults.length ? 'search-results-container' : 'none'}
      >
        {searchResults.length
          ? searchResults.map((item, index) => (
              <Link
                key={index}
                className={classes.itemLink}
                to={`/persons/${item.url
                  .split('/')
                  .slice(-2)
                  .join('/')}`}
              >
                <List
                  component="nav"
                  className={classes.root}
                  aria-label="mailbox folders"
                >
                  <ListItem button>
                    <ListItemText
                      className={classes.characterName}
                      primary={item.name}
                    />
                  </ListItem>
                  <Divider />
                </List>
              </Link>
            ))
          : ''}
      </div>
    );
  }
}

export default withStyles(styles)(SearchDropDown);
