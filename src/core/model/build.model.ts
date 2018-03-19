import {EquipmentSet} from './equipment-set.model';

export class Build {
  public equipments: EquipmentSet;

  constructor(build: Build) {
    this.equipments = new EquipmentSet(build.equipments);
  }
}
