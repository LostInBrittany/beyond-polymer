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

const BeerListItem = React.createClass({
  getUrl() {
    return `../#/beers/${this.props.id}`;
  },
  render() {
    return (
      <div id={this.props.id} className="beer clearfix" style={Style.beer}>
        <img className="pull-right el-img" style={Style.elImg} src={this.props.img} />
        <h2 className="el-name">{this.props.name}</h2>
        <p className="el-description">{this.props.description}</p>
        <p className="pull-right el-alcohol" style={Style.elAlcohol}>Alcohol content: <span>{this.props.alcohol}</span>%</p>
        <a href={this.getUrl()}>Details</a>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-list-item', BeerListItem);

export default BeerListItem;
