import express from "express";
import {
  createAnketa,
  createPitanje,
  getAnketaByKod,
  submitOdgovori,
  getRezultati,
  exportCsv,
  getSveAnkete
} from "../controllers/anketaController";

const router = express.Router();

router.post("/anketa", createAnketa);
router.post("/pitanje", createPitanje);
router.get("/anketa/:kod", getAnketaByKod);
router.post("/odgovori", submitOdgovori);
router.get("/rezultati/:anketaId", getRezultati);
router.get("/export/:anketaId", exportCsv);
router.get("/ankete", getSveAnkete);

export default router;