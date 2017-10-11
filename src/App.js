import React, { Component } from 'react'
import Infinite from 'react-infinite';
import './App.css';
import Firebase from './utils/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false
    }
  }

  addChild(item) {
    this.setState({
      items: this.state.items.concat([ item ])
    });
  }

  componentDidMount() {
    this.getLatest();
  }

  getLatest() {
    this.setState({ isLoading: true });
    Firebase.database()
            .ref('v0/newstories')
            .limitToFirst(100)
            .once('value', snap => this.onLoad(snap))
            .then(() => this.setState({ isLoading: false }));
  }

  getItem(id) {
    Firebase.database()
            .ref('v0/item')
            .child(id)
            .once('value', snap => this.onItem(snap, id));
  }

  onLoad(snap) {
    snap.val().forEach(id => this.getItem(id));
  }

  onItem(snapshot, id) {
    const item = snapshot.val();
    if (item && item.title) {
      this.addChild({ title: item.title });
    } else {
      console.error(id);
    }
  }

  onEndReached() {
    if (!this.state.isLoading) {
      this.getLatest();
    }
  }

  render() {
    return (
      <Infinite elementHeight={18}
                useWindowAsScrollContainer
                infiniteLoadBeginEdgeOffset={200}
                onInfiniteLoad={() => this.onEndReached()}
                loadingSpinnerDelegate={<span>⏳</span>}
                isInfiniteLoading={this.state.isLoading}
      >
        <ul className="App">
        {
          this.state.items.map((item, index) => 
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

export default App;
