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


  // $results = $ad->readAll();
  $results = $ad->getCities();

  // output in json format
  echo $results;
    // echo 'Проверка'


?>
