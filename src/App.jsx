import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  newMessage (message, username, id) {
    const newMessage = {username: username, content: message};
    const messages = this.state.messages.concat(newMessage)
    console.log('in newMessage',messages)

    let msg = {
      id: id,
      type: "message",
      content: message,
      username: username
    };
    // Send the msg object as a JSON-formatted string.
    this.state.currentUser.name = username;
    this.ws.send(JSON.stringify(msg));

  }



  // newNotification (message) {
  //   let newNot = {content}
  // }


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
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

      console.log('currentUser', this.state.currentUser.name)
      console.log('newusername', recievedMsgObj.username);


      // TODO do a notification message if the above are different
      if (this.state.currentUser.name !== recievedMsgObj.username) {
        let newNotification = {
          type: 'notification',
          message: this.state.currentUser.name + ' has changed username to ' + recievedMsgObj.username
        };
        let newNoti = this.state.messages.concat(newNotification);
        this.setState({messages: newNoti});
      }
      // TODO set the state.currrentUser.name to the new one
      this.state.currentUser.name = recievedMsgObj.username;

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
        <ChatBar onSend={this.newMessage} />

      </div>
    )
  }
}
export default App;
