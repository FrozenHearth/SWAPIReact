import React, { Component } from 'react';
import Header from '../common/Header';
import PersonsList from './PersonsList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionGetAllPeople } from './actions/personActions';
import { Logo } from '../common/Logo';

class Persons extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.actionGetAllPeople().then(res => {
      if (this._isMounted) {
        this.setState({
          people: res.results.slice(0, 9)
          // Only displaying 9 results per page, instead of 10
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { people } = this.state;

    return (
      <>
        <Header />
        <Logo />
        <PersonsList people={people} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
