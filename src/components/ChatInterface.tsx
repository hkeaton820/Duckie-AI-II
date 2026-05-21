import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatProps {
  onSendMessage: (message: string) => Promise<string>
  isLoading?: boolean
}

export const ChatInterface: React.FC<ChatProps> = ({ onSendMessage, isLoading = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '👋 Hi! I\'m Duckie AI! I\'m here to help you break down big tasks into manageable steps. You can ask me anything about tackling a project, or use the form above to break down a specific task!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [localLoading, setLocalLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || localLoading || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLocalLoading(true)

    try {
      const response = await onSendMessage(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: '😅 Oops! Something went wrong. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border-2 border-duckie-yellow">
      {/* Header */}
      <div className="bg-gradient-to-r from-duckie-yellow to-duckie-accent p-4 rounded-t-xl">
        <h2 className="text-xl font-bold text-gray-800">💬 Chat with Duckie</h2>
        <p className="text-sm text-gray-700">Ask me anything about managing your tasks!</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`chat-message ${msg.type} rounded-xl p-3 max-w-xs break-words ${
                msg.type === 'user'
                  ? 'bg-duckie-accent text-white rounded-br-none'
                  : 'bg-duckie-light border-2 border-duckie-yellow rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {(localLoading || isLoading) && (
          <div className="flex justify-start">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-2 border-duckie-yellow p-3 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me something..."
            disabled={localLoading || isLoading}
            className="flex-1 px-4 py-2 border-2 border-duckie-yellow rounded-full focus:outline-none focus:ring-2 focus:ring-duckie-accent disabled:bg-gray-100"
          />
          <button
            onClick={handleSend}
            disabled={localLoading || isLoading}
            className="bg-duckie-accent hover:bg-duckie-dark text-white font-bold py-2 px-4 rounded-full transition disabled:opacity-50 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
