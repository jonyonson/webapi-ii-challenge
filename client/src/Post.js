import React from 'react';
import './App.css';

class Post extends React.Component {
  class = {};

  render() {
    return (
      <div className="App-post">
        <div className="App-post-title">{this.props.post.title}</div>
        <div className="App-post-contents">{this.props.post.contents}</div>
      </div>
    );
  }
}

export default Post;
