const express = require("express");
const { summary, paragraph, chatbotController, jsconverterController, scifiImageController } = require("../controllers/openAiController.js");
const router = express.Router();

router.post("/summary", summary);
router.post("/paragraph", paragraph);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);

module.exports = router;