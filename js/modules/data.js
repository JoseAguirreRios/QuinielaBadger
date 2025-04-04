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
    { username: 'Juan López', password: 'juan123' },
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
