'use strict';

import React from 'react/addons';
import Axios from 'axios';
import ReactWebComponent from './webcomponent';
import BeerListItem from './beer-list-item';

const BeerList = React.createClass({
  getInitialState() {
    return {
      items: [],
      filterText: '',
      descendingSort: true,
      criteria: [
        { name: "name", label: "Alphabetical"},
        { name: "alcohol", label: "Alcohol content" }
      ],
      criterium: 'name'
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
  beerFilter(item) {
      return item.name.match(new RegExp(this.state.filterText, 'i'));
  },
  getCurrentBeers() {
    return this.state.items.filter(this.beerFilter).length;
  },
  beerSorter(a, b) {
    var invert = 1;
    if (this.state.descendingSort) invert = -1;
    if ( a[this.state.criterium] === b[this.state.criterium] ) return 0;
    if ( a[this.state.criterium] < b[this.state.criterium] ) return -1 * invert;
    if ( a[this.state.criterium] > b[this.state.criterium] ) return 1 * invert;
  },
  updateFilter(e) {
    e.preventDefault();
    this.setState({
      filterText: e.target.value
    });
  },
  updateSort() {
    this.setState({
      descendingSort: !this.state.descendingSort
    });
  },
  render() {
    let items = (this.state.items || []).filter(this.beerFilter).map(item => {
      return (
        <BeerListItem
          id={item.id} name={item.name}
          description={item.description}
          img={item.img} alcohol={item.alcohol}>
        </BeerListItem>
      );
    });
    if (!this.state.descendingSort) {
      items = items.reverse();
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div>Search: <input value={this.state.filterText} onChange={this.updateFilter}/></div>
            <div>
              <input type="checkbox" checked={this.state.descendingSort} onChange={this.updateSort} name="sortingOrder"> Descending sort</input>
            </div>
            <div>Number of results: <span>{items.length}</span></div>
          </div>
          <div className="col-md-10">
            <div className="beers">
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactWebComponent.registerWebComponent('beer-list', BeerList);
