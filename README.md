# Cybro

A utility Slack bot built on the Slack Bolt framework that answers questions, translates languages, handles math expressions, and automates daily utilities.

---

### [Try the Live Demo](https://hackclub.enterprise.slack.com/archives/C0BFJLJ6KUG)

---

## Quick Start

Bring Cybro into your local Slack workspace environment in seconds:

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

* **AI Assistant ('/cybro-ask'):** Uses Google's Gemini 3.5 Flash model via the HackClub AI API to handle real-time contextual queries instantly.
* **Smart Calculator ('/cybro-calc'):** Dedicated system prompt math parser ensurinr quick and concise calculation responses.
* **Real-Time Translation ('/cybro-translate'):** Multi-language parsing that translates input text directly to your target language.
* ** Visual Workspace Timer ('/cybro-timer'):** Keeps you on track with an automated, live-updating Slack message progress bar.
* **World Clock ('/cybro-date'):** Directly queries external time APIs to pull current times for any global city or timezone.
* **Workspace Utilities:** Instant access to latency tests ('/cybro-ping'), coinflips ('/cybro-coinflip'), jokes, and facts.

---

## Local Development Setup

### Prerequisites 

* **Node.js:** 'v18.x' or higher
* **Slack Developer App:** A registered Slack application with 'Socket Mode' enabled.

### 1. Environment Variavles

Create a '.env' file in the root directory of your project and populate it with your workspace and API Credentials:

```env
SLACK_BOT_TOKEN=xoxb-....  # Bot User OAuth Token (from OAuth & Permissions)
SLACK_APP_TOKEN=xapp-....  # App-Level Token (from Basic Information → App-Level Tokens)

HACKCLUB_AI_API=https://ai.hackclub.com/proxy/v1/chat/completions # Hack Club AI API Endpoint
HACKCLUB_AI_API_KEY=sk-hc-....  # Hack Club AI API Key (from Hack Club AI)     
```

### 2. Configuration & Slash Commands

Ensure your Slack App dashboard has the following slash Commands registered pointing toward your socket server:

* '/cybro-help', '/cybro-ping', '/cybro-info', '/cybro-ask', '/cybro-calc', '/cybro-translate', '/cybro-coinflip','/cybro-dogfact', '/cybro-catfact', '/cybro-joke', '/cybro-timer', '/cybro-date'

---

## How It Works

Cybro leverages **Slack's Bolt JS Framework** operating entirely over **Socket Mode**. This architectural choice removes the requirement for public HTTP endpoints during development, establishing a secure, stateful WebSocket connection directly from your local machine or hosting server to slack.

---

## Credits & Acknowledgements

* **Slack Bolt SDK** - For making Slack App integration seamless.
* **HackClub AI API** - Providing fast access to the 'google/gemini-3.5-flash' model.
* **External API Providers** - [TimeAPI.io](https://timeapi.io) (Timexones), [Dog API](https://dogapi.dog) (Dog Facts), [Cat Fact Ninja](https://catfact.ninja), and [Offical Joke API](https://offical-joke-api.appspot.com).
