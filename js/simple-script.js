// Script simplificado para QuinielaBadger sin módulos ES6
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuinielaBadger inicializando...');
    
    // Estado de la aplicación
    const state = {
        currentSection: 'inicio',
        isLoggedIn: false,
        isAdmin: false
    };
    
    // Datos simulados de usuarios
    const usuariosRegistrados = [
        { username: 'Carlos Ramírez', password: 'carlos123' },
        { username: 'Ana González', password: 'ana123' },
        { username: 'Roberto Méndez', password: 'roberto123' },
        { username: 'Laura Torres', password: 'laura123' },
        { username: 'Miguel Ángel Pérez', password: 'miguel123' },
        { username: 'José García', password: 'jose123' },
        { username: 'María Rodríguez', password: 'maria123' },
        { username: 'Juan López', password: 'juan123' },
        { username: 'AdminBadger', password: 'AdminBadger2025' }
    ];
    
    // Lista de quinielas
    const quinielas = [];
    
    // Referencias a elementos del DOM
    const sections = document.querySelectorAll('.section-content');
    console.log('Secciones encontradas:', sections.length);
    
    const navLinks = document.querySelectorAll('.nav-link');
    const adminOnlyItems = document.querySelectorAll('.admin-only');
    const userLoggedItems = document.querySelectorAll('.user-logged');
    const navRegistro = document.getElementById('nav-registro');
    const navLogin = document.getElementById('nav-login');
    const loginForm = document.getElementById('login-form');
    const registroForm = document.getElementById('registro-form');
    
    // Inicialización del sidebar
    const sidebar = document.getElementById('sidebarMenu');
    const mainContent = document.querySelector('main');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Función para cambiar entre secciones
    function showSection(sectionId) {
        console.log('Mostrando sección:', sectionId);
        
        if (!sections || sections.length === 0) {
            console.error('Las secciones no están correctamente inicializadas');
            return;
        }
        
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('d-none');
        });
        
        // Mostrar la sección seleccionada
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.remove('d-none');
            state.currentSection = sectionId;
            
            // Actualizar URL sin recargar la página
            window.history.replaceState(null, '', '#' + sectionId);
            
            console.log('Sección mostrada correctamente:', sectionId);
        } else {
            console.error('No se encontró la sección con ID:', sectionId);
        }
        
        // Actualizar enlaces de navegación
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Inicializar cambio de secciones en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            console.log('Clic en enlace de navegación:', sectionId);
            showSection(sectionId);
        });
    });
    
    // Inicializar enlaces para cambiar secciones dentro del contenido
    const changeSectionLinks = document.querySelectorAll('.change-section');
    changeSectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            console.log('Clic en enlace interno:', sectionId);
            showSection(sectionId);
        });
    });
    
    // Función para el manejo del sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        // Guardar estado en localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
    }
    
    // Configurar el botón del sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Restaurar estado del sidebar
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'collapsed') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('sidebar-collapsed');
    }
    
    // Función para manejar el inicio de sesión
    function handleLogin(username, password) {
        // Buscar el usuario
        const usuario = usuariosRegistrados.find(user => user.username === username);
        
        if (usuario && usuario.password === password) {
            state.isLoggedIn = true;
            
            // Verificar si es administrador
            if (username === 'AdminBadger') {
                state.isAdmin = true;
                
                // Mostrar elementos de administrador
                adminOnlyItems.forEach(item => {
                    item.classList.remove('d-none');
                });
                
                alert('¡Bienvenido Administrador!');
            } else {
                state.isAdmin = false;
                alert('¡Bienvenido ' + username + '!');
            }
            
            // Actualizar interfaz
            navRegistro.classList.add('d-none');
            navLogin.classList.add('d-none');
            userLoggedItems.forEach(item => {
                item.classList.remove('d-none');
            });
            
            showSection('inicio');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }
    
    // Configurar el formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-usuario').value;
            const password = document.getElementById('login-password').value;
            handleLogin(username, password);
        });
    }
    
    // Configurar el formulario de registro
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const usuario = document.getElementById('usuario').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById('telefono').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validar contraseñas
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Verificar usuario existente
            if (usuariosRegistrados.some(user => user.username === usuario)) {
                alert('Este nombre de usuario ya está registrado. Por favor, elija otro.');
                return;
            }
            
            // Añadir usuario
            usuariosRegistrados.push({
                username: usuario,
                password: password,
                nombre: nombre,
                correo: correo,
                telefono: telefono
            });
            
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            registroForm.reset();
            showSection('iniciar-sesion');
        });
    }
    
    // Manejar cierre de sesión
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            state.isLoggedIn = false;
            state.isAdmin = false;
            
            adminOnlyItems.forEach(item => {
                item.classList.add('d-none');
            });
            
            userLoggedItems.forEach(item => {
                item.classList.add('d-none');
            });
            
            navRegistro.classList.remove('d-none');
            navLogin.classList.remove('d-none');
            
            showSection('inicio');
            alert('Has cerrado sesión correctamente');
        });
    }
    
    // Función para manejar cambios de hash en la URL
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.substring(1);
            showSection(sectionId);
        } else {
            showSection('inicio');
        }
    }
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Verificar hash inicial
    handleHashChange();
    
    console.log('QuinielaBadger inicializado correctamente');
}); 