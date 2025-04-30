import { Router } from 'express';
const router = Router();
import { createTreeVisualization, getTreeVisualizations } from '../controllers/treeVisualizationController';

router.post('/', createTreeVisualization);
router.get('/', getTreeVisualizations);

export default router;