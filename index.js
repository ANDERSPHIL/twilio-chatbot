
const Replicate = require("replicate");
const llamaMessage = require("./services/llama.js");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

require("dotenv").config();
const bgErase = require("./services/bgErase.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/message", async (req, res) => {
  const { From: from, Body } = req.body;

  if (Body && Body.startsWith("#llm")) {
    const prompt = Body.replace("#llm", "").trim();
    await llamaMessage(prompt, from); // Utilisez la fonction llamaMessage

    const twiml = new MessagingResponse();
    twiml.message("Llama is working on it...");
    res.type("text/xml").send(twiml.toString());
  }  else if (Body && Body.startsWith("#img")) {
    const imageUrl = Body.replace("#img", "").trim();
    await bgErase(imageUrl, from);

    const twiml = new MessagingResponse();
    twiml.message("Clever is working on it...");
    res.type("text/xml").send(twiml.toString());
  } else {
    const twiml = new MessagingResponse();
    twiml.message("Invalid command. Start your message with #llm or #img.");
    res.type("text/xml").send(twiml.toString());
  }
});


  app.post("/messageEnd/:to", async (req, res) => {
    const { to } = req.params;
    const { output: editedImageUrl } = req.body;
  
  
    const decodedImageUrl = decodeURIComponent(editedImageUrl); // Décode l'URL
  
    const twiml = new MessagingResponse();
    twiml.message().media(decodedImageUrl); // Utilise l'URL décodée

  
  
    await client.messages.create({
      mediaUrl: decodedImageUrl,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to,
    });
  
    res.sendStatus(200);
  });
  ;

  app.post("/messageEnd/:to", async (req, res) => {
    const { to } = req.params;
    const { output: responseText } = req.body;
  
    // Créez votre propre logique pour traiter la réponse texte ici
    // Par exemple, vous pourriez simplement envoyer le texte de la réponse à l'utilisateur
    const twiml = new MessagingResponse();
    twiml.message(responseText);
  
    // Envoyez la réponse à l'utilisateur via Twilio
    await client.messages.create({
      body: responseText, // Utilisez le texte de la réponse
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to,
    });
  
    res.sendStatus(200);
  });
  



const { MessagingResponse } = require("twilio").twiml;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
const ngrok = require("ngrok");

app.listen(3000, () => {
  console.log("Server is listening on port 3000");

  (async function () {
    const url = await ngrok.connect(3000);
    process.env["NGROK_URL"] = url;
    console.log(`Ngrok URL: ${url}`);
  })();
});
