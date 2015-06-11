'use strict';

import React from 'react/addons';
import Axios from 'axios';
import ReactWebComponent from './webcomponent';

const BeerListItem = React.createClass({
  getUrl() {
    return `/angular-react-beers/#/beers/${this.props.id}`;
  },
  render() {
    return (
      <div id={this.props.id} class="beer clearfix">
        <img class="pull-right el-img" src={this.props.img} />
        <h2 class="el-name">{this.props.name}</h2>
        <p class="el-description">{this.props.description}</p>
        <p class="pull-right el-alcohol">Alcohol content: <span>{this.props.alcohol}</span>%</p>
        <a href={this.getUrl()}>Details</a>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-list-item', BeerListItem);

export default BeerListItem;
