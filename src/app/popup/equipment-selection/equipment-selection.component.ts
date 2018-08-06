import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Equipment} from '../../../core/model/equipment.model';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements AfterViewInit, OnDestroy {

  private slot: string;
  public equipments: Array<Equipment> = [];
  public removeable: boolean;
  public changeable: boolean;
  @ViewChild('itemfilter') itemfilter: ElementRef;
  private filterChangedSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<EquipmentSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ngzone: NgZone,
              private cdref: ChangeDetectorRef) {
    this.slot = data.slot;
    this.equipments = data.equipments;
    this.removeable = data.removeable;
    this.changeable = data.changeable;
  }

  ngAfterViewInit() {
    if (this.changeable) {
      this.ngzone.runOutsideAngular(() => {
        this.filterChangedSubscription = fromEvent(this.itemfilter.nativeElement, 'keyup')
          .pipe(
            debounceTime(600)
          )
          .subscribe((keyboardEvent: any) => {
            this.equipments.forEach((item: Equipment) =>
              item.filtered = item.name.toLowerCase().indexOf(keyboardEvent.target.value.toLowerCase()) === -1
            );
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
}
