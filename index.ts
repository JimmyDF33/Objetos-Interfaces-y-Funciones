import { stdin, stdout } from 'process';

// 2. Interface Task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

function preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
        stdout.write(pregunta);
        stdin.resume();
        stdin.once('data', (data) => {
            stdin.pause();
            resolve(data.toString().trim());
        });
    });
}

async function main() {
    // 3. Cambiar el tipado del arreglo principal a Task[] y declarar contador global
    const tareas: Task[] = [];
    let nextId: number = 1;
    let continuar: boolean = true;

    // 4. Arrow functions para cada acción
    const addTask = (title: string): void => {
        if (title !== "") {
            const nuevaTarea: Task = {
                id: nextId++,
                title: title,
                completed: false
            };
            tareas.push(nuevaTarea);
            console.log(`¡Tarea "${nuevaTarea.title}" agregada con éxito! (ID: ${nuevaTarea.id})`);
        } else {
            console.log("El título no puede estar vacío.");
        }
    };

    const removeTask = (): void => {
        if (tareas.length > 0) {
            const eliminada = tareas.pop();
            if (eliminada) {
                console.log(`Eliminada la última tarea: "${eliminada.title}" (ID: ${eliminada.id})`);
            }
        } else {
            console.log("No hay tareas para eliminar.");
        }
    };

    const listTasks = (): void => {
        console.log("\n--- Lista de Tareas ---");
        if (tareas.length === 0) {
            console.log("No hay tareas registradas.");
        } else {
            for (let i = 0; i < tareas.length; i++) {
                const t = tareas[i];
                const estado = t.completed ? "completed" : "pending";
                console.log(`[${t.id}] ${t.title} - ${estado}`);
            }
        }
    };

    console.log("=== GESTOR DE TAREAS INTERACTIVO (CON INTERFACES) ===");

    while (continuar) {
        console.log("\n--- Menú de Opciones ---");
        console.log("1. Agregar tarea");
        console.log("2. Eliminar última tarea");
        console.log("3. Listar tareas");
        console.log("4. Salir");

        const opcion = await preguntar("\nSelecciona una opción (1-4): ");

        switch (opcion) {
            case "1": {
                const tituloInput = await preguntar("Escribe el título de la tarea: ");
                addTask(tituloInput);
                break;
            }
            case "2": {
                removeTask();
                break;
            }
            case "3": {
                listTasks();
                break;
            }
            case "4": {
                console.log("Saliendo del programa... ¡Buen día!");
                continuar = false;
                break;
            }
            default:
                console.log("Opción inválida. Por favor, elige un número del 1 al 4.");
                break;
        }
    }
}

main();
