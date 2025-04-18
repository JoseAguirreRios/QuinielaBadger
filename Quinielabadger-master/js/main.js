// Main.js - Archivo principal que coordina todos los módulos

// Importar módulos
import { initAuth } from './modules/auth.js';
import { initNavigation, showSection } from './modules/navigation.js';
import { initSidebar } from './modules/sidebar.js';
import { initQuinielas } from './modules/quinielas.js';
import { state } from './modules/data.js';

// Función principal de inicialización
function init() {
    console.log('Inicializando QuinielaBadger...');
    
    try {
        // Inicializar los módulos
        initSidebar();
        initNavigation();
        initAuth();
        initQuinielas();
        
        // Mostrar la sección inicial
        showSection('inicio');

        // Código adicional para manejar la navegación por hash directamente
        // Esto es crucial para que funcione con file:///
        function handleHashChange() {
            const hash = window.location.hash;
            if (hash) {
                const sectionId = hash.substring(1); // Quitar el # del inicio
                console.log('Cambio de hash detectado:', sectionId);
                showSection(sectionId);
            } else {
                showSection('inicio');
            }
        }

        // Escuchar cambios en el hash de la URL
        window.addEventListener('hashchange', handleHashChange);
        
        // Verificar el hash inicial
        handleHashChange();
        
        console.log('QuinielaBadger inicializado correctamente!');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);
