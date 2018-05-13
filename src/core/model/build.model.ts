import {EquipmentSet} from './equipment-set.model';
import {Skill} from './skill.model';
import {Algorithm} from './algorithm.model';
import {AlgorithmFactory} from './algorithm-factory.model';
import {Result} from './result.model';
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
  public physical_killer: number;
  public magical_killer: number;
  public equipments: EquipmentSet;
  public skills: Array<Skill> = [];

  // transcient
  public algorithm: Algorithm;
  public result: Result;

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
    this.physical_killer = build.physical_killer;
    this.magical_killer = build.magical_killer;
    this.equipments = new EquipmentSet(build.equipments);
    if (Array.isArray(build.skills)) {
      build.skills.forEach((skill: Skill) => {
        // TODO find a better way to handle the skill and damage type of limit breaks
        if (!skill.category && skill.isLimitBreak) {
          switch (build.algorithmId) {
            case 1:
            case 4:
              skill.category = 6;
              skill.damages_type = 'physical';
              break;
            case 2:
            case 5:
              skill.category = 7;
              skill.damages_type = 'magical';
              break;
            case 3:
            case 6:
              skill.category = 8;
              skill.damages_type = 'hybrid';
              break;
          }
        }

        this.skills.push(new Skill(skill));
      });
    }
    this.algorithm = AlgorithmFactory.getInstance(this.algorithmId);
  }

  public calculate(unit: Unit) {
    if (this.algorithm) {
      this.result = this.algorithm.calculate(unit);
    }
  }

  public getPhysicalKillers() {
    return (this.physical_killer ? this.physical_killer : 0) + this.equipments.sumEquipmentStat('physical_killer');
  }

  public getMagicalKillers() {
    return (this.magical_killer ? this.magical_killer : 0) + this.equipments.sumEquipmentStat('magical_killer');
  }
}
