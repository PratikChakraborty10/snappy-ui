import { ReactNode } from 'react'

export interface Message {
  id: string
  content: string
  isUser: boolean
}

export interface ChatProps {
  /**
   * Array of messages to display in the chat
   */
  messages: Message[]
  
  /**
   * Callback function triggered when a message is sent
   */
  onSendMessage: (message: string) => void
  
  /**
   * Indicates if the other party is currently typing
   * @default false
   */
  isTyping?: boolean
  
  /**
   * Custom icon for the chat toggle button
   * @default MessageCircle icon
   */
  chatIcon?: ReactNode
  
  /**
   * Title displayed in the chat header
   * @default "Chat"
   */
  title?: string
  
  /**
   * Placeholder text for the input field
   * @default "Type your message..."
   */
  placeholder?: string
  
  /**
   * Aria label for the send button
   * @default "Send message"
   */
  sendButtonAriaLabel?: string
  
  /**
   * Aria label for the close button
   * @default "Close chat"
   */
  closeButtonAriaLabel?: string
  
  /**
   * Controls the visibility of the chat when used as a controlled component
   */
  isOpen?: boolean
  
  /**
   * Callback function to toggle the chat visibility when used as a controlled component
   */
  onToggleOpen?: () => void
  
  /**
   * Additional CSS class name for custom styling
   */
  className?: string
  
  /**
   * Primary color for themed elements (header background, user messages, buttons)
   * @default "var(--primary-color)"
   */
  themeColor?: string
}