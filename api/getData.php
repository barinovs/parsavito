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

  $name = '%%';
  $city = '%%';
  $orderBy = 't.description';
  $orderType = 'desc';
  $limit = 500;
  $currentPage = 1;
  $ad_query_id = 1;
  $year_min = 1940;
  $year_max = 2020;
  $mileage_min = 1940;
  $mileage_max = 2020;

  if(isset($_GET['city']))
      if(!empty($_GET['city']))
          $city = '%' . $_GET['city'] . '%';

  if(isset($_GET['name']))
      if(!empty($_GET['name']))
          $name = '%' . $_GET['name'] . '%';

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

  if(isset($_GET['year_min']))
      if(!empty($_GET['year_min']))
          $year_min = intval($_GET['year_min']);

  if(isset($_GET['year_max']))
      if(!empty($_GET['year_max']))
          $year_max = intval($_GET['year_max']);

  if(isset($_GET['mileage_min']))
      if(!empty($_GET['mileage_min']))
          $mileage_min = intval($_GET['mileage_min']);

  if(isset($_GET['mileage_max']))
      if(!empty($_GET['mileage_max']))
          $mileage_max = intval($_GET['mileage_max']);

  // $results = $ad->readAll();
  // var_dump($_GET);
  $results = $ad->paginate($name, $city, $currentPage, $limit, $orderBy, $orderType, $ad_query_id, $year_min, $year_max, $mileage_min, $mileage_max);

  // output in json format
    echo $results;
    // echo 'Проверка'


?>
