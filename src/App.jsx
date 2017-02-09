import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  newMessage (message) {

    let msg = {
      type: "message",
      content: message,
      username: this.state.currentUser.name
    };

    this.ws.send(JSON.stringify(msg));

  }

  newUser(username) {

    if (this.state.currentUser.name !== username) {
        let nNotification = {
          type: 'notification',
          message: this.state.currentUser.name + ' has changed username to ' + username
        };

        this.ws.send(JSON.stringify(nNotification));
        this.state.currentUser.name = username;

      }

  }


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);


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
        <MessageList
        messages={this.state.messages}
        username={this.state.currentUser.name} />
        <ChatBar
        onSend={this.newMessage}
        username={this.state.currentUser.name}
        onSendUser={this.newUser} />

      </div>
    )
  }
}
export default App;
