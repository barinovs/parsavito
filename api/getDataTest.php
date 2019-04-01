<?php

   $host = "localhost";
   $db_name = "parsavitopy";
   $username = "root";
   $password = "";

   try{
       $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
   }catch(PDOException $exception){
       echo "Connection error: " . $exception->getMessage();
   }

   $query = "SELECT id, dateAdded, url, name, city, null as price, kpp, vin, mileage, enginePower, numberOfDoors, owners, conditionState, engineType, wheel, color, engineCapacity, model, yearIssue, bodyType, del
             FROM ads a ";

  $stmt = $conn->prepare($query);
  $stmt->execute();
  $ads = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $ads_to_json = array();

  foreach ($ads as $key => $value) {
    foreach ($value as $_key => $_value) {
      $ads_to_json[$key][$_key] = $_value;

      $queryPrices = "SELECT price, datechange FROM pricechanges WHERE url = '".$ads[$key]["url"]."'";
      $stmt = $conn -> prepare($queryPrices);
      $stmt -> execute();
      $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);



      $ads_to_json[$key]["prices"] = $prices;
    }
  };

 // $arr = array(
 //   "id" => "1",
 //   "prices" => array("0" => array("id" => 0, "price" => 500), "1" => array("id" => "1", "price" => 700))
 // );

 // var_dump($arr);
 //  var_dump($ads);

  // echo json_encode($ads);
  echo json_encode($ads_to_json);
