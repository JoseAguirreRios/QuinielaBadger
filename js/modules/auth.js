// Auth Module - Gestión de autenticación y usuarios

import { state, updateState } from './data.js';
import { 
    registrarUsuario, 
    iniciarSesion, 
    cerrarSesion, 
    obtenerUsuarioActual,
    observarEstadoAutenticacion
} from './firebase.js';

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

    // Observar cambios en la autenticación
    observarEstadoAutenticacion(handleAuthStateChanged);
}

// Función para manejar cambios en el estado de autenticación
function handleAuthStateChanged(user) {
    if (user) {
        updateState('isLoggedIn', true);
        
        // Verificar si es administrador
        if (user.rol === 'admin') {
            updateState('isAdmin', true);
            
            // Mostrar elementos de administrador
            adminOnlyItems.forEach(item => {
                item.classList.remove('d-none');
            });
        } else {
            updateState('isAdmin', false);
        }
        
        // Actualizar interfaz para usuario logueado
        navRegistro.classList.add('d-none');
        navLogin.classList.add('d-none');
        userLoggedItems.forEach(item => {
            item.classList.remove('d-none');
        });
    } else {
        // No hay usuario autenticado
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
    }
}

// Función para manejar el envío del formulario de inicio de sesión
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-usuario').value;
    const password = document.getElementById('login-password').value;
    
    handleLogin(email, password);
}

// Función para manejar el proceso de inicio de sesión
export async function handleLogin(email, password) {
    try {
        const resultado = await iniciarSesion(email, password);
        
        if (resultado.success) {
            const user = resultado.user;
            
            // Mensaje de bienvenida
            if (user.rol === 'admin') {
                alert('¡Bienvenido Administrador!');
            } else {
                alert('¡Bienvenido ' + user.displayName + '!');
            }
            
            // Redirigir al inicio
            import('./navigation.js').then(module => {
                module.showSection('inicio');
            });
        } else {
            alert('Error al iniciar sesión: ' + resultado.error);
        }
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
}

// Función para manejar el envío del formulario de registro
async function handleRegistroSubmit(e) {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    try {
        const resultado = await registrarUsuario(nombre, email, password);
        
        if (resultado.success) {
            // Si tenemos un datalist para usuarios, actualizar
            if (usuariosList) {
                const option = document.createElement('option');
                option.value = email;
                usuariosList.appendChild(option);
            }
            
            // Registro exitoso
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            
            // Limpiar el formulario
            registroForm.reset();
            
            // Redirigir a la página de inicio de sesión
            import('./navigation.js').then(module => {
                module.showSection('iniciar-sesion');
            });
        } else {
            alert('Error al registrar usuario: ' + resultado.error);
        }
    } catch (error) {
        alert('Error al registrar usuario: ' + error.message);
    }
}

// Función para manejar el cierre de sesión
async function handleLogout(e) {
    e.preventDefault();
    
    try {
        const resultado = await cerrarSesion();
        
        if (resultado.success) {
            // El observador de autenticación se encargará de actualizar la interfaz
            alert('Has cerrado sesión correctamente');
            
            // Redirigir al inicio
            import('./navigation.js').then(module => {
                module.showSection('inicio');
            });
        } else {
            alert('Error al cerrar sesión: ' + resultado.error);
        }
    } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
    }
}
