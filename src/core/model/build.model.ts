import {EquipmentSet} from './equipment-set.model';
import {Skill} from './skill.model';
import {Algorithm} from './algorithm.model';
import {AlgorithmFactory} from './algorithm-factory.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';

export class Build {
  // from backend
  public algorithmId: number;
  public algorithmName: string;
  public mitigation: number;
  public physical_mitigation: number;
  public magical_mitigation: number;
  public physical_cover: number;
  public magical_cover: number;
  public physical_resistance: number;
  public magical_resistance: number;
  public equipments: EquipmentSet;
  public skills: Array<Skill> = [];

  // transcient
  public algorithm: Algorithm;
  public result: AlgorithmResult;

  constructor(build: Build) {
    this.algorithmId = build.algorithmId;
    this.algorithmName = build.algorithmName;
    this.mitigation = build.mitigation;
    this.physical_mitigation = build.physical_mitigation;
    this.magical_mitigation = build.magical_mitigation;
    this.physical_cover = build.physical_cover;
    this.magical_cover = build.magical_cover;
    this.physical_resistance = build.physical_resistance;
    this.magical_resistance = build.magical_resistance;
    this.equipments = new EquipmentSet(build.equipments);
    if (Array.isArray(build.skills)) {
      build.skills.forEach((skill: Skill) => this.skills.push(new Skill(skill)));
    }
    this.algorithm = AlgorithmFactory.getInstance(this.algorithmId);
  }

  public calculate(unit: Unit) {
    if (this.algorithm) {
      this.result = this.algorithm.calculate(unit);
    }
  }
}
