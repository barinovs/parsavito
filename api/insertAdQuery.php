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
    include_once '../objects/ad_query.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $ad_query = new Ad_query($db);

    $description = 'description test from react';
    $url = 'url test from react';

    //$_POST = json_decode(file_get_contents('php://input'), true);

    if(isset($_POST['description']))
        if(!empty($_POST['description']))
            $description = $_POST['description'];

    if(isset($_POST['adQueryURL']))
        if(!empty($_POST['adQueryURL']))
            $adQueryURL = $_POST['adQueryURL'];

    // var_dump($_POST['description']);
    if(isset($_POST['adQueryURL']))
        echo $_POST['adQueryURL'];
    else echo "нет такой переменной";

    // echo $_POST['description'] . ' ' . $_POST['adQueryURL'];

    $ad_query->create($description, $adQueryURL);

?>
