# Prashant Priyadarshi - Portfolio

Personal portfolio website for Prashant Priyadarshi, Generative AI Engineer at Ethara AI. It showcases production RAG pipelines, LangGraph multi-agent workflows, and verifiable LLM evaluations.

## Tech Stack

- **Frontend:** React 19, Vite, Bootstrap 5 (grid and utilities), Framer Motion, Lucide React
- **Styling:** Custom CSS design system with light (warm paper) and dark (charcoal) modes
- **Backend / API:** Vercel Serverless Function (`api/chat.js`) powered by Google Gemini or OpenAI
- **Fallback Engine:** Embedded client-side RAG engine that guarantees 100% uptime with zero configuration

## Running Locally

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/Prashant-2818/<repo-name>.git
   cd <repo-name>
   npm install
   ```

2. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **(Optional) Run local Express backend:**
   ```bash
   npm run server
   ```
   Runs a local Express API server on `http://localhost:3001`. Vite dev proxy forwards `/api` requests to this port automatically.

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Required |
| :--- | :--- | :--- |
| `PORT` | Local Express development port | `3001` (optional) |
| `GEMINI_API_KEY` | Google Gemini API key for assistant responses | Optional |
| `OPENAI_API_KEY` | OpenAI API key for assistant responses | Optional |

> **Zero Config Guarantee:** Neither key is strictly required. If keys are omitted or external calls fail, the portfolio silently uses its built-in knowledge base.

## How the AI Assistant Works

The chatbot ("Prashant AI") answers questions strictly using verified facts from Prashant's resume:

1. **In Production (Vercel):** The browser sends a `POST` request to `/api/chat`. The Vercel serverless function validates the input, applies IP-based rate limiting, and queries Gemini (`gemini-1.5-flash`) or OpenAI (`gpt-4o-mini`).
2. **In Local Development:** Either connect through `npm run server` (Express) or use Vite's default dev environment.
3. **Local RAG Fallback:** If the API endpoint is unavailable, times out after 8 seconds, or no keys are configured, the client seamlessly answers using a deterministic keyword and semantic retrieval model.

## Project Structure

```text
prashant-portfolio/
├── api/
│   └── chat.js                   # Vercel serverless function (Node.js runtime)
├── public/
│   ├── apple-touch-icon.png      # 180x180 iOS touch icon
│   ├── favicon.svg               # SVG monogram favicon
│   ├── og-image.png              # 1200x630 social preview card
│   ├── robots.txt                # Search engine crawler rules
│   ├── site.webmanifest          # PWA metadata
│   └── sitemap.xml               # XML sitemap
├── server/
│   └── index.js                  # Local Express development server
├── server-python-optional/
│   ├── main.py                   # Optional standalone FastAPI service
│   └── requirements.txt          # Python dependencies
├── src/
│   ├── assets/                   # Static project assets
│   ├── components/               # React UI sections and modals
│   ├── data/
│   │   └── resumeData.js         # Single source of truth for resume data and links
│   ├── services/
│   │   └── chatService.js        # Chatbot dispatch & local RAG engine
│   ├── App.jsx                   # Application root with lazy-loaded modals
│   ├── index.css                 # Complete token-based design system
│   └── main.jsx                  # Entry mount point
├── .env.example                  # Environment variable reference
├── .gitignore                    # Git ignore specifications
├── .nvmrc                        # Node.js runtime version pin (>=20)
├── package.json                  # Scripts and dependencies
├── vercel.json                   # Vercel cache and security headers
└── vite.config.js                # Vite build and dev server proxy config
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Verify the build configuration:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Node.js Version:** `20.x` or newer
5. (Optional) Under **Settings > Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini key
   - or `OPENAI_API_KEY` = your OpenAI key
   Select both **Production** and **Preview** environments.
6. Click **Deploy**.
7. If you add environment variables after deploying, go to the **Deployments** tab, click **Redeploy** on the latest build to apply them.
8. Add your custom domain under **Settings > Domains** and update the TODO placeholders in `index.html`, `robots.txt`, and `sitemap.xml`.

## Verification & Contact

- **Candidate:** Prashant Priyadarshi
- **Role:** Generative AI Engineer @ Ethara AI
- **Email:** 3dprashant057@gmail.com
- **LinkedIn:** [linkedin.com/in/prashant-priyadarshi-984b68222](https://www.linkedin.com/in/prashant-priyadarshi-984b68222/)
- **GitHub:** [github.com/Prashant-2818](https://github.com/Prashant-2818)
