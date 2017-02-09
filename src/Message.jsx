import React, {Component} from 'react';

class Message extends Component {

  render() {
    return (
      <div>
        <div className="message">
          <span
          className="message-username"
          style={{color: this.props.userColor}}>
            {this.props.username}
          </span>
          <span className="message-content">{this.props.content}</span>
        </div>

      </div>
    )
  }
}
export default Message;

        // <div className="message system">
        // Anonymous1 changed their name to nomnom.
        // </div>