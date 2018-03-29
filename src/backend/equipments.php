<?php
require_once "../../gestion/genscripts/object_brex_build_passif.class.php";
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
      $equipment = new Equipment ( $brex_objet, $language, $brex_build_passives );
      echo json_encode ( $equipment, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    } else {
      http_response_code ( 404 );
    }
  } else {
    dieWithError ( 400, 'Bad request, no identifier nor category' );
  }
}
?>