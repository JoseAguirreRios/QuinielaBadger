<?php
require_once('includes/config.php');

// Verificar si el usuario está autenticado
if (!estaAutenticado()) {
    redireccionar('login.php');
}

// Obtener lista de quinielas para mostrar
$quinielas = obtenerQuinielas();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Principal - <?php echo APP_NAME; ?></title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        /* Estilos inline para evitar problemas de carga */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
        }

        /* Estilos para el sidebar */
        .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            padding: 48px 0 0;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            width: 250px;
            background-color: #343a40;
            overflow-x: hidden;
            white-space: nowrap;
        }

        .sidebar.collapsed {
            width: 60px;
        }

        .sidebar.collapsed .nav-link span,
        .sidebar.collapsed h2,
        .sidebar.collapsed .logo-sidebar {
            display: none;
        }

        .sidebar.collapsed .nav-link i {
            margin-right: 0;
            min-width: auto;
        }

        /* Estilos para el botón de hamburguesa */
        .navbar-toggler {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1050;
            padding: 0.5rem;
            font-size: 1.25rem;
            border: none;
            background: transparent;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
        }

        .navbar-toggler:hover {
            color: #007bff;
        }

        .navbar-toggler:focus {
            outline: none;
            box-shadow: none;
        }

        /* Ajustes para el contenido principal */
        main {
            transition: margin-left 0.3s ease-in-out;
            margin-left: 250px;
        }

        main.sidebar-collapsed {
            margin-left: 60px;
        }

        .sidebar .nav-link {
            padding: 12px 20px;
            margin: 5px 0;
            border-radius: 0 30px 30px 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            white-space: nowrap;
            color: white !important;
            cursor: pointer !important;
        }

        .sidebar .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
            color: #17a2b8 !important;
            transform: translateX(5px);
        }

        .sidebar .nav-link.active {
            background-color: #007bff;
            color: white !important;
        }

        .sidebar .nav-link i {
            min-width: 30px;
            font-size: 1.25rem;
            text-align: center;
            transition: margin 0.3s;
        }

        .sidebar .nav-link span {
            opacity: 1;
            transition: opacity 0.3s;
        }

        /* Mejoras para la barra lateral en modo móvil */
        @media (max-width: 768px) {
            .sidebar {
                width: 250px !important;
                transform: translateX(-250px);
                transition: transform 0.3s ease-in-out !important;
                z-index: 1050 !important;
            }
            
            .sidebar.expanded {
                transform: translateX(0) !important;
            }
            
            .navbar-toggler {
                z-index: 1060 !important;
            }
            
            main {
                margin-left: 0 !important;
                width: 100% !important;
            }
        }
        
        /* Estilos adicionales para secciones */
        .section-content {
            padding: 20px 0;
            animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .jumbotron {
            background: linear-gradient(135deg, #007bff, #004ea0);
            border-radius: 15px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 20px;
        }

        .logo-sidebar {
            max-width: 150px;
        }

        .user-greeting {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 10px 15px;
            border-radius: 5px;
            margin: 10px 15px 20px;
            color: white;
            font-size: 0.9rem;
        }

        .badge-admin {
            background-color: #dc3545;
            color: white;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.7rem;
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar/Menú lateral -->
            <div class="col-auto p-0">
                <div class="sidebar" id="sidebarMenu">
                    <!-- Botón de hamburguesa -->
                    <button class="navbar-toggler" type="button" id="sidebarToggle">
                        <i class="bi bi-list"></i>
                    </button>
                    
                    <div class="position-sticky pt-3">
                        <div class="text-center mb-4">
                            <img src="images/logo.png" alt="QuinielaBadger Logo" class="logo-img logo-sidebar">
                        </div>

                        <!-- Información del usuario -->
                        <div class="user-greeting">
                            <i class="bi bi-person-circle"></i> Hola, <?php echo $_SESSION['nombre']; ?>
                            <?php if (esAdmin()): ?>
                                <span class="badge-admin">Admin</span>
                            <?php endif; ?>
                        </div>

                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link active text-white" aria-current="page" href="#inicio">
                                    <i class="bi bi-house-door"></i>
                                    <span>Inicio</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#quinielas">
                                    <i class="bi bi-trophy"></i>
                                    <span>Mis Quinielas</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#participar">
                                    <i class="bi bi-controller"></i>
                                    <span>Participar</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#resultados">
                                    <i class="bi bi-list-check"></i>
                                    <span>Resultados</span>
                                </a>
                            </li>
                            
                            <?php if (esAdmin()): ?>
                            <!-- Opciones solo para administradores -->
                            <li class="nav-item mt-3">
                                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <span>Administración</span>
                                </h6>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#tesoreria">
                                    <i class="bi bi-cash-coin"></i>
                                    <span>Tesorería</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#crear-quiniela">
                                    <i class="bi bi-plus-circle"></i>
                                    <span>Crear Quiniela</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#admin-quinielas">
                                    <i class="bi bi-clipboard-data"></i>
                                    <span>Gestionar Quinielas</span>
                                </a>
                            </li>
                            <?php endif; ?>
                            
                            <li class="nav-item mt-5">
                                <a class="nav-link text-white" href="logout.php">
                                    <i class="bi bi-box-arrow-right"></i>
                                    <span>Cerrar Sesión</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Contenido principal -->
            <main class="col py-3" id="mainContent">
                <!-- Sección de inicio -->
                <section id="inicio" class="section-content">
                    <div class="container">
                        <div class="jumbotron text-white p-4 mb-4">
                            <h1>Bienvenido a QuinielaBadger</h1>
                            <p class="lead">El sistema de quinielas deportivas más completo y fácil de usar.</p>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Quinielas Activas</h5>
                                        <?php if (empty($quinielas)): ?>
                                            <div class="alert alert-info">
                                                No hay quinielas activas en este momento.
                                            </div>
                                        <?php else: ?>
                                            <div class="table-responsive">
                                                <table class="table table-hover table-striped">
                                                    <thead class="table-primary">
                                                        <tr>
                                                            <th>Nombre</th>
                                                            <th>Fecha Inicio</th>
                                                            <th>Fecha Fin</th>
                                                            <th>Costo</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <?php foreach ($quinielas as $quiniela): ?>
                                                            <tr>
                                                                <td><?php echo $quiniela['nombre']; ?></td>
                                                                <td><?php echo date('d/m/Y', strtotime($quiniela['fecha_inicio'])); ?></td>
                                                                <td><?php echo date('d/m/Y', strtotime($quiniela['fecha_fin'])); ?></td>
                                                                <td>$<?php echo number_format($quiniela['costo'], 2); ?></td>
                                                                <td>
                                                                    <a href="participar.php?id=<?php echo $quiniela['id']; ?>" class="btn btn-sm btn-primary">
                                                                        <i class="bi bi-pencil-square"></i> Participar
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        <?php endforeach; ?>
                                                    </tbody>
                                                </table>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Otras secciones se cargarán dinámicamente -->
            </main>
        </div>
    </div>
    
    <!-- Scripts de Bootstrap y jQuery -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Manejar el toggle del sidebar
            const sidebarToggle = document.getElementById('sidebarToggle');
            const sidebar = document.getElementById('sidebarMenu');
            const mainContent = document.getElementById('mainContent');
            
            sidebarToggle.addEventListener('click', function() {
                if (window.innerWidth > 768) {
                    sidebar.classList.toggle('collapsed');
                    mainContent.classList.toggle('sidebar-collapsed');
                } else {
                    sidebar.classList.toggle('expanded');
                }
            });
            
            // Gestionar navegación del menú
            const navLinks = document.querySelectorAll('.sidebar .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === 'logout.php') {
                        return; // Permitir la redirección normal para logout
                    }
                    
                    e.preventDefault();
                    navLinks.forEach(lnk => lnk.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Para implementación futura: cargar secciones dinámicamente
                    const targetSection = this.getAttribute('href').substring(1);
                    console.log('Navegando a:', targetSection);
                    
                    // En un móvil, cerrar el menú después de hacer clic
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('expanded');
                    }
                });
            });
        });
    </script>
</body>
</html> 