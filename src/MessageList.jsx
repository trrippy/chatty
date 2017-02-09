import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
    };
  }



  render() {
    return (
      <main className="messages">
        {this.props.messages.map(item => {
          console.log(item.type);
          if (item.type === 'notification') {
            return <div className="message system">{item.message}</div>
          } else {
            return (
              <Message
              username={item.username}
              content={item.content}
              key={item.id}
              messageColor={item.messageColor} />
            )
          }
        })}

      </main>
    )
  }
}
export default MessageList;