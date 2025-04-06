// Firebase Module - Configuración y funciones de Firebase

// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuración de Firebase
// Reemplaza estos valores con tu propia configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Objeto para almacenar el estado de autenticación
let currentUser = null;

// Función para registrar un nuevo usuario
export async function registrarUsuario(nombre, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Actualizar el perfil del usuario con su nombre
        await updateProfile(userCredential.user, {
            displayName: nombre
        });
        
        // Guardar datos adicionales en Firestore
        await addDoc(collection(db, "usuarios"), {
            uid: userCredential.user.uid,
            nombre: nombre,
            email: email,
            rol: "usuario" // Por defecto, todos son usuarios normales
        });
        
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Función para iniciar sesión
export async function iniciarSesion(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Obtener información adicional del usuario desde Firestore
        const q = query(collection(db, "usuarios"), where("uid", "==", userCredential.user.uid));
        const querySnapshot = await getDocs(q);
        
        // Si encontramos el documento del usuario
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            currentUser = {
                ...userCredential.user,
                rol: userData.rol
            };
        } else {
            currentUser = userCredential.user;
        }
        
        return {
            success: true,
            user: currentUser
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Función para cerrar sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        currentUser = null;
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Función para obtener usuario actual
export function obtenerUsuarioActual() {
    return currentUser;
}

// Función para escuchar cambios en el estado de autenticación
export function observarEstadoAutenticacion(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Si el usuario está autenticado, obtener su información adicional
            const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                currentUser = {
                    ...user,
                    rol: userData.rol
                };
            } else {
                currentUser = user;
            }
        } else {
            currentUser = null;
        }
        
        callback(currentUser);
    });
}

// Funciones para gestionar quinielas en Firestore
export async function crearQuiniela(quinielaData) {
    try {
        const docRef = await addDoc(collection(db, "quinielas"), {
            ...quinielaData,
            createdAt: new Date()
        });
        return {
            success: true,
            id: docRef.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

export async function obtenerQuinielas() {
    try {
        const querySnapshot = await getDocs(collection(db, "quinielas"));
        const quinielas = [];
        querySnapshot.forEach((doc) => {
            quinielas.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return {
            success: true,
            quinielas
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Exportar las instancias de Firebase para uso en otros módulos
export { auth, db }; 