// Navigation Module - Gestión de la navegación entre secciones

import { state, updateState } from './data.js';

// Referencias a elementos del DOM
let sections;
let navLinks;

// Inicializar la navegación
export function initNavigation() {
    console.log('Inicializando navegación...');
    // Asegurarse de que sections capture todas las secciones disponibles
    sections = document.querySelectorAll('.section-content');
    console.log('Secciones encontradas:', sections.length);
    sections.forEach(section => console.log('Sección ID:', section.id));
    
    navLinks = document.querySelectorAll('.nav-link');

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
            console.log('Clic en enlace cambio de sección interno:', sectionId);
            showSection(sectionId);
        });
    });
}

// Función para mostrar una sección específica
export function showSection(sectionId) {
    console.log('Intentando mostrar sección:', sectionId);
    
    if (!sections || sections.length === 0) {
        console.error('Las secciones no están correctamente inicializadas');
        sections = document.querySelectorAll('.section-content');
    }
    
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    
    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        console.log('Sección encontrada, mostrando:', sectionId);
        activeSection.classList.remove('d-none');
        updateState('currentSection', sectionId);
        
        // Actualizar la URL sin recargar la página
        window.history.replaceState(null, '', '#' + sectionId);
    } else {
        console.error('No se encontró la sección con ID:', sectionId);
    }
    
    // Actualizar enlaces de navegación activos
    if (!navLinks || navLinks.length === 0) {
        navLinks = document.querySelectorAll('.nav-link');
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // En dispositivos móviles, cerrar el menú después de hacer clic
    if (window.innerWidth < 768) {
        const sidebarMenu = document.getElementById('sidebarMenu');
        if (sidebarMenu && sidebarMenu.classList.contains('expanded')) {
            import('./sidebar.js').then(module => {
                if (module.toggleSidebar) {
                    module.toggleSidebar();
                }
            }).catch(error => console.error('Error al importar sidebar.js:', error));
        }
    }
}
