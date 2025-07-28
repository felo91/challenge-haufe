import { Router } from "express";
import { CharacterController } from "../controllers/CharacterController";
import { authMiddleware } from "../middleware/auth";
import { requireAnyRole, requireProductOwner } from "../middleware/roleAuth";

const router = Router();
const characterController = new CharacterController();

// Get basic character list - requires authentication for any role
router.get("/", authMiddleware, requireAnyRole, characterController.getCharacters.bind(characterController));

// Get additional character info by ID - requires product owner role
router.get(
  "/:id",
  authMiddleware,
  requireProductOwner,
  characterController.getAdditionalInfoById.bind(characterController)
);

// Add character to favorites - requires authentication for any role
router.post(
  "/favorites",
  authMiddleware,
  requireAnyRole,
  characterController.addFavoriteCharacter.bind(characterController)
);

// Remove character from favorites - requires authentication for any role
router.delete(
  "/favorites",
  authMiddleware,
  requireAnyRole,
  characterController.removeFavoriteCharacter.bind(characterController)
);

export default router;
