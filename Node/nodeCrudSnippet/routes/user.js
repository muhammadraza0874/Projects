var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/user");

router.get("/", user_controller.listing);
router.get("/:id", user_controller.detail);
router.post("/", user_controller.create);
router.put("/", user_controller.update);
router.delete("/:id", user_controller.delete);

module.exports = router;
