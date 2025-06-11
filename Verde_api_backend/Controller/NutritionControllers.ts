import { Request, Response } from 'express';
import { DeepSeekService } from '../services/deepseekService';
import { NutritionalRequirements, NutritionPlan } from '../models/nutritionPlan';

export class NutritionController {
  static async generatePlan(req: Request, res: Response) {
    try {
      const { requirements, preferences, restrictions, durationWeeks } = req.body;
      
      // Validación básica
      if (!requirements || !requirements.calories) {
        return res.status(400).json({ error: 'Nutritional requirements are required' });
      }

      const plan = await DeepSeekService.generateNutritionPlan(
        requirements,
        preferences || [],
        restrictions || [],
        durationWeeks || 1
      );

      res.json(plan);
    } catch (error) {
      console.error('Error generating nutrition plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getSamplePlan(req: Request, res: Response) {
    try {
      // Plan de ejemplo para demostración
      const sampleRequirements: NutritionalRequirements = {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 60
      };

      const plan = await DeepSeekService.generateNutritionPlan(
        sampleRequirements,
        ['comida mediterránea', 'vegetales'],
        ['lácteos', 'gluten'],
        1
      );

      res.json(plan);
    } catch (error) {
      console.error('Error generating sample plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
