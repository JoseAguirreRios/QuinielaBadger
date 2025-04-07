// Script mejorado para QuinielaBadger compatible
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuinielaBadger inicializando (versión mejorada)...');
    
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
    
    // Inicialización del sidebar - MEJORADO
    const sidebar = document.getElementById('sidebarMenu');
    const mainContent = document.querySelector('main');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Comprobar si los elementos se inicializaron correctamente
    console.log('Sidebar:', sidebar ? 'OK' : 'NO ENCONTRADO');
    console.log('Main Content:', mainContent ? 'OK' : 'NO ENCONTRADO');
    console.log('Sidebar Toggle:', sidebarToggle ? 'OK' : 'NO ENCONTRADO');
    
    // Asegurar que el sidebar esté expandido por defecto en móviles
    if (window.innerWidth <= 768) {
        sidebar.classList.add('expanded');
    }
    
    // Función para cambiar entre secciones - MEJORADA
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
            try {
                window.history.replaceState(null, '', '#' + sectionId);
            } catch (e) {
                console.warn('No se pudo actualizar la URL:', e);
                // Fallar silenciosamente - esto puede ocurrir en archivos locales
            }
            
            console.log('Sección mostrada correctamente:', sectionId);
            
            // En dispositivos móviles, mantener la barra lateral visible
            if (window.innerWidth <= 768) {
                sidebar.classList.add('expanded');
            }
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
    
    // MEJORADO: Inicializar cambio de secciones en los enlaces de navegación
    navLinks.forEach(link => {
        // Verificar si el enlace ya tiene event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clic detectado en enlace de navegación');
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                console.log('Cambiando a sección:', sectionId);
                showSection(sectionId);
                
                // En móviles, mantener el sidebar visible después de hacer clic
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('expanded');
                }
            }
        });
    });
    
    // MEJORADO: Inicializar enlaces para cambiar secciones dentro del contenido
    document.querySelectorAll('.change-section').forEach(link => {
        // Verificar si el enlace ya tiene event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clic detectado en enlace interno');
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                console.log('Cambiando a sección interna:', sectionId);
                showSection(sectionId);
            }
        });
    });
    
    // MEJORADO: Función para el manejo del sidebar
    function toggleSidebar() {
        console.log('Toggle sidebar activado');
        
        if (window.innerWidth <= 768) {
            // En móviles, alternar la clase 'expanded'
            sidebar.classList.toggle('expanded');
            console.log('Estado del sidebar móvil:', sidebar.classList.contains('expanded') ? 'expandido' : 'colapsado');
        } else {
            // En escritorio, alternar la clase 'collapsed'
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
            console.log('Estado del sidebar escritorio:', sidebar.classList.contains('collapsed') ? 'colapsado' : 'expandido');
            
            // Guardar estado en localStorage
            try {
                const isCollapsed = sidebar.classList.contains('collapsed');
                localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
            } catch (e) {
                console.warn('No se pudo guardar en localStorage:', e);
            }
        }
    }
    
    // MEJORADO: Configurar el botón del sidebar con comprobación adicional
    if (sidebarToggle) {
        // Eliminar event listeners existentes
        const newToggle = sidebarToggle.cloneNode(true);
        sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
        
        // Añadir nuevo event listener
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clic en botón de sidebar');
            toggleSidebar();
        });
    } else {
        console.error('No se encontró el botón de alternar sidebar');
    }
    
    // MEJORADO: Asegurar el estado inicial correcto del sidebar según el dispositivo
    try {
        if (window.innerWidth <= 768) {
            // En móviles, estar seguro de que está en el estado correcto
            if (!sidebar.classList.contains('expanded') && !sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('expanded');
            }
        } else {
            // En escritorio, restaurar estado o configurar estado predeterminado
            const sidebarState = localStorage.getItem('sidebarState');
            if (sidebarState === 'collapsed') {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('sidebar-collapsed');
            }
        }
    } catch (e) {
        console.warn('Error al configurar el estado inicial del sidebar:', e);
    }
    
    // Resto del código (login, registro, etc.) se mantiene igual
    // ... 
    
    // Manejar cambios de tamaño de ventana - MEJORADO
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // En móviles, quitar 'collapsed' y usar 'expanded'
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
        }
    });
    
    // Inicializar la navegación basada en hash
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.substring(1);
            console.log('Cambio de hash detectado:', sectionId);
            showSection(sectionId);
        } else {
            showSection('inicio');
        }
    }
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Verificar hash inicial
    handleHashChange();
    
    // Asegurar que al menos la sección de inicio esté visible
    if (document.querySelectorAll('.section-content:not(.d-none)').length === 0) {
        console.log('No hay secciones visibles, mostrando inicio...');
        showSection('inicio');
    }
    
    console.log('QuinielaBadger inicializado correctamente (versión mejorada)');
}); 