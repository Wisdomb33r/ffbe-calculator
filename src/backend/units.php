<?php
require_once "../../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../../gestion/genscripts/object_brex_unit_carac.class.php";
class Unit {
  public $id;
  public $name;
  public $rank;
  public $icon;
  public $hp;
  public $mp;
  public $atk;
  public $mag;
  public $def;
  public $spr;
  function __construct($brex_unit, $brex_unit_stats, $language) {
    $this->id = $brex_unit->numero;
    $this->name = $language == 'fr' ? $brex_unit->perso->nom : $brex_unit->perso->nom_en;
    $this->rank = $brex_unit->stars;
    $this->icon = $brex_unit->getImageimgPath ();
    if ($brex_unit_stats) {
      $this->hp = $brex_unit_stats->pv + $brex_unit_stats->pv_pots;
      $this->mp = $brex_unit_stats->pm + $brex_unit_stats->pm_pots;
      $this->atk = $brex_unit_stats->att + $brex_unit_stats->att_pots;
      $this->mag = $brex_unit_stats->mag + $brex_unit_stats->mag_pots;
      $this->def = $brex_unit_stats->def + $brex_unit_stats->def_pots;
      $this->spr = $brex_unit_stats->psy + $brex_unit_stats->psy_pots;
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
    
    $unit = new Unit ( $brex_unit, $brex_unit_stats [0], $language );
    echo json_encode ( $unit, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else {
    $brex_units = brex_unit::finderForCalculator ();
    $units = array ();
    if (count ( $brex_units ) > 0) {
      foreach ( $brex_units as $brex_unit ) {
        $unit = new Unit ( $brex_unit, null, $language );
        $units [] = $unit;
      }
    }
    echo json_encode ( $units, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  }
}
?>