// Sidebar Module - Gestión del menú lateral

// Referencias a elementos del DOM
let sidebar;
let mainContent;
let sidebarToggle;
let navLinks;

// Inicializar el sidebar
export function initSidebar() {
    sidebar = document.getElementById('sidebarMenu');
    mainContent = document.querySelector('main');
    sidebarToggle = document.getElementById('sidebarToggle');
    navLinks = document.querySelectorAll('.nav-link');

    // Función para actualizar el estado del menú
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Cerrar menú al hacer clic en un enlace en dispositivos móviles
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('expanded');
            }
        });
    });

    // Restaurar el estado del menú desde localStorage
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'collapsed') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('sidebar-collapsed');
    }

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);
}

// Función para actualizar el estado del menú
export function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
    
    // Guardar el estado en localStorage
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
}

// Función para manejar cambios de tamaño de ventana
function handleResize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('expanded');
        mainContent.classList.remove('sidebar-collapsed');
    }
}
