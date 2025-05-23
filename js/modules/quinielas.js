// Quinielas Module - Gestión de quinielas y partidos

import { quinielas, usuariosRegistrados, addQuiniela } from './data.js';

// Referencias a elementos del DOM
let agregarPartidoBtn;
let pronosticosContainer;
let limpiarQuinielaBtn;
let usuarioQuinielaInput;
let usuariosList;
let crearQuinielaForm;
let crearPartidosContainer;
let agregarPartidoCrearBtn;
let limpiarCrearQuinielaBtn;
let tablaQuinielasActivas;
let seleccionarQuinielaSelect;
let datosQuinielaDiv;
let infoTorneoSpan;
let infoJornadaSpan;
let infoCierreSpan;
let infoCostoSpan;

// Inicializar la gestión de quinielas
export function initQuinielas() {
    // Elementos para registro de quinielas
    agregarPartidoBtn = document.getElementById('agregar-partido');
    pronosticosContainer = document.getElementById('pronosticos-container');
    limpiarQuinielaBtn = document.getElementById('limpiar-quiniela');
    usuarioQuinielaInput = document.getElementById('usuario-quiniela');
    usuariosList = document.getElementById('usuarios-list');
    
    // Elementos para crear quinielas
    crearQuinielaForm = document.getElementById('crear-quiniela-form');
    crearPartidosContainer = document.getElementById('crear-partidos-container');
    agregarPartidoCrearBtn = document.getElementById('agregar-partido-crear');
    limpiarCrearQuinielaBtn = document.getElementById('limpiar-crear-quiniela');
    tablaQuinielasActivas = document.getElementById('tabla-quinielas-activas');
    
    // Elementos para registro de quinielas
    seleccionarQuinielaSelect = document.getElementById('seleccionar-quiniela');
    datosQuinielaDiv = document.getElementById('datos-quiniela');
    infoTorneoSpan = document.getElementById('info-torneo');
    infoJornadaSpan = document.getElementById('info-jornada');
    infoCierreSpan = document.getElementById('info-cierre');
    infoCostoSpan = document.getElementById('info-costo');

    // Configurar el botón para agregar partidos
    if (agregarPartidoBtn && pronosticosContainer) {
        agregarPartidoBtn.addEventListener('click', agregarPartido);
        
        // Configurar el botón eliminar para el primer elemento
        const deleteButtons = document.querySelectorAll('.eliminar-partido');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', eliminarPartido);
        });
    }

    // Autocompletado para usuarios en el registro de quinielas
    if (usuarioQuinielaInput && usuariosList) {
        // Llenar la lista de datalist con usuarios registrados
        usuariosRegistrados.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.username;
            usuariosList.appendChild(option);
        });

        // Guardamos el valor del usuario para verificar si es nuevo
        usuarioQuinielaInput.addEventListener('input', buscarUsuario);
    }

    // Función para limpiar el formulario de quiniela
    if (limpiarQuinielaBtn) {
        limpiarQuinielaBtn.addEventListener('click', limpiarQuiniela);
    }
    
    // Configurar eventos para crear quinielas
    if (crearQuinielaForm) {
        crearQuinielaForm.addEventListener('submit', crearQuiniela);
    }
    
    if (agregarPartidoCrearBtn && crearPartidosContainer) {
        agregarPartidoCrearBtn.addEventListener('click', agregarPartidoCrear);
    }
    
    if (limpiarCrearQuinielaBtn) {
        limpiarCrearQuinielaBtn.addEventListener('click', limpiarCrearQuiniela);
    }
    
    // Configurar eventos para visualizar quinielas
    if (seleccionarQuinielaSelect) {
        seleccionarQuinielaSelect.addEventListener('change', mostrarDatosQuiniela);
    }
}

// Función para agregar partidos en el formulario de registro de quinielas
function agregarPartido() {
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
        deleteBtn.addEventListener('click', eliminarPartido);
    }
    
    // Agregar el nuevo elemento al contenedor
    pronosticosContainer.appendChild(newItem);
}

// Función para eliminar un partido
function eliminarPartido() {
    const items = pronosticosContainer.querySelectorAll('.pronostico-item');
    if (items.length > 1) {
        this.closest('.pronostico-item').remove();
    } else {
        alert('Debe haber al menos un partido en la quiniela');
    }
}

// Función para buscar usuarios mientras se escribe
function buscarUsuario() {
    const inputValue = this.value.trim();
    
    // Aquí podríamos hacer una llamada a una API para buscar usuarios
    // que coincidan con lo que el administrador está escribiendo
    console.log('Buscando usuario: ' + inputValue);
}

// Función para limpiar el formulario de quiniela
function limpiarQuiniela() {
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
        
        const firstItem = pronosticosContainer.querySelector('.pronostico-item');
        if (firstItem) {
            firstItem.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        }
    }
}

// Función para crear una nueva quiniela
function crearQuiniela(e) {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const torneo = document.getElementById('crear-torneo').value;
    const jornada = document.getElementById('crear-jornada').value;
    const fechaCierre = document.getElementById('crear-fecha-cierre').value;
    const costo = document.getElementById('crear-costo').value;
    
    // Obtener los partidos
    const partidos = [];
    const partidosItems = crearPartidosContainer.querySelectorAll('.partido-item');
    
    partidosItems.forEach(item => {
        const local = item.querySelector('.equipo-local').value;
        const visitante = item.querySelector('.equipo-visitante').value;
        const fecha = item.querySelector('.fecha-partido').value;
        const hora = item.querySelector('.hora-partido').value;
        
        partidos.push({
            local,
            visitante,
            fecha,
            hora,
            resultado: null // Resultado inicial nulo
        });
    });
    
    // Crear objeto quiniela
    const quiniela = {
        id: Date.now().toString(), // Usar timestamp como ID único
        torneo,
        jornada,
        fechaCierre,
        costo,
        partidos,
        pronosticos: [], // Inicialmente sin pronósticos
        fechaCreacion: new Date().toISOString(),
        estado: 'activa'
    };
    
    // Añadir la quiniela a la lista
    addQuiniela(quiniela);
    
    // Actualizar la tabla de quinielas activas
    actualizarTablaQuinielas();
    
    // Limpiar el formulario
    limpiarCrearQuiniela();
    
    alert('¡Quiniela creada con éxito!');
}

// Función para agregar un partido al formulario de crear quiniela
function agregarPartidoCrear() {
    // Implementación similar a agregarPartido()
    console.log('Agregar partido a crear quiniela');
}

// Función para limpiar el formulario de crear quiniela
function limpiarCrearQuiniela() {
    // Implementación similar a limpiarQuiniela()
    console.log('Limpiar formulario de crear quiniela');
}

// Función para actualizar la tabla de quinielas activas
function actualizarTablaQuinielas() {
    if (!tablaQuinielasActivas) return;
    
    // Limpiar tabla actual
    tablaQuinielasActivas.innerHTML = '';
    
    // Crear las filas para cada quiniela
    quinielas.forEach(quiniela => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${quiniela.torneo}</td>
            <td>${quiniela.jornada}</td>
            <td>${quiniela.fechaCierre}</td>
            <td>$${quiniela.costo}</td>
            <td>${quiniela.partidos.length}</td>
            <td>${quiniela.pronosticos.length}</td>
            <td>
                <button class="btn btn-sm btn-primary ver-quiniela" data-id="${quiniela.id}">
                    <i class="bi bi-eye"></i> Ver
                </button>
                <button class="btn btn-sm btn-danger eliminar-quiniela" data-id="${quiniela.id}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        
        tablaQuinielasActivas.appendChild(row);
    });
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.ver-quiniela').forEach(btn => {
        btn.addEventListener('click', function() {
            const quinielaId = this.getAttribute('data-id');
            verQuiniela(quinielaId);
        });
    });
    
    document.querySelectorAll('.eliminar-quiniela').forEach(btn => {
        btn.addEventListener('click', function() {
            const quinielaId = this.getAttribute('data-id');
            eliminarQuiniela(quinielaId);
        });
    });
}

// Función para mostrar los datos de una quiniela seleccionada
function mostrarDatosQuiniela() {
    // Implementación para mostrar datos de quiniela seleccionada
    console.log('Mostrar datos de quiniela seleccionada');
}

// Función para ver detalles de una quiniela
function verQuiniela(quinielaId) {
    // Implementación para ver detalles de quiniela
    console.log('Ver quiniela con ID:', quinielaId);
}

// Función para eliminar una quiniela
function eliminarQuiniela(quinielaId) {
    // Implementación para eliminar quiniela
    console.log('Eliminar quiniela con ID:', quinielaId);
}
