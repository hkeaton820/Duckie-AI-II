import React, { useState } from 'react'

interface TaskInputProps {
  onSubmit: (task: string) => Promise<void>
  isLoading?: boolean
}

export const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, isLoading = false }) => {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      await onSubmit(input)
      setInput('')
    }
  }

  const quickExamples = [
    '🧹 Clean my room',
    '📝 Write an essay',
    '🎨 Start a creative project',
    '📧 Organize my inbox'
  ]

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border-2 border-duckie-yellow p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🦆 Duckie AI</h2>
        <p className="text-gray-600">
          Tell me about a task that feels overwhelming, and I'll help you break it down into manageable steps!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What task would you like help with?"
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-duckie-yellow rounded-full focus:outline-none focus:ring-2 focus:ring-duckie-accent disabled:bg-gray-100 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-duckie-accent hover:bg-duckie-dark text-white font-bold py-3 px-6 rounded-full transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            {isLoading ? 'Breaking it down...' : 'Break It Down'}
          </button>
        </div>

        {/* Quick examples */}
        <div className="pt-2">
          <p className="text-sm text-gray-600 mb-2">Quick examples:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickExamples.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInput(example)
                }}
                className="text-sm bg-duckie-light hover:bg-yellow-200 text-gray-800 py-2 px-3 rounded-full border border-duckie-yellow transition cursor-pointer"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
