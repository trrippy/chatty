import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var id = 5;
class App extends Component {

  newMessage (message, username) {
    const newMessage = {id: id++, username: username, content: message};
    console.log('newMessage', newMessage);
    console.log(message);
    console.log('messages', this.state);
    const messages = this.state.messages.concat(newMessage)
    this.ws.send("Here's some text that the server is urgently awaiting!");
    this.setState({messages: messages})

  }


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.newMessage = this.newMessage.bind(this);
    console.log(this);
    // this.ws = this.ws.bind(this); this.ws doesn't exist yet!

  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.ws = new WebSocket('ws://localhost:4000/');
    // this.ws.onopen = function (event) {
    // };
    this.ws.onmessage = function (event) {
      console.log(event.data);
    }
    console.log(this);

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
