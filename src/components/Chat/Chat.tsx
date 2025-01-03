import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./Chat.css";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  chatIcon?: React.ReactNode;
  title?: string;
  placeholder?: string;
  sendButtonAriaLabel?: string;
  closeButtonAriaLabel?: string;
  isOpen?: boolean;
  onToggleOpen?: () => void;
  className?: string;
  themeColor?: string;
}

const Chat = ({
  messages,
  onSendMessage,
  isTyping = false,
  chatIcon = <MessageCircle className="icon" />,
  title = "Chat",
  placeholder = "Type your message...",
  sendButtonAriaLabel = "Send message",
  closeButtonAriaLabel = "Close chat",
  isOpen: controlledIsOpen,
  onToggleOpen,
  className = "",
  themeColor = "var(--primary-color)",
}: ChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isControlled =
    controlledIsOpen !== undefined && onToggleOpen !== undefined;
  const showChat = isControlled ? controlledIsOpen : isOpen;

  const toggleChat = () => {
    setIsAnimating(true);
    if (isControlled) {
      onToggleOpen();
    } else {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <>
      {(!showChat || isAnimating) && (
        <button
          className={`toggle-button ${showChat ? "hide" : "show"}`}
          onClick={toggleChat}
          aria-label="Open chat"
          style={{ backgroundColor: themeColor }}
        >
          {chatIcon}
        </button>
      )}
      {(showChat || isAnimating) && (
        <div
          className={`chat-container ${
            showChat ? "show" : "hide"
          } ${className}`}
        >
          <div className="chat-card">
            <header
              className="chat-header"
              style={{ backgroundColor: themeColor }}
            >
              <h2>{title}</h2>
              <button
                className="close-button"
                onClick={toggleChat}
                aria-label={closeButtonAriaLabel}
              >
                <X className="icon" />
              </button>
            </header>

            <div className="chat-content">
              <div className="scroll-area" ref={scrollAreaRef}>
                <div className="messages-container">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-wrapper ${
                        message.isUser ? "user" : "bot"
                      }`}
                    >
                      <span
                        className="message"
                        style={{
                          backgroundColor: message.isUser
                            ? themeColor
                            : "var(--secondary-color)",
                        }}
                      >
                        {message.content}
                      </span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message-wrapper bot">
                      <span className="message typing">Typing...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <footer className="chat-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="input-form"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={placeholder}
                  className="message-input"
                />
                <button
                  type="submit"
                  className="send-button"
                  aria-label={sendButtonAriaLabel}
                  style={{ backgroundColor: themeColor }}
                >
                  <Send className="icon" />
                </button>
              </form>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
