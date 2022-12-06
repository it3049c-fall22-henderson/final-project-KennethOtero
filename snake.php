<?php
//myform Data
$player_name = $_POST = filter_var ($_POST[player_name], FILTER_SANITIZE_STRING);
$player_score = (int) $_POST[player_score];

//PHP Associative Array
$player_array = array("name"=>$player_name, "score"=> $player_score);

//read scores.JSON and put into associative array
$highscoresJSON = file_get_contents("scores.json");
$highscore_array = json_decode($highscoresJSON, true);

//declare variables
$key = 0;
$highscores = array();

//player made High Scores list
if ($player_score > $highscore_array[9][score]) {
    foreach($highscore_array as $k => $value) {
        var_dump($value);
        $score = $value[score];

        //If highscore is higher than players score
        if ($score >= $player_score){
            $key = $k;
            $highscores[$k] = $player_array;
            for ($i = $key; $i < 9; i++) {
                $highscores[$i + 1] = $highscore_array[$1];
            }
            break;

        }
    }
}
