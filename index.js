import { ChatGPTClient } from "@waylaidwanderer/chatgpt-api";
import extractNumberedList from "./util";

const api = new ChatGPTClient(process.env.CHAT_GPT_ACCESS_TOKEN, {
  reverseProxyUrl: "https://chatgpt.hato.ai/completions",
  modelOptions: {
    model: "text-davinci-002-render",
  },
});

const categories = [];
const app = express();
const port = 3000;

//Listening to the server
app.get('/', (req, res) => {
    return categories;
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

//Sending a PROMPT to the Chat GPT API
const res = await api.sendMessage('Can you list 50 types of websites in the world send in-app notifications? just the category');

//Adding a notification type to a category
categories.push(...extractNumberedList(res.response).map(p => ({category: p, notificationTypes: []})));

for (const category of categories) {
  // get all the notifications type
    const notificationTypesRes = await api.sendMessage(`I have a website of type ${category}, What kind of notifications should I sent to my users? can you just write the type without context? give me 20`);
  // parse all the notification type and map them
  const notificationTypes = extractNumberedList(notificationTypesRes.response).map(p => ({name: p, notifications: []}));
  // get all the notifications for the notification type
  const notifications = await Promise.all(notificationTypes.map(async p => {
        const notificationRes = await api.sendMessage(`I have built a system about "${category}" and I need to create in-app notifications about "${notificationType}", can you maybe write me a 20 of those? just the notification without the intro, use lower-case double curly braces with no spaces and underscores for the variables, and avoid using quotation when writing the notifications`);
        return {
            ...p,
            notifications: extractNumberedList(notificationRes.response)
        }
    }));
  // push it to the main array
    notificationTypes.notifications.push(...notifications);
}
