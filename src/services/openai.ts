import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export interface Step {
  number: number
  title: string
  description: string
}

export interface TaskResponse {
  title: string
  overview: string
  steps: Step[]
  tips: string[]
}

export async function breakDownTask(task: string): Promise<TaskResponse> {
  const systemPrompt = `You are Duckie AI, a helpful and encouraging assistant designed to help people with executive dysfunction break down overwhelming tasks into manageable, step-by-step instructions. 

Your role is to:
1. Take a task or goal and break it down into clear, specific, actionable steps
2. Make each step small enough to feel achievable
3. Provide helpful tips and encouragement
4. Use a friendly, supportive tone
5. Be specific and practical

Always respond in the following JSON format:
{
  "title": "Brief task name",
  "overview": "2-3 sentence overview of the task",
  "steps": [
    {
      "number": 1,
      "title": "Step title",
      "description": "Clear, specific description of what to do"
    }
  ],
  "tips": ["Helpful tip 1", "Helpful tip 2", "Helpful tip 3"]
}

Make sure to:
- Break tasks into 4-8 manageable steps
- Make each step very specific and actionable
- Include encouraging tips at the end
- Keep language simple and non-judgmental`

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Please help me break down this task: "${task}"`
      }
    ]
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('No response from API')
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Could not parse response as JSON')
  }

  return JSON.parse(jsonMatch[0])
}

export async function askQuestion(question: string, conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<string> {
  const messages = conversationHistory.map(msg => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content
  }))
  
  messages.push({
    role: 'user' as const,
    content: question
  })

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
    temperature: 0.7,
    system: `You are Duckie AI, a friendly and supportive assistant helping people with executive dysfunction. 
    You provide practical, encouraging advice in a warm and non-judgmental way. 
    Keep responses concise but helpful, often suggesting small actionable steps.
    Use a light, supportive tone and encourage the user.
    Keep responses to 2-3 sentences unless more detail is requested.`,
    messages: messages
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('No response from API')
  }

  return content
}
