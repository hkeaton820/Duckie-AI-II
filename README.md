# Duckie AI II

A friendly, step-by-step task breakdown assistant designed to help people with executive dysfunction.

## 🦆 Features

- **Task Breakdown**: Input any overwhelming task and get it broken down into clear, actionable steps
- **Chat Interface**: Ask follow-up questions and get personalized advice
- **Yellow Chibi Duckie Theme**: Cute, encouraging aesthetic to make the experience more pleasant
- **Step-by-Step Guidance**: Each task is broken into 4-8 manageable steps with tips
- **Supportive Tone**: AI responses are encouraging and non-judgmental

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables. Create a `.env.local` file:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx    # Chat conversation display
│   ├── TaskBreakdown.tsx    # Task breakdown display
│   ├── TaskInput.tsx        # Task input form
│   └── DuckieCharacter.tsx  # Cute duckie mascot
├── services/
│   └── openai.ts           # OpenAI API integration
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Tailwind + custom styles
```

## 🎨 Customization

The color scheme and theme can be customized in `tailwind.config.js`:

```javascript
colors: {
  duckie: {
    yellow: '#FFD700',    // Main yellow
    light: '#FFF8DC',     // Light cream
    accent: '#FFB347',    // Orange accent
    dark: '#DAA520',      // Dark gold
  }
}
```

## 💡 How It Works

1. **Task Input**: User enters an overwhelming task
2. **AI Breakdown**: Claude AI breaks it into specific steps with descriptions
3. **Display**: Steps are shown with numbers, titles, descriptions, and tips
4. **Chat Support**: User can ask follow-up questions in the chat interface
5. **Encouragement**: AI provides supportive, judgment-free guidance

## 🤝 For People with Executive Dysfunction

This tool is designed with ADHD and executive dysfunction in mind:
- ✅ Removes decision paralysis by breaking tasks into small steps
- ✅ Provides clear, specific instructions
- ✅ Offers encouragement and support
- ✅ Allows for follow-up questions
- ✅ Uses positive, non-judgmental language

## 📝 License

MIT

## 🦆 Made with 💛 by Duckie AI
