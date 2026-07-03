require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/cybro-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/cybro-help - Command List
/cybro-ping - Check bot latency
/cybro-catfact - Get a cat fact
/cybro-dogfact - Get a dog fact
/cybro-joke - Get a Joke
/cybro-ask - Ask anything
/cybro-info - Information about Cybro
/cybro-timer - Set a timer`,
  });
});

app.command("/cybro-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/cybro-info", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  try {
    await respond({
      text: `
    *Cybro Information*
  
    - *Version:* 1.0.0
    - *Ping:* ${latency}ms
    - *Status:* Online
    - *Need Help?* Use /cybro-help to see all commands
    `,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch information about Cybro." });
  }
});

app.command("/cybro-dogfact", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://dogapi.dog/api/v2/facts");
    const dogFact = response.data.data[0].attributes.body;
    await respond({ text: `Dog Fact:\n${dogFact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a dog fact." });
  }
});

app.command("/cybro-timer", async ({ ack, respond, command }) => {
  await ack();
  const min = parseInt(command.text.trim(), 10);

  if (isNaN(min) || min <= 0 || min > 60) {
    await respond({
      text: "*Please provide a valid number of minutes (1-60).* Example: `/cybro-timer 5`",
    });
    return;
  }

  let totalSeconds = min * 60;
  const initialSeconds = totalSeconds;

  const getProgressBar = (remaining, total) => {
    const totalBars = 10;
    const filledBars = Math.round((remaining / total) * totalBars);
    const emptyBars = totalBars - filledBars;
    return "[" + "█".repeat(filledBars) + "░".repeat(emptyBars) + "]";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} minute(s) and ${secs.toString().padStart(2, "0")} second(s)`;
  };

  // Initial post
  await respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `⏰ Timer set for *${min} minute(s)*. I will notify you when it's done.`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: getProgressBar(totalSeconds, initialSeconds),
          },
        ],
      },
    ],
  });

  const intervalSeconds = 2;

  const countdownInterval = setInterval(async () => {
    totalSeconds -= intervalSeconds;

    try {
      if (totalSeconds > 0) {
        // FIXED: Removed clearInterval from here so the loop keeps running
        await respond({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `⏰ Countdown: ${formatTime(totalSeconds)} remaining.`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "plain_text",
                  text: getProgressBar(totalSeconds, initialSeconds), // Added progress bar updates here
                },
              ],
            },
          ],
          text: `⏰ Countdown: ${formatTime(totalSeconds)} remaining.`,
          replace_original: true,
        });
      } else {
        clearInterval(countdownInterval); // FIXED: Moved clearInterval here
        await respond({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `⏰ Time's up! ${min} minute(s) have passed.`,
              },
            },
          ],
          text: `⏰ Time's up! ${min} minute(s) have passed.`,
          replace_original: true,
        });
      }
    } catch (err) {
      console.error("Failed to send countdown notification:", err);
    }
  }, intervalSeconds * 1000);
});

app.command("/cybro-catfact", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/cybro-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    await respond({
      text: `${response.data.setup}\n${response.data.punchline}`,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
