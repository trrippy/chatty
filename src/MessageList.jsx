import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map(item => {
          if (item.type === 'notification') {
            return <div className="message system">{item.message}</div>
          }
          else {
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