import {Result} from './result.model';

export class ResultChaining extends Result {
  public combosIncrement: number;
  public hitsPower: Array<number>;
  public power: number;
  public rawDamages: number;
  public killerPassive: number;
  public killerDamages: number;
  public averageElementalResistance: number;
  public elementalDamages: number;
  public finalVariance: number;
}
