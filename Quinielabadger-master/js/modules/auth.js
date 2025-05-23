// Auth Module - Gestión de autenticación y usuarios

import { state, updateState, findUserByUsername, userExists, addUser } from './data.js';

// Referencias a elementos del DOM
let adminOnlyItems;
let userLoggedItems;
let navRegistro;
let navLogin;
let loginForm;
let registroForm;
let usuariosList;

// Inicializar elementos del DOM cuando el documento esté listo
export function initAuth() {
    adminOnlyItems = document.querySelectorAll('.admin-only');
    userLoggedItems = document.querySelectorAll('.user-logged');
    navRegistro = document.getElementById('nav-registro');
    navLogin = document.getElementById('nav-login');
    loginForm = document.getElementById('login-form');
    registroForm = document.getElementById('registro-form');
    usuariosList = document.getElementById('usuarios-list');

    // Configurar los event listeners para el formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Configurar los event listeners para el formulario de registro
    if (registroForm) {
        registroForm.addEventListener('submit', handleRegistroSubmit);
    }

    // Configurar el evento de cierre de sesión
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Función para manejar el envío del formulario de inicio de sesión
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-usuario').value;
    const password = document.getElementById('login-password').value;
    
    handleLogin(username, password);
}

// Función para manejar el proceso de inicio de sesión
export function handleLogin(username, password) {
    // Buscar el usuario en la lista de usuarios registrados
    const usuario = findUserByUsername(username);
    
    // Verificar si el usuario existe y la contraseña es correcta
    if (usuario && usuario.password === password) {
        updateState('isLoggedIn', true);
        
        // Verificar si es administrador
        if (username === 'AdminBadger') {
            updateState('isAdmin', true);
            
            // Mostrar elementos de administrador
            adminOnlyItems.forEach(item => {
                item.classList.remove('d-none');
            });
            
            alert('¡Bienvenido Administrador!');
        } else {
            updateState('isAdmin', false);
            alert('¡Bienvenido ' + username + '!');
        }
        
        // Actualizar interfaz para usuario logueado
        navRegistro.classList.add('d-none');
        navLogin.classList.add('d-none');
        userLoggedItems.forEach(item => {
            item.classList.remove('d-none');
        });
        
        // Redirigir al inicio (importar desde módulo de navegación)
        import('./navigation.js').then(module => {
            module.showSection('inicio');
        });
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Función para manejar el envío del formulario de registro
function handleRegistroSubmit(e) {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // Verificar si el usuario ya existe
    if (userExists(usuario)) {
        alert('Este nombre de usuario ya está registrado. Por favor, elija otro.');
        return;
    }
    
    // Añadir el nuevo usuario
    const userData = {
        username: usuario,
        password: password,
        nombre: nombre,
        correo: correo,
        telefono: telefono
    };
    
    addUser(userData);
    
    // Si tenemos un datalist para usuarios, actualizar
    if (usuariosList) {
        const option = document.createElement('option');
        option.value = usuario;
        usuariosList.appendChild(option);
    }
    
    // Simular registro exitoso
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    
    // Limpiar el formulario
    registroForm.reset();
    
    // Redirigir a la página de inicio de sesión
    import('./navigation.js').then(module => {
        module.showSection('iniciar-sesion');
    });
}

// Función para manejar el cierre de sesión
function handleLogout(e) {
    e.preventDefault();
    
    // Reiniciar estado
    updateState('isLoggedIn', false);
    updateState('isAdmin', false);
    
    // Actualizar interfaz
    adminOnlyItems.forEach(item => {
        item.classList.add('d-none');
    });
    
    userLoggedItems.forEach(item => {
        item.classList.add('d-none');
    });
    
    navRegistro.classList.remove('d-none');
    navLogin.classList.remove('d-none');
    
    // Redirigir al inicio
    import('./navigation.js').then(module => {
        module.showSection('inicio');
    });
    
    alert('Has cerrado sesión correctamente');
}
