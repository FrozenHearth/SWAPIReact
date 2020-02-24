import React, { Component } from 'react';
import Header from '../common/Header';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionGetPersonDetails } from './actions/personActions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  detailsContainer: {
    margin: '5em 0 0 0',
    height: '500px',
    background: 'blue'
  }
};

class PersonDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.actionGetPersonDetails(id).then(res => console.log(res));
  }

  render() {
    const { personDetails, classes, history, location } = this.props;
    console.log(this.props);
    return (
      <>
        <Header location={location} history={history} />

        <Container maxWidth="md">
          <Typography component="div" className={classes.detailsContainer} />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    personDetails: state.personsList.personDetails || {}
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetPersonDetails
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PersonDetails));
