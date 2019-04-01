<?php

    class Ad_query {

        private $conn;
        private $table_name = "ad_query";

        public $id;
        public $url;
        public $description;

        public function __construct($db) {
            $this->conn = $db;
        }

        private function sanitize($par) {
            return htmlspecialchars(strip_tags($par));
        }



        public function create($description, $url) {
            $this->url = $url;
            $this->description = $description;

            try{
                $query = "INSERT INTO ad_query (description, url)
                    VALUES (:description, :url)
                        ";

                $stmt = $this->conn->prepare($query);

                // $url = sanitize($this->url);
                // $description = sanitize($this->description);

                $url = $this->url;
                $description = $this->description;


                $stmt->bindParam(':url', $url);
                $stmt->bindParam(':description', $description);

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
            $query = "SELECT id, url, description
                      FROM ad_query";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $ads_query = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($ads_query as $key => $value) {
                $ads_query_to_json[$key] = $value;
            }

            return json_encode($ads_query_to_json);

        }






    }



?>
