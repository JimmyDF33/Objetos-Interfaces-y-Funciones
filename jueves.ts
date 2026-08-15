import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Interface Task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Arreglo principal y contador global de IDs
const tasks: Task[] = [];
let idCounter = 1;

// Arrow functions para acciones básicas y nuevos métodos funcionales
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

const markCompleted = (idToComplete: number): void => {
    const task = tasks.find(t => t.id === idToComplete);

    if (task) {
        task.completed = true;
        console.log(`\nTarea "${task.title}" marcada como completada.`);
    } else {
        console.log(`\nNo se encontró ninguna tarea con el ID: ${idToComplete}`);
    }
};

const filterPending = (): Task[] => {
    return tasks.filter(task => !task.completed);
};

const filterCompleted = (): Task[] => {
    return tasks.filter(task => task.completed);
};

const printTasksList = (tasksToPrint: Task[]): void => {
    if (tasksToPrint.length === 0) {
        console.log('\nNo hay tareas en esta lista.');
        return;
    }

    // Usando .map() para transformar el arreglo de objetos a strings formateados con desestructuración
    const formattedTasks = tasksToPrint.map(task => {
        const { id, title, completed } = task;
        const status = completed ? 'completed' : 'pending';
        return `[${id}] ${title} - ${status}`;
    });

    // Usando .forEach() para imprimir cada elemento
    formattedTasks.forEach(formattedTask => {
        console.log(formattedTask);
    });
};

const listTasks = (): void => {
    console.log('\n--- Lista de Todas las Tareas ---');
    printTasksList(tasks);
};

const showPendingTasks = (): void => {
    console.log('\n--- Tareas Pendientes ---');
    printTasksList(filterPending());
};

const showCompletedTasks = (): void => {
    console.log('\n--- Tareas Completadas ---');
    printTasksList(filterCompleted());
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

// Ciclo principal del menú actualizado
const showMenu = (): void => {
    console.log('\n1. Agregar tarea');
    console.log('2. Listar todas las tareas');
    console.log('3. Marcar tarea como completada');
    console.log('4. Ver tareas pendientes');
    console.log('5. Ver tareas completadas');
    console.log('6. Eliminar tarea');
    console.log('7. Salir');
    
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
                rl.question('Introduce el ID de la tarea a completar: ', (idInput: string) => {
                    const id = parseInt(idInput.trim(), 10);
                    if (isNaN(id)) {
                        console.log('\nPor favor, introduce un ID numérico válido.');
                    } else {
                        markCompleted(id);
                    }
                    showMenu();
                });
                break;

            case '4':
                showPendingTasks();
                showMenu();
                break;

            case '5':
                showCompletedTasks();
                showMenu();
                break;
                
            case '6':
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
                
            case '7':
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
