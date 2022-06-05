import React from 'react';
import {connect} from 'react-redux';
import WebSocketInstance from '../../../websocket';
import {receiveDataNodeTem, receiveNotification} from '../../../Actions/recieveData.js'
import {receiveDataConfig} from '../../../Actions/recieveData.js'
import store from "../../../store";
import {loadUser} from "../../../Actions/auth";
import {returnErrors} from "../../../Actions/messages";

// import Hoc from '../hoc/hoc';


class Socket extends React.Component {
    componentDidMount() {
        WebSocketInstance.connect("test");
    }

    constructor(props) {
        super(props);
        this.state = {message: '', messages: []}

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this),
                this.setNodeState.bind(this),this.setGraphConfig.bind(this),this.notMessage.bind(this),this.setError.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made");
                    callback();
                    return;
                } else {
                    console.log("wait for connection...");
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }

    addMessage(message) {
        this.setState({messages: [...this.state.messages, message]});
        // document.querySelector('#chat-log').value = "\n"
        // for (let i = 0; i < this.state.messages.length; i++) {
        //     document.querySelector('#chat-log').value += (this.state.messages[i] + '\n');
        // }
    }

    setMessages(messages) {
        this.setState({messages: messages.reverse()});
    }

    setNodeState(conf) {
        store.dispatch(receiveDataNodeTem(conf));
    }

    setError(err) {
        console.log("in error  "+err)
        err = JSON.parse(err);
        store.dispatch(returnErrors(err['message'], err['color']));
    }

    setGraphConfig(conf) {
        store.dispatch(receiveDataConfig(conf));
    }

    notMessage(conf) {
        store.dispatch(receiveNotification(conf));
    }

    messageChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: "admin",
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        });
    }

    render() {
        return null;
    };
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Socket);