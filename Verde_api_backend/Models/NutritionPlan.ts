export interface NutritionalRequirements {
  calories: number;
  protein: number; // en gramos
  carbs: number;   // en gramos
  fats: number;    // en gramos
}

export interface Meal {
  name: string;
  description: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface DailyPlan {
  day: string; // "Lunes", "Martes", etc.
  meals: Meal[];
}

export interface NutritionPlan {
  userId: string;
  requirements: NutritionalRequirements;
  durationWeeks: number;
  dailyPlans: DailyPlan[];
  createdAt: Date;
  updatedAt: Date;
}
