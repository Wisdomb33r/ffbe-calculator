import {Component, Input, OnInit} from '@angular/core';
import {Equipment} from '../../core/model/equipment.model';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {

  @Input() equipment: Equipment;

  constructor() {
  }

  ngOnInit() {
  }

}
