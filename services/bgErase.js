const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


module.exports = async function bgErase(prompt, to) {
    await replicate.predictions.create({
      version: "a00d0b7dcbb9c3fbb34ba87d2d5b46c56969c84a628bf778a7fdaec30b1b99c5",
      input: {
        prompt: prompt,
      },
      webhook: `${process.env.NGROK_URL}/messageEnd/${to}`,
      webhook_events_filter: ["completed"],
    });
  };
  
   