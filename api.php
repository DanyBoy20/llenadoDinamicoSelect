<?php
require_once("config.php");

$host = DB_HOST;
$user = DB_USER;
$pass = DB_PASS;
$dbname = DB_NAME;

$dsn = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8';
$opciones = array(PDO::ATTR_PERSISTENT => true, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$con = new PDO($dsn, $user, $pass, $opciones);

try {
	// $con = AbrirConexion();
	if(isset($_GET['id'])){
		$id = $_GET['id'];
		$sql = "SELECT * FROM contactoshospital WHERE idhospital = $id";
	}else{
		$sql = "SELECT * FROM hospitales";
	}

	$stmt = $con->prepare($sql);
	$stmt->execute();

	$resultSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($resultSet);
	
} catch (PDOException $e) {
	echo "Error " . $e->getMessage();	
}