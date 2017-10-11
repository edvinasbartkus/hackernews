import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import * as itemsActions from './../../reducers/items/actions';

export default class ItemsList extends Component {
  componentDidMount() {
    this.props.dispatch(itemsActions.fetchLatest());
  }

  onEndReached() {
    if (!this.props.isLoading && this.props.items.length > 0) {
      this.props.dispatch(itemsActions.searchForStories());
    }
  }

  renderItems() {
    return (
      <ul className="App">
      {
        this.props.items.map((item, index) => 
          (
            <li key={`item_${index}`}>
              <a href={item.url || `https://news.ycombinator.com/item?id=${item.id}`} target="_blank">
                {item.title}
              </a> {item.by}
            </li>
          )
        )
      }
      </ul>
    )
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => this.onEndReached()}
        hasMore={true}
        loader={this.props.isLoading ? <span>⏳</span> : undefined}
      >
        {this.renderItems()}
      </InfiniteScroll>
    );
  }
}