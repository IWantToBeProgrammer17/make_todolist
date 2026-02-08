const express = require("express");
const ChatbotModel = require("../models/chatbot.model");
const { GEMINI_API_KEY } = require("../config/config");
const { default: axios } = require("axios");

const router = express.Router();

router.get("/chats", async function (req, res) {
  const chatsDb = await ChatbotModel.getChats(1);

  const chats = chatsDb.map((chat) => {
    return {
      id: chat.id,
      title: chat.title,
    };
  });

  return res.status(200).json({
    data: chats,
  });
});
router.post("/chats", async function (req, res) {
  const chatData = {
    user_id: 1,
    title: req.body.title,
  };

  const newChat = await ChatbotModel.createChat(chatData);

  return res.status(201).json({
    data: newChat,
  });
});
router.get("/chats/:chatid/messages", async function (req, res) {
  const messages = await ChatbotModel.getChat(req.params.chatid);

  return res.json({
    data: messages,
  });
});
router.post("/chats/:chatid/messages", async function (req, res) {
  const prompt = req.body.prompt;

  await ChatbotModel.insertMessage({
    chatId: req.params.chatid,
    type: "user",
    content: prompt,
  });

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const contentAI = response.data.candidates[0].content.parts[0].text;

  await ChatbotModel.insertMessage({
    chatId: req.params.chatid,
    type: "bot",
    content: contentAI,
  });

  return res.json({
    data: {
      prompt: prompt,
      response: contentAI,
    },
  });
});

module.exports = router;
