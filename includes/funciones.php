<?php
require_once('conexion.php');

/**
 * Función para obtener todas las quinielas disponibles
 * @return array Lista de quinielas
 */
function obtenerQuinielas() {
    global $link;
    $query = "SELECT * FROM quinielas ORDER BY fecha_inicio DESC";
    $result = $link->query($query);
    
    if ($result && $result->num_rows > 0) {
        return $result->fetch_all(MYSQLI_ASSOC);
    } else {
        return [];
    }
}

/**
 * Función para crear una nueva quiniela
 * @param string $nombre Nombre de la quiniela
 * @param string $fechaInicio Fecha de inicio (formato Y-m-d)
 * @param string $fechaFin Fecha fin (formato Y-m-d)
 * @param float $costo Costo de participación
 * @param string $premios JSON con la información de premios
 * @param string $reglas Reglas de la quiniela
 * @return bool True si se creó correctamente, False en caso contrario
 */
function crearQuiniela($nombre, $fechaInicio, $fechaFin, $costo, $premios, $reglas) {
    global $link;
    $query = "INSERT INTO quinielas (nombre, fecha_inicio, fecha_fin, costo, premios, reglas) 
              VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $link->prepare($query);
    $stmt->bind_param("sssdss", $nombre, $fechaInicio, $fechaFin, $costo, $premios, $reglas);
    return $stmt->execute();
}

/**
 * Función para guardar los partidos de una quiniela
 * @param int $quinielaId ID de la quiniela
 * @param array $partidos Array con la información de los partidos
 * @return bool True si se guardaron correctamente, False en caso contrario
 */
function guardarPartidos($quinielaId, $partidos) {
    global $link;
    
    // Primero eliminamos partidos existentes si los hay
    $delete = "DELETE FROM partidos WHERE quiniela_id = ?";
    $stmt = $link->prepare($delete);
    $stmt->bind_param("i", $quinielaId);
    $stmt->execute();
    
    // Insertamos los nuevos partidos
    $success = true;
    foreach ($partidos as $partido) {
        $query = "INSERT INTO partidos (quiniela_id, fecha, hora, local, visitante, liga) 
                  VALUES (?, ?, ?, ?, ?, ?)";
        
        $stmt = $link->prepare($query);
        $stmt->bind_param("isssss", $quinielaId, $partido['fecha'], $partido['hora'], 
                          $partido['local'], $partido['visitante'], $partido['liga']);
        
        if (!$stmt->execute()) {
            $success = false;
        }
    }
    
    return $success;
}

/**
 * Función para verificar credenciales de usuario
 * @param string $username Nombre de usuario
 * @param string $password Contraseña
 * @return array|bool Datos del usuario si es correcto, false si no
 */
function verificarUsuario($username, $password) {
    global $link;
    
    $query = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $link->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        // Verificar contraseña (usando password_verify en caso de passwords hasheados)
        if (password_verify($password, $usuario['password']) || $password === $usuario['password']) {
            return $usuario;
        }
    }
    
    return false;
}

/**
 * Función para registrar un nuevo usuario
 * @param string $nombre Nombre completo
 * @param string $username Nombre de usuario
 * @param string $password Contraseña (se recomienda hashear)
 * @param string $email Correo electrónico
 * @param bool $isAdmin Si es administrador o no
 * @return bool True si se registró correctamente, False en caso contrario
 */
function registrarUsuario($nombre, $username, $password, $email, $isAdmin = false) {
    global $link;
    
    // Verificar que el usuario no exista
    $check = "SELECT * FROM usuarios WHERE username = ? OR email = ?";
    $stmt = $link->prepare($check);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $result->num_rows > 0) {
        return false; // Usuario ya existe
    }
    
    // Registrar nuevo usuario
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $admin_rol = $isAdmin ? 'admin' : 'user';
    
    // Aseguramos que los campos coincidan con los de la tabla
    $query = "INSERT INTO usuarios (nombre, apellidos, username, password, email, rol) 
              VALUES (?, ?, ?, ?, ?, ?)";
    
    $apellidos = ""; // Valor por defecto para apellidos
    $stmt = $link->prepare($query);
    $stmt->bind_param("ssssss", $nombre, $apellidos, $username, $hashedPassword, $email, $admin_rol);
    return $stmt->execute();
}
?> 