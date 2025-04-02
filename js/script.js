// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar variables
    let currentSection = 'inicio';
    let isLoggedIn = false;
    let isAdmin = false;

    // Referencias a elementos del DOM
    const sections = document.querySelectorAll('.section-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const adminOnlyItems = document.querySelectorAll('.admin-only');
    const userLoggedItems = document.querySelectorAll('.user-logged');
    const navRegistro = document.getElementById('nav-registro');
    const navLogin = document.getElementById('nav-login');
    const logoutBtn = document.getElementById('btn-logout');
    const loginForm = document.getElementById('login-form');
    const registroForm = document.getElementById('registro-form');
    const agregarPartidoBtn = document.getElementById('agregar-partido');
    const pronosticosContainer = document.getElementById('pronosticos-container');
    const limpiarQuinielaBtn = document.getElementById('limpiar-quiniela');
    const usuarioQuinielaInput = document.getElementById('usuario-quiniela');
    const usuariosList = document.getElementById('usuarios-list');

    // Lista simulada de usuarios (en un sistema real esto vendría de una base de datos)
    const usuariosRegistrados = [
        'Carlos Ramírez',
        'Ana González',
        'Roberto Méndez',
        'Laura Torres',
        'Miguel Ángel Pérez',
        'José García',
        'María Rodríguez',
        'Juan López',
        'AdminBadger'
    ];

    // Lista de quinielas (en un sistema real esto vendría de una base de datos)
    const quinielas = [];

    // Elementos del DOM para "Crear Quiniela"
    const crearQuinielaForm = document.getElementById('crear-quiniela-form');
    const crearPartidosContainer = document.getElementById('crear-partidos-container');
    const agregarPartidoCrearBtn = document.getElementById('agregar-partido-crear');
    const limpiarCrearQuinielaBtn = document.getElementById('limpiar-crear-quiniela');
    const tablaQuinielasActivas = document.getElementById('tabla-quinielas-activas');

    // Elementos del DOM para "Registro de Quinielas"
    const seleccionarQuinielaSelect = document.getElementById('seleccionar-quiniela');
    const datosQuinielaDiv = document.getElementById('datos-quiniela');
    const infoTorneoSpan = document.getElementById('info-torneo');
    const infoJornadaSpan = document.getElementById('info-jornada');
    const infoCierreSpan = document.getElementById('info-cierre');
    const infoCostoSpan = document.getElementById('info-costo');

    // Función para mostrar una sección específica
    function showSection(sectionId) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('d-none');
        });
        
        // Mostrar la sección seleccionada
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.remove('d-none');
            currentSection = sectionId;
        }
        
        // Actualizar enlaces de navegación activos
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });

        // En dispositivos móviles, cerrar el menú después de hacer clic
        if (window.innerWidth < 768) {
            const sidebarMenu = document.getElementById('sidebarMenu');
            if (sidebarMenu && sidebarMenu.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(sidebarMenu);
                bsCollapse.hide();
            }
        }
    }

    // Inicializar cambio de secciones en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Inicializar enlaces para cambiar secciones dentro del contenido
    const changeSectionLinks = document.querySelectorAll('.change-section');
    changeSectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Función para simular inicio de sesión
    function handleLogin(username, password) {
        // Verificar si es el administrador
        if (username === 'AdminBadger' && password === 'AdminBadger2025') {
            isLoggedIn = true;
            isAdmin = true;
            
            // Mostrar elementos de administrador
            adminOnlyItems.forEach(item => {
                item.classList.remove('d-none');
            });
            
            alert('¡Bienvenido Administrador!');
            
            // Actualizar interfaz para usuario logueado
            navRegistro.classList.add('d-none');
            navLogin.classList.add('d-none');
            userLoggedItems.forEach(item => {
                item.classList.remove('d-none');
            });
            
            // Redirigir al inicio
            showSection('inicio');
            return;
        }
        
        // Verificar si el usuario está registrado
        const usuarioExiste = usuariosRegistrados.some(user => user === username);
        
        if (usuarioExiste) {
            // Para simplificar, asumimos que la contraseña es correcta en este demo
            // En un sistema real, verificaríamos la contraseña contra la almacenada
            isLoggedIn = true;
            isAdmin = false;
            
            // Actualizar interfaz para usuario logueado
            navRegistro.classList.add('d-none');
            navLogin.classList.add('d-none');
            userLoggedItems.forEach(item => {
                item.classList.remove('d-none');
            });
            
            alert('¡Inicio de sesión exitoso!');
            
            // Redirigir al inicio
            showSection('inicio');
        } else {
            alert('Usuario no registrado. Por favor regístrese primero.');
            showSection('registrarse');
        }
    }

    // Manejar envío del formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-usuario').value;
            const password = document.getElementById('login-password').value;
            
            handleLogin(username, password);
        });
    }

    // Manejar envío del formulario de registro
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
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
            if (usuariosRegistrados.includes(usuario)) {
                alert('Este nombre de usuario ya está registrado. Por favor, elija otro.');
                return;
            }
            
            // Añadir el nuevo usuario a la lista de usuarios registrados
            usuariosRegistrados.push(usuario);
            
            // En un sistema real, aquí guardaríamos todos los datos del usuario,
            // incluyendo nombre, correo, teléfono y contraseña (hasheada)
            console.log('Nuevo usuario registrado:', {
                nombre,
                usuario,
                correo,
                telefono
            });
            
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
            showSection('iniciar-sesion');
        });
    }

    // Manejar cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reiniciar estado
            isLoggedIn = false;
            isAdmin = false;
            
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
            showSection('inicio');
            
            alert('Has cerrado sesión correctamente');
        });
    }

    // Función para agregar partidos en el formulario de registro de quinielas
    if (agregarPartidoBtn && pronosticosContainer) {
        agregarPartidoBtn.addEventListener('click', function() {
            // Clonar el primer elemento de pronóstico
            const firstItem = pronosticosContainer.querySelector('.pronostico-item');
            const newItem = firstItem.cloneNode(true);
            
            // Limpiar los valores
            newItem.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            
            // Asegurar que el botón de eliminar funcione
            const deleteBtn = newItem.querySelector('.eliminar-partido');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                    // No eliminar si es el único partido
                    const items = pronosticosContainer.querySelectorAll('.pronostico-item');
                    if (items.length > 1) {
                        newItem.remove();
                    } else {
                        alert('Debe haber al menos un partido en la quiniela');
                    }
                });
            }
            
            // Agregar el nuevo elemento al contenedor
            pronosticosContainer.appendChild(newItem);
        });
        
        // Configurar el botón eliminar para el primer elemento
        const deleteButtons = document.querySelectorAll('.eliminar-partido');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const items = pronosticosContainer.querySelectorAll('.pronostico-item');
                if (items.length > 1) {
                    this.closest('.pronostico-item').remove();
                } else {
                    alert('Debe haber al menos un partido en la quiniela');
                }
            });
        });
    }

    // Autocompletado para usuarios en el registro de quinielas
    if (usuarioQuinielaInput && usuariosList) {
        // Llenar la lista de datalist con usuarios registrados
        usuariosRegistrados.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario;
            usuariosList.appendChild(option);
        });

        // Guardamos el valor del usuario para verificar si es nuevo
        usuarioQuinielaInput.addEventListener('input', function() {
            const inputValue = this.value.trim();
            
            // Aquí podríamos hacer una llamada a una API para buscar usuarios
            // que coincidan con lo que el administrador está escribiendo
            console.log('Buscando usuario: ' + inputValue);
        });
    }

    // Función para limpiar el formulario de quiniela
    if (limpiarQuinielaBtn) {
        limpiarQuinielaBtn.addEventListener('click', function() {
            // Reiniciar selección de torneo
            const torneoSelect = document.getElementById('torneo');
            if (torneoSelect) torneoSelect.value = '';
            
            // Limpiar jornada
            const jornadaInput = document.getElementById('jornada');
            if (jornadaInput) jornadaInput.value = '';
            
            // Limpiar usuario
            if (usuarioQuinielaInput) usuarioQuinielaInput.value = '';
            
            // Reiniciar fecha a hoy
            const fechaRegistroInput = document.getElementById('fecha-registro');
            if (fechaRegistroInput) {
                const today = new Date().toISOString().split('T')[0];
                fechaRegistroInput.value = today;
            }
            
            // Dejar solo un pronóstico y limpiarlo
            if (pronosticosContainer) {
                while (pronosticosContainer.children.length > 1) {
                    pronosticosContainer.removeChild(pronosticosContainer.lastChild);
                }
                
                const inputs = pronosticosContainer.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });
            }
            
            // Limpiar monto
            const montoInput = document.getElementById('monto-pagado');
            if (montoInput) montoInput.value = '';
        });
    }

    // Establecer la fecha actual en el formulario de quinielas al cargar
    const fechaRegistroInput = document.getElementById('fecha-registro');
    if (fechaRegistroInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaRegistroInput.value = today;
    }

    // Función para inicializar fechas con el valor actual en "Crear Quiniela"
    function initCrearQuinielaFechas() {
        const ahora = new Date();
        // Fecha de inicio (ahora)
        const fechaInicio = document.getElementById('crear-fecha-inicio');
        if (fechaInicio) {
            const fechaInicioStr = ahora.toISOString().slice(0, 16);
            fechaInicio.value = fechaInicioStr;
        }
        
        // Fecha de cierre (por defecto, 7 días después)
        const fechaCierre = document.getElementById('crear-fecha-cierre');
        if (fechaCierre) {
            const fechaCierreDate = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);
            const fechaCierreStr = fechaCierreDate.toISOString().slice(0, 16);
            fechaCierre.value = fechaCierreStr;
        }
    }
    
    // Inicializar fechas al cargar la página
    initCrearQuinielaFechas();

    // Funciones para la sección "Crear Quiniela"
    if (agregarPartidoCrearBtn && crearPartidosContainer) {
        agregarPartidoCrearBtn.addEventListener('click', function() {
            // Clonar el primer elemento de partido
            const firstItem = crearPartidosContainer.querySelector('.partido-item');
            const newItem = firstItem.cloneNode(true);
            
            // Limpiar los valores
            newItem.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            
            // Asegurar que el botón de eliminar funcione
            const deleteBtn = newItem.querySelector('.eliminar-partido-crear');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                    // No eliminar si es el único partido
                    const items = crearPartidosContainer.querySelectorAll('.partido-item');
                    if (items.length > 1) {
                        newItem.remove();
                    } else {
                        alert('Debe haber al menos un partido en la quiniela');
                    }
                });
            }
            
            // Agregar el nuevo elemento al contenedor
            crearPartidosContainer.appendChild(newItem);
        });
        
        // Configurar el botón eliminar para el primer elemento
        const deleteButtonsCrear = document.querySelectorAll('.eliminar-partido-crear');
        deleteButtonsCrear.forEach(btn => {
            btn.addEventListener('click', function() {
                const items = crearPartidosContainer.querySelectorAll('.partido-item');
                if (items.length > 1) {
                    this.closest('.partido-item').remove();
                } else {
                    alert('Debe haber al menos un partido en la quiniela');
                }
            });
        });
    }

    // Función para limpiar el formulario de crear quiniela
    if (limpiarCrearQuinielaBtn) {
        limpiarCrearQuinielaBtn.addEventListener('click', function() {
            // Reiniciar selección de torneo
            const torneoSelect = document.getElementById('crear-torneo');
            if (torneoSelect) torneoSelect.value = '';
            
            // Limpiar jornada
            const jornadaInput = document.getElementById('crear-jornada');
            if (jornadaInput) jornadaInput.value = '';
            
            // Reiniciar fechas
            initCrearQuinielaFechas();
            
            // Limpiar costo y premio
            document.getElementById('crear-costo').value = '';
            document.getElementById('crear-premio').value = '';
            
            // Dejar solo un partido y limpiarlo
            if (crearPartidosContainer) {
                while (crearPartidosContainer.children.length > 1) {
                    crearPartidosContainer.removeChild(crearPartidosContainer.lastChild);
                }
                
                const inputs = crearPartidosContainer.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });
            }
        });
    }

    // Procesar el formulario de crear quiniela
    if (crearQuinielaForm) {
        crearQuinielaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar los datos del formulario
            const torneo = document.getElementById('crear-torneo').value;
            const jornada = document.getElementById('crear-jornada').value;
            const fechaInicio = document.getElementById('crear-fecha-inicio').value;
            const fechaCierre = document.getElementById('crear-fecha-cierre').value;
            const costo = document.getElementById('crear-costo').value;
            const premio = document.getElementById('crear-premio').value;
            
            // Verificar si ya existe una quiniela con el mismo torneo y jornada
            const existeQuiniela = quinielas.some(q => q.torneo === torneo && q.jornada === jornada);
            if (existeQuiniela) {
                alert('Ya existe una quiniela para ese torneo y jornada');
                return;
            }
            
            // Recopilar los partidos
            const partidos = [];
            const partidoItems = crearPartidosContainer.querySelectorAll('.partido-item');
            partidoItems.forEach((item, index) => {
                const equipoLocal = item.querySelectorAll('input')[0].value;
                const equipoVisitante = item.querySelectorAll('input')[1].value;
                
                partidos.push({
                    id: index + 1,
                    equipoLocal,
                    equipoVisitante
                });
            });
            
            // Crear un nuevo objeto de quiniela
            const nuevaQuiniela = {
                id: Date.now(), // Usar timestamp como ID único
                torneo,
                jornada,
                fechaInicio,
                fechaCierre,
                costo,
                premio,
                partidos,
                activa: true
            };
            
            // Agregar la quiniela a la lista
            quinielas.push(nuevaQuiniela);
            
            // Actualizar la tabla de quinielas activas
            actualizarTablaQuinielas();
            
            // Actualizar el selector de quinielas en la sección de registro
            actualizarSelectorQuinielas();
            
            // Mostrar mensaje de éxito
            alert('Quiniela creada con éxito');
            
            // Limpiar el formulario
            limpiarCrearQuinielaBtn.click();
        });
    }

    // Función para actualizar la tabla de quinielas activas
    function actualizarTablaQuinielas() {
        if (!tablaQuinielasActivas) return;
        
        // Limpiar la tabla
        const tbody = tablaQuinielasActivas.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Si no hay quinielas, mostrar mensaje
        if (quinielas.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="8" class="text-center">No hay quinielas activas</td>';
            tbody.appendChild(tr);
            return;
        }
        
        // Agregar cada quiniela a la tabla
        quinielas.forEach(quiniela => {
            const tr = document.createElement('tr');
            
            // Formato de fechas para mostrar
            const fechaInicio = new Date(quiniela.fechaInicio).toLocaleString();
            const fechaCierre = new Date(quiniela.fechaCierre).toLocaleString();
            
            tr.innerHTML = `
                <td>${quiniela.torneo}</td>
                <td>${quiniela.jornada}</td>
                <td>${fechaInicio}</td>
                <td>${fechaCierre}</td>
                <td>${quiniela.partidos.length}</td>
                <td>$${quiniela.costo}</td>
                <td>$${quiniela.premio}</td>
                <td>
                    <button class="btn btn-sm btn-danger eliminar-quiniela" data-id="${quiniela.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Agregar event listeners a los botones de eliminar
        const eliminarButtons = tbody.querySelectorAll('.eliminar-quiniela');
        eliminarButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarQuiniela(id);
            });
        });
    }

    // Función para eliminar una quiniela
    function eliminarQuiniela(id) {
        // Confirmar eliminación
        if (!confirm('¿Está seguro de que desea eliminar esta quiniela?')) {
            return;
        }
        
        // Buscar el índice de la quiniela
        const index = quinielas.findIndex(q => q.id === id);
        if (index !== -1) {
            // Eliminar la quiniela
            quinielas.splice(index, 1);
            
            // Actualizar la tabla y el selector
            actualizarTablaQuinielas();
            actualizarSelectorQuinielas();
            
            alert('Quiniela eliminada con éxito');
        }
    }

    // Función para actualizar el selector de quinielas en la sección de registro
    function actualizarSelectorQuinielas() {
        if (!seleccionarQuinielaSelect) return;
        
        // Guardar el valor seleccionado actualmente
        const valorSeleccionado = seleccionarQuinielaSelect.value;
        
        // Limpiar el selector
        seleccionarQuinielaSelect.innerHTML = '<option value="">Seleccione una quiniela</option>';
        
        // Si no hay quinielas, salir
        if (quinielas.length === 0) {
            return;
        }
        
        // Agregar cada quiniela al selector
        quinielas.forEach(quiniela => {
            const option = document.createElement('option');
            option.value = quiniela.id;
            option.textContent = `${quiniela.torneo} - ${quiniela.jornada}`;
            seleccionarQuinielaSelect.appendChild(option);
        });
        
        // Restaurar el valor seleccionado si existe
        if (valorSeleccionado) {
            seleccionarQuinielaSelect.value = valorSeleccionado;
        }
    }

    // Función para mostrar los detalles de la quiniela seleccionada
    if (seleccionarQuinielaSelect) {
        seleccionarQuinielaSelect.addEventListener('change', function() {
            const quinielaId = parseInt(this.value);
            
            // Si no hay una quiniela seleccionada, ocultar los detalles
            if (!quinielaId) {
                datosQuinielaDiv.classList.add('d-none');
                pronosticosContainer.innerHTML = '';
                return;
            }
            
            // Buscar la quiniela seleccionada
            const quiniela = quinielas.find(q => q.id === quinielaId);
            if (!quiniela) return;
            
            // Mostrar los detalles de la quiniela
            infoTorneoSpan.textContent = quiniela.torneo;
            infoJornadaSpan.textContent = quiniela.jornada;
            infoCierreSpan.textContent = new Date(quiniela.fechaCierre).toLocaleString();
            infoCostoSpan.textContent = quiniela.costo;
            datosQuinielaDiv.classList.remove('d-none');
            
            // Establecer el monto pagado por defecto como el costo de la quiniela
            document.getElementById('monto-pagado').value = quiniela.costo;
            
            // Generar los campos de pronósticos basados en los partidos de la quiniela
            pronosticosContainer.innerHTML = '';
            
            quiniela.partidos.forEach(partido => {
                const divPartido = document.createElement('div');
                divPartido.className = 'row mb-2 pronostico-item';
                divPartido.setAttribute('data-partido-id', partido.id);
                
                divPartido.innerHTML = `
                    <div class="col-md-4">
                        <input type="text" class="form-control" value="${partido.equipoLocal}" readonly>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input type="number" min="0" class="form-control marcador-local" placeholder="Local" required>
                            <span class="input-group-text">-</span>
                            <input type="number" min="0" class="form-control marcador-visitante" placeholder="Visitante" required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" value="${partido.equipoVisitante}" readonly>
                    </div>
                `;
                
                pronosticosContainer.appendChild(divPartido);
            });
        });
    }

    // Modificar la función de registro de quiniela
    const registroQuinielaForm = document.getElementById('registro-quiniela-form');
    if (registroQuinielaForm) {
        registroQuinielaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar que haya una quiniela seleccionada
            const quinielaId = parseInt(seleccionarQuinielaSelect.value);
            if (!quinielaId) {
                alert('Debe seleccionar una quiniela');
                return;
            }
            
            // Buscar la quiniela seleccionada
            const quiniela = quinielas.find(q => q.id === quinielaId);
            if (!quiniela) return;
            
            // Recopilar datos del formulario
            const usuario = usuarioQuinielaInput.value;
            const fecha = fechaRegistroInput.value;
            const monto = document.getElementById('monto-pagado').value;
            
            // Verificar si la fecha de registro es posterior a la fecha de cierre
            const fechaRegistro = new Date(fecha);
            const fechaCierre = new Date(quiniela.fechaCierre);
            
            if (fechaRegistro > fechaCierre) {
                alert('La fecha de registro no puede ser posterior a la fecha de cierre');
                return;
            }
            
            // Recopilar pronósticos
            const pronosticos = [];
            const pronosticoItems = pronosticosContainer.querySelectorAll('.pronostico-item');
            pronosticoItems.forEach(item => {
                const partidoId = parseInt(item.getAttribute('data-partido-id'));
                const marcadorLocal = item.querySelector('.marcador-local').value;
                const marcadorVisitante = item.querySelector('.marcador-visitante').value;
                
                pronosticos.push({
                    partidoId,
                    marcadorLocal,
                    marcadorVisitante
                });
            });
            
            // Verificar si el usuario es nuevo para agregarlo a la lista
            if (usuariosRegistrados.indexOf(usuario) === -1) {
                usuariosRegistrados.push(usuario);
                
                // Agregar el nuevo usuario al datalist
                const option = document.createElement('option');
                option.value = usuario;
                usuariosList.appendChild(option);
                
                console.log('Nuevo usuario agregado: ' + usuario);
            }
            
            // Aquí se enviarían los datos al servidor en una aplicación real
            console.log('Quiniela registrada con éxito', {
                quiniela: {
                    id: quiniela.id,
                    torneo: quiniela.torneo,
                    jornada: quiniela.jornada
                },
                usuario,
                fecha,
                monto,
                pronosticos
            });
            
            alert('Quiniela registrada con éxito para ' + usuario);
            
            // Limpiar el formulario
            limpiarQuinielaBtn.click();
        });
    }

    // Función para limpiar el formulario de quiniela (modificada)
    if (limpiarQuinielaBtn) {
        limpiarQuinielaBtn.addEventListener('click', function() {
            // Reiniciar selección de quiniela
            if (seleccionarQuinielaSelect) seleccionarQuinielaSelect.value = '';
            
            // Ocultar datos de quiniela
            if (datosQuinielaDiv) datosQuinielaDiv.classList.add('d-none');
            
            // Limpiar usuario
            if (usuarioQuinielaInput) usuarioQuinielaInput.value = '';
            
            // Reiniciar fecha a hoy
            if (fechaRegistroInput) {
                const today = new Date().toISOString().split('T')[0];
                fechaRegistroInput.value = today;
            }
            
            // Limpiar pronósticos
            if (pronosticosContainer) {
                pronosticosContainer.innerHTML = '';
            }
            
            // Limpiar monto
            const montoInput = document.getElementById('monto-pagado');
            if (montoInput) montoInput.value = '';
        });
    }

    // Añadir una quiniela de ejemplo para pruebas
    function crearQuinielaEjemplo() {
        const ahora = new Date();
        const fechaCierre = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const quiniela = {
            id: 1,
            torneo: 'Liga MX',
            jornada: 'Jornada 16',
            fechaInicio: ahora.toISOString(),
            fechaCierre: fechaCierre.toISOString(),
            costo: '100',
            premio: '1000',
            partidos: [
                { id: 1, equipoLocal: 'América', equipoVisitante: 'Guadalajara' },
                { id: 2, equipoLocal: 'Cruz Azul', equipoVisitante: 'Pumas' },
                { id: 3, equipoLocal: 'Monterrey', equipoVisitante: 'Tigres' }
            ],
            activa: true
        };
        
        quinielas.push(quiniela);
        actualizarTablaQuinielas();
        actualizarSelectorQuinielas();
    }
    
    // Crear quiniela de ejemplo
    crearQuinielaEjemplo();

    // Botón para participar en la jornada desde la página de inicio
    const participarJornadaBtn = document.getElementById('participar-jornada');
    if (participarJornadaBtn) {
        participarJornadaBtn.addEventListener('click', function() {
            if (isLoggedIn) {
                // Si ya está logueado, mostrar la sección de quinielas activas
                showSection('ultimos-ganadores');  // Puedes cambiarlo a otra sección relevante
            } else {
                // Si no está logueado, redirigir al registro
                showSection('registrarse');
            }
        });
    }

    // Función para obtener partidos en vivo de la Liga MX
    async function obtenerPartidosLigaMX() {
        try {
            // Configuración de la API
            const apiKey = "demo_key";
            const apiSecret = "demo_secret";
            const competitionId = "45"; // Liga MX
            
            // URLs de las APIs
            const livescoreURL = `https://livescore-api.com/api-client/matches/live.json?competition_id=${competitionId}&key=${apiKey}&secret=${apiSecret}`;
            const fixturesURL = `https://livescore-api.com/api-client/fixtures/matches.json?competition_id=${competitionId}&key=${apiKey}&secret=${apiSecret}`;
            const historyURL = `https://livescore-api.com/api-client/scores/history.json?competition_id=${competitionId}&key=${apiKey}&secret=${apiSecret}`;
            const standingsURL = `https://livescore-api.com/api-client/leagues/table.json?competition_id=${competitionId}&key=${apiKey}&secret=${apiSecret}`;
            
            // Realizar las peticiones a la API
            let jornadaActual, proximasJornadas;
            
            try {
                // En producción, descomentar esto para usar la API real
                /*
                const [livescoreResp, fixturesResp, historyResp, standingsResp] = await Promise.all([
                    fetch(livescoreURL),
                    fetch(fixturesURL),
                    fetch(historyURL),
                    fetch(standingsURL)
                ]);
                
                const livescoreData = await livescoreResp.json();
                const fixturesData = await fixturesResp.json();
                const historyData = await historyResp.json();
                const standingsData = await standingsResp.json();
                
                // Procesar datos de los partidos en vivo
                jornadaActual = procesarPartidosEnVivo(livescoreData, historyData);
                
                // Procesar datos de los próximos partidos
                proximasJornadas = procesarFixturesYJornadas(fixturesData);
                */
                
                // Para desarrollo, simulamos datos
                jornadaActual = simularJornadaActual();
                proximasJornadas = simularProximasJornadas();
            } catch (error) {
                console.error("Error al obtener datos de la API:", error);
                // Si hay un error en la API, usamos datos simulados
                jornadaActual = simularJornadaActual();
                proximasJornadas = simularProximasJornadas();
            }
            
            // Actualizar la interfaz con los datos obtenidos
            actualizarInterfazJornadas(jornadaActual, proximasJornadas);
            
            // Iniciar actualización en vivo de marcadores
            iniciarActualizacionEnVivo();
            
            return true;
        } catch (error) {
            console.error('Error al obtener partidos en vivo:', error);
            return false;
        }
    }

    // Función para procesar partidos en vivo desde la API
    function procesarPartidosEnVivo(livescoreData, historyData) {
        const partidosEnVivo = livescoreData.data?.matches || [];
        const partidosRecientes = historyData.data?.match || [];
        
        // Combinar partidos en vivo y recientes para la jornada actual
        const partidos = [...partidosEnVivo];
        
        // Añadir algunos partidos recientes si no hay muchos en vivo
        if (partidos.length < 3 && partidosRecientes.length > 0) {
            partidos.push(...partidosRecientes.slice(0, 3 - partidos.length));
        }
        
        // Fecha actual formateada
        const fechaActual = new Date();
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const fechaFormateada = fechaActual.toLocaleDateString('es-MX', opciones);
        
        // Mapear los partidos al formato esperado por nuestra aplicación
        const partidosFormateados = partidos.map(partido => {
            // Calcular la fecha y hora del partido
            const fecha = partido.date || fechaFormateada;
            const hora = partido.time || "19:00";
            
            // Determinar el estado del partido
            let estado = "Programado";
            if (partido.status === "IN PLAY" || partido.status === "LIVE") {
                estado = "En vivo";
            } else if (partido.status === "FINISHED" || partido.status === "FT") {
                estado = "Finalizado";
            } else if (new Date(`${fecha} ${hora}`) < new Date(Date.now() + 3600000)) {
                estado = "Por comenzar";
            }
            
            // Formatear el resultado
            let resultado = "-";
            if (partido.score) {
                resultado = partido.score;
            } else if (partido.ht_score) {
                resultado = partido.ht_score; // Score al medio tiempo si no hay score final
            }
            
            return {
                fecha: `${fecha} ${hora}`,
                local: partido.home_name,
                visitante: partido.away_name,
                estadio: partido.location || `Estadio ${partido.home_name}`,
                estado: estado,
                resultado: resultado,
                id: partido.id || Math.random().toString(36).substring(2, 10)
            };
        });
        
        return {
            nombre: "Liga MX - Jornada Actual",
            fechaInicio: fechaFormateada,
            fechaFin: fechaFormateada,
            partidos: partidosFormateados
        };
    }

    // Función para procesar fixtures y organizarlos en jornadas
    function procesarFixturesYJornadas(fixturesData) {
        const fixtures = fixturesData.data?.fixtures || [];
        
        // Agrupar partidos por fecha
        const partidosPorFecha = {};
        fixtures.forEach(partido => {
            const fecha = partido.date;
            if (!partidosPorFecha[fecha]) {
                partidosPorFecha[fecha] = [];
            }
            partidosPorFecha[fecha].push(partido);
        });
        
        // Convertir fechas a objetos Date para ordenarlas
        const fechasOrdenadas = Object.keys(partidosPorFecha)
            .sort((a, b) => new Date(a) - new Date(b))
            .filter(fecha => new Date(fecha) >= new Date());
        
        // Crear las próximas jornadas (máximo 3)
        const proximasJornadas = [];
        for (let i = 0; i < Math.min(3, fechasOrdenadas.length); i++) {
            const fecha = fechasOrdenadas[i];
            const partidosFecha = partidosPorFecha[fecha];
            
            // Formatear partidos para esta jornada
            const partidosFormateados = partidosFecha.map(partido => {
                return {
                    fecha: `${partido.date} ${partido.time}`,
                    local: partido.home_name,
                    visitante: partido.away_name,
                    estadio: partido.location || `Estadio ${partido.home_name}`,
                    estado: "Programado",
                    resultado: "-",
                    id: partido.id || Math.random().toString(36).substring(2, 10)
                };
            });
            
            // Nombre de la jornada basado en su posición
            let nombreJornada = "Liga MX - Próxima Jornada";
            if (i === 1) nombreJornada = "Liga MX - Jornada Siguiente";
            if (i === 2) nombreJornada = "Liga MX - Futura Jornada";
            
            proximasJornadas.push({
                nombre: nombreJornada,
                fechaInicio: fecha,
                fechaFin: fecha,
                partidos: partidosFormateados
            });
        }
        
        // Si no hay suficientes jornadas futuras, añadimos algunas simuladas
        if (proximasJornadas.length < 3) {
            const jornadasSimuladas = simularProximasJornadas();
            proximasJornadas.push(...jornadasSimuladas.slice(0, 3 - proximasJornadas.length));
        }
        
        return proximasJornadas;
    }

    // Función para simular la jornada actual (cuando no hay API o hay error)
    function simularJornadaActual() {
        // Obtener fecha actual para mostrar como referencia
        const fechaActual = new Date();
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const fechaFormateada = fechaActual.toLocaleDateString('es-MX', opciones);
        
        return {
            nombre: "Liga MX - Jornada Actual",
            fechaInicio: fechaFormateada,
            fechaFin: fechaFormateada,
            partidos: [
                { 
                    fecha: fechaFormateada + " 19:00", 
                    local: "América", 
                    visitante: "Chivas", 
                    estadio: "Estadio Azteca",
                    estado: "En vivo",
                    resultado: "2-1"
                },
                { 
                    fecha: fechaFormateada + " 19:00", 
                    local: "Cruz Azul", 
                    visitante: "Pumas", 
                    estadio: "Estadio Azul",
                    estado: "Por comenzar",
                    resultado: "-"
                },
                { 
                    fecha: fechaFormateada + " 21:00", 
                    local: "Monterrey", 
                    visitante: "Tigres", 
                    estadio: "BBVA Bancomer",
                    estado: "En vivo",
                    resultado: "1-1"
                },
                { 
                    fecha: fechaFormateada + " 17:00", 
                    local: "Toluca", 
                    visitante: "Santos", 
                    estadio: "Nemesio Diez",
                    estado: "Por comenzar",
                    resultado: "-"
                },
                { 
                    fecha: fechaFormateada + " 19:00", 
                    local: "León", 
                    visitante: "Pachuca", 
                    estadio: "Nou Camp",
                    estado: "Por comenzar",
                    resultado: "-"
                }
            ]
        };
    }

    // Función para simular próximas jornadas (cuando no hay API o hay error)
    function simularProximasJornadas() {
        const fechaActual = new Date();
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
        
        return [
            {
                nombre: "Liga MX - Próxima Jornada",
                fechaInicio: sumarDias(fechaActual, 7),
                fechaFin: sumarDias(fechaActual, 9),
                partidos: [
                    { 
                        fecha: sumarDias(fechaActual, 7) + " 19:00", 
                        local: "Chivas", 
                        visitante: "Atlas", 
                        estadio: "Akron",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 8) + " 19:00", 
                        local: "Pumas", 
                        visitante: "América", 
                        estadio: "Olímpico Universitario",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 8) + " 21:00", 
                        local: "Tigres", 
                        visitante: "Monterrey", 
                        estadio: "Universitario",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 9) + " 19:00", 
                        local: "Santos", 
                        visitante: "Toluca", 
                        estadio: "TSM Corona",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 9) + " 21:00", 
                        local: "Pachuca", 
                        visitante: "León", 
                        estadio: "Hidalgo",
                        estado: "Programado",
                        resultado: "-"
                    }
                ]
            },
            {
                nombre: "Liga MX - Liguilla",
                fechaInicio: sumarDias(fechaActual, 14),
                fechaFin: sumarDias(fechaActual, 15),
                partidos: [
                    { 
                        fecha: sumarDias(fechaActual, 14) + " 19:00", 
                        local: "4° Lugar", 
                        visitante: "5° Lugar", 
                        estadio: "Por definir",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 14) + " 21:00", 
                        local: "3° Lugar", 
                        visitante: "6° Lugar", 
                        estadio: "Por definir",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 15) + " 19:00", 
                        local: "2° Lugar", 
                        visitante: "7° Lugar", 
                        estadio: "Por definir",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 15) + " 21:00", 
                        local: "1° Lugar", 
                        visitante: "8° Lugar", 
                        estadio: "Por definir",
                        estado: "Programado",
                        resultado: "-"
                    }
                ]
            },
            {
                nombre: "Liga MX - Final",
                fechaInicio: sumarDias(fechaActual, 21),
                fechaFin: sumarDias(fechaActual, 28),
                partidos: [
                    { 
                        fecha: sumarDias(fechaActual, 21) + " 20:00", 
                        local: "Finalista 1", 
                        visitante: "Finalista 2", 
                        estadio: "Estadio Finalista 1",
                        estado: "Programado",
                        resultado: "-"
                    },
                    { 
                        fecha: sumarDias(fechaActual, 28) + " 20:00", 
                        local: "Finalista 2", 
                        visitante: "Finalista 1", 
                        estadio: "Estadio Finalista 2",
                        estado: "Programado",
                        resultado: "-"
                    }
                ]
            }
        ];
    }

    // Función para formatear fechas
    function sumarDias(fecha, dias) {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() + dias);
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return nuevaFecha.toLocaleDateString('es-MX', opciones);
    }

    // Actualizar la interfaz con los datos de las jornadas
    function actualizarInterfazJornadas(jornadaActual, proximasJornadas) {
        // Actualizar el encabezado de la jornada actual
        const encabezadoJornada = document.querySelector('.card-header.bg-primary h5');
        const fechasJornada = document.querySelector('.card-header.bg-primary span');
        
        if (encabezadoJornada) encabezadoJornada.textContent = jornadaActual.nombre;
        if (fechasJornada) fechasJornada.textContent = `Fecha: ${jornadaActual.fechaInicio}`;
        
        // Actualizar la tabla de partidos actuales
        actualizarTablaPartidos(jornadaActual.partidos);
        
        // Actualizar la lista de jornadas
        actualizarListaJornadas(jornadaActual, proximasJornadas);
    }

    // Simulación de actualización en vivo
    function iniciarActualizacionEnVivo() {
        // Actualizar los marcadores cada cierto tiempo
        const intervalId = setInterval(() => {
            const partidosEnVivo = document.querySelectorAll('.partido-en-vivo');
            
            partidosEnVivo.forEach(fila => {
                const resultadoCell = fila.querySelector('td:nth-child(3)');
                if (resultadoCell) {
                    const resultado = resultadoCell.textContent;
                    
                    // Simular cambios en el marcador
                    if (Math.random() < 0.2) { // 20% de probabilidad de cambio
                        const [golesLocal, golesVisitante] = resultado.split('-').map(num => parseInt(num));
                        
                        // Decidir si el gol es del equipo local o visitante
                        if (Math.random() < 0.5) {
                            resultadoCell.textContent = `${golesLocal + 1}-${golesVisitante}`;
                        } else {
                            resultadoCell.textContent = `${golesLocal}-${golesVisitante + 1}`;
                        }
                        
                        // Efecto visual para el cambio
                        resultadoCell.classList.add('marcador-actualizado');
                        setTimeout(() => {
                            resultadoCell.classList.remove('marcador-actualizado');
                        }, 2000);
                    }
                }
            });
        }, 30000); // Actualizar cada 30 segundos
        
        // Limpiar el intervalo cuando el usuario cambia de página
        window.addEventListener('beforeunload', () => {
            clearInterval(intervalId);
        });
    }

    // Actualizar la tabla de partidos
    function actualizarTablaPartidos(partidos) {
        const tablaPartidos = document.getElementById('proximos-partidos');
        if (!tablaPartidos) return;
        
        tablaPartidos.innerHTML = '';
        
        partidos.forEach(partido => {
            const fila = document.createElement('tr');
            
            // Aplicar clase especial si el partido está en vivo
            if (partido.estado === 'En vivo') {
                fila.classList.add('partido-en-vivo');
            }
            
            fila.innerHTML = `
                <td>${partido.fecha}</td>
                <td>${partido.local}</td>
                <td class="text-center fw-bold">${partido.resultado}</td>
                <td>${partido.visitante}</td>
                <td>${partido.estadio}</td>
                <td><span class="badge ${partido.estado === 'En vivo' ? 'bg-danger' : partido.estado === 'Por comenzar' ? 'bg-warning text-dark' : 'bg-secondary'}">${partido.estado}</span></td>
            `;
            
            tablaPartidos.appendChild(fila);
        });

        // Intentar obtener y mostrar la tabla de posiciones
        mostrarTablaClasificacion();
    }

    // Función para mostrar la tabla de clasificación
    function mostrarTablaClasificacion() {
        const tablaContainer = document.getElementById('tabla-posiciones-container');
        if (!tablaContainer) return;
        
        // Verificar si ya existe una tabla de posiciones
        if (tablaContainer.querySelector('table')) return;
        
        // En producción, esto se obtendría de la API
        const equiposTabla = obtenerTablaSimulada();
        
        // Crear la tabla
        const tablaHtml = document.createElement('div');
        tablaHtml.innerHTML = `
            <h5 class="mt-4 mb-3">Tabla de Posiciones</h5>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>Pos</th>
                            <th>Equipo</th>
                            <th>J</th>
                            <th>G</th>
                            <th>E</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GC</th>
                            <th>DG</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${equiposTabla.map((equipo, index) => `
                            <tr class="${index < 4 ? 'table-success' : index > 13 ? 'table-danger' : ''}">
                                <td>${index + 1}</td>
                                <td>${equipo.nombre}</td>
                                <td>${equipo.jugados}</td>
                                <td>${equipo.ganados}</td>
                                <td>${equipo.empatados}</td>
                                <td>${equipo.perdidos}</td>
                                <td>${equipo.golesFavor}</td>
                                <td>${equipo.golesContra}</td>
                                <td>${equipo.diferenciaGoles}</td>
                                <td class="fw-bold">${equipo.puntos}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        tablaContainer.appendChild(tablaHtml);
    }

    // Función para obtener una tabla de posiciones simulada
    function obtenerTablaSimulada() {
        return [
            { 
                nombre: "América", 
                jugados: 14, 
                ganados: 10, 
                empatados: 3, 
                perdidos: 1, 
                golesFavor: 28, 
                golesContra: 12, 
                diferenciaGoles: 16, 
                puntos: 33 
            },
            { 
                nombre: "Tigres UANL", 
                jugados: 14, 
                ganados: 9, 
                empatados: 3, 
                perdidos: 2, 
                golesFavor: 25, 
                golesContra: 14, 
                diferenciaGoles: 11, 
                puntos: 30 
            },
            { 
                nombre: "Monterrey", 
                jugados: 14, 
                ganados: 8, 
                empatados: 4, 
                perdidos: 2, 
                golesFavor: 23, 
                golesContra: 13, 
                diferenciaGoles: 10, 
                puntos: 28 
            },
            { 
                nombre: "Cruz Azul", 
                jugados: 14, 
                ganados: 8, 
                empatados: 3, 
                perdidos: 3, 
                golesFavor: 21, 
                golesContra: 15, 
                diferenciaGoles: 6, 
                puntos: 27 
            },
            { 
                nombre: "Toluca", 
                jugados: 14, 
                ganados: 7, 
                empatados: 3, 
                perdidos: 4, 
                golesFavor: 19, 
                golesContra: 15, 
                diferenciaGoles: 4, 
                puntos: 24 
            },
            { 
                nombre: "León", 
                jugados: 14, 
                ganados: 6, 
                empatados: 4, 
                perdidos: 4, 
                golesFavor: 18, 
                golesContra: 16, 
                diferenciaGoles: 2, 
                puntos: 22 
            },
            { 
                nombre: "Pumas UNAM", 
                jugados: 14, 
                ganados: 6, 
                empatados: 3, 
                perdidos: 5, 
                golesFavor: 17, 
                golesContra: 16, 
                diferenciaGoles: 1, 
                puntos: 21 
            },
            { 
                nombre: "Chivas", 
                jugados: 14, 
                ganados: 5, 
                empatados: 5, 
                perdidos: 4, 
                golesFavor: 16, 
                golesContra: 15, 
                diferenciaGoles: 1, 
                puntos: 20 
            },
            { 
                nombre: "Pachuca", 
                jugados: 14, 
                ganados: 5, 
                empatados: 5, 
                perdidos: 4, 
                golesFavor: 15, 
                golesContra: 15, 
                diferenciaGoles: 0, 
                puntos: 20 
            },
            { 
                nombre: "Santos Laguna", 
                jugados: 14, 
                ganados: 5, 
                empatados: 3, 
                perdidos: 6, 
                golesFavor: 14, 
                golesContra: 15, 
                diferenciaGoles: -1, 
                puntos: 18 
            },
            { 
                nombre: "Atlas", 
                jugados: 14, 
                ganados: 4, 
                empatados: 5, 
                perdidos: 5, 
                golesFavor: 15, 
                golesContra: 17, 
                diferenciaGoles: -2, 
                puntos: 17 
            },
            { 
                nombre: "Tijuana", 
                jugados: 14, 
                ganados: 4, 
                empatados: 3, 
                perdidos: 7, 
                golesFavor: 12, 
                golesContra: 18, 
                diferenciaGoles: -6, 
                puntos: 15 
            },
            { 
                nombre: "Necaxa", 
                jugados: 14, 
                ganados: 3, 
                empatados: 5, 
                perdidos: 6, 
                golesFavor: 12, 
                golesContra: 18, 
                diferenciaGoles: -6, 
                puntos: 14 
            },
            { 
                nombre: "Puebla", 
                jugados: 14, 
                ganados: 3, 
                empatados: 4, 
                perdidos: 7, 
                golesFavor: 12, 
                golesContra: 19, 
                diferenciaGoles: -7, 
                puntos: 13 
            },
            { 
                nombre: "Mazatlán FC", 
                jugados: 14, 
                ganados: 3, 
                empatados: 3, 
                perdidos: 8, 
                golesFavor: 10, 
                golesContra: 20, 
                diferenciaGoles: -10, 
                puntos: 12 
            },
            { 
                nombre: "Querétaro", 
                jugados: 14, 
                ganados: 2, 
                empatados: 5, 
                perdidos: 7, 
                golesFavor: 9, 
                golesContra: 18, 
                diferenciaGoles: -9, 
                puntos: 11 
            },
            { 
                nombre: "Atlético San Luis", 
                jugados: 14, 
                ganados: 2, 
                empatados: 4, 
                perdidos: 8, 
                golesFavor: 11, 
                golesContra: 21, 
                diferenciaGoles: -10, 
                puntos: 10 
            },
            { 
                nombre: "FC Juárez", 
                jugados: 14, 
                ganados: 2, 
                empatados: 2, 
                perdidos: 10, 
                golesFavor: 8, 
                golesContra: 22, 
                diferenciaGoles: -14, 
                puntos: 8 
            }
        ];
    }

    // Actualizar la lista de próximas jornadas
    function actualizarListaJornadas(jornadaActual, proximasJornadas) {
        const listaJornadasContainer = document.querySelector('.list-group');
        if (!listaJornadasContainer) return;
        
        listaJornadasContainer.innerHTML = '';
        
        // Añadir la jornada actual como primer elemento
        const itemJornadaActual = document.createElement('li');
        itemJornadaActual.className = 'list-group-item d-flex justify-content-between align-items-center active';
        itemJornadaActual.innerHTML = `
            ${jornadaActual.nombre}
            <span class="badge bg-danger rounded-pill">En vivo</span>
        `;
        itemJornadaActual.addEventListener('click', () => {
            actualizarTablaPartidos(jornadaActual.partidos);
            
            // Actualizar clases de los elementos de la lista
            document.querySelectorAll('.list-group-item').forEach(item => {
                item.classList.remove('active');
            });
            itemJornadaActual.classList.add('active');
            
            // Actualizar encabezado
            const encabezadoJornada = document.querySelector('.card-header.bg-primary h5');
            const fechasJornada = document.querySelector('.card-header.bg-primary span');
            
            if (encabezadoJornada) encabezadoJornada.textContent = jornadaActual.nombre;
            if (fechasJornada) fechasJornada.textContent = `Fecha: ${jornadaActual.fechaInicio}`;
        });
        listaJornadasContainer.appendChild(itemJornadaActual);
        
        // Añadir las próximas jornadas
        proximasJornadas.forEach((jornada, index) => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                ${jornada.nombre}
                <span class="badge bg-secondary rounded-pill">Próxima</span>
            `;
            
            item.addEventListener('click', () => {
                actualizarTablaPartidos(jornada.partidos);
                
                // Actualizar clases de los elementos de la lista
                document.querySelectorAll('.list-group-item').forEach(item => {
                    item.classList.remove('active');
                });
                item.classList.add('active');
                
                // Actualizar encabezado
                const encabezadoJornada = document.querySelector('.card-header.bg-primary h5');
                const fechasJornada = document.querySelector('.card-header.bg-primary span');
                
                if (encabezadoJornada) encabezadoJornada.textContent = jornada.nombre;
                if (fechasJornada) fechasJornada.textContent = `del ${jornada.fechaInicio} al ${jornada.fechaFin}`;
            });
            
            listaJornadasContainer.appendChild(item);
        });
    }

    // Cargar los partidos en vivo al iniciar la página
    obtenerPartidosLigaMX();

    // Función para actualizar la tabla de usuarios registrados
    function actualizarTablaUsuarios() {
        const tablaUsuarios = document.getElementById('tabla-usuarios');
        if (!tablaUsuarios) return;
        
        const tbody = tablaUsuarios.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Agregar cada usuario a la tabla
        usuariosRegistrados.forEach((usuario, index) => {
            const tr = document.createElement('tr');
            
            // Determinar si es administrador o usuario regular
            const esAdmin = usuario === 'AdminBadger';
            const estado = esAdmin ? 
                '<span class="badge bg-danger">Administrador</span>' : 
                '<span class="badge bg-success">Usuario</span>';
            
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${usuario}</td>
                <td>${estado}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    // Actualizar la tabla de usuarios cuando se muestra la sección de tesorería
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#tesoreria') {
            link.addEventListener('click', function() {
                // Esta función se ejecutará cada vez que se haga clic en el enlace de tesorería
                actualizarTablaUsuarios();
            });
        }
    });
    
    // También actualizar usuarios al iniciar sesión como administrador
    if (loginForm) {
        const originalSubmitHandler = loginForm.onsubmit;
        loginForm.addEventListener('submit', function() {
            // Si el usuario es administrador, actualizar la tabla de usuarios
            if (document.getElementById('login-usuario').value === 'AdminBadger') {
                setTimeout(actualizarTablaUsuarios, 500); // pequeña demora para asegurar que el DOM esté actualizado
            }
        });
    }

    // Mostrar la sección inicial por defecto
    showSection(currentSection);

    // Detectar cambios en el hash de la URL
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        showSection(hash);
    });
}); 