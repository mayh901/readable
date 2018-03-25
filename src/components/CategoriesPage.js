import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../api';
import { Link } from 'react-router-dom';

class CreatePage extends Componet {
  constructor(props) {
    super(props);
    this.getCategories();
  }

  getCategories() {
    fetch('http://localhost:5001/categories/', {
      method: 'GET',
      headers: api.headers_one()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: action.LOAD_POST,
          categories: data.categories
        };
        this.props.load_categories(object);
      });
    });
  }
  render() {
    let keys = this.props.categories ? this.props.categories : false;
    return (
      <div className="APP">
        <div className="Banner">
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        </div>
        <div className="Main" />
        <h3>Categories:</h3>
        <ol>
          {this.props.categories &&
            keys &&
            this.props.categories.map(category => (
              <li key={category}>{category}</li>
            ))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load_categories: data => dispatch(actions.load_categories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
