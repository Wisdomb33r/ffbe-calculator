<?php
require_once "../../gestion/genscripts/object_brex_build_passif.class.php";
require_once "../../gestion/genscripts/brex_objet_extended.class.php";
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
    if ($brex_objet = brex_objet::findByPrimaryId ( $_GET ['id'] )) {
      $equipment = new Equipment ( $brex_objet, $language );
      echo json_encode ( $equipment, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 404 );
    }
  } else if (isset ( $_GET ['weapon'] ) && is_numeric ( $_GET ['weapon'] )) {
    $weapon_category = $_GET ['weapon'];
    $categories = array (62);
    $objects = brex_objet_extended::finderByCategoriesForCalculator ( $categories );
    
    if ($weapon_category == '1' || $weapon_category == '27' || $weapon_category == '28' || $weapon_category == '32' || $weapon_category == '18') {
      $objects [] = brex_objet::findByPrimaryId ( 2318 ); // swords, great swords, katanas, spears
    }
    if ($weapon_category == '17') {
      $objects [] = brex_objet::findByPrimaryId ( 2683 ); // staves
    }
    if ($weapon_category == '2') {
      $objects [] = brex_objet::findByPrimaryId ( 2319 ); // rods
    }
    if ($weapon_category == '6') {
      $objects [] = brex_objet::findByPrimaryId ( 2620 ); // bows
    }
    if ($weapon_category == '13') {
      $objects [] = brex_objet::findByPrimaryId ( 2694 ); // hammers
    }
    if ($weapon_category == '34') {
      $objects [] = brex_objet::findByPrimaryId ( 2463 ); // whips
    }
    if ($weapon_category == '24') {
      $objects [] = brex_objet::findByPrimaryId ( 2464 ); // throwing weapons
    }
    if ($weapon_category == '15' || $weapon_category == '29') {
      $objects [] = brex_objet::findByPrimaryId ( 2320 ); // guns and axes
    }
    if ($weapon_category == '26') {
      $objects [] = brex_objet::findByPrimaryId ( 2621 ); // maces
    }
    
    $equipments = array ();
    foreach ( $objects as $object ) {
      $equipments [] = new Equipment ( $object, $language );
    }
    
    echo json_encode ( $equipments, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else if (isset ( $_GET ['category'] ) && isset ( $_GET ['unit'] )) {
    $units = brex_unit::finderParNumero ( $_GET ['unit'] );
    $unit = null;
    if (count ( $units )) {
      $unit = $units [0];
    } else {
      http_response_code ( 404 );
      die ();
    }
    
    $categories = array ();
    if ($_GET ['category'] == 'right_hand') {
      $categories = array (16, 1, 27, 28, 17, 2, 6, 29, 13, 32, 33, 34, 24, 15, 26, 18);
    }
    if ($_GET ['category'] == 'left_hand') {
      $categories = array (16, 1, 27, 28, 17, 2, 6, 29, 13, 32, 33, 34, 24, 15, 26, 18, 9, 10);
    }
    if ($_GET ['category'] == 'head') {
      $categories = array (12, 11);
    }
    if ($_GET ['category'] == 'body') {
      $categories = array (35, 8, 7, 14);
    }
    if ($_GET ['category'] == 'accessory1' || $_GET ['category'] == 'accessory2') {
      $categories = array (25);
    }
    if ($_GET ['category'] == 'materia1' || $_GET ['category'] == 'materia2' || $_GET ['category'] == 'materia3' || $_GET ['category'] == 'materia4') {
      $categories = array (57);
    }
    $unit_categories = $unit->perso->relationNMequipement;
    $unit_categories [] = 57; // materias category is not listed in unit equipment types
    $intersecting_categories = array_intersect ( $categories, $unit_categories );
    if (! count ( $intersecting_categories )) {
      dieWithError ( 500, 'Unexpected error, unit equipments does not intersect with requested categories' );
    }
    
    $objects = brex_objet_extended::finderByCategoriesForCalculator ( $intersecting_categories );
    $equipments = array ();
    foreach ( $objects as $object ) {
      $equipments [] = new Equipment ( $object, $language );
    }
    echo json_encode ( $equipments, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else {
    dieWithError ( 400, 'Bad request, no identifier nor category' );
  }
}
?>