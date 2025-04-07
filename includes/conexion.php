<?php
  $host_name = 'db5017612638.hosting-data.io';
  $database = 'dbu5523505';
  $user_name = 'dbu5523505';
  $password = 'Yare2903!8';

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    die('<p>Error al conectar con servidor MySQL: '. $link->connect_error .'</p>');
  } else {
    // Establecer charset UTF-8 y collation
    $link->set_charset("utf8mb4");
    $link->query("SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'");
    
    echo '<p>Se ha establecido la conexión al servidor MySQL con éxito.</p>';
  }
?> 