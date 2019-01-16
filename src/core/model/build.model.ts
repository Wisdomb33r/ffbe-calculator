import {EquipmentSet} from './equipment-set.model';
import {Skill} from './skill.model';
import {Algorithm} from './algorithm.model';
import {AlgorithmFactory} from './algorithm-factory.model';
import {Result} from './result.model';
import {Unit} from './unit.model';
import {EsperFactory} from './esper-factory.model';
import {Esper} from './esper.model';
import {KillerPassives} from './killer-passives.model';

export class Build {
  // from backend
  public id: number;
  public name: string;
  public algorithmId: number;
  public algorithmName: string;
  public mitigation: number;
  public physical_mitigation: number;
  public magical_mitigation: number;
  public physical_cover: number;
  public magical_cover: number;
  public physical_resistance: number;
  public magical_resistance: number;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public equipments: EquipmentSet;
  public skills: Array<Skill> = [];
  public startPhaseSkills: Array<Skill> = [];

  // transcient
  public algorithm: Algorithm;
  public result: Result;
  public esper: Esper;

  constructor(build: Build) {
    this.id = build.id;
    this.name = build.name;
    this.algorithmId = build.algorithmId;
    this.algorithmName = build.algorithmName;
    this.mitigation = build.mitigation;
    this.physical_mitigation = build.physical_mitigation;
    this.magical_mitigation = build.magical_mitigation;
    this.physical_cover = build.physical_cover;
    this.magical_cover = build.magical_cover;
    this.physical_resistance = build.physical_resistance;
    this.magical_resistance = build.magical_resistance;
    if (build.physical_killers) {
      this.physical_killers = KillerPassives.construct(build.physical_killers);
    }
    if (build.magical_killers) {
      this.magical_killers = KillerPassives.construct(build.magical_killers);
    }
    this.equipments = new EquipmentSet(build.equipments);
    let turnCount = 0;
    if (Array.isArray(build.skills)) {
      build.skills.forEach((skill: Skill) => {

        turnCount += skill.isTurnCounting ? 1 : 0;
        skill.turnCount = turnCount;

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
          if (build.id === 197 || build.id === 211) { // Citra LB
            skill.category = 9;
            skill.damages_type = 'evoker';
          }
          if (build.id === 162 || build.id === 163 || build.id === 164) { // viktor marchenko LB
            skill.calculation_stat = 'def';
          }
        }

        const s = new Skill(skill);
        if (s.isStartPhase) {
          this.startPhaseSkills.push(s);
        } else {
          this.skills.push(new Skill(skill));
        }
      });
    }
    this.algorithm = AlgorithmFactory.getInstance(this.algorithmId);
    this.esper = EsperFactory.getInstance(this.algorithmId);
  }

  public calculate(unit: Unit) {
    if (this.algorithm) {
      this.result = this.algorithm.calculate(unit);
    }
  }

  public getPhysicalKillers(unitId: number) {
    return (this.physical_killers ? this.physical_killers.getKillerSum() : 0) + this.equipments.getPhysicalKillers(unitId);
  }

  public getPhysicalKiller(opponentKillerType: string, unitId: number) {
    return (this.physical_killers && this.physical_killers[opponentKillerType] ? this.physical_killers[opponentKillerType] : 0)
      + this.equipments.getPhysicalKiller(opponentKillerType, unitId);
  }

  public getMagicalKillers(unitId: number) {
    return (this.magical_killers ? this.magical_killers.getKillerSum() : 0) + this.equipments.getMagicalKillers(unitId);
  }

  public getMagicalKiller(opponentKillerType: string, unitId: number) {
    return (this.magical_killers && this.magical_killers[opponentKillerType] ? this.magical_killers[opponentKillerType] : 0)
      + this.equipments.getMagicalKiller(opponentKillerType, unitId);
  }

  public getSkillIdentifiers(): Array<number> {
    let identifiers = [];
    if (this.skills && this.skills.length > 0) {
      identifiers = this.skills.map((skill: Skill) => skill.id);
    }
    return identifiers;
  }
}
