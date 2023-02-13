import { ChatGPTClient } from "@waylaidwanderer/chatgpt-api";

const api = new ChatGPTClient(process.env.CHAT_GPT_ACCESS_TOKEN, {
  reverseProxyUrl: "https://chatgpt.hato.ai/completions",
  modelOptions: {
    model: "text-davinci-002-render",
  },
});

const notifications = [];
const categories = [];

//Sending a PROMPT to the Chat GPT API
const res = await api.sendMessage(
  "Can you list 100 types of websites in the world send in-app notifications? just the category"
);
categories.push(
  ...extractNumberedList(res.response).map((p) => ({
    category: p,
    notificationTypes: [],
  }))
);

//Adding a notification type to a category
for (const category of categories) {
  const notificationTypesRes = await api.sendMessage(
    `I have a website of type ${category}, What kind of notifications should I sent to my users? can you just write the type without context? give me 20`
  );
  const notificationTypes = extractNumberedList(res.response).map((p) => ({
    name: p,
    notifications: [],
  }));
}
