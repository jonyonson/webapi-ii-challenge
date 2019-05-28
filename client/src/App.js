import React from 'react';
import './App.css';
import axios from 'axios';
import Post from './Post';
class App extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { id, title, contents } = this.state;
    return (
      <div className="App">
        <ul>
          {this.state.data.map(post => {
            return (
              <li key={id}>
                <Post post={post} title={title} contents={contents} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
