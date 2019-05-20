export class ObjectUtils {
  public static isNullOrUndefined(o: any) {
    return o === undefined || o === null;
  }

  public static isDefined(o: any) {
    return o !== undefined && o !== null;
  }
}
