import React, { Component } from 'react';
import './App.css';
import Firebase from './utils/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  addChild(item) {
    this.setState({
      items: this.state.items.concat([ item ])
    });
  }

  componentDidMount() {
    Firebase.database().ref('v0/newstories').on('value', snap => {
      snap.val().forEach(id => {
        Firebase.database().ref('v0/item').child(id).once('value', snapshot => {
          const item = snapshot.val();
          if (item && item.title) {
            this.addChild({ title: item.title });
          } else {
            console.error(id);
          }
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
      {
        this.state.items.map((item, index) => 
          (
            <div key={`item_${index}`}>
              <span>{item.title}</span>
            </div>
          )
        )
      }
      </div>
    );
  }
}

export default App;
