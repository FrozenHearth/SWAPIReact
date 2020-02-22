import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SkeletonScreens from './skeletonScreens/SkeletonScreens';
import Header from '../common/Header';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionGetAllPeople } from './actions/personActions';
import '../../styles/Persons/persons.css';

const styles = {
  cardBg: {
    height: 'auto',
    border: 'none',
    cursor: 'pointer',
    width: '21%',
    padding: '1.5em 0 0 0',
    background: '#fefefe',
    margin: '0 2em 3em 2em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  },

  personsCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  personName: {
    color: '#ed4b6f',
    textShadow: '0 1px 0 #ccc'
  },
  personHeight: {
    margin: '0.5em 0 0.5em 0'
  },
  personWeight: {
    margin: '0 0 0.5em 0'
  },
  learnMoreBtn: {
    padding: '1em',
    background: '#ed4b6f',
    color: 'white',
    fontWeight: '700',
    fontSize: '0.9em',
    width: '100%',
    '&:hover': {
      background: 'rgba(237,75,111,0.8)'
    }
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
          {people.length ? (
            people.map((person, index) => (
              <Card
                className={`${classes.cardBg} card-hover`}
                key={index}
                variant="outlined"
              >
                <CardContent className={classes.personsCardContent}>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="textPrimary"
                    gutterBottom
                    className={classes.personName}
                  >
                    {person.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.personHeight}
                    component="span"
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
                  <Button
                    onClick={this.redirectToPersonDetails}
                    className={classes.learnMoreBtn}
                    size="small"
                  >
                    View Details
                  </Button>
                </Link>
              </Card>
            ))
          ) : (
            <SkeletonScreens />
          )}
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
