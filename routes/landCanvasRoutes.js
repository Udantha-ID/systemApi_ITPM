import { Router } from 'express';
const router = Router();
import { createLandCanvas, getLandCanvases } from '../controllers/landCanvasController';

router.post('/', createLandCanvas);
router.get('/', getLandCanvases);

export default router;