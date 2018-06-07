import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Equipment} from '../../../core/model/equipment.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements AfterViewInit, OnDestroy {

  private slot: string;
  public equipments: Array<Equipment> = [];
  public offhandPresent: boolean;
  @ViewChild('itemfilter') itemfilter: ElementRef;
  private filterChangedSubscription: ISubscription;

  constructor(public dialogRef: MatDialogRef<EquipmentSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ngzone: NgZone,
              private cdref: ChangeDetectorRef) {
    this.slot = data.slot;
    this.equipments = data.equipments;
    this.offhandPresent = data.offhandPresent;
  }

  ngAfterViewInit() {
    this.ngzone.runOutsideAngular(() => {
      this.filterChangedSubscription = Observable.fromEvent(this.itemfilter.nativeElement, 'keyup')
        .debounceTime(600)
        .subscribe((keyboardEvent: any) => {
          this.equipments.forEach((item: Equipment) =>
            item.filtered = item.name.toLowerCase().indexOf(keyboardEvent.target.value.toLowerCase()) === -1
          );
          this.cdref.detectChanges();
        });
    });
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

  public isRemovable(): boolean {
    return this.slot === 'left_hand' && this.offhandPresent;
  }
}
