import { stdin, stdout } from 'process';

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
    const tareas: string[] = [];
    let continuar: boolean = true;

    console.log("=== GESTOR DE TAREAS INTERACTIVO ===");

    while (continuar) {
        console.log("\n--- Menú de Opciones ---");
        console.log("1. Agregar tarea");
        console.log("2. Eliminar última tarea");
        console.log("3. Listar tareas");
        console.log("4. Salir");

        const opcion = await preguntar("\nSelecciona una opción (1-4): ");

        switch (opcion) {
            case "1": {
                const nuevaTarea = await preguntar("Escribe el título de la tarea: ");
                if (nuevaTarea !== "") {
                    tareas.push(nuevaTarea);
                    console.log(`¡Tarea "${nuevaTarea}" agregada con éxito!`);
                } else {
                    console.log("El título no puede estar vacío.");
                }
                break;
            }
            case "2": {
                if (tareas.length > 0) {
                    const eliminada = tareas.pop();
                    console.log(`Eliminada la última tarea: "${eliminada}"`);
                } else {
                    console.log("No hay tareas para eliminar.");
                }
                break;
            }
            case "3": {
                console.log("\n--- Lista de Tareas ---");
                if (tareas.length === 0) {
                    console.log("No hay tareas registradas.");
                } else {
                    for (let i = 0; i < tareas.length; i++) {
                        console.log(`${i + 1}. ${tareas[i]}`);
                    }
                }
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
