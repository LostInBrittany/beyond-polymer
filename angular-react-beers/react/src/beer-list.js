'use strict';

import React from 'react/addons';
import Axios from 'axios';
import ReactWebComponent from './webcomponent';
import BeerListItem from './beer-list-item';

const BeerList = React.createClass({
  getInitialState() {
    return {
      items: []
    };
  },
  fetchBeers() {
    Axios.get(`/angular-react-beers/beers/beers.json`).then(resp => {
      this.setState({ items: resp.data });
    });
  },
  componentDidMount() {
    this.fetchBeers();
  },
  render() {
    const items = (this.state.items || []).map(item => {
      return (
        <BeerListItem
          id={item.id} name={item.name}
          description={item.description}
          img={item.img} alcohol={item.alcohol}>
        </BeerListItem>
      );
    });
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <div>Search: <input value="" /></div>
            <div>
              Sort by:
              <select value="">
                  <option value="--">--</option>
              </select>
            </div>
            <div>
              <input type="checkbox" checked="" name="sortingOrder"> Descending sort</input>
            </div>
            <div>Number of results: <span>9999</span></div>
          </div>
          <div class="col-md-10">
            <div class="beers">
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-list', BeerList);
