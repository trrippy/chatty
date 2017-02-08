import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  newMessage (message, username, id) {
    const newMessage = {username: username, content: message};
    const messages = this.state.messages.concat(newMessage)

    let msg = {
      id: id,
      type: "message",
      content: message,
      username: username
    };

    // Send the msg object as a JSON-formatted string.
    this.ws.send(JSON.stringify(msg));

  }


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.newMessage = this.newMessage.bind(this);

    // this.ws = this.ws.bind(this); this.ws doesn't exist yet!

  }
  componentDidMount() {

    this.ws = new WebSocket('ws://localhost:4000/');

    // This handles a new message from server
    this.ws.onmessage = (event) => {
      let recievedMsgObj = JSON.parse(event.data);

      let rMessages = this.state.messages.concat(recievedMsgObj);
      this.setState({messages: rMessages});
    }

  };
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onSend={this.newMessage} />

      </div>
    )
  }
}
export default App;
