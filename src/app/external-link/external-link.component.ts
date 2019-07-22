import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UnitsService} from '../../core/services/units.service';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {Unit} from '../../core/model/unit.model';
import {Equipment} from '../../core/model/equipment.model';
import {ESPER_BUILDS, MONSTER_TYPES} from '../../core/calculator-constants';
import {Esper} from '../../core/model/esper.model';
import {forkJoin, of, Subscription, throwError} from 'rxjs';
import {delay, switchMap, tap} from 'rxjs/operators';
import {AlgorithmOffensive} from '../../core/model/algorithm-offensive.model';
import {AlgorithmFinish} from '../../core/model/algorithm-finish.model';
import {Skill} from '../../core/model/skill.model';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.css']
})
export class ExternalLinkComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public loadError = false;
  private itemToLock: number;
  private itemToLockAlternative: number;

  // unit, build and equipment parameters
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
  public currentStep = 1;

  // algorithm parameters
  private killers: string;
  private type1: string;
  private type2: string;
  private spark: string;
  private buffing: string;
  private breaks: string;
  private buffs: number;
  private enemyDef: number;
  private enemySpr: number;
  private enemyResist0: number;
  private enemyResist1: number;
  private enemyResist2: number;
  private enemyResist3: number;
  private enemyResist4: number;
  private enemyResist5: number;
  private enemyResist6: number;
  private enemyResist7: number;
  private breakResist0: number;
  private breakResist1: number;
  private breakResist2: number;
  private breakResist3: number;
  private breakResist4: number;
  private breakResist5: number;
  private breakResist6: number;
  private breakResist7: number;
  private skillcombos: Array<string> = [];

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

        // algorithm configuration
        this.killers = params.get('killers');
        this.type1 = params.get('type1');
        this.type2 = params.get('type2');
        this.spark = params.get('spark');
        this.buffing = params.get('buffing');
        this.breaks = params.get('breaks');
        this.buffs = +params.get('buffs');
        this.enemyDef = +params.get('enemyDef');
        this.enemySpr = +params.get('enemySpr');
        this.enemyResist0 = +params.get('enemyResist0');
        this.enemyResist1 = +params.get('enemyResist1');
        this.enemyResist2 = +params.get('enemyResist2');
        this.enemyResist3 = +params.get('enemyResist3');
        this.enemyResist4 = +params.get('enemyResist4');
        this.enemyResist5 = +params.get('enemyResist5');
        this.enemyResist6 = +params.get('enemyResist6');
        this.enemyResist7 = +params.get('enemyResist7');
        this.breakResist0 = +params.get('breakResist0');
        this.breakResist1 = +params.get('breakResist1');
        this.breakResist2 = +params.get('breakResist2');
        this.breakResist3 = +params.get('breakResist3');
        this.breakResist4 = +params.get('breakResist4');
        this.breakResist5 = +params.get('breakResist5');
        this.breakResist6 = +params.get('breakResist6');
        this.breakResist7 = +params.get('breakResist7');
        for (let i = 0; i < 20; i++) {
          if (params.has('skillcombo' + i)) {
            this.skillcombos[i] = params.get('skillcombo' + i);
          }
        }

        return of(null).pipe(
          delay(500),
          switchMap(v => this.databaseClient.getUnitById$(this.unit)),
        );
      }),
      switchMap((unit: Unit) => {
        this.currentStep = 2;
        if (unit) {
          if ((<any>window).ga) {
            (<any>window).ga('send', 'event', {
              eventCategory: 'calculatorUnit',
              eventLabel: 'Load URL build for ' + unit.id,
              eventAction: 'loadUrlBuild',
              eventValue: 1
            });
          }

          this.unitsService.selectedUnit = new Unit(unit);
          this.unitsService.selectedUnit.selectDefaultBuild();
          if (this.build) {
            this.unitsService.selectedUnit.selectBuild(this.build);
          }
          this.restoreAlgorithmConfiguration();
          this.unlockLockedItemsIfAlternativeToBeLoaded();
          this.unitsService.selectedUnit.removeAllNonLockedItems();

          const observables = [];
          observables.push(of(unit));
          if (this.accessory1 || this.accessory2) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('accessory1'));
          }
          if (this.materia1 || this.materia2 || this.materia3 || this.materia4) {
            observables.push(this.unitsService.getAllowedEquipmentsForSlot$('materia1'));
          }

          return forkJoin(observables);
        }
        return throwError('No unit found');
      }),
      tap(observablesResults => {
        this.currentStep = 3;
        let index = 1;
        if (this.accessory1 || this.accessory2) {
          if (this.accessory1) {
            this.testAndEquip('accessory1', this.accessory1, observablesResults, index);
          }
          if (this.accessory2) {
            this.testAndEquip('accessory2', this.accessory2, observablesResults, index);
          }
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
          const esper: Esper = ESPER_BUILDS.find(e => e.buildId === this.esper);
          if (esper) {
            this.unitsService.selectedUnit.selectedBuild.esper = esper;
          }
        }
      }),
      switchMap(anything => {
        const observables = [];
        observables.push(of(true));
        if (this.right_hand) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('right_hand'));
        }
        if (this.head) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('head'));
        }
        if (this.body) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('body'));
        }

        return forkJoin(observables);
      }),
      tap(observablesResults => {
        this.currentStep = 4;
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
        this.currentStep = 5;
        if (this.left_hand) {
          this.testAndEquip('left_hand', this.left_hand, observablesResults, 1);
        }
      }),
      switchMap(any => {
        const observables = [];
        observables.push(of(this.unitsService.selectedUnit));
        if (this.unitsService.selectedUnit.selectedEquipmentSet.right_hand && (this.rh_trait1 || this.rh_trait2 || this.rh_trait3)) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('rh_trait1'));
        }
        if (this.unitsService.selectedUnit.selectedEquipmentSet.left_hand && (this.lh_trait1 || this.lh_trait2 || this.lh_trait3)) {
          observables.push(this.unitsService.getAllowedEquipmentsForSlot$('lh_trait1'));
        }
        return forkJoin(observables);
      }),
      tap(observablesResults => {
        this.currentStep = 6;
        let index = 1;
        if (this.unitsService.selectedUnit.selectedEquipmentSet.right_hand && (this.rh_trait1 || this.rh_trait2 || this.rh_trait3)) {
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
        if (this.unitsService.selectedUnit.selectedEquipmentSet.left_hand && (this.lh_trait1 || this.lh_trait2 || this.lh_trait3)) {
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
      const selectedEquipment = this.unitsService.selectedUnit.selectedEquipmentSet;
      if ((this.build && this.unitsService.selectedUnit.selectedBuild.id !== this.build)
        || (this.right_hand && (!selectedEquipment.right_hand || selectedEquipment.right_hand.id !== this.right_hand))
        || (this.left_hand && (!selectedEquipment.left_hand || selectedEquipment.left_hand.id !== this.left_hand))
        || (this.head && (!selectedEquipment.head || selectedEquipment.head.id !== this.head))
        || (this.body && (!selectedEquipment.body || selectedEquipment.body.id !== this.body))
        || (this.accessory1 && (!selectedEquipment.accessory1 || selectedEquipment.accessory1.id !== this.accessory1))
        || (this.accessory2 && (!selectedEquipment.accessory2 || selectedEquipment.accessory2.id !== this.accessory2))
        || (this.materia1 && (!selectedEquipment.materia1 || selectedEquipment.materia1.id !== this.materia1))
        || (this.materia2 && (!selectedEquipment.materia2 || selectedEquipment.materia2.id !== this.materia2))
        || (this.materia3 && (!selectedEquipment.materia3 || selectedEquipment.materia3.id !== this.materia3))
        || (this.materia4 && (!selectedEquipment.materia4 || selectedEquipment.materia4.id !== this.materia4))
        || (this.rh_trait1 && (!selectedEquipment.rh_trait1 || selectedEquipment.rh_trait1.id !== this.rh_trait1))
        || (this.rh_trait2 && (!selectedEquipment.rh_trait2 || selectedEquipment.rh_trait2.id !== this.rh_trait2))
        || (this.rh_trait3 && (!selectedEquipment.rh_trait3 || selectedEquipment.rh_trait3.id !== this.rh_trait3))
        || (this.lh_trait1 && (!selectedEquipment.lh_trait1 || selectedEquipment.lh_trait1.id !== this.lh_trait1))
        || (this.lh_trait2 && (!selectedEquipment.lh_trait2 || selectedEquipment.lh_trait2.id !== this.lh_trait2))
        || (this.lh_trait3 && (!selectedEquipment.lh_trait3 || selectedEquipment.lh_trait3.id !== this.lh_trait3))
      ) {
        this.loadError = true;
      } else {
        if (this.itemToLock && this.itemToLockAlternative) {
          this.unitsService.selectedUnit.selectedEquipmentSet
            .transferLockedStatusToAlternative(this.itemToLock, this.itemToLockAlternative);
        }
        this.unitsService.selectedUnit.computeAll();
        this.router.navigate(['/']);
      }
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
      if (equipment && (!this.unitsService.selectedUnit.selectedEquipmentSet[slot]
        || !this.unitsService.selectedUnit.selectedEquipmentSet[slot].locked)) {
        this.unitsService.equipInSlot(slot, equipment);
      }
    }
  }

  private unlockLockedItemsIfAlternativeToBeLoaded() {
    const lockedItems = this.unitsService.selectedUnit.getLockedItems();
    if (lockedItems && lockedItems.length) {
      lockedItems.forEach((item: Equipment) => {
        if (item.locked_alternative && this.isItemToBeLoaded(item.locked_alternative)) {
          this.itemToLock = item.locked_alternative;
          this.itemToLockAlternative = item.id;
          item.locked = false;
          item.locked_alternative = undefined;
        }
      });
    }
  }

  private isItemToBeLoaded(alternative: number) {
    if (this.right_hand === alternative || this.left_hand === alternative || this.head === alternative || this.body === alternative
      || this.materia1 === alternative || this.materia2 === alternative || this.materia3 === alternative || this.materia4 === alternative
      || this.accessory1 === alternative || this.accessory2 === alternative) {
      return true;
    }
    return false;
  }

  private restoreAlgorithmConfiguration() {
    if (this.unitsService.selectedUnit.selectedBuild.algorithm instanceof AlgorithmOffensive) {
      const algorithm: AlgorithmOffensive = this.unitsService.selectedUnit.selectedBuild.algorithm as AlgorithmOffensive;
      if (this.killers === 'false') {
        algorithm.isKillerActive = false;
      }
      if (this.type1 && MONSTER_TYPES.find(type => type === this.type1)) {
        algorithm.opponentKillerType = this.type1;
      }
      if (this.type2 && MONSTER_TYPES.find(type => type === this.type2)) {
        algorithm.opponentKillerType2 = this.type2;
      }
      if (this.spark === 'true') {
        algorithm.isSparkChain = true;
      }
      if (this.buffing === 'false') {
        algorithm.isSupportBuffing = false;
      }
      if (this.breaks === 'false') {
        algorithm.isSupportBreakingResistances = false;
      }
      if (this.buffs > 0 && this.buffs <= 200) {
        algorithm.supportBuff = this.buffs;
      }
      if (this.enemyDef > 0 && this.enemyDef <= 1000000) {
        algorithm.opponentDef = this.enemyDef;
      }
      if (this.enemySpr > 0 && this.enemySpr <= 1000000) {
        algorithm.opponentSpr = this.enemySpr;
      }
      for (let i = 0; i < 8; i++) {
        if (this['enemyResist' + i] >= -1000 && this['enemyResist' + i] <= 300) {
          algorithm.opponentResistances[i] = this['enemyResist' + i];
        }
      }
      for (let i = 0; i < 8; i++) {
        if (this['breakResist' + i] >= -120 && this['breakResist' + i] < 0) {
          algorithm.supportResistsBreak[i] = this['breakResist' + i];
        }
      }
    }
    if (this.unitsService.selectedUnit.selectedBuild.algorithm instanceof AlgorithmFinish) {
      if (this.skillcombos && this.skillcombos.length) {
        const skills: Array<Skill> = this.unitsService.selectedUnit.selectedBuild.skills;
        this.skillcombos.forEach((skillcombo: string, index: number) => {
          if (skills[index]) {
            skills[index].chainCombo = skillcombo;
          }
        });
      }
    }
  }
}
