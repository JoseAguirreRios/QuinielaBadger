<?php
// Archivo simple para probar la conexión a la base de datos
require_once('includes/conexion.php');

// Si ya se verificó la conexión en conexion.php, podemos mostrar detalles adicionales
echo '<h2>Prueba de conexión a MySQL completada</h2>';

// Mostrar información del servidor
echo '<h3>Información del servidor</h3>';
echo '<ul>';
echo '<li><strong>Nombre del servidor:</strong> ' . $link->host_info . '</li>';
echo '<li><strong>Versión del servidor:</strong> ' . $link->server_info . '</li>';
echo '<li><strong>Versión del protocolo:</strong> ' . $link->protocol_version . '</li>';
echo '<li><strong>Nombre de la base de datos:</strong> ' . $database . '</li>';
echo '<li><strong>Charset de la conexión:</strong> ' . $link->character_set_name() . '</li>';
echo '</ul>';

// Mostrar información sobre collation
$result = $link->query("SHOW VARIABLES LIKE 'collation_connection'");
$collation = $result->fetch_assoc();
echo '<h3>Información de Collation</h3>';
echo '<ul>';
echo '<li><strong>Collation de la conexión:</strong> ' . $collation['Value'] . '</li>';
echo '</ul>';

// Verificar si existen las tablas necesarias
$tablas_requeridas = ['usuarios', 'quinielas', 'partidos', 'participaciones'];
$tablas_faltantes = [];

foreach ($tablas_requeridas as $tabla) {
    $query = "SHOW TABLES LIKE '$tabla'";
    $result = $link->query($query);
    
    if ($result && $result->num_rows == 0) {
        $tablas_faltantes[] = $tabla;
    }
}

echo '<h3>Verificación de tablas</h3>';
if (empty($tablas_faltantes)) {
    echo '<p class="text-success">Todas las tablas necesarias existen en la base de datos.</p>';
} else {
    echo '<p class="text-warning">Las siguientes tablas no existen: ' . implode(', ', $tablas_faltantes) . '</p>';
    
    echo '<h4>Scripts para crear las tablas:</h4>';
    echo '<pre>';
    
    // Script para crear la tabla de usuarios
    if (in_array('usuarios', $tablas_faltantes)) {
        echo "-- Tabla de usuarios\n";
        echo "CREATE TABLE usuarios (\n";
        echo "  id INT AUTO_INCREMENT PRIMARY KEY,\n";
        echo "  nombre VARCHAR(100) NOT NULL,\n";
        echo "  username VARCHAR(50) NOT NULL UNIQUE,\n";
        echo "  password VARCHAR(255) NOT NULL,\n";
        echo "  email VARCHAR(100) NOT NULL UNIQUE,\n";
        echo "  is_admin TINYINT(1) DEFAULT 0,\n";
        echo "  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n";
        echo ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";
    }
    
    // Script para crear la tabla de quinielas
    if (in_array('quinielas', $tablas_faltantes)) {
        echo "-- Tabla de quinielas\n";
        echo "CREATE TABLE quinielas (\n";
        echo "  id INT AUTO_INCREMENT PRIMARY KEY,\n";
        echo "  nombre VARCHAR(100) NOT NULL,\n";
        echo "  fecha_inicio DATE NOT NULL,\n";
        echo "  fecha_fin DATE NOT NULL,\n";
        echo "  costo DECIMAL(10,2) NOT NULL,\n";
        echo "  premios TEXT NOT NULL,\n";
        echo "  reglas TEXT,\n";
        echo "  estado ENUM('activa', 'finalizada', 'cancelada') DEFAULT 'activa',\n";
        echo "  creado_por INT,\n";
        echo "  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n";
        echo "  FOREIGN KEY (creado_por) REFERENCES usuarios(id)\n";
        echo ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";
    }
    
    // Script para crear la tabla de partidos
    if (in_array('partidos', $tablas_faltantes)) {
        echo "-- Tabla de partidos\n";
        echo "CREATE TABLE partidos (\n";
        echo "  id INT AUTO_INCREMENT PRIMARY KEY,\n";
        echo "  quiniela_id INT NOT NULL,\n";
        echo "  fecha DATE NOT NULL,\n";
        echo "  hora TIME NOT NULL,\n";
        echo "  local VARCHAR(100) NOT NULL,\n";
        echo "  visitante VARCHAR(100) NOT NULL,\n";
        echo "  liga VARCHAR(100) DEFAULT 'Liga MX',\n";
        echo "  resultado_local INT,\n";
        echo "  resultado_visitante INT,\n";
        echo "  FOREIGN KEY (quiniela_id) REFERENCES quinielas(id) ON DELETE CASCADE\n";
        echo ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";
    }
    
    // Script para crear la tabla de participaciones
    if (in_array('participaciones', $tablas_faltantes)) {
        echo "-- Tabla de participaciones\n";
        echo "CREATE TABLE participaciones (\n";
        echo "  id INT AUTO_INCREMENT PRIMARY KEY,\n";
        echo "  quiniela_id INT NOT NULL,\n";
        echo "  usuario_id INT NOT NULL,\n";
        echo "  predicciones TEXT NOT NULL,\n";
        echo "  puntos INT DEFAULT 0,\n";
        echo "  posicion INT,\n";
        echo "  fecha_participacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n";
        echo "  FOREIGN KEY (quiniela_id) REFERENCES quinielas(id) ON DELETE CASCADE,\n";
        echo "  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,\n";
        echo "  UNIQUE KEY (quiniela_id, usuario_id)\n";
        echo ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n";
    }
    
    echo '</pre>';
}

// Cerrar la conexión al final
$link->close();
?> 