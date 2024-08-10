import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { BsRobot } from "react-icons/bs";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [suggestions] = useState([
    "What is your name?",
    "What is your age?",
    "What is your favorite color?",
  ]);

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      return;
    }

    const userMessage: Message = { content: input, sender: "user" };
    setMessage([...messages, userMessage]);

    setInput("");
  };

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage();
  };

  return (
    <>
      <button
        className={styles.chatButton}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        disabled
        title="Under Maintenance"
      >
        <i className="fas fa-comments">
          <BsRobot
            style={{
              fontSize: 30,
            }}
          />
        </i>{" "}
        <span className={styles.tooltip}>Under Maintenance</span>
      </button>
      {isOpen && (
        <div className={styles.chatModal}>
          <div className={styles.chatHeader}>
            <h2>Chat Bot</h2>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
          <div className={styles.chatBody}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.messageBubble} ${
                  message.sender === "user"
                    ? styles.userBubble
                    : styles.botBubble
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className={styles.chatFooter}>
            {/* <div className={styles.suggestionContainer}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={styles.suggestionBubble}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div> */}
            <input
              type="text"
              value={input}
              onChange={handleInputChanged}
              onKeyPress={handleKeyPress}
              className={styles.chatInput}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
