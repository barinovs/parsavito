<?php

class Ad {
    private $conn;
    private $table_name = "ads";

    public $id;
    public $dateAdded;
    public $url;
    public $name;
    public $city;
    public $price;
    public $kpp;
    public $vin;
    public $mileage;
    public $enginePower;
    public $numberOfDoors;
    public $owners;
    public $conditionState;
    public $engineType;
    public $wheel;
    public $color;
    public $engineCapacity;
    public $model;
    public $yearIssue;
    public $bodyType;
    public $del;

    public function __construct($db) {
        $this->conn = $db;
    }

    private function sanitize($par) {
        return htmlspecialchars(strip_tags($par));
    }

    public function create() {
        try{
            $query = "INSERT INTO ads
                SET dateAdded:      dateAdded,
                    url:            iurl,
                    name:           name,
                    city:           city,
                    price:          price,
                    kpp:            kpp,
                    vin:            vin,
                    mileage:        mileage,
                    enginePower:    enginePower,
                    numberOfDoors:  numberOfDoors,
                    owners:         owners,
                    conditionState: conditionState,
                    engineType:     engineType,
                    wheel:          wheel,
                    color:          color,
                    engineCapacity: engineCapacity,
                    model:          model,
                    yearIssue:      yearIssue,
                    bodyType:       bodyType,
                    del:            del
                    ";

            $stmt = $this->conn->prepare($query);

            $dateAdded = date('Y-m-d H:i:s');
            $url = sanitize($this->url);
            $name = sanitize($this->name);
            $city = sanitize($this->city);
            $price = sanitize($this->price);
            $kpp = sanitize($this->kpp);
            $vin = sanitize($this->vin);
            $mileage = sanitize($this->mileage);
            $enginePower = sanitize($this->enginePower);
            $numberOfDoors = sanitize($this->numberOfDoors);
            $owners = sanitize($this->owners);
            $conditionState = sanitize($this->conditionState);
            $engineType = sanitize($this->engineType);
            $wheel = sanitize($this->wheel);
            $color = sanitize($this->color);
            $engineCapacity = sanitize($this->engineCapacity);
            $model = sanitize($this->model);
            $yearIssue = sanitize($this->yearIssue);
            $bodyType = sanitize($this->bodyType);
            $del = sanitize($this->del);

            $stmt->bindParam(':dateAdded', $dateAdded);
            $stmt->bindParam(':url', $url);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':kpp', $kpp);
            $stmt->bindParam(':vin', $vin);
            $stmt->bindParam(':mileage', $mileage);
            $stmt->bindParam(':enginePower', $enginePower);
            $stmt->bindParam(':numberOfDoors', $numberOfDoors);
            $stmt->bindParam(':owners', $owners);
            $stmt->bindParam(':conditionState', $conditionState);
            $stmt->bindParam(':engineType', $engineType);
            $stmt->bindParam(':wheel', $wheel);
            $stmt->bindParam(':color', $color);
            $stmt->bindParam(':engineCapacity', $engineCapacity);
            $stmt->bindParam(':model', $model);
            $stmt->bindParam(':yearIssue', $yearIssue);
            $stmt->bindParam(':bodyType', $bodyType);
            $stmt->bindParam(':del', $del);

            $dateTask = date('Y-m-d H:i:s');
            $smtp->bindParam(':dateTask', $dateTask);

            if ($stmt->execute()) {
                return true;
            }else{
                return false;
            }
        }
        catch(PDOException $exception) {
            die('ERROR ' . $exception.getMessage());
        }
    }

    public function readAll() {
      $query = "SELECT id, dateAdded, url, name, city, kpp, vin, mileage, enginePower, numberOfDoors, owners, conditionState, engineType, wheel, color, engineCapacity, model, yearIssue, bodyType, del
                FROM ads a";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      $ads = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $urls = '';

      foreach ($ads as $key => $value) {
        foreach ($value as $_key => $_value) {
          $ads_to_json[$key][$_key] = $_value;

          $queryPrices = "SELECT DISTINCT price, datechange FROM pricechanges WHERE url = '".$ads[$key]["url"]."' ORDER BY datechange desc ";
          $stmt = $this->conn->prepare($queryPrices);
          $stmt -> execute();
          $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);

          $ads_to_json[$key]["prices"] = $prices;
        }
      };

      // var_dump($ads);die();
      // sleep(5);
      return json_encode($ads_to_json);
    }

    public function paginate($name, $city, $page, $limit, $orderBy, $orderType, $ad_query_id, $year_min, $year_max, $mileage_min, $mileage_max) {

        $ads_to_json = [];

        // Определение общего количества записей
        $query = "SELECT count(*) AS adsCount
                  FROM (SELECT *
                        FROM ads
                        WHERE ad_query_id = :ad_query_id
                            AND city LIKE :city
                            AND name LIKE :name
                            AND del='0'
                            AND yearIssue BETWEEN :year_min AND :year_max
                            AND mileage BETWEEN :mileage_min AND :mileage_max
                        ) AS x";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':ad_query_id', $ad_query_id);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':year_min', $year_min);
        $stmt->bindParam(':year_max', $year_max);
        $stmt->bindParam(':mileage_max', $mileage_max);
        $stmt->bindParam(':mileage_min', $mileage_min);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $adsCount = $result['adsCount'];

         // echo '$adsCount ' . strval($adsCount['adsCount']);


        $query = "SELECT ppp.price, a.id, dateAdded, a.url, name, city, kpp, vin, mileage, enginePower, numberOfDoors, owners, conditionState, engineType, wheel, color, engineCapacity, model, yearIssue, bodyType, del, phone_number
                  FROM ads a,
                  (SELECT p.url, p.price FROM pricechanges p
                  INNER JOIN (SELECT url, MAX(dateChange) AS maxDate
                              FROM pricechanges
                              GROUP BY url) pp ON pp.url = p.url AND p.dateChange = pp.maxDate ) ppp
                  WHERE ppp.url = a.url
                  AND ad_query_id = :ad_query_id
                  AND city LIKE :city
                  AND name LIKE :name
                  AND del='0'
                  AND yearIssue BETWEEN :year_min AND :year_max
                  AND mileage BETWEEN :mileage_min AND :mileage_max
                  ORDER BY " . $orderBy . " " . $orderType . "
                  LIMIT " . ($page - 1) * $limit . "," . $limit . "";


        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':ad_query_id', $ad_query_id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':year_min', $year_min);
        $stmt->bindParam(':year_max', $year_max);
        $stmt->bindParam(':mileage_max', $mileage_max);
        $stmt->bindParam(':mileage_min', $mileage_min);
        //$stmt->bindParam(':orderBy', $orderBy);
        // $stmt->bindParam(':orderType', $orderType);

        $stmt->execute();
        $ads = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $urls = '';

        // foreach ($ads as $key => $value) {
        //   foreach ($value as $_key => $_value) {
        //     $ads_to_json[$key][$_key] = $_value;
        //
        //     $queryPrices = "SELECT DISTINCT price, datechange FROM pricechanges WHERE url = '".$ads[$key]["url"]."' ORDER BY datechange desc ";
        //     $stmt = $this->conn->prepare($queryPrices);
        //     $stmt -> execute();
        //     $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //
        //     $ads_to_json[$key]["prices"] = $prices;
        //   }
        // };

        // var_dump($_GET);
        // echo '</br>';
        // echo 'where = ' . $where . '</br>';
        // echo 'page = ' . $page . '</br>';
        // echo $query . '</br>';
        //
        // echo "Количество строк: " . count($ads);
        $ads_to_json1["records"] = $ads;
        $ads_to_json1["recordCount"] = $adsCount;
        return json_encode($ads_to_json1);

    }


}




?>
