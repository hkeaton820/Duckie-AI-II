# DEPLOYMENT.md

## Deploying Duckie AI to the Web

### Option 1: Vercel (Recommended - Easiest)

**Benefits:**
- Free tier with unlimited deployments
- Automatic deployments on push to GitHub
- Built-in environment variable management
- Lightning-fast global CDN

**Steps:**

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial Duckie AI commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Duckie-AI-II"

3. **Set Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `VITE_OPENAI_API_KEY` = your OpenAI API key
   - Make sure it's set for Production environment

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live! 🎉

---

### Option 2: Netlify

**Benefits:**
- Free tier with generous limits
- Drag-and-drop deployment option
- Easy environment variable setup
- Built-in form handling

**Steps:**

1. **Push to GitHub** (same as Vercel step 1)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose "Duckie-AI-II" repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add: `VITE_OPENAI_API_KEY` = your OpenAI API key

5. **Deploy:**
   - Click "Deploy site"
   - Your site is live! 🎉

---

### Option 3: GitHub Pages

**Steps:**

1. Update `vite.config.ts` to add base path:
   ```typescript
   export default defineConfig({
     base: '/Duckie-AI-II/', // your repo name
     ...
   })
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/Duckie-AI-II"
   }
   ```

3. Push to GitHub and enable GitHub Pages in repo settings

---

## Troubleshooting

### Build Fails with "VITE_OPENAI_API_KEY is required"
- Check that your environment variable is set correctly in the deployment platform
- Make sure the key name exactly matches `VITE_OPENAI_API_KEY`

### "API key not valid" errors
- Verify your OpenAI API key is correct
- Check that your OpenAI account has available credits
- Make sure the key hasn't been revoked

### CORS Issues
- The `dangerouslyAllowBrowser: true` setting in `openai.ts` allows browser access
- If you get CORS errors, consider adding a backend API layer

---

## Getting Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Click your profile → API keys
4. Click "Create new secret key"
5. Copy and save it (you won't see it again!)

---

## Next Steps After Deployment

- Share your deployed URL with others
- Monitor API usage in OpenAI dashboard
- Consider adding analytics or usage tracking
- Gather feedback and iterate!

**Your Duckie AI is ready to help people worldwide! 🦆💛**
