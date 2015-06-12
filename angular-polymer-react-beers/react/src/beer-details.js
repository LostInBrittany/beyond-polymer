'use strict';

import React from 'react/addons';
import Axios from 'axios';
import ReactWebComponent from './webcomponent';

const Style = {
  beer: {
    margin: 10,
    padding: 10,
    border: "solid 1px black",
    borderRadius: 10,
    minHeight: 150
  },
  elImg: {
    maxHeight: 100
  },
  elAlcohol: {
    clear: 'both'
  }
};

const BeerDetail = React.createClass({
  getInitialState() {
    return {
      name: '--',
      description: '--',
      alcohol: '--',
      img: '--'
    };
  },
  fetchDetails() {
    Axios.get(`../beers/${this.props.id}.json`).then(resp => {
      this.setState({
        name: resp.data.name,
        description: resp.data.description,
        alcohol: resp.data.alcohol,
        img: resp.data.img
      });
    });
  },
  componentDidMount() {
    this.fetchDetails();
  },
  componentWillReceiveProps() {
    this.fetchAgain = true;
  },
  componentDidUpdate() {
    if (this.fetchAgain) {
      this.fetchAgain = false;
      this.fetchDetails();
    }
  },
  render() {
    return (
      <div id={this.props.id} className="beer clearfix" style={Style.beer}>
        <img className="pull-right el-img" style={Style.elImg} src={this.state.img} />
        <h2 className="el-name">{this.state.name}</h2>
        <p className="el-description">{this.state.description}</p>
        <p className="pull-right el-alcohol" style={Style.elAlcohol}>
          <span>Alcohol content: </span>
          <span>{this.state.alcohol}</span>
          <span>%</span>
        </p>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-detail', BeerDetail);
