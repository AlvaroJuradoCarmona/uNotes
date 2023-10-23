import { Router } from "express";

const router = Router();

import { methods as commentCtrl } from "../controllers/comment.controller";

router.get('/:id', commentCtrl.getCommentById)
router.post('/', commentCtrl.addComment)
router.delete('/delcomment/:idComment', commentCtrl.deleteComment)

export default router;
