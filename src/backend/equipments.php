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
      header ( 'Content-Type: application/json' );
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
    if ($weapon_category == '27' || $weapon_category == '28') {
      $objects [] = brex_objet::findByPrimaryId ( 2950 ); // great swords, katanas
    }
    if ($weapon_category == '17') { // staves
      $objects [] = brex_objet::findByPrimaryId ( 2683 );
      $objects [] = brex_objet::findByPrimaryId ( 3081 );
    }
    if ($weapon_category == '2') { // rods
      $objects [] = brex_objet::findByPrimaryId ( 2319 );
      $objects [] = brex_objet::findByPrimaryId ( 3080 );
    }
    if ($weapon_category == '6') {
      $objects [] = brex_objet::findByPrimaryId ( 2620 ); // bows
    }
    if ($weapon_category == '13') {
      $objects [] = brex_objet::findByPrimaryId ( 2694 ); // hammers
    }
    if ($weapon_category == '33') {
      $objects [] = brex_objet::findByPrimaryId ( 2791 ); // harps
    }
    if ($weapon_category == '34') { // whips
      $objects [] = brex_objet::findByPrimaryId ( 2463 );
      $objects [] = brex_objet::findByPrimaryId ( 3082 );
    }
    if ($weapon_category == '24') { // throwing weapons
      $objects [] = brex_objet::findByPrimaryId ( 2464 );
      $objects [] = brex_objet::findByPrimaryId ( 2951 );
    }
    if ($weapon_category == '15' || $weapon_category == '29') {
      $objects [] = brex_objet::findByPrimaryId ( 2320 ); // guns and axes
    }
    if ($weapon_category == '15') {
      $objects [] = brex_objet::findByPrimaryId ( 2952 ); // guns
    }
    if ($weapon_category == '26') { // maces
      $objects [] = brex_objet::findByPrimaryId ( 2621 );
      $objects [] = brex_objet::findByPrimaryId ( 2953 );
    }
    
    $equipments = array ();
    foreach ( $objects as $object ) {
      $equipments [] = new Equipment ( $object, $language );
    }
    
    header ( 'Content-Type: application/json' );
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
    
    // extra categories from equip_XXX
    if (isset ( $_GET ['addedTypes'] )) {
      $splittedTypes = explode ( '-', $_GET ['addedTypes'] );
      if (count ( $splittedTypes )) {
        foreach ( $splittedTypes as $addded_category ) {
          if ($_GET ['category'] == 'right_hand' && in_array ( $addded_category, array (16, 1, 27, 28, 17, 2, 6, 29, 13, 32, 33, 34, 24, 15, 26, 18) )) {
            $intersecting_categories [] = $addded_category;
          }
          if ($_GET ['category'] == 'left_hand' && in_array ( $addded_category, array (16, 1, 27, 28, 17, 2, 6, 29, 13, 32, 33, 34, 24, 15, 26, 18, 9, 10) )) {
            $intersecting_categories [] = $addded_category;
          }
          if ($_GET ['category'] == 'head' && in_array ( $addded_category, array (12, 11) )) {
            $intersecting_categories [] = $addded_category;
          }
          if ($_GET ['category'] == 'body' && in_array ( $addded_category, array (35, 8, 7, 14) )) {
            $intersecting_categories [] = $addded_category;
          }
        }
      }
    }
    
    if (! count ( $intersecting_categories )) {
      dieWithError ( 500, 'Unexpected error, unit equipments does not intersect with requested categories' );
    }
    
    $objects = brex_objet_extended::finderByCategoriesForCalculator ( $intersecting_categories );
    
    // Sora exclusive weapon
    if (($_GET ['category'] == 'right_hand' || $_GET ['category'] == 'left_hand') && $unit->numero == 1507) {
      $objects [] = brex_objet::findByPrimaryId ( 2925 );
    }
    
    $equipments = array ();
    foreach ( $objects as $object ) {
      $equipments [] = new Equipment ( $object, $language );
    }
    
    header ( 'Content-Type: application/json' );
    echo json_encode ( $equipments, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
  } else {
    dieWithError ( 400, 'Bad request, no identifier nor category' );
  }
}
?>