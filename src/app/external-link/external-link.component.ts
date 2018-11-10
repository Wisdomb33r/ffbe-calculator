import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UnitsService} from '../../core/services/units.service';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {Unit} from '../../core/model/unit.model';
import {Equipment} from '../../core/model/equipment.model';
import {ESPER_BUILDS} from '../../core/calculator-constants';
import {Esper} from '../../core/model/esper.model';
import {forkJoin, of, Subscription, throwError} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.css']
})
export class ExternalLinkComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private unit: number;
  private build: number;
  private right_hand: number;
  private rh_trait1: number;
  private rh_trait2: number;
  private rh_trait3: number;
  private left_hand: number;
  private lh_trait1: number;
  private lh_trait2: number;
  private lh_trait3: number;
  private head: number;
  private body: number;
  private accessory1: number;
  private accessory2: number;
  private materia1: number;
  private materia2: number;
  private materia3: number;
  private materia4: number;
  private esper: number;
  private idType: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private unitsService: UnitsService,
              private databaseClient: DatabaseClientService) {
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.unit = +params.get('id');
        this.build = +params.get('build');
        this.right_hand = +params.get('right_hand');
        this.rh_trait1 = +params.get('rh_t1');
        this.rh_trait2 = +params.get('rh_t2');
        this.rh_trait3 = +params.get('rh_t3');
        this.left_hand = +params.get('left_hand');
        this.lh_trait1 = +params.get('lh_t1');
        this.lh_trait2 = +params.get('lh_t2');
        this.lh_trait3 = +params.get('lh_t3');
        this.head = +params.get('head');
        this.body = +params.get('body');
        this.accessory1 = +params.get('accessory1');
        this.accessory2 = +params.get('accessory2');
        this.materia1 = +params.get('materia1');
        this.materia2 = +params.get('materia2');
        this.materia3 = +params.get('materia3');
        this.materia4 = +params.get('materia4');
        this.esper = +params.get('esper');
        this.idType = params.get('id_type');

        return this.databaseClient.getUnitById$(this.unit);
      }),
      switchMap((unit: Unit) => {
        if (unit) {
          this.unitsService.selectedUnit = new Unit(unit);
          this.unitsService.selectedUnit.selectDefaultBuild();
          if (this.build) {
            this.unitsService.selectedUnit.selectBuild(this.build);
          }
          this.unitsService.selectedUnit.selectedBuild.equipments.removeAllRemoveable();

          const observables = [];
          observables.push(of(unit));
          if (this.right_hand) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('right_hand'));
          }
          if (this.head) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('head'));
          }
          if (this.body) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('body'));
          }
          if (this.accessory1) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('accessory1'));
          }
          if (this.accessory2) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('accessory2'));
          }
          if (this.materia1 || this.materia2 || this.materia3 || this.materia4) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('materia1'));
          }

          return forkJoin(observables);
        }
        return throwError('No unit identifier');
      }),
      tap(observablesResults => {
        let index = 1;
        if (this.right_hand) {
          this.testAndEquip('right_hand', this.right_hand, observablesResults, index);
          index++;
        }
        if (this.head) {
          this.testAndEquip('head', this.head, observablesResults, index);
          index++;
        }
        if (this.body) {
          this.testAndEquip('body', this.body, observablesResults, index);
          index++;
        }
        if (this.accessory1) {
          this.testAndEquip('accessory1', this.accessory1, observablesResults, index);
          index++;
        }
        if (this.accessory2) {
          this.testAndEquip('accessory2', this.accessory2, observablesResults, index);
          index++;
        }
        if (this.materia1 || this.materia2 || this.materia3 || this.materia4) {
          if (this.materia1) {
            this.testAndEquip('materia1', this.materia1, observablesResults, index);
          }
          if (this.materia2) {
            this.testAndEquip('materia2', this.materia2, observablesResults, index);
          }
          if (this.materia3) {
            this.testAndEquip('materia3', this.materia3, observablesResults, index);
          }
          if (this.materia4) {
            this.testAndEquip('materia4', this.materia4, observablesResults, index);
          }
          index++;
        }
        if (this.esper) {
          const esper: Esper = ESPER_BUILDS.find(e => e.id === this.esper);
          if (esper) {
            this.unitsService.selectedUnit.selectedBuild.esper = esper;
          }
        }
      }),
      switchMap(any => {
        const observables = [];
        observables.push(of(true));
        if (this.left_hand) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('left_hand'));
        }
        return forkJoin(observables);
      }),
      tap(observablesResults => {
        if (this.left_hand) {
          this.testAndEquip('left_hand', this.left_hand, observablesResults, 1);
        }
      }),
      switchMap(any => {
        const observables = [];
        observables.push(of(this.unitsService.selectedUnit));
        if (this.unitsService.getEquipments().right_hand && (this.rh_trait1 || this.rh_trait2 || this.rh_trait3)) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('rh_trait1'));
        }
        if (this.unitsService.getEquipments().left_hand && (this.lh_trait1 || this.lh_trait2 || this.lh_trait3)) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('lh_trait1'));
        }
        return forkJoin(observables);
      }),
      tap(observablesResults => {
        let index = 1;
        if (this.unitsService.getEquipments().right_hand && (this.rh_trait1 || this.rh_trait2 || this.rh_trait3)) {
          if (this.rh_trait1) {
            this.testAndEquip('rh_trait1', this.rh_trait1, observablesResults, index);
          }
          if (this.rh_trait2) {
            this.testAndEquip('rh_trait2', this.rh_trait2, observablesResults, index);
          }
          if (this.rh_trait3) {
            this.testAndEquip('rh_trait3', this.rh_trait3, observablesResults, index);
          }
          index++;
        }
        if (this.unitsService.getEquipments().left_hand && (this.lh_trait1 || this.lh_trait2 || this.lh_trait3)) {
          if (this.lh_trait1) {
            this.testAndEquip('lh_trait1', this.lh_trait1, observablesResults, index);
          }
          if (this.lh_trait2) {
            this.testAndEquip('lh_trait2', this.lh_trait2, observablesResults, index);
          }
          if (this.lh_trait3) {
            this.testAndEquip('lh_trait3', this.lh_trait3, observablesResults, index);
          }
        }
      }),
    ).subscribe(any => {
      this.unitsService.selectedUnit.computeAll();
      this.router.navigate(['/']);
    }, error => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private testAndEquip(slot: string, equipment_id: number, observablesResults, index: number) {
    const equipments: Array<Equipment> = observablesResults[index];
    if (equipments && equipments.length > 0) {
      let equipment: Equipment;
      if (this.idType === 'gumi') {
        equipment = equipments.find((e: Equipment) => e.gumiId === equipment_id);
      } else {
        equipment = equipments.find((e: Equipment) => e.id === equipment_id);
      }
      if (equipment) {
        this.unitsService.equipInSlot(slot, equipment);
      }
    }
  }
}
