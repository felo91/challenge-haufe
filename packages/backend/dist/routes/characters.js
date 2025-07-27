"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CharacterController_1 = require("../controllers/CharacterController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const characterController = new CharacterController_1.CharacterController();
router.get("/", auth_1.authMiddleware, characterController.getCharacters.bind(characterController));
router.get("/search", characterController.searchCharacters.bind(characterController));
router.get("/:id", characterController.getCharacter.bind(characterController));
router.post("/favorites", auth_1.authMiddleware, characterController.addFavoriteCharacter.bind(characterController));
router.delete("/favorites", auth_1.authMiddleware, characterController.removeFavoriteCharacter.bind(characterController));
exports.default = router;
//# sourceMappingURL=characters.js.map