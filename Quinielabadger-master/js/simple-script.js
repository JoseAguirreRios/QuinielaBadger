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
                
                // Mostrar elementos específicos para usuarios normales
                const normalUserItems = document.querySelectorAll('.normal-user');
                normalUserItems.forEach(item => {
                    item.classList.remove('d-none');
                });
                
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
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            state.isLoggedIn = false;
            state.isAdmin = false;
            
            // Ocultar elementos de administrador
            adminOnlyItems.forEach(item => {
                item.classList.add('d-none');
            });
            
            // Ocultar elementos de usuario normal
            const normalUserItems = document.querySelectorAll('.normal-user');
            normalUserItems.forEach(item => {
                item.classList.add('d-none');
            });
            
            // Ocultar elementos de usuario logueado
            userLoggedItems.forEach(item => {
                item.classList.add('d-none');
            });
            
            navRegistro.classList.remove('d-none');
            navLogin.classList.remove('d-none');
            
            showSection('inicio');
            alert('Has cerrado sesión correctamente');
        });
    } else {
        console.error('No se encontró el botón de cierre de sesión con ID: logout-btn');
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
    
    // Función auxiliar para guardar quiniela en localStorage
    function guardarQuinielaEnStorage(quiniela) {
        // Obtener todas las quinielas
        let quinielas = JSON.parse(localStorage.getItem('quinielas') || '[]');
        
        // Buscar si ya existe la quiniela para actualizar
        const index = quinielas.findIndex(q => q.numero == quiniela.numero);
        
        if (index >= 0) {
            quinielas[index] = quiniela;
        } else {
            quinielas.push(quiniela);
        }
        
        // Guardar de vuelta en localStorage
        localStorage.setItem('quinielas', JSON.stringify(quinielas));
        
        // Si hay una quiniela seleccionada, actualizarla también
        if (localStorage.getItem('quinielaSeleccionada')) {
            const quinielaSeleccionada = JSON.parse(localStorage.getItem('quinielaSeleccionada'));
            if (quinielaSeleccionada.numero == quiniela.numero) {
                localStorage.setItem('quinielaSeleccionada', JSON.stringify(quiniela));
            }
        }
    }
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Verificar hash inicial
    handleHashChange();
    
    // Función para aplicar permisos según el rol del usuario
    function aplicarPermisosDeEdicion() {
        console.log('Aplicando permisos de edición según rol:', state.isAdmin ? 'Administrador' : 'Usuario normal');
        
        // Elementos que solo son visibles para administradores
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            if (state.isAdmin) {
                element.classList.remove('d-none');
            } else {
                element.classList.add('d-none');
            }
        });
        
        // Elementos que solo son visibles para usuarios normales
        const normalUserElements = document.querySelectorAll('.normal-user');
        normalUserElements.forEach(element => {
            if (!state.isAdmin) {
                element.classList.remove('d-none');
            } else {
                element.classList.add('d-none');
            }
        });
        
        // Esta función se asegura de que los campos estén protegidos en todo momento
        function aplicarReadOnlyACampos() {
            // Aplicar readonly a campos que solo administradores pueden editar
            const adminEditableFields = document.querySelectorAll('[data-admin-editable="true"]');
            adminEditableFields.forEach(field => {
                if (!state.isAdmin) {
                    field.setAttribute('readonly', 'readonly');
                    // Para select, disabled es mejor que readonly
                    if (field.tagName === 'SELECT') {
                        field.setAttribute('disabled', 'disabled');
                    }
                } else {
                    field.removeAttribute('readonly');
                    if (field.tagName === 'SELECT') {
                        field.removeAttribute('disabled');
                    }
                }
            });
        }
        
        // Aplicar readonly inmediatamente
        aplicarReadOnlyACampos();
        
        // También aplicar después de un breve retraso para capturar elementos que podrían cargarse dinámicamente
        setTimeout(aplicarReadOnlyACampos, 500);
        
        // Modificar función cargarPartidosQuiniela para que los inputs de resultados sean readonly para usuarios normales
        window.cargarPartidosQuiniela = function(quiniela) {
            const partidosContainer = document.getElementById('partidos-quiniela-edicion');
            if (!partidosContainer) return;
            
            partidosContainer.innerHTML = '';
            
            quiniela.partidos.forEach((partido, index) => {
                const fila = document.createElement('tr');
                
                // Si el partido es de otra liga, asignar clase
                if (partido.esOtraLiga) {
                    fila.classList.add('table-info');
                }
                
                // Generar contenido con resultados si existen
                const resultadoLocal = partido.resultadoLocal !== undefined ? partido.resultadoLocal : '';
                const resultadoVisitante = partido.resultadoVisitante !== undefined ? partido.resultadoVisitante : '';
                
                // Aplicar readonly según el rol del usuario
                const readonlyAttr = !state.isAdmin ? 'readonly' : '';
                
                fila.innerHTML = `
                    <td>${partido.dia}</td>
                    <td>${partido.hora || '--:--'}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${partido.logoLocal || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='}" alt="${partido.equipoLocal}" class="me-2" style="width: 30px; height: auto;">
                            <span>${partido.equipoLocal}</span>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex justify-content-center">
                            <input type="number" class="form-control form-control-sm resultado-local me-1" 
                                data-index="${index}" value="${resultadoLocal}" min="0" style="width: 45px; text-align: center;" ${readonlyAttr}>
                            <span class="align-self-center">-</span>
                            <input type="number" class="form-control form-control-sm resultado-visitante ms-1" 
                                data-index="${index}" value="${resultadoVisitante}" min="0" style="width: 45px; text-align: center;" ${readonlyAttr}>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${partido.logoVisitante || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='}" alt="${partido.equipoVisitante}" class="me-2" style="width: 30px; height: auto;">
                            <span>${partido.equipoVisitante}</span>
                        </div>
                    </td>
                `;
                
                partidosContainer.appendChild(fila);
            });
            
            // Aplicar permisos después de cargar los partidos
            setTimeout(aplicarReadOnlyACampos, 100);
        };
    }
    
    // Modificar la función handleLogin para actualizar permisos cuando cambie el usuario
    const originalHandleLogin = handleLogin;
    handleLogin = function(username, password) {
        originalHandleLogin(username, password);
        // Aplicar permisos después de iniciar sesión
        if (state.isLoggedIn) {
            aplicarPermisosDeEdicion();
        }
    };
    
    // Agregar un observador de mutaciones para aplicar permisos cuando se modifican elementos en el DOM
    const observer = new MutationObserver(function(mutations) {
        // Si se produjo una mutación y el usuario no es administrador, aplicar permisos
        if (!state.isAdmin && state.isLoggedIn) {
            aplicarPermisosDeEdicion();
        }
    });
    
    // Configurar el observador para monitorear cambios en el contenido del DOM
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Modificar la función que carga los datos de la quiniela para aplicar permisos
    window.cargarDatosQuinielaSeleccionada = function() {
        const quiniela = JSON.parse(localStorage.getItem('quinielaSeleccionada'));
        if (!quiniela) return;
        
        // Actualizar título
        document.getElementById('titulo-quiniela-edicion').innerHTML = `Editar Quiniela #<span id="numero-quiniela-edicion">${quiniela.numero}</span>`;
        document.getElementById('numero-quiniela-edicion').textContent = quiniela.numero;
        
        // Cargar datos básicos
        document.getElementById('nombre-quiniela-edicion').value = quiniela.nombre;
        document.getElementById('fecha-inicio-edicion').value = quiniela.fechaInicio;
        document.getElementById('fecha-fin-edicion').value = quiniela.fechaFin;
        document.getElementById('costo-quiniela-edicion').value = quiniela.costo;
        document.getElementById('premio-primero-edicion').value = quiniela.premios.primero;
        document.getElementById('premio-segundo-edicion').value = quiniela.premios.segundo;
        document.getElementById('premio-tercero-edicion').value = quiniela.premios.tercero;
        document.getElementById('estado-quiniela-edicion').value = quiniela.estado;
        
        // Cargar partidos
        cargarPartidosQuiniela(quiniela);
        
        // Cargar participantes
        cargarParticipantesQuiniela(quiniela);
        
        // Aplicar permisos de edición
        aplicarPermisosDeEdicion();
    };
    
    // Aplicar permisos iniciales
    aplicarPermisosDeEdicion();
    
    // Aplicar permisos cada vez que cambia la sección
    const originalShowSection = showSection;
    showSection = function(sectionId) {
        originalShowSection(sectionId);
        if (state.isLoggedIn) {
            setTimeout(aplicarPermisosDeEdicion, 100);
        }
    };
    
    // Manejar tabs de Bootstrap: asegurar que funcionen adecuadamente
    const tabsElements = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabsElements.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            // Obtener el target tab
            const targetId = tab.getAttribute('data-bs-target');
            
            // Si existe, ocultar todos los otros tabs y mostrar este
            if (targetId) {
                // Desactivar todos los tabs
                const parentContainer = tab.closest('.nav-tabs');
                if (parentContainer) {
                    const siblingTabs = parentContainer.querySelectorAll('.nav-link');
                    siblingTabs.forEach(siblingTab => {
                        siblingTab.classList.remove('active');
                        siblingTab.setAttribute('aria-selected', 'false');
                    });
                }
                
                // Activar este tab
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                
                // Ocultar todos los paneles de contenido
                const contentId = tab.getAttribute('data-bs-target');
                const tabContentContainer = document.querySelector(contentId).closest('.tab-content');
                if (tabContentContainer) {
                    const tabPanes = tabContentContainer.querySelectorAll('.tab-pane');
                    tabPanes.forEach(pane => {
                        pane.classList.remove('show', 'active');
                    });
                }
                
                // Mostrar el panel activo
                const activeContent = document.querySelector(contentId);
                if (activeContent) {
                    activeContent.classList.add('show', 'active');
                }
            }
        });
    });
    
    console.log('QuinielaBadger inicializado correctamente');
}); 