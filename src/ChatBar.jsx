import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.state = {
      username: '',
      message: ''
    };
  }

  handleChange(event) {
    if (event.key === 'Enter') {
      this.state.message = event.target.value;
      console.log(this.state.message);
      this.props.onSend(this.state.message);
      event.target.value = '';
      ;
    }
  }

  handleUsername(event) {
    if (event.key === 'Enter') {
      if (!this.state.username) {
        this.state.username = 'Anonymous';
      }
      this.state.username = event.target.value;
      this.props.onSendUser(this.state.username);
    }
  }

  render() {
    return (

      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyUp={this.handleUsername} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleChange}
          value={this.state.usermessage}/>
      </footer>
    )
  }
}
export default ChatBar;
