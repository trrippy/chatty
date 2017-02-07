import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }
  handleChange(e) {
    if (e.key === 'Enter') {
      this.state.value = e.target.value;
      console.log(e.target.value)
      // invokes function in app.jsx
      this.props.onSend(e.target.value);
    }
  }

  render() {
    const value = this.state.value;
    return (

      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleChange} />
      </footer>
    )
  }
}
export default ChatBar;
