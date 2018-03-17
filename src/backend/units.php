<?php
require_once "../../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../../gestion/genscripts/object_brex_unit_carac.class.php";
class Unit {
  public $id;
  public $name;
  public $icon;
  function __construct($brex_unit) {
    $this->id = $brex_unit->numero;
    $this->name = $brex_unit->perso->nom;
    $this->icon = $brex_unit->getImageimgPath ();
  }
}

if ($_SERVER ['REQUEST_METHOD'] == 'GET') {
  if (isset ( $_GET ['id'] )) {
    $brex_units = brex_unit::finderParNumero ( $_GET ['id'] );
    if (count ( $brex_units ) > 0) {
      $unit = new Unit ( $brex_units [0] );
      echo json_encode ( $unit, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 404 );
    }
  } else {
    $brex_units = brex_unit::finderForCalculator ();
    $units = array ();
    if (count ( $brex_units ) > 0) {
      foreach ( $brex_units as $brex_unit ) {
        $unit = new Unit ( $brex_unit );
        $units [] = $unit;
      }
    }
    echo json_encode ( $units, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  }
}
?>