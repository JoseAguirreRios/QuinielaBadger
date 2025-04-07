<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('includes/config.php');

// Si el usuario ya está autenticado, redirigir a index
if (estaAutenticado()) {
    redireccionar('index.php');
}

$error = '';
$exito = '';

// Procesar formulario de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'login') {
        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        
        if (empty($username) || empty($password)) {
            $error = 'Por favor ingrese usuario y contraseña';
        } else {
            echo "Usuario intentando acceder: " . $username;
            $stmt = $link->prepare("SELECT * FROM usuarios WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            echo "Número de usuarios encontrados: " . $result->num_rows;
            
            $usuario = verificarUsuario($username, $password);
            
            if ($usuario) {
                // Iniciar sesión
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['nombre'] = $usuario['nombre'];
                $_SESSION['username'] = $usuario['username'];
                $_SESSION['es_admin'] = ($usuario['rol'] == 'admin');
                
                redireccionar('index.php');
            } else {
                $error = 'Usuario o contraseña incorrectos';
            }
        }
    }
    // Procesar formulario de registro
    elseif (isset($_POST['action']) && $_POST['action'] === 'registro') {
        $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';
        
        if (empty($nombre) || empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
            $error = 'Por favor complete todos los campos';
        } elseif ($password !== $confirm_password) {
            $error = 'Las contraseñas no coinciden';
        } else {
            $resultado = registrarUsuario($nombre, $username, $password, $email);
            
            if ($resultado) {
                $exito = 'Usuario registrado correctamente. Ahora puede iniciar sesión.';
            } else {
                $error = 'El usuario o correo ya existe en el sistema';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - <?php echo APP_NAME; ?></title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-container {
            max-width: 450px;
            margin: 100px auto;
        }
        .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card-header {
            background: linear-gradient(135deg, #007bff, #004ea0);
            color: white;
            text-align: center;
            border-radius: 10px 10px 0 0 !important;
            padding: 20px;
        }
        .logo-img {
            max-width: 200px;
            margin-bottom: 15px;
        }
        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
        }
        .btn-primary:hover {
            background-color: #0069d9;
            border-color: #0069d9;
        }
        .form-control:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
        }
    </style>
</head>
<body>
    <div class="container login-container">
        <div class="card">
            <div class="card-header">
                <img src="images/logo.png" alt="QuinielaBadger Logo" class="logo-img">
                <h3>Bienvenido a <?php echo APP_NAME; ?></h3>
            </div>
            <div class="card-body p-4">
                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger"><?php echo $error; ?></div>
                <?php endif; ?>
                
                <?php if (!empty($exito)): ?>
                    <div class="alert alert-success"><?php echo $exito; ?></div>
                <?php endif; ?>
                
                <!-- Tabs para Login/Registro -->
                <ul class="nav nav-tabs mb-4" id="authTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">
                            <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">
                            <i class="bi bi-person-plus"></i> Registrarse
                        </button>
                    </li>
                </ul>
                
                <div class="tab-content" id="authTabsContent">
                    <!-- Formulario de Login -->
                    <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                        <form method="post" action="login.php">
                            <input type="hidden" name="action" value="login">
                            
                            <div class="mb-3">
                                <label for="username" class="form-label">Nombre de usuario</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                                    <input type="text" class="form-control" id="username" name="username" placeholder="Ingrese su usuario" required>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                    <input type="password" class="form-control" id="password" name="password" placeholder="Ingrese su contraseña" required>
                                </div>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="remember">
                                <label class="form-check-label" for="remember">Recordarme</label>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Formulario de Registro -->
                    <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                        <form method="post" action="login.php">
                            <input type="hidden" name="action" value="registro">
                            
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre completo</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese su nombre completo" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="reg-username" class="form-label">Nombre de usuario</label>
                                <input type="text" class="form-control" id="reg-username" name="username" placeholder="Elija un nombre de usuario" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Ingrese su correo electrónico" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="reg-password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="reg-password" name="password" placeholder="Elija una contraseña" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="confirm_password" class="form-label">Confirmar contraseña</label>
                                <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Confirme su contraseña" required>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-person-plus"></i> Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 