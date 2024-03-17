import React, { useState, useEffect } from 'react';
import './user.css';
import navi from './navi.svg';
import logo from './logo.svg';
import axios from 'axios';

const User = ({ chatInput, onCoordinatesChange }) => {
    const [messages, setMessages] = useState([]);
    const [dialogflowResponses, setDialogflowResponses] = useState([]);

    useEffect(() => {
        if (chatInput) {
            setMessages([...messages, chatInput]);
            sendMessageToDialogflow(chatInput);
        }
    }, [chatInput]);

    const sendMessageToDialogflow = async (message) => {
        try {
            const response = await axios.post('YOUR_DIALOGFLOW_API_ENDPOINT', {
                queryInput: {
                    text: {
                        text: message,
                        languageCode: 'ko'
                    }
                }
            });
            const latitude = response.data.queryResult.parameters.latitude;
            const longitude = response.data.queryResult.parameters.longitude;
            const newDialogflowResponse = response.data.queryResult.fulfillmentText;
            setDialogflowResponses([...dialogflowResponses, newDialogflowResponse]);
            setMessages([...messages, newDialogflowResponse]);

            onCoordinatesChange(latitude, longitude);
            
        } catch (error) {
            console.error('Error sending message to Dialogflow:', error);
        }
    };

    return (
        <div className="user">
            <img src={navi} alt="navi" /><img src={logo} alt="logo" />
            <hr className="horizontal-line" />
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <p>{message}</p>
                    </div>
                ))}
            </div>
            <div className="dialogflow-response">
                {dialogflowResponses.map((response, index) => (
                    <div key={index} className="response">
                        <p>{response}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default User;