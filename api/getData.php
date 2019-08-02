<?php

    // Вывод заголовка с данными о кодировке страницы
    header('Content-Type: text/html; charset=utf-8');
    // Настройка локали
    setlocale(LC_ALL, 'ru_RU.65001', 'rus_RUS.65001', 'Russian_Russia. 65001', 'russian');
    // Настройка подключения к базе данных
    // mysql_query('SET names "utf8"');

  // include core configuration
  include_once '../config/core.php';

  // include database connection
  include_once '../config/database.php';

  // product object
  include_once '../objects/ad.php';

  // class instance
  $database = new Database();
  $db = $database->getConnection();
  $ad = new Ad($db);

  $city = '%%';
  $minPrice = 0;
  $maxPrice = 5000000;

  $orderBy = 't.description';
  $orderType = 'desc';
  $limit = 500;
  $currentPage = 1;
  $ad_query_id = 1;

  if(isset($_GET['city']))
      if(!empty($_GET['city']))
          $city = '%' . $_GET['city'] . '%';

  if(isset($_GET['minPrice']))
      if(!empty($_GET['minPrice']))
          $minPrice = $_GET['minPrice'];

  if(isset($_GET['maxPrice']))
      if(!empty($_GET['maxPrice']))
          $maxPrice = $_GET['maxPrice'];

  if(isset($_GET['order_by']))
      if(!empty($_GET['order_by']))
          $orderBy = $_GET['order_by'];

  if(isset($_GET['order_type']))
      if(!empty($_GET['order_type']))
          $orderType = $_GET['order_type'];

  if(isset($_GET['page']))
      if(!empty($_GET['page']))
          $currentPage = $_GET['page'];

  if(isset($_GET['item_per_page']))
      if(!empty($_GET['item_per_page']))
          $limit = $_GET['item_per_page'];

  if(isset($_GET['ad_query_id']))
      if(!empty($_GET['ad_query_id']))
          $ad_query_id = $_GET['ad_query_id'];

  // $results = $ad->readAll();
  $results = $ad->paginate($city, $minPrice, $maxPrice, $currentPage, $limit, $orderBy, $orderType, $ad_query_id);

  // output in json format
    echo $results;
    // echo 'Проверка'


?>
