import { Router } from "express";
import { CharacterController } from "../controllers/CharacterController";
import { authMiddleware } from "../middleware/auth";
import { requireAnyRole, requireProductOwner } from "../middleware/roleAuth";

const router = Router();
const characterController = new CharacterController();

router.get("/", authMiddleware, requireAnyRole, characterController.getCharacters.bind(characterController));

router.get(
  "/:id",
  authMiddleware,
  requireProductOwner,
  characterController.getAdditionalInfoById.bind(characterController)
);

router.post(
  "/favorites",
  authMiddleware,
  requireAnyRole,
  characterController.addFavoriteCharacter.bind(characterController)
);

router.delete(
  "/favorites",
  authMiddleware,
  requireAnyRole,
  characterController.removeFavoriteCharacter.bind(characterController)
);

export default router;
