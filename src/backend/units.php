<?php
require_once "../../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../../gestion/genscripts/object_brex_unit_carac.class.php";
require_once "../../gestion/genscripts/object_brex_stuff_comp.class.php";
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
  }
}
class Build {
  public $equipments;
  function __construct($brex_build) {
    $this->equipments = new EquipmentSet ( $brex_build );
  }
}
class Equipment {
  public $id;
  public $name;
  public $icon;
  function __construct($brex_equipement) {
    $this->id = $brex_equipement->id;
    $this->name = $brex_equipement->nom; // TODO : translation needed here
    $this->icon = $brex_equipement->getImageimgPath ();
  }
}
class EquipmentSet {
  public $right_hand;
  public $left_hand;
  public $head;
  public $body;
  public $accessory1;
  public $accessory2;
  public $materias;
  function __construct($brex_build) {
    $this->right_hand = new Equipment ( $brex_build->main1 );
    if ($brex_build->main2) {
      $this->left_hand = new Equipment ( $brex_build->main2 );
    }
    $this->head = new Equipment ( $brex_build->tete );
    $this->body = new Equipment ( $brex_build->torse );
    $this->accessory1 = new Equipment ( $brex_build->accessoire1 );
    $this->accessory2 = new Equipment ( $brex_build->accessoire2 );
    // TODO materias
  }
}
class Unit {
  public $id;
  public $name;
  public $rank;
  public $icon;
  public $stats;
  public $builds;
  function __construct($brex_unit, $brex_unit_stats, $brex_builds, $language) {
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
        $this->builds [] = new Build ( $brex_build );
      }
    }
  }
}
function dieWithError($statusCode, $errorMessages) {
  http_response_code ( $statusCode );
  echo json_encode ( is_array ( $errorMessages ) ? $errorMessages : array ($errorMessages) );
  die ();
}

if ($_SERVER ['REQUEST_METHOD'] == 'GET') {
  $language = 'en';
  if (isset ( $_GET ['language'] ) && $_GET ['language'] == 'fr') {
    $language = 'fr';
  }
  
  if (isset ( $_GET ['id'] )) {
    $brex_units = brex_unit::finderParNumero ( $_GET ['id'] );
    if (! count ( $brex_units )) {
      dieWithError ( 400, 'Unit not found' );
    }
    $brex_unit = $brex_units [0];
    
    $brex_unit_stats = brex_unit_carac::findByRelation1N ( array ('unit' => $brex_unit->id) );
    if (! count ( $brex_unit_stats )) {
      dieWithError ( 500, 'Unit checks failed, stats not found' );
    }
    
    $brex_builds = brex_perso_stuff::findByRelation1N ( array ('unit' => $brex_unit->id) );
    if (! count ( $brex_builds )) {
      dieWithError ( 500, 'Unit checks failed, build not found' );
    }
    
    $unit = new Unit ( $brex_unit, $brex_unit_stats [0], $brex_builds, $language );
    echo json_encode ( $unit, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else {
    $brex_units = brex_unit::finderForCalculator ();
    $units = array ();
    if (count ( $brex_units ) > 0) {
      foreach ( $brex_units as $brex_unit ) {
        $unit = new Unit ( $brex_unit, null, null, $language );
        $units [] = $unit;
      }
    }
    echo json_encode ( $units, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  }
}
?>