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
/cybro-timer - Set a timer
/cybro-coinflip - Flip a coin
/cybro-calc - Calculate a math expression
/cybro-translate - Translate text to another language
/cybro-date - Get the current date and time of any Country or Timezone
`,
    response_type: "ephemeral",
  });
});

app.command("/cybro-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/cybro-date", async ({ ack, command, respond }) => {
  await ack();
  const userPrompt = command.text.trim();

  if (!userPrompt) {
    await respond({
      text: "*Please provide a country or timezone.* Example: '/cybro-date Asia/Kathmandu'",
      response_type: "ephemeral"
    });
    return;
  }

  try {
    const response = await axios.get(`https://timeapi.io/api/v1/time/current/zone?timezone=${encodeURIComponent(userPrompt)}`);
    const dateTime = new Date(response.data.date_time);
    const formattedDateTime = dateTime.toLocaleString('en-US', { timeZone: response.data.timezone });

    await respond({
      text: `Current date and time in ${response.data.timezone} is:\n${formattedDateTime}`,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch the current date and time. Please ensure the country or timezone is valid." });
  }
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

app.command("/cybro-ask", async ({ ack, command, respond }) => {
  await ack();

  const userPrompt = command.text.trim();

  if (!userPrompt) {
    await respond({
      text: "*Please provide a question.* Example: '/cybro-ask Where is Mount Everest?'",
      response_type: "ephemeral"
    });
    return;
  }

  try{
    await respond({
      text: '*Processing your request...*\n> \'' + userPrompt + '\'',
    });

    const aiAnswer = await axios.post(
      process.env.HACKCLUB_AI_API,
      {
        model: "google/gemini-3.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Your name is Cybro. You are a Slack bot that provides information and answers questions. You should respond in a concise and clear manner. You give short and precise answers. If you don't know the answer, say 'I don't know.'"
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HACKCLUB_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ).then(res => res.data.choices[0].message.content.trim());

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Question:* ${userPrompt}`
          }
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Answer:* ${aiAnswer}`
          }
        }
      ],
      text: 'Answer: ${aiAnswer}',
      response_original: true
    });
  } catch (err) {
    await respond({ text: "Failed to process your request." });
  }
});

app.command("/cybro-calc", async ({ ack, command, respond }) => {
  await ack();

  const userPrompt = command.text.trim();

  if (!userPrompt) {
    await respond({
      text: "*Please provide a question.* Example: '/cybro-calc 2 + 2'",
      response_type: "ephemeral"
    });
    return;
  }

  try{
    await respond({
      text: '*Calculating...*\n> \'' + userPrompt + '\'',
    });

    const aiAnswer = await axios.post(
      process.env.HACKCLUB_AI_API,
      {
        model: "google/gemini-3.5-flash",
        messages: [
          {
            role: "system",
            content: "Your name is Cybro. You are a Slack bot that do Calculations. You should respond in a concise and clear manner. You give short and precise answers. If you don't know the answer, say 'I don't know.'. You will only give answers to calculations and math expressions. You will not answer any other questions."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HACKCLUB_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ).then(res => res.data.choices[0].message.content.trim());

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Question:* ${userPrompt}`
          }
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Answer:* ${aiAnswer}`
          }
        }
      ],
      text: 'Answer: ${aiAnswer}',
      response_original: true
    });
  } catch (err) {
    await respond({ text: "Failed to process your request." });
  }
});

app.command("/cybro-translate", async ({ ack, command, respond }) => {
  await ack();

  const userPrompt = command.text.trim();

  if (!userPrompt) {
    await respond({
      text: "*Please provide a translation request.* Example: '/cybro-translate Hello, how are you? to Nepali'",
      response_type: "ephemeral"
    });
    return;
  }

  try{
    await respond({
      text: '*Translating...*\n> \'' + userPrompt + '\'',
    });

    const aiAnswer = await axios.post(
      process.env.HACKCLUB_AI_API,
      {
        model: "google/gemini-3.5-flash",
        messages: [
          {
            role: "system",
            content: "Your name is Cybro. You are a Slack bot that translates text. You should respond in a concise and clear manner. You give short and precise answers. If you don't know the answer, say 'I don't know.'. You will only give answers to translation requests. You will not answer any other questions. If the user asks you to translate text, you will provide the translation in the requested language. If the user does not specify a language, you will ask them to specify a language. You will not provide translations in multiple languages at once. You will only provide translations in one language at a time. If the user gave you in another language and did not specify a language, you will translate the text to English. You will not provide translations in multiple languages at once. You will only provide translations in one language at a time."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HACKCLUB_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ).then(res => res.data.choices[0].message.content.trim());

    await respond({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Question:* ${userPrompt}`
          }
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Answer:* ${aiAnswer}`
          }
        }
      ],
      text: 'Answer: ${aiAnswer}',
      response_original: true
    });
  } catch (err) {
    await respond({ text: "Failed to process your request." });
  }
});

app.command("/cybro-coinflip", async ({ ack, command, respond }) => {
  await ack();

  try {
    const isHeads = Math.random() < 0.5;
    const result = isHeads ? "Heads" : "Tails";
    const emoji = isHeads ? "🪙 (Heads)" : "🦅 (Tails)";

    await respond({
      text: `<@${command.user_id}> flipped a coin and got: ${result}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<@${command.user_id}> spun the coin... \n\n It's *${emoji}*!`,
          }
        }
      ]
    });
  } catch (err) {
    await respond({ text: "Failed to flip a coin." });
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

  const totalMilliseconds = min * 60 * 1000;
  const stepDuration = totalMilliseconds / 4; // 4 steps for progress bar updates
  let currentStep = 0;

  const getProgressBar = (step) => {
    const totalBars = 12;
    const filledBars = Math.round((step / 4) * totalBars);
    const emptyBars = totalBars - filledBars;
    return "[" + "🟩".repeat(filledBars) + "⬜".repeat(emptyBars) + "]";
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
          text: `⏰ Timer Started for *${min} minute(s)*. Progressing...`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: `${getProgressBar(currentStep)} 0% complete`,
          },
        ],
      },
    ],
  });

  const countdownInterval = setInterval(async () => {
    currentStep++;

    try {
      if (currentStep < 4) {
        const percentage = currentStep * 25; // Each step represents 25%
        await respond({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `⏰ Timer is running for *${min} minute(s)*...`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "plain_text",
                  text: `${getProgressBar(currentStep)} ${percentage}% complete`,
                },
              ],
            },
          ],
          replace_original: true,
        });
      } else {
        clearInterval(countdownInterval);
        await respond({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `✅ *Time's up!* Your ${min} minute(s) timer is complete.`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "plain_text",
                  text: `${getProgressBar(currentStep)} 100% complete`,
                },
              ],
            },
          ],
          replace_original: true,
        });
      }
    } catch (err) {
      console.error("Failed to update timer:", err);
      clearInterval(countdownInterval);
    }
  }, stepDuration);
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
