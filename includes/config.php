<?php
// Configuración de la aplicación
session_start();

// Constantes de la aplicación
define('APP_NAME', 'QuinielaBadger');
define('APP_VERSION', '1.0.0');

// Zona horaria
date_default_timezone_set('America/Mexico_City');

// Configuración de errores (desactivar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivos necesarios
require_once('conexion.php');
require_once('funciones.php');

// Función para verificar si un usuario está autenticado
function estaAutenticado() {
    return isset($_SESSION['usuario_id']);
}

// Función para verificar si un usuario es administrador
function esAdmin() {
    return isset($_SESSION['es_admin']) && $_SESSION['es_admin'] === true;
}

// Función para redireccionar
function redireccionar($url) {
    header("Location: $url");
    exit;
}
?> 