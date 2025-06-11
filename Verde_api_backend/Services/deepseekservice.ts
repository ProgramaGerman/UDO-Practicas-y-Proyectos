import axios from 'axios';
import { NutritionalRequirements, NutritionPlan } from '../models/nutritionPlan';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
  throw new Error('DeepSeek API key is not configured');
}

export class DeepSeekService {
  static async generateNutritionPlan(
    requirements: NutritionalRequirements,
    preferences: string[],
    restrictions: string[],
    durationWeeks: number = 1
  ): Promise<NutritionPlan> {
    try {
      const prompt = this.buildPrompt(requirements, preferences, restrictions, durationWeeks);
      
      const response = await axios.post(`${DEEPSEEK_API_URL}/chat/completions`, {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const generatedContent = response.data.choices[0].message.content;
      return this.parseResponseToPlan(generatedContent, requirements, durationWeeks);
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      throw new Error('Failed to generate nutrition plan');
    }
  }

  private static buildPrompt(
    requirements: NutritionalRequirements,
    preferences: string[],
    restrictions: string[],
    durationWeeks: number
  ): string {
    return `Genera un plan de alimentación detallado con las siguientes especificaciones:
    - Requerimientos nutricionales: ${requirements.calories} kcal, ${requirements.protein}g proteína, ${requirements.carbs}g carbohidratos, ${requirements.fats}g grasas
    - Preferencias: ${preferences.join(', ') || 'ninguna'}
    - Restricciones: ${restrictions.join(', ') || 'ninguna'}
    - Duración: ${durationWeeks} semana(s)
    
    El plan debe incluir:
    1. Desayuno, almuerzo, cena y 2 snacks
    2. Lista de ingredientes para cada comida
    3. Información nutricional por comida
    4. Variedad entre días
    
    Devuelve el resultado en formato JSON válido que coincida con la interfaz NutritionPlan.`;
  }

  private static parseResponseToPlan(
    content: string,
    requirements: NutritionalRequirements,
    durationWeeks: number
  ): NutritionPlan {
    try {
      // Extraer el JSON de la respuesta (puede venir con texto alrededor)
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      const jsonContent = content.slice(jsonStart, jsonEnd);
      
      const parsed = JSON.parse(jsonContent);
      
      return {
        ...parsed,
        requirements,
        durationWeeks,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error parsing DeepSeek response:', error);
      throw new Error('Invalid response format from DeepSeek');
    }
  }
}
