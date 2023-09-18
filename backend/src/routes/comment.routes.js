import { Router } from "express";

const router = Router();

import { methods as commentCtrl } from "../controllers/comment.controller";

router.post('/', commentCtrl.addComment)

export default router;
