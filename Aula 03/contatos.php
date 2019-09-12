<?php

$out = '<ul>';

foreach($_POST as $campo => $valor) {
    $out .= "<li><b>{$campo}: </b>{$valor}</li>";
}

$out .= '</ul>';

echo $out;

?>