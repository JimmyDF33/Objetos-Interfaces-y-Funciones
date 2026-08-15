import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 2. Interface Task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// 3. Tipado del arreglo principal y contador global de IDs
const tasks: Task[] = [];
let idCounter = 1;

// 4. Arrow functions para cada acción
const addTask = (title: string): void => {
    const newTask: Task = {
        id: idCounter,
        title: title,
        completed: false
    };
    tasks.push(newTask);
    idCounter++; 
    console.log(`\nTarea "${title}" agregada correctamente.`);
};

const listTasks = (): void => {
    if (tasks.length === 0) {
        console.log('\nNo hay tareas en la lista.');
        return;
    }

    console.log('\n--- Lista de Tareas ---');
    tasks.forEach(task => {
        const status = task.completed ? 'completed' : 'pending';
        console.log(`[${task.id}] ${task.title} - ${status}`);
    });
};

const removeTask = (idToRemove: number): void => {
    const taskIndex = tasks.findIndex(task => task.id === idToRemove);

    if (taskIndex !== -1) {
        const removedTask = tasks.splice(taskIndex, 1)[0];
        console.log(`\nTarea "${removedTask.title}" eliminada correctamente.`);
    } else {
        console.log(`\nNo se encontró ninguna tarea con el ID: ${idToRemove}`);
    }
};

// Ciclo principal del menú (Corregido para evitar errores de sobrecarga 2769)
const showMenu = (): void => {
    console.log('\n1. Agregar tarea');
    console.log('2. Listar tareas');
    console.log('3. Eliminar tarea');
    console.log('4. Salir');
    
    rl.question('\nSelecciona una opción: ', (answer: string) => {
        switch (answer.trim()) {
            case '1':
                rl.question('Introduce el título de la tarea: ', (title: string) => {
                    addTask(title.trim());
                    showMenu();
                });
                break;
                
            case '2':
                listTasks();
                showMenu();
                break;
                
            case '3':
                rl.question('Introduce el ID de la tarea a eliminar: ', (idInput: string) => {
                    const id = parseInt(idInput.trim(), 10);
                    if (isNaN(id)) {
                        console.log('\nPor favor, introduce un ID numérico válido.');
                    } else {
                        removeTask(id);
                    }
                    showMenu();
                });
                break;
                
            case '4':
                console.log('\n¡Hasta luego!');
                rl.close();
                break;
                
            default:
                console.log('\nOpción no válida. Intenta de nuevo.');
                showMenu();
                break;
        }
    });
};

// Iniciar la aplicación
showMenu();
