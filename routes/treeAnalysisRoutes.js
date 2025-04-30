import { Router } from 'express';
const router = Router();
import { createTreeAnalysis, getTreeAnalyses } from '../controllers/treeAnalysisController';

router.post('/', createTreeAnalysis);
router.get('/', getTreeAnalyses);

export default router;