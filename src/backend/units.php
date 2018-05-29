<?php
require_once "../../gestion/genscripts/object_brex_unit_comp.class.php";
require_once "../../gestion/genscripts/object_brex_unit_carac.class.php";
require_once "../../gestion/genscripts/object_brex_stuff_comp.class.php";
require_once "../../gestion/genscripts/object_brex_build_passif.class.php";
require_once "../../gestion/genscripts/object_brex_calculator_count.class.php";
require_once "classes.php";
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
    
    $values = array ();
    $values ['creation_datedate'] = date ( 'Y-m-d' );
    $values ['creation_datehour'] = date ( 'H' );
    $values ['creation_datemins'] = date ( 'i' );
    $values ['nom'] = 'unit';
    $values ['identity'] = $_GET ['id'];
    $brex_calculator_count = new brex_calculator_count ( $values );
    $brex_calculator_count->store ();
    
    $brex_unit_stats = brex_unit_carac::findByRelation1N ( array ('unit' => $brex_unit->id) );
    if (! count ( $brex_unit_stats )) {
      dieWithError ( 500, 'Unit checks failed, stats not found' );
    }
    
    $brex_builds = brex_perso_stuff::findByRelation1N ( array ('unit' => $brex_unit->id) );
    if (! count ( $brex_builds )) {
      dieWithError ( 500, 'Unit checks failed, build not found' );
    } else {
      $builds = array ();
      foreach ( $brex_builds as $brex_build ) {
        if ($brex_build->algorithm != null) {
          $builds [] = $brex_build->id;
        }
      }
      if (! count ( $builds )) {
        dieWithError ( 500, 'Unit checks failed, no build with algorithm for specified unit' );
      }
    }
    
    $brex_unit_passives = brex_build_passif::findByRelation1N ( array ('unit' => $brex_unit->id) );
    
    $unit = new Unit ( $brex_unit, $brex_unit_stats [0], $brex_unit_passives, $brex_builds, $language );
    echo json_encode ( $unit, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else {
    $brex_units = brex_unit::finderForCalculator ();
    $units = array ();
    if (count ( $brex_units ) > 0) {
      foreach ( $brex_units as $brex_unit ) {
        $unit = new Unit ( $brex_unit, null, null, null, $language );
        $units [] = $unit;
      }
    }
    echo json_encode ( $units, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  }
}
?>