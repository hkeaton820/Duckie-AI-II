import React, { useState } from 'react'
import { TaskInput } from './components/TaskInput'
import { TaskBreakdown } from './components/TaskBreakdown'
import { ChatInterface } from './components/ChatInterface'
import { DuckieCharacter } from './components/DuckieCharacter'
import { breakDownTask, askQuestion, type TaskResponse } from './services/openai'

function App() {
  const [currentTask, setCurrentTask] = useState<TaskResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])

  const handleTaskSubmit = async (task: string) => {
    setIsLoading(true)
    try {
      const result = await breakDownTask(task)
      setCurrentTask(result)
      setConversationHistory([])
    } catch (error) {
      console.error('Error breaking down task:', error)
      alert('Failed to break down task. Make sure your API key is set.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatMessage = async (message: string) => {
    setConversationHistory(prev => [...prev, { role: 'user', content: message }])
    
    try {
      const response = await askQuestion(message, conversationHistory)
      setConversationHistory(prev => [...prev, { role: 'assistant', content: response }])
      return response
    } catch (error) {
      console.error('Error in chat:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-duckie-light via-white to-yellow-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              🦆 Duckie AI
            </h1>
            <p className="text-gray-600 text-lg">Your friendly step-by-step task assistant</p>
          </div>
          <div className="hidden md:block">
            <DuckieCharacter size="md" isThinking={isLoading} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Task Input and Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <TaskInput onSubmit={handleTaskSubmit} isLoading={isLoading} />
            
            {currentTask && (
              <TaskBreakdown task={currentTask} isLoading={isLoading} />
            )}

            {!currentTask && !isLoading && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-duckie-yellow p-8 text-center">
                <div className="mb-4">
                  <DuckieCharacter size="lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Duckie AI! 👋</h3>
                <p className="text-gray-600">
                  I'm here to help you tackle overwhelming tasks by breaking them down into small, manageable steps. 
                  This is especially helpful if you struggle with executive dysfunction or decision paralysis.
                </p>
                <div className="mt-6 space-y-2 text-sm text-gray-700">
                  <p>💡 <strong>Try asking me to break down:</strong></p>
                  <ul className="space-y-1">
                    <li>• Cleaning or organizing projects</li>
                    <li>• Work or creative assignments</li>
                    <li>• Self-care routines</li>
                    <li>• Studying or learning goals</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-1 flex flex-col">
            <ChatInterface onSendMessage={handleChatMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center text-sm text-gray-600 border-t border-duckie-yellow pt-6">
        <p>💛 Duckie AI - Helping you succeed, one step at a time.</p>
        <p className="mt-2 text-xs">
          Remember: You don't have to do everything at once. Just take it one step at a time! 
        </p>
      </div>
    </div>
  )
}

export default App
