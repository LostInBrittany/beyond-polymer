'use strict';

import React from 'react/addons';
import Axios from 'axios';
import ReactWebComponent from './webcomponent';

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
    Axios.get(`/angular-react-beers/beers/${this.props.id}.json`).then(resp => {
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
      <div id={this.props.id} class="beer clearfix">
        <img class="pull-right el-img" src={this.state.img} />
        <h2 class="el-name">{this.state.name}</h2>
        <p class="el-description">{this.state.description}</p>
        <p class="pull-right el-alcohol">
          <span>Alcohol content: </span>
          <span>{this.state.alcohol}</span>
          <span>%</span>
        </p>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-detail', BeerDetail);
