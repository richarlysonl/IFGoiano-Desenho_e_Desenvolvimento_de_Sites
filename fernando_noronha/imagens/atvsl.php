<?php
function val_func($vetor1,$vetor2,$vetor3) {
    for ($i = 0; $i < 10; $i++) {
    $vetor1[$i]=$i+1;
    if (($i + 1) % 2 == 0) {
        $vetor2[] = $i + 1;
    } else {
        $vetor3[] = $i + 1;
    }
    }
    for ($i = 0; $i < 10; $i++){
        print("$vetor1[$i]\n");
    }
    for ($i = 0; $i < 5; $i++){
        print("impares: $vetor3[$i]\n");
        print("pares: $vetor2[$i]\n");
    }
}
$vetor1=array();
$vetor2=array();
$vetor3=array();
val_func($vetor1,$vetor2,$vetor3);