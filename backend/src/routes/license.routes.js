import { Router } from "express";

const router = Router();

import { methods as licenseCtrl } from "../controllers/license.controller";
router.get('/', licenseCtrl.getLicenses)

export default router;
