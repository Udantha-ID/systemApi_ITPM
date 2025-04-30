import { Router } from 'express';
const router = Router();
import { createLandBoundary, getLandBoundaries } from '../controllers/landBoundaryController';

router.post('/', createLandBoundary);
router.get('/', getLandBoundaries);

export default router;