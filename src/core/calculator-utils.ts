export class CalculatorUtils {
  public static compareNumbers(a: number, b: number): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
