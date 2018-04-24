import {EquipmentSet} from './equipment-set.model';

export class Build {
  public algorithmId: number;
  public algorithmName: string;
  public equipments: EquipmentSet;

  constructor(build: Build) {
    this.algorithmId = build.algorithmId;
    this.algorithmName = build.algorithmName;
    this.equipments = new EquipmentSet(build.equipments);
  }
}
