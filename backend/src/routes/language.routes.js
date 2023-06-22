import { Router } from "express";

const router = Router();

import { methods as languageCtrl } from "../controllers/language.controller";
router.get('/', languageCtrl.getLanguages)
router.get('/:id', languageCtrl.getLanguageById)
router.post('/', languageCtrl.addLanguage)
router.put('/:id', languageCtrl.updateLanguage)
router.delete('/:id', languageCtrl.deleteLanguage)
export default router;
