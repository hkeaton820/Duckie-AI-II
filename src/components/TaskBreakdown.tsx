import React from 'react'
import type { TaskResponse } from '../services/openai'

interface TaskBreakdownProps {
  task: TaskResponse
  isLoading?: boolean
}

export const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ task, isLoading = false }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border-2 border-duckie-yellow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-duckie-yellow to-duckie-accent p-6 rounded-t-xl">
        <h2 className="text-2xl font-bold text-gray-800">✨ {task.title}</h2>
      </div>

      {/* Overview */}
      <div className="p-6 border-b-2 border-duckie-light">
        <p className="text-gray-700 leading-relaxed">{task.overview}</p>
      </div>

      {/* Steps */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Steps to Success</h3>
        <div className="space-y-3">
          {task.steps.map(step => (
            <div key={step.number} className="flex gap-4 p-4 bg-duckie-light rounded-xl border-l-4 border-duckie-accent">
              <div className="step-indicator flex-shrink-0">{step.number}</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {task.tips && task.tips.length > 0 && (
        <div className="p-6 border-t-2 border-duckie-light bg-gradient-to-r from-yellow-50 to-orange-50">
          <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Helpful Tips</h3>
          <ul className="space-y-2">
            {task.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-duckie-accent font-bold">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="p-6 flex justify-center">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
}
