export class CalculatorTestutils {
  public static expectArrayOfNumberToBeCloseTo(array1: Array<number>, array2: Array<number>) {
    for (let i = 0; i < array1.length; i++) {
      expect(array1[i]).toBeCloseTo(array2[i]);
    }
  }

  public static expectArrayOfArrayOfNumberToBeCloseTo(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      this.expectArrayOfNumberToBeCloseTo(array1[i], array2[i]);
    }
  }
}
