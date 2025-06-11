import { Router } from 'express';
import { NutritionController } from '../controllers/nutritionController';

const router = Router();

// Generar plan personalizado
router.post('/plans', NutritionController.generatePlan);

// Obtener plan de ejemplo (para testing/demo)
router.get('/plans/sample', NutritionController.getSamplePlan);

export default router;
