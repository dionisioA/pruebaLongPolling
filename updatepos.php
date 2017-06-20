<?php

$stock = ("bdposicion.txt");


if($_POST)
{
	update();
}

function update()
 {
	
	global $stock;
	$count = file($stock);
	$count = $_POST['id'];
	$count .= "\n";
	$count .= $_POST['pos1'];
	$count .= "\n";
	$count .= $_POST['pos2'];
	$fp = fopen($stock , "w");
	fputs($fp , "$count");
	fclose($fp);

	//echo $count;		
	
	 
	$GLOBALS['posA']= (real)$_POST['pos1'];
	$result = array('name' => $GLOBALS['posA']);
	$json = json_encode($result);
	echo $json;
 }


?>