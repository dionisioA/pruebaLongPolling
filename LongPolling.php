<?php

/**
 * Server-side file.
 * This file is an infinitive loop. Seriously.
 * It gets the file data.txt's last-changed timestamp, checks if this is larger than the timestamp of the
 * AJAX-submitted timestamp (time of last ajax request), and if so, it sends back a JSON with the data from
 * data.txt (and a timestamp). If not, it waits for one seconds and then start the next while step.
 *
 * Note: This returns a JSON, containing the content of data.txt and the timestamp of the last data.txt change.
 * This timestamp is used by the client's JavaScript for the next request, so THIS server-side script here only
 * serves new content after the last file change. Sounds weird, but try it out, you'll get into it really fast!
 */

// set php runtime to unlimited
//set_time_limit(0);

// where does the data come from ? In real world this would be a SQL query or something



$filename= dirname(__FILE__)."/bdposicion.txt";

$lastmodif = isset( $_GET['timestamp'])? $_GET['timestamp']: 0 ;
$currentmodif=filemtime($filename);


while ($currentmodif <= $lastmodif) {
  usleep(10000);
  clearstatcache();
  $currentmodif =filemtime($filename);
 }
 
 
 
$data = file_get_contents($filename);
	
$count = file($filename);
$datId = $count[0];
$datLat= $count[1];
$datLng= $count[2];

	// put data.txt's content and timestamp of last data.txt change into array
$result = array(
	'id' => $datId,
	'lat' => $datLat,
	'lng' => $datLng,
	'timestamp' => $currentmodif
);

// encode to JSON, render the result (for AJAX)
$json = json_encode($result);
echo $json;


?>