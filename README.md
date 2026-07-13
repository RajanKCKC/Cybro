# Cybro

AI-driven productivity and utility Slack bot built on top of slack bolt framework that answer questions, translates languages, handles math expressions and automates daily utilities.

---

### [Try the Live Demo](https://hackclub.enterprise.slack.com/archives/C0BFJLJ6KUG)

---

## Quick Start

Get Cybro to your local environment of Slack workspace in seconds:

```bash
# Clone the Project
git clone https://github.com/RajanKCKC/Cybro.git

# Install required dependencies
npm install

# Start the bot
npm start

```
---

## Features 

* **AI Assistant (`/cybro-ask`):** Powered by Google`s Gemini 3.5 Flash model via the Hack Club API for real-time contextual questions instantly.
* **Smart Calculator (`/cybro-calc`):** System prompt math parser for fast concise calculation responses.
* **Real-Time Translation (`/cybro-translate`):** Multi-language parsing to directly translate the input text into your target language.
* **Visual Workspace Timer (`/cybro-timer`):** Keeps you on track with an automated, live-updating Slack message progress bar.
* **World Clock (`/cybro-date`):** Directly calls external time APIs to get current times for any city or timezone.
* **Workspace Utilities:** Get instant access to latency tests (`/cybro-ping`), coinflips (`/cybro-coinflip`), jokes and facts.

---

## Local Development Setup

### Prerequisites 

* **Node.js:** `v18.x` or higher
* **Slack Developer App:** A registered Slack app with Socket Mode enabled.

### 1. Environment Variavles

Create a `.env` file in the root directory of your project and populate it with your workspace and API Credentials:

```env
SLACK_BOT_TOKEN=xoxb-....  # Bot User OAuth Token (from OAuth & Permissions)
SLACK_APP_TOKEN=xapp-....  # App-Level Token (from Basic Information → App-Level Tokens)

HACKCLUB_AI_API=https://ai.hackclub.com/proxy/v1/chat/completions # Hack Club AI API Endpoint
HACKCLUB_AI_API_KEY=sk-hc-....  # Hack Club AI API Key (from Hack Club AI)     
```

### 2. Configuration & Slash Commands

Your Slack App dashboard should have the following slash Commands registered pointing toward your socket server:

* `/cybro-help`, `/cybro-ping`, `/cybro-info`, `/cybro-ask`, `/cybro-calc`, `/cybro-translate`, `/cybro-coinflip`,`/cybro-dogfact`, `/cybro-catfact`, `/cybro-joke`, `/cybro-timer`, `/cybro-date`

---

## How It Works

Cybro is entirely built on **Socket Mode** using **Slack's Bolt JS Framework**. With this architecture, during development you don't have to expose any HTTP endpoints publicly, and you create a secure, Stateful WebSocket connection directly from local machine or hosting server to Slack.

---

## Credits & Acknowledgements

* **Slack Bolt SDK** - To make Slack App integration a breeze.
* **HackClub AI API** - Instant access to the `google/gemini-3.5-flash` model.
* **External API Providers** - [TimeAPI.io](https://timeapi.io) (Timexones), [Dog API](https://dogapi.dog) (Dog Facts), [Cat Fact Ninja](https://catfact.ninja), and [Offical Joke API](https://offical-joke-api.appspot.com).
