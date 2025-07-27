import { Router } from "express";
import { CharacterController } from "../controllers/CharacterController";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const characterController = new CharacterController();

router.get("/", authMiddleware, characterController.getCharacters.bind(characterController));

router.get("/search", characterController.searchCharacters.bind(characterController));

router.get("/:id", characterController.getCharacter.bind(characterController));

router.post("/favorites", authMiddleware, characterController.addFavoriteCharacter.bind(characterController));

router.delete("/favorites", authMiddleware, characterController.removeFavoriteCharacter.bind(characterController));

export default router;
