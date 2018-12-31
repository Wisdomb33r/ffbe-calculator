<?php
require_once "../../gestion/genscripts/object_brex_build_passif.class.php";
require_once "../../gestion/genscripts/object_brex_build_equipment.class.php";
require_once "../../gestion/genscripts/object_brex_comp_eveil.class.php";
class Equipment {
  public $id;
  public $gumiId;
  public $category;
  public $name;
  public $icon;
  public $hp;
  public $hp_percent;
  public $hp_dh;
  public $hp_tdh;
  public $hp_dw;
  public $mp;
  public $mp_percent;
  public $mp_dh;
  public $mp_tdh;
  public $mp_dw;
  public $atk;
  public $atk_percent;
  public $atk_dh;
  public $atk_tdh;
  public $atk_dw;
  public $mag;
  public $mag_percent;
  public $mag_dh;
  public $mag_tdh;
  public $mag_dw;
  public $def;
  public $def_percent;
  public $def_dh;
  public $def_tdh;
  public $def_dw;
  public $spr;
  public $spr_percent;
  public $spr_dh;
  public $spr_tdh;
  public $spr_dw;
  public $jump;
  public $variance_min;
  public $variance_max;
  public $unique;
  public $locked;
  public $stmr;
  public $physical_killers;
  public $magical_killers;
  public $lb_multiplier;
  public $sex_restriction;
  public $esper_percent;
  public $dual_wield;
  public $extra_equip;
  public $conditional_passives;
  public $elements = array ();
  function __construct($brex_equipement, $language) {
    $this->id = $brex_equipement->id;
    $this->gumiId = $brex_equipement->gumi_id;
    $this->category = $brex_equipement->categorie->id;
    $this->name = $language == 'fr' ? $brex_equipement->nom : $brex_equipement->nom_en;
    $this->icon = $brex_equipement->getImageimgPath ();
    $this->hp = $brex_equipement->pv;
    $this->hp_percent = $brex_equipement->pvp;
    $this->hp_dh = $brex_equipement->pv_dh;
    $this->hp_tdh = $brex_equipement->pv_tdh;
    $this->hp_dw = $brex_equipement->pv_dw;
    $this->mp = $brex_equipement->pm;
    $this->mp_percent = $brex_equipement->pmp;
    $this->mp_dh = $brex_equipement->pm_dh;
    $this->mp_tdh = $brex_equipement->pm_tdh;
    $this->mp_dw = $brex_equipement->pm_dw;
    $this->atk = $brex_equipement->att;
    $this->atk_percent = $brex_equipement->attp;
    $this->atk_dh = $brex_equipement->build_att_dh;
    $this->atk_tdh = $brex_equipement->build_att_tdh;
    $this->atk_dw = $brex_equipement->att_dw;
    $this->mag = $brex_equipement->mag;
    $this->mag_percent = $brex_equipement->magp;
    $this->mag_dh = $brex_equipement->build_mag_dh;
    $this->mag_tdh = $brex_equipement->build_mag_tdh;
    $this->mag_dw = $brex_equipement->mag_dw;
    $this->def = $brex_equipement->def;
    $this->def_percent = $brex_equipement->defp;
    $this->def_dh = $brex_equipement->def_dh;
    $this->def_tdh = $brex_equipement->def_tdh;
    $this->def_dw = $brex_equipement->def_dw;
    $this->spr = $brex_equipement->psy;
    $this->spr_percent = $brex_equipement->psyp;
    $this->spr_dh = $brex_equipement->psy_dh;
    $this->spr_tdh = $brex_equipement->psy_tdh;
    $this->spr_dw = $brex_equipement->psy_dw;
    $this->evo = $brex_equipement->evop;
    $this->jump = $brex_equipement->jump;
    $this->variance_min = $brex_equipement->variance_min;
    $this->variance_max = $brex_equipement->variance_max;
    $this->unique = $brex_equipement->uniq == 1 ? true : false;
    $this->stmr = $brex_equipement->stars == 9 ? true : false;
    if ($brex_equipement->tueurs) {
      $this->physical_killers = new KillerPassives ( $brex_equipement->tueurs );
    }
    if ($brex_equipement->tueurs_m) {
      $this->magical_killers = new KillerPassives ( $brex_equipement->tueurs_m );
    }
    $this->lb_multiplier = $brex_equipement->lb_boost;
    $this->sex_restriction = $brex_equipement->sex_restrict;
    $this->esper_percent = $brex_equipement->esper_percent;
    $this->dual_wield = $brex_equipement->dual_wield == '1' ? true : false;
    $this->extra_equip = $brex_equipement->extra_equip;
    $brex_build_passives = brex_build_passif::findByRelation1N ( array ('objet' => $brex_equipement->id) );
    if (count ( $brex_build_passives )) {
      $this->conditional_passives = array ();
      foreach ( $brex_build_passives as $passive ) {
        $this->conditional_passives [] = new ConditionalPassive ( $passive, $language );
      }
    }
    if ($brex_equipement->res_feu >= 100) {
      $this->elements [] = 1;
    }
    if ($brex_equipement->res_glace >= 100) {
      $this->elements [] = 2;
    }
    if ($brex_equipement->res_foudre >= 100) {
      $this->elements [] = 3;
    }
    if ($brex_equipement->res_eau >= 100) {
      $this->elements [] = 4;
    }
    if ($brex_equipement->res_air >= 100) {
      $this->elements [] = 5;
    }
    if ($brex_equipement->res_terre >= 100) {
      $this->elements [] = 6;
    }
    if ($brex_equipement->res_lumiere >= 100) {
      $this->elements [] = 7;
    }
    if ($brex_equipement->res_tenebres >= 100) {
      $this->elements [] = 8;
    }
  }
}
class KillerPassives {
  public $dragon;
  public $insect;
  public $fairy;
  public $undead;
  public $plant;
  public $beast;
  public $human;
  public $machine;
  public $stone;
  public $demon;
  public $aquatic;
  public $bird;
  function __construct($tueurs_string) {
    $splitted = explode ( ',', $tueurs_string );
    if (count ( $splitted ) == 12) {
      $this->aquatic = intval ( $splitted [0] );
      $this->beast = intval ( $splitted [1] );
      $this->bird = intval ( $splitted [2] );
      $this->demon = intval ( $splitted [3] );
      $this->dragon = intval ( $splitted [4] );
      $this->fairy = intval ( $splitted [5] );
      $this->human = intval ( $splitted [6] );
      $this->insect = intval ( $splitted [7] );
      $this->machine = intval ( $splitted [8] );
      $this->plant = intval ( $splitted [9] );
      $this->stone = intval ( $splitted [10] );
      $this->undead = intval ( $splitted [11] );
    }
  }
}
class ConditionalPassive {
  public $id;
  public $unit;
  public $category;
  public $element;
  public $skill;
  public $skill_name;
  public $skill_icon;
  public $hp;
  public $hp_dh;
  public $hp_tdh;
  public $hp_dw;
  public $mp;
  public $mp_dh;
  public $mp_tdh;
  public $mp_dw;
  public $atk;
  public $atk_dh;
  public $atk_tdh;
  public $atk_dw;
  public $mag;
  public $mag_dh;
  public $mag_tdh;
  public $mag_dw;
  public $def;
  public $def_dh;
  public $def_tdh;
  public $def_dw;
  public $spr;
  public $spr_dh;
  public $spr_tdh;
  public $spr_dw;
  public $jump;
  public $physical_killers;
  public $magical_killers;
  public $partial_dw;
  public $unique;
  public $lb_power;
  public $evo;
  public $esper_percent;
  function __construct($brex_unit_passive, $language) {
    $this->id = $brex_unit_passive->id;
    $this->unit = $brex_unit_passive->unit ? $brex_unit_passive->unit->numero : null;
    $this->category = $brex_unit_passive->categorie ? $brex_unit_passive->categorie->id : null;
    $this->element = $brex_unit_passive->element ? $brex_unit_passive->element->id : null;
    if ($brex_unit_passive->passif) {
      $this->skill = $brex_unit_passive->passif->id;
      $this->skill_name = $language == 'fr' ? $brex_unit_passive->passif->nom : $brex_unit_passive->passif->nom_en;
      $this->skill_icon = $brex_unit_passive->passif->icone->getImageimgPath ();
    }
    $this->hp = $brex_unit_passive->pv;
    $this->hp_dh = $brex_unit_passive->pv_dh;
    $this->hp_tdh = $brex_unit_passive->pv_tdh;
    $this->hp_dw = $brex_unit_passive->pv_dw;
    $this->mp = $brex_unit_passive->pm;
    $this->mp_dh = $brex_unit_passive->pm_dh;
    $this->mp_tdh = $brex_unit_passive->pm_tdh;
    $this->mp_dw = $brex_unit_passive->pm_dw;
    $this->atk = $brex_unit_passive->att;
    $this->atk_dh = $brex_unit_passive->att_dh;
    $this->atk_tdh = $brex_unit_passive->att_tdh;
    $this->atk_dw = $brex_unit_passive->att_dw;
    $this->mag = $brex_unit_passive->mag;
    $this->mag_dh = $brex_unit_passive->mag_dh;
    $this->mag_tdh = $brex_unit_passive->mag_tdh;
    $this->mag_dw = $brex_unit_passive->mag_dw;
    $this->def = $brex_unit_passive->def;
    $this->def_dh = $brex_unit_passive->def_dh;
    $this->def_tdh = $brex_unit_passive->def_tdh;
    $this->def_dw = $brex_unit_passive->def_dw;
    $this->spr = $brex_unit_passive->psy;
    $this->spr_dh = $brex_unit_passive->psy_dh;
    $this->spr_tdh = $brex_unit_passive->psy_tdh;
    $this->spr_dw = $brex_unit_passive->psy_dw;
    $this->jump = $brex_unit_passive->jump;
    if ($brex_unit_passive->tueurs) {
      $this->physical_killers = new KillerPassives ( $brex_unit_passive->tueurs );
    }
    if ($brex_unit_passive->tueurs_m) {
      $this->magical_killers = new KillerPassives ( $brex_unit_passive->tueurs_m );
    }
    $this->partial_dw = $brex_unit_passive->partial_dw ? true : false;
    $this->unique = $brex_unit_passive->uniq ? true : false;
    $this->lb_power = $brex_unit_passive->lb_boost;
    $this->skill_mod = $brex_unit_passive->skill_mod;
    $this->evo = $brex_unit_passive->evop;
    $this->esper_percent = $brex_unit_passive->esper_percent;
  }
}
class UnitStats {
  public $hp;
  public $hp_passive;
  public $hp_dh;
  public $hp_tdh;
  public $hp_dw;
  public $mp;
  public $mp_passive;
  public $mp_dh;
  public $mp_tdh;
  public $mp_dw;
  public $atk;
  public $atk_passive;
  public $atk_dh;
  public $atk_tdh;
  public $atk_dw;
  public $mag;
  public $mag_passive;
  public $mag_dh;
  public $mag_tdh;
  public $mag_dw;
  public $def;
  public $def_passive;
  public $def_dh;
  public $def_tdh;
  public $def_dw;
  public $spr;
  public $spr_passive;
  public $spr_dh;
  public $spr_tdh;
  public $spr_dw;
  public $evo;
  public $jump;
  public $esper_percent;
  public $lb_multiplier;
  public $dual_wield;
  function __construct($brex_unit_stats) {
    $this->hp = $brex_unit_stats->pv + $brex_unit_stats->pv_pots;
    $this->hp_passive = $brex_unit_stats->pv_passif_amelio > 0 ? $brex_unit_stats->pv_passif_amelio : $brex_unit_stats->pv_passif;
    $this->hp_dh = $brex_unit_stats->pv_dh;
    $this->hp_tdh = $brex_unit_stats->pv_tdh;
    $this->hp_dw = $brex_unit_stats->pv_dw;
    $this->mp = $brex_unit_stats->pm + $brex_unit_stats->pm_pots;
    $this->mp_passive = $brex_unit_stats->pm_passif_amelio > 0 ? $brex_unit_stats->pm_passif_amelio : $brex_unit_stats->pm_passif;
    $this->mp_dh = $brex_unit_stats->pm_dh;
    $this->mp_tdh = $brex_unit_stats->pm_tdh;
    $this->mp_dw = $brex_unit_stats->pm_dw;
    $this->atk = $brex_unit_stats->att + $brex_unit_stats->att_pots;
    $this->atk_passive = $brex_unit_stats->att_passif_amelio > 0 ? $brex_unit_stats->att_passif_amelio : $brex_unit_stats->att_passif;
    $this->atk_dh = $brex_unit_stats->att_dh_amelio > 0 ? $brex_unit_stats->att_dh_amelio : $brex_unit_stats->att_dh;
    $this->atk_tdh = $brex_unit_stats->att_tdh_amelio > 0 ? $brex_unit_stats->att_tdh_amelio : $brex_unit_stats->att_tdh;
    $this->atk_dw = $brex_unit_stats->att_dw;
    $this->mag = $brex_unit_stats->mag + $brex_unit_stats->mag_pots;
    $this->mag_passive = $brex_unit_stats->mag_passif_amelio > 0 ? $brex_unit_stats->mag_passif_amelio : $brex_unit_stats->mag_passif;
    $this->mag_dh = $brex_unit_stats->mag_dh_amelio > 0 ? $brex_unit_stats->mag_dh_amelio : $brex_unit_stats->mag_dh;
    $this->mag_tdh = $brex_unit_stats->mag_tdh_amelio > 0 ? $brex_unit_stats->mag_tdh_amelio : $brex_unit_stats->mag_tdh;
    $this->mag_dw = $brex_unit_stats->mag_dw;
    $this->def = $brex_unit_stats->def + $brex_unit_stats->def_pots;
    $this->def_passive = $brex_unit_stats->def_passif_amelio > 0 ? $brex_unit_stats->def_passif_amelio : $brex_unit_stats->def_passif;
    $this->def_dh = $brex_unit_stats->def_dh;
    $this->def_tdh = $brex_unit_stats->def_tdh;
    $this->def_dw = $brex_unit_stats->def_dw;
    $this->spr = $brex_unit_stats->psy + $brex_unit_stats->psy_pots;
    $this->spr_passive = $brex_unit_stats->psy_passif_amelio > 0 ? $brex_unit_stats->psy_passif_amelio : $brex_unit_stats->psy_passif;
    $this->spr_dh = $brex_unit_stats->psy_dh;
    $this->spr_tdh = $brex_unit_stats->psy_tdh;
    $this->spr_dw = $brex_unit_stats->psy_dw;
    $this->evo = $brex_unit_stats->evop_amelio > 0 ? $brex_unit_stats->evop_amelio : $brex_unit_stats->evop;
    $this->jump = $brex_unit_stats->jump;
    $this->esper_percent = $brex_unit_stats->esper_percent;
    $this->lb_multiplier = $brex_unit_stats->lb_boost;
    $this->dual_wield = $brex_unit_stats->dual_wield == '1' ? true : false;
  }
}
class Build {
  public $id;
  public $name;
  public $algorithmId;
  public $algorithmName;
  public $mitigation;
  public $physical_mitigation;
  public $magical_mitigation;
  public $physical_cover;
  public $magical_cover;
  public $physical_resistance;
  public $magical_resistance;
  public $physical_killers;
  public $magical_killers;
  public $equipments;
  public $skills;
  function __construct($brex_build, $language, $brex_unit, $minimal = false) {
    $this->id = $brex_build->id;
    $this->name = $language == 'fr' ? $brex_build->name_fr : $brex_build->name_en;
    $this->algorithmId = $brex_build->algorithm->id;
    $this->algorithmName = $language == 'fr' ? $brex_build->algorithm->nom : $brex_build->algorithm->nom_en;
    if (! $minimal) {
      if ($brex_build->tueurs) {
        $this->physical_killers = new KillerPassives ( $brex_build->tueurs );
      }
      if ($brex_build->tueurs_m) {
        $this->magical_killers = new KillerPassives ( $brex_build->tueurs_m );
      }
      $equipments_filter = array ();
      $equipments_filter ['build'] = $brex_build->id;
      $brex_equipments = brex_build_equipment::findByRelation1N ( $equipments_filter );
      $this->equipments = new EquipmentSet ( $brex_build, $brex_equipments, $language );
      
      if ($brex_build->algorithm->id == 8) {
        $this->mitigation = $brex_build->mitigation;
        $this->physical_mitigation = $brex_build->physical_mitigation;
        $this->magical_mitigation = $brex_build->magical_mitigation;
        $this->physical_cover = $brex_build->physical_cover;
        $this->magical_cover = $brex_build->magical_cover;
        $this->physical_resistance = $brex_build->physical_resistance;
        $this->magical_resistance = $brex_build->magical_resistance;
      }
      
      $brex_build_skills = brex_stuff_comp::findByRelation1N ( array ('stuff' => $brex_build->id) );
      $brex_build_skills = array_reverse ( $brex_build_skills );
      if (count ( $brex_build_skills )) {
        $this->skills = array ();
        foreach ( $brex_build_skills as $brex_skill ) {
          $this->skills [] = new Skill ( $brex_skill, $language, $brex_unit );
        }
      }
    }
  }
}
class Skill {
  public $id;
  public $category;
  public $name;
  public $icon;
  public $power;
  public $isLimitBreak;
  public $isEsper;
  public $isJump;
  public $nb;
  public $hits;
  public $frames;
  public $damages;
  public $damages_type;
  public $calculation_stat;
  public $isBreakingChain;
  public $isTurnCounting;
  public $chainCombo;
  public $resists_break;
  public $elements;
  public $atk_buff;
  public $mag_buff;
  public $def_buff;
  public $spr_buff;
  public $physical_killers;
  public $magical_killers;
  function __construct($brex_skill, $language, $brex_unit) {
    $this->isLimitBreak = $brex_skill->is_limite ? true : false;
    $this->isEsper = $brex_skill->is_esper ? true : false;
    $this->isJump = $brex_skill->is_jump ? true : false;
    $this->power = $brex_skill->puissance;
    if ($brex_skill->nb > 1) {
      $this->power = $brex_skill->puissance / $brex_skill->nb;
    }
    $this->resists_break = $brex_skill->resists_break ? explode ( ',', $brex_skill->resists_break ) : null;
    $this->nb = $brex_skill->nb ? $brex_skill->nb : 1;
    $this->elements = $brex_skill->elements ? explode ( ',', $brex_skill->elements ) : null;
    $this->isBreakingChain = $brex_skill->breaking_chain ? true : false;
    $this->isTurnCounting = $brex_skill->not_turn_counting == 1 ? false : true;
    $this->chainCombo = $brex_skill->chain_combo;
    $this->atk_buff = $brex_skill->att_buff;
    $this->mag_buff = $brex_skill->mag_buff;
    $this->def_buff = $brex_skill->def_buff;
    $this->spr_buff = $brex_skill->psy_buff;
    if ($brex_skill->tueurs) {
      $this->physical_killers = new KillerPassives ( $brex_skill->tueurs );
    }
    if ($brex_skill->tueurs_m) {
      $this->magical_killers = new KillerPassives ( $brex_skill->tueurs_m );
    }
    if ($this->isLimitBreak) {
      $this->name = $language === 'fr' ? $brex_unit->limite : $brex_unit->limite_en;
      $this->icon = null;
      $this->hits = $brex_unit->lim_hits;
      $this->frames = $brex_unit->lim_frames;
      $this->damages = $brex_unit->lim_damages;
    } else if ($this->isEsper) {
      $this->name = $language === 'fr' ? 'Chimère' : 'Esper';
      $this->icon = null;
      $this->category = 9;
      $this->damages_type = 'esper';
      $this->hits = 1;
      $this->frames = 100;
      $this->damages = 100;
    } else {
      $this->id = $brex_skill->competence->id;
      $this->category = $brex_skill->competence->categorie->id;
      $this->name = $language === 'fr' ? $brex_skill->competence->nom : $brex_skill->competence->nom_en;
      $this->icon = $brex_skill->competence->icone->getImageimgPath ();
      $this->hits = $brex_skill->competence->hits;
      $this->frames = $brex_skill->competence->frames;
      $this->damages = $brex_skill->competence->damages;
      if ($brex_skill->is_enhanced == 1) {
        $values = array ();
        $values ['perso'] = $brex_unit->perso->id;
        $values ['competence'] = $brex_skill->competence->id;
        $enhancements = brex_comp_eveil::findByRelation1N ( $values );
        if (count ( $enhancements )) {
          foreach ( $enhancements as $e ) {
            if ($e->niveau == 2) {
              if ($e->comp_amelio) {
                $this->hits = $e->comp_amelio->hits;
                $this->frames = $e->comp_amelio->frames;
                $this->damages = $e->comp_amelio->damages;
              } else {
                if ($e->hits)
                  $this->hits = $e->hits;
                if ($e->frames)
                  $this->frames = $e->frames;
                if ($e->damages)
                  $this->damages = $e->damages;
              }
            }
          }
        }
      }
      $this->calculation_stat = $brex_skill->competence->calculation_stat;
      if ($brex_skill->competence->physique) {
        $this->damages_type = 'physical';
      }
      if ($brex_skill->competence->magique) {
        $this->damages_type = 'magical';
      }
      if ($brex_skill->competence->hybride) {
        $this->damages_type = 'hybrid';
      }
      if ($brex_skill->competence->esper) {
        $this->damages_type = 'evoker';
      }
      if ($brex_skill->competence->elements) {
        $elements = explode ( ',', $brex_skill->competence->elements );
        if (! is_array ( $this->elements )) {
          $this->elements = $elements;
        } else {
          foreach ( $elements as $element ) {
            if (! in_array ( $element, $this->elements )) {
              $this->elements [] = $element;
            }
          }
        }
      }
    }
  }
}
class EquipmentSet {
  public $right_hand;
  public $rh_trait1;
  public $rh_trait2;
  public $rh_trait3;
  public $left_hand;
  public $lh_trait1;
  public $lh_trait2;
  public $lh_trait3;
  public $head;
  public $body;
  public $accessory1;
  public $accessory2;
  public $materia1;
  public $materia2;
  public $materia3;
  public $materia4;
  function __construct($brex_build, $brex_build_equipments, $language) {
    if (count ( $brex_build_equipments )) {
      foreach ( $brex_build_equipments as $equipment ) {
        $slot = $equipment->slot->nom;
        $this->$slot = new Equipment ( $equipment->objet, $language );
        $this->$slot->locked = $equipment->non_removeable ? true : false;
      }
    }
  }
}
class Unit {
  public $id;
  public $name;
  public $rank;
  public $icon;
  public $sex;
  public $stats;
  public $builds;
  public $conditional_passives;
  function __construct($brex_unit, $brex_unit_stats, $brex_unit_passives, $brex_builds, $language, $minimal = false) {
    $this->id = $brex_unit->numero;
    $this->name = $language == 'fr' ? $brex_unit->perso->nom : $brex_unit->perso->nom_en;
    $this->rank = $brex_unit->stars;
    $this->icon = $brex_unit->getImageimgPath ();
    $this->sex = $brex_unit->perso->sex;
    if ($brex_unit_stats) {
      $this->stats = new UnitStats ( $brex_unit_stats );
    }
    if (is_array ( $brex_builds ) && count ( $brex_builds )) {
      $this->builds = array ();
      foreach ( $brex_builds as $brex_build ) {
        if ($brex_build->algorithm != null) {
          $this->builds [] = new Build ( $brex_build, $language, $brex_unit, $minimal );
        }
      }
    }
    if (is_array ( $brex_unit_passives ) && count ( $brex_unit_passives )) {
      $this->conditional_passives = array ();
      foreach ( $brex_unit_passives as $brex_unit_passive ) {
        if (! $brex_unit_passive->objet) {
          $this->conditional_passives [] = new ConditionalPassive ( $brex_unit_passive, $language );
        }
      }
    }
  }
}
?>
