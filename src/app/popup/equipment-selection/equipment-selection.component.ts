import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Equipment} from '../../../core/model/equipment.model';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {UnitsService} from '../../../core/services/units.service';

@Component({
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements OnInit, AfterViewInit, OnDestroy {

  private slot: string;
  public equipments: Array<Equipment> = [];
  public currentDisplayedEquipments: Array<Equipment> = [];
  public removeable: boolean;
  public locked: boolean;
  @ViewChild('itemfilter') itemfilter: ElementRef;
  public currentTextFilter = '';
  private filterChangedSubscription: Subscription;

  constructor(public unitsService: UnitsService,
              public dialogRef: MatDialogRef<EquipmentSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ngzone: NgZone,
              private cdref: ChangeDetectorRef) {
    this.slot = data.slot;
    this.equipments = data.equipments;
    this.removeable = data.removeable;
    this.locked = data.locked;
  }

  ngOnInit() {
    this.currentDisplayedEquipments = this.equipments;
  }

  ngAfterViewInit() {
    if (!this.locked) {
      this.ngzone.runOutsideAngular(() => {
        this.filterChangedSubscription = fromEvent(this.itemfilter.nativeElement, 'keyup')
          .pipe(
            debounceTime(600)
          )
          .subscribe((keyboardEvent: any) => {
            if (keyboardEvent.target.value && keyboardEvent.target.value.length) {
              this.currentTextFilter = keyboardEvent.target.value.toLowerCase();
            } else {
              this.currentTextFilter = '';
            }
            this.filter();
            this.cdref.detectChanges();
          });
      });
    }
  }

  ngOnDestroy() {
    if (this.filterChangedSubscription) {
      this.filterChangedSubscription.unsubscribe();
    }
  }

  public selectEquipment(equipment: Equipment) {
    this.dialogRef.close(equipment);
  }

  public removeEquipment() {
    this.dialogRef.close({id: -1});
  }

  public filter() {
    this.currentDisplayedEquipments = [];
    this.currentDisplayedEquipments = this.equipments.filter((item: Equipment) =>
      (this.currentTextFilter === '' || item.name.toLowerCase().indexOf(this.currentTextFilter) >= 0)
      && (!this.unitsService.stmrExclusion || !item.stmr)
    );
  }
}
