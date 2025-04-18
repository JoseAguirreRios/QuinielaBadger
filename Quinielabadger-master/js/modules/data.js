// Data Module - Gestión del estado y datos de la aplicación

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
    { username: 'Andres', password: 'Yare2903' },
    { username: 'AdminBadger', password: 'AdminBadger2025' }
];

// Lista de quinielas
const quinielas = [];

// Exportar los datos para uso en otros módulos
export { state, usuariosRegistrados, quinielas };

// Funciones para gestionar los datos
export function updateState(key, value) {
    state[key] = value;
    return state;
}

// Función para añadir un nuevo usuario
export function addUser(userData) {
    usuariosRegistrados.push(userData);
    return usuariosRegistrados;
}

// Función para añadir una nueva quiniela
export function addQuiniela(quinielaData) {
    quinielas.push(quinielaData);
    return quinielas;
}

// Función para buscar un usuario por nombre de usuario
export function findUserByUsername(username) {
    return usuariosRegistrados.find(user => user.username === username);
}

// Función para verificar si un usuario ya existe
export function userExists(username) {
    return usuariosRegistrados.some(user => user.username === username);
}

// Versión simplificada de la función
function cargarUltimaQuinielaDisponible() {
    // Obtener quinielas de localStorage (método simple)
    const quinielas = JSON.parse(localStorage.getItem('quinielas') || '[]');
    
    // Verificar si hay quinielas
    if (quinielas.length === 0) {
        document.getElementById('sin-quinielas-disponibles').classList.remove('d-none');
        document.getElementById('ultima-quiniela-container').classList.add('d-none');
        return;
    }
    
    // Ordenar por número (más reciente primero)
    quinielas.sort((a, b) => b.numero - a.numero);
    
    // Obtener la última quiniela
    const ultimaQuiniela = quinielas[0];
    
    // Mostrar contenedor y ocultar mensaje
    document.getElementById('sin-quinielas-disponibles').classList.add('d-none');
    document.getElementById('ultima-quiniela-container').classList.remove('d-none');
    
    // Cargar datos básicos
    document.getElementById('numero-ultima-quiniela').textContent = ultimaQuiniela.numero;
    document.getElementById('nombre-ultima-quiniela').textContent = ultimaQuiniela.nombre;
    document.getElementById('info-nombre-quiniela').textContent = ultimaQuiniela.nombre;
    
    // Cargar fechas y más información
    document.getElementById('info-fecha-inicio').textContent = new Date(ultimaQuiniela.fechaInicio).toLocaleDateString();
    document.getElementById('info-fecha-fin').textContent = new Date(ultimaQuiniela.fechaFin).toLocaleDateString();
    document.getElementById('info-costo').textContent = ultimaQuiniela.costo ? '$' + ultimaQuiniela.costo : 'Gratuita';
    
    // Cargar premios
    document.getElementById('info-premio-primero').textContent = ultimaQuiniela.premios?.primero || 'No especificado';
    document.getElementById('info-premio-segundo').textContent = ultimaQuiniela.premios?.segundo || 'No especificado';
    document.getElementById('info-premio-tercero').textContent = ultimaQuiniela.premios?.tercero || 'No especificado';
    
    // Cargar partidos y pronósticos
    cargarPartidosParaPronosticosUsuario(ultimaQuiniela);
    configurarGuardadoPronosticos(ultimaQuiniela);
}
