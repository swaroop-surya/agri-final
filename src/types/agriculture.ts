export type UserRole = 'admin' | 'farmer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  farmName?: string;
  region?: string;
  primaryCrop?: string;
  avatarInitials: string;
}

export type CropType = 'Corn / Maize' | 'Soybeans' | 'Winter Wheat' | 'Cotton' | 'Alfalfa' | 'Tomatoes' | 'Barley';

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'optimal';

export interface SoilTelemetry {
  moistureTop: number; // 10cm depth (%)
  moistureRoot: number; // 30cm root depth (%)
  moistureDeep: number; // 60cm deep soil (%)
  optimalMoistureMin: number;
  optimalMoistureMax: number;
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  ph: number;
  temperatureC: number;
  electricalConductivity: number; // dS/m
  lastUpdated: string;
}

export interface Plot {
  id: string;
  name: string;
  farmId: string;
  crop: CropType;
  variety: string;
  acres: number;
  zone: string;
  plantingDate: string;
  estimatedHarvest: string;
  growthStage: string;
  ndviHealthScore: number; // 0.0 to 1.0 (e.g. 0.84)
  irrigationStatus: 'Idle' | 'Active' | 'Scheduled';
  valveOpen: boolean;
  flowRateLpm: number;
  waterUsedTodayLiters: number;
  telemetry: SoilTelemetry;
}

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  region: string;
  contact: string;
  email: string;
  totalAcres: number;
  primaryCrop: CropType;
  status: 'Optimal' | 'Needs Attention' | 'Irrigating' | 'Alert Critical';
  activePlotsCount: number;
  sensorUptime: number; // percentage
  soilHealthIndex: number; // out of 100
  lastSync: string;
}

export interface AgroAlert {
  id: string;
  plotId?: string;
  plotName: string;
  farmName: string;
  severity: AlertSeverity;
  category: 'Moisture Stress' | 'Nutrient Deficit' | 'Equipment / Pump' | 'Pest / Disease' | 'Weather Frost';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  recommendedAction: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  highC: number;
  lowC: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Scattered Showers' | 'Rain' | 'Windy';
  precipChance: number; // %
  rainfallMm: number;
  windKph: number;
  et0Mm: number; // Evapotranspiration
  humidity: number; // %
}

export interface FieldTask {
  id: string;
  plotName: string;
  title: string;
  category: 'Irrigation' | 'Fertilization' | 'Scouting' | 'Spraying' | 'Equipment' | 'Harvest';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  assignee: string;
}

export interface HarvestRecord {
  id: string;
  plotName: string;
  crop: CropType;
  harvestDate: string;
  yieldBushelsPerAcre: number;
  totalTons: number;
  grainMoisturePercent: number;
  destinationSilo: string;
  qualityGrade: 'Grade 1 (Premium)' | 'Grade 2 (Standard)' | 'Grade 3';
}

export interface CropDiagnosticSample {
  id: string;
  crop: CropType;
  diagnosis: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'None (Healthy)';
  imageUrl: string;
  symptoms: string[];
  treatment: string;
}
