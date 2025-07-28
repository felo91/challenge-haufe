"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CharacterController_1 = require("../controllers/CharacterController");
const auth_1 = require("../middleware/auth");
const roleAuth_1 = require("../middleware/roleAuth");
const router = (0, express_1.Router)();
const characterController = new CharacterController_1.CharacterController();
router.get("/", auth_1.authMiddleware, roleAuth_1.requireAnyRole, characterController.getCharacters.bind(characterController));
router.get("/:id", auth_1.authMiddleware, roleAuth_1.requireProductOwner, characterController.getAdditionalInfoById.bind(characterController));
router.post("/favorites", auth_1.authMiddleware, roleAuth_1.requireAnyRole, characterController.addFavoriteCharacter.bind(characterController));
router.delete("/favorites", auth_1.authMiddleware, roleAuth_1.requireAnyRole, characterController.removeFavoriteCharacter.bind(characterController));
exports.default = router;
//# sourceMappingURL=characters.js.map