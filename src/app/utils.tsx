export function calculatePoints(
    emissionFactor: number
  ): number {
    if (emissionFactor < 0 || emissionFactor > 20) {
      return 0;
    }
    const points = ((20 - emissionFactor) / 1) * 50;
    return points;
  }