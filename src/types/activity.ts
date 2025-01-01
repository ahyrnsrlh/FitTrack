export interface Activity {
  id: string;
  type: string;
  duration: number;
  intensity: 'Rendah' | 'Sedang' | 'Tinggi';
  calories: number;
  timestamp: string;
}

export interface ActivityFormData {
  type: string;
  duration: number;
  intensity: 'Rendah' | 'Sedang' | 'Tinggi';
}