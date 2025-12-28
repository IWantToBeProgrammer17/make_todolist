const express = require("express");

const router = express.Router();

router.post("/chat", async function (request, res) {
  const content = request.body.content;
  const response = await fetch("https://ollama.com", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer d1c14d3d3d19419982844dca207ebd49.1EckzTfk1odkN-NEWOjWXR1M`,
    },
    body: JSON.stringify({
      model: "gpt-oss:120b-cloud",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      stream: false,
    }),
  });
  const responseJson = await response.json();
  return res.status(response.status).json(responseJson);
  
});

module.exports = router;
