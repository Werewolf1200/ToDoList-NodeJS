import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function displayMenu() {
    console.log(chalk.redBright.bold("To Do App"));
    console.log(chalk.blueBright("Menú de Opciones:"));
    console.log("1. Agregar tarea");
    console.log("2. Listar Tareas");
    console.log("3. Completar Tareas");
    console.log("4. Salir");
}

function chooseOption() {
    rl.question("Digita el número de tu opción:", (choice) => {
        switch (choice) {
            case "1":
                console.log("Crear Tarea")
                break;
            case "2":
                console.log("Listar Tareas")
                break;
            case "3":
                console.log("Completar Tarea")
                break;
            case "4":
                console.log(chalk.yellow("Adios!"));
                rl.close();
                break;
            default:
                console.log(chalk.red("Opción Iválida, Intaenta Nuevamente \n"));
                displayMenu();
                chooseOption();
                break;
        }
    });
}

displayMenu();

chooseOption();