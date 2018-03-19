import {Component, Input, OnInit} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';

@Component({
  selector: 'app-equipment-selection',
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements OnInit {

  @Input() equipments: EquipmentSet;

  constructor() {
  }

  ngOnInit() {
  }

}
