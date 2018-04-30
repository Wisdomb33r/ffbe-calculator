<?php
require_once "../../gestion/genscripts/object_brex_build_passif.class.php";
class Equipment {
  public $id;
  public $category;
  public $name;
  public $icon;
  public $hp;
  public $hp_percent;
  public $hp_dh;
  public $hp_tdh;
  public $mp;
  public $mp_percent;
  public $mp_dh;
  public $mp_tdh;
  public $atk;
  public $atk_percent;
  public $atk_dh;
  public $atk_tdh;
  public $mag;
  public $mag_percent;
  public $mag_dh;
  public $mag_tdh;
  public $def;
  public $def_percent;
  public $def_dh;
  public $def_tdh;
  public $spr;
  public $spr_percent;
  public $spr_dh;
  public $spr_tdh;
  public $variance_min;
  public $variance_max;
  public $unique;
  public $conditional_passives;
  public $elements = array ();
  function __construct($brex_equipement, $language) {
    $this->id = $brex_equipement->id;
    $this->category = $brex_equipement->categorie->id;
    $this->name = $language == 'fr' ? $brex_equipement->nom : $brex_equipement->nom_en;
    $this->icon = $brex_equipement->getImageimgPath ();
    $this->hp = $brex_equipement->pv;
    $this->hp_percent = $brex_equipement->pvp;
    $this->hp_dh = 0;
    $this->hp_tdh = 0;
    $this->mp = $brex_equipement->pm;
    $this->mp_percent = $brex_equipement->pmp;
    $this->mp_dh = 0;
    $this->mp_tdh = 0;
    $this->atk = $brex_equipement->att;
    $this->atk_percent = $brex_equipement->attp;
    $this->atk_dh = $brex_equipement->build_att_dh;
    $this->atk_tdh = $brex_equipement->build_att_tdh;
    $this->mag = $brex_equipement->mag;
    $this->mag_percent = $brex_equipement->magp;
    $this->mag_dh = $brex_equipement->build_mag_dh;
    $this->mag_tdh = $brex_equipement->build_mag_tdh;
    $this->def = $brex_equipement->def;
    $this->def_percent = $brex_equipement->defp;
    $this->def_dh = 0;
    $this->def_tdh = 0;
    $this->spr = $brex_equipement->psy;
    $this->spr_percent = $brex_equipement->psyp;
    $this->spr_dh = 0;
    $this->spr_tdh = 0;
    $this->variance_min = $brex_equipement->variance_min;
    $this->variance_max = $brex_equipement->variance_max;
    $this->unique = $brex_equipement->uniq == 1 ? true : false;
    $brex_build_passives = brex_build_passif::findByRelation1N ( array ('objet' => $brex_equipement->id) );
    if (count ( $brex_build_passives )) {
      $this->conditional_passives = array ();
      foreach ( $brex_build_passives as $passive ) {
        $this->conditional_passives [] = new ConditionalPassive ( $passive );
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
class ConditionalPassive {
  public $category;
  public $element;
  public $hp;
  public $mp;
  public $atk;
  public $mag;
  public $def;
  public $spr;
  function __construct($brex_unit_passive) {
    $this->category = $brex_unit_passive->categorie ? $brex_unit_passive->categorie->id : null;
    $this->element = $brex_unit_passive->element ? $brex_unit_passive->element->id : null;
    $this->hp = $brex_unit_passive->pv;
    $this->mp = $brex_unit_passive->pm;
    $this->atk = $brex_unit_passive->att;
    $this->mag = $brex_unit_passive->mag;
    $this->def = $brex_unit_passive->def;
    $this->spr = $brex_unit_passive->psy;
  }
}
class UnitStats {
  public $hp;
  public $hp_passive;
  public $mp;
  public $mp_passive;
  public $atk;
  public $atk_passive;
  public $mag;
  public $mag_passive;
  public $def;
  public $def_passive;
  public $spr;
  public $spr_passive;
  public $atk_dh;
  public $mag_dh;
  public $atk_tdh;
  public $mag_tdh;
  function __construct($brex_unit_stats) {
    $this->hp = $brex_unit_stats->pv + $brex_unit_stats->pv_pots;
    $this->hp_passive = $brex_unit_stats->pv_passif;
    $this->mp = $brex_unit_stats->pm + $brex_unit_stats->pm_pots;
    $this->mp_passive = $brex_unit_stats->pm_passif;
    $this->atk = $brex_unit_stats->att + $brex_unit_stats->att_pots;
    $this->atk_passive = $brex_unit_stats->att_passif;
    $this->mag = $brex_unit_stats->mag + $brex_unit_stats->mag_pots;
    $this->mag_passive = $brex_unit_stats->mag_passif;
    $this->def = $brex_unit_stats->def + $brex_unit_stats->def_pots;
    $this->def_passive = $brex_unit_stats->def_passif;
    $this->spr = $brex_unit_stats->psy + $brex_unit_stats->psy_pots;
    $this->spr_passive = $brex_unit_stats->psy_passif;
    $this->atk_dh = $brex_unit_stats->att_dh;
    $this->mag_dh = $brex_unit_stats->mag_dh;
    $this->atk_tdh = $brex_unit_stats->att_tdh;
    $this->mag_tdh = $brex_unit_stats->mag_tdh;
  }
}
class Build {
  public $algorithmId;
  public $algorithmName;
  public $equipments;
  public $skills;
  function __construct($brex_build, $language, $brex_unit) {
    $this->algorithmId = $brex_build->algorithm->id;
    $this->algorithmName = $language == 'fr' ? $brex_build->algorithm->nom : $brex_build->algorithm->nom_en;
    $this->equipments = new EquipmentSet ( $brex_build, $language );
    
    $brex_build_skills = brex_stuff_comp::findByRelation1N ( array ('stuff' => $brex_build->id) );
    if (count ( $brex_build_skills )) {
      $this->skills = array ();
      foreach ( $brex_build_skills as $brex_skill ) {
        $this->skills [] = new Skill ( $brex_skill, $language, $brex_unit );
      }
    }
  }
}
class Skill {
  public $id;
  public $name;
  public $icon;
  public $power;
  public $isLimitBreak;
  public $nb;
  function __construct($brex_skill, $language, $brex_unit) {
    $this->isLimitBreak = $brex_skill->is_limite == 1 ? true : false;
    $this->power = $brex_skill->puissance;
    $this->nb = $brex_skill->nb ? $brex_skill->nb : 1;
    if ($this->isLimitBreak) {
      $this->id = null;
      $this->name = $language === 'fr' ? $brex_unit->limite : $brex_unit->limite_en;
      $this->icon = null;
      $this->hits = $brex_unit->lim_hits;
      $this->frames = $brex_unit->lim_frames;
      $this->damages = $brex_unit->lim_damages;
    } else {
      $this->id = $brex_skill->competence->id;
      $this->name = $language === 'fr' ? $brex_skill->competence->nom : $brex_skill->competence->nom_en;
      $this->icon = $brex_skill->competence->icone->getImageimgPath ();
      $this->hits = $brex_skill->competence->hits;
      $this->frames = $brex_skill->competence->frames;
      $this->damages = $brex_skill->competence->damages;
    }
  }
}
class EquipmentSet {
  public $right_hand;
  public $left_hand;
  public $head;
  public $body;
  public $accessory1;
  public $accessory2;
  public $materia1;
  public $materia2;
  public $materia3;
  public $materia4;
  function __construct($brex_build, $language) {
    $this->right_hand = new Equipment ( $brex_build->main1, $language );
    if ($brex_build->main2) {
      $this->left_hand = new Equipment ( $brex_build->main2, $language );
    }
    $this->head = new Equipment ( $brex_build->tete, $language );
    $this->body = new Equipment ( $brex_build->torse, $language );
    $this->accessory1 = new Equipment ( $brex_build->accessoire1, $language );
    $this->accessory2 = new Equipment ( $brex_build->accessoire2, $language );
    $this->materia1 = new Equipment ( $brex_build->aptitude1, $language );
    $this->materia2 = new Equipment ( $brex_build->aptitude2, $language );
    $this->materia3 = new Equipment ( $brex_build->aptitude3, $language );
    $this->materia4 = new Equipment ( $brex_build->aptitude4, $language );
  }
}
class Unit {
  public $id;
  public $name;
  public $rank;
  public $icon;
  public $stats;
  public $builds;
  public $conditional_passives;
  function __construct($brex_unit, $brex_unit_stats, $brex_unit_passives, $brex_builds, $language) {
    $this->id = $brex_unit->numero;
    $this->name = $language == 'fr' ? $brex_unit->perso->nom : $brex_unit->perso->nom_en;
    $this->rank = $brex_unit->stars;
    $this->icon = $brex_unit->getImageimgPath ();
    if ($brex_unit_stats) {
      $this->stats = new UnitStats ( $brex_unit_stats );
    }
    if (is_array ( $brex_builds ) && count ( $brex_builds )) {
      $this->builds = array ();
      foreach ( $brex_builds as $brex_build ) {
        $this->builds [] = new Build ( $brex_build, $language, $brex_unit );
      }
    }
    if (is_array ( $brex_unit_passives ) && count ( $brex_unit_passives )) {
      $this->conditional_passives = array ();
      foreach ( $brex_unit_passives as $brex_unit_passive ) {
        $this->conditional_passives [] = new ConditionalPassive ( $brex_unit_passive );
      }
    }
  }
}
?>
