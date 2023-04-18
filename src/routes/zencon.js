import { Router } from "express";
import {
  registerParticipant,
  participantStatus
} from "../controllers/participant.js";

const router = Router();

router.post("/register", registerParticipant);
router.get("/participant/status", participantStatus);

export default router;