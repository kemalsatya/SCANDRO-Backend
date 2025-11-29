import express from "express";
import {
  controller_addPainting,
  controller_getAllPaintings,
  controller_getPaintingById,
  controller_getDatabaseTemplate,
  controller_getDocsToUse,
  controller_updatePainting,
  controller_deletePainting,
} from "../controller_section/controller.js";

const router = express.Router();

router.post("/paintings/", controller_addPainting);
router.get("/paintings/", controller_getAllPaintings);
router.get("/paintings/templateData", controller_getDatabaseTemplate);
router.get("/paintings/docs", controller_getDocsToUse);
router.get("/paintings/:id", controller_getPaintingById);
router.patch("/paintings/:id", controller_updatePainting);
router.delete("/paintings/:id", controller_deletePainting);

export default router;
