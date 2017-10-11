import React, { Component } from 'react'
import Infinite from 'react-infinite';
import * as itemsActions from './../../reducers/items/actions';

export default class ItemsList extends Component {
  componentDidMount() {
    this.props.dispatch(itemsActions.fetchLatest());
  }
  onEndReached() {
    if (!this.props.isLoading) {
    }
  }

  render() {
    return (
      <Infinite elementHeight={18}
                useWindowAsScrollContainer
                infiniteLoadBeginEdgeOffset={200}
                onInfiniteLoad={() => this.onEndReached()}
                loadingSpinnerDelegate={<span>⏳</span>}
                isInfiniteLoading={this.props.isLoading}
      >
        <ul className="App">
        {
          this.props.items.map((item, index) => 
            (
              <li key={`item_${index}`}>{item.title}</li>
            )
          )
        }
        </ul>
      </Infinite>
    );
  }
}