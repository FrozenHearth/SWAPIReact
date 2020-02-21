import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../common/Header';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionGetAllPeople } from './actions/personActions';

import '../../styles/Persons/persons.css';

const styles = {
  cardBg: {
    height: '200px',
    border: 'none',
    cursor: 'pointer',
    width: '20%',
    padding: '1.5em',
    background: '#fafafa',
    margin: '0 2em 2em 2em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  },
  learnMoreBtn: {
    margin: '0 auto 2em auto',
    padding: '1em'
  },
  personsCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  personHeight: {
    margin: '0.5em 0 0.5em 0'
  },
  personWeight: {
    margin: '0 0 0.5em 0'
  },
  buttonLink: {
    textDecoration: 'none'
  }
};

class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }
  componentDidMount() {
    this.props.actionGetAllPeople().then(res => {
      this.setState({
        people: res.results.slice(0, 9)
        // Only displaying 9 results per page, instead of 10
      });
    });
  }

  render() {
    const { people } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Header />
        <div className="card-container">
          {people.length
            ? people.map((person, index) => (
                <Card
                  className={`${classes.cardBg} card-hover`}
                  key={index}
                  variant="outlined"
                >
                  <CardContent className={classes.personsCardContent}>
                    <Typography color="textSecondary" gutterBottom>
                      <span> {person.name}</span>
                    </Typography>
                    <Typography
                      className={classes.personHeight}
                      variant="h6"
                      component="h2"
                    >
                      {person.height} cm
                    </Typography>
                    <Typography
                      className={classes.personWeight}
                      color="textSecondary"
                    >
                      {person.mass} kg
                    </Typography>
                    <Typography variant="body2" component="p">
                      {person.birth_year}
                    </Typography>
                  </CardContent>
                  <Link
                    className={classes.buttonLink}
                    to={`/persons/${person.url
                      .split('/')
                      .slice(-2)
                      .join('/')}`}
                  >
                    <CardActions>
                      <Button
                        onClick={this.redirectToPersonDetails}
                        className={classes.learnMoreBtn}
                        size="small"
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Link>
                </Card>
              ))
            : ''}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    peopleResults: state.personsList.data.results || []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetAllPeople
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Persons));
