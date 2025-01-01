export const calculateCalories = (duration: number, intensity: string): number => {
  const baseRate = 7; // kalori per menit untuk intensitas sedang
  const multiplier = {
    'Rendah': 0.7,
    'Sedang': 1,
    'Tinggi': 1.4
  }[intensity] || 1;

  return Math.round(duration * baseRate * multiplier);
};