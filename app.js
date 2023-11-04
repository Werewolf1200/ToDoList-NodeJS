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
    console.log("\n");
}

function addTask() {
    rl.question(chalk.bgMagentaBright("Escribe la tarea: "), (task) => {
        tasks.push({ task, completed: false });
        console.log(chalk.green.bold("Tarea agregada con éxito"));
        displayMenu();
        chooseOption();
    });
}

function listTasks() {
    console.log(chalk.yellow.bold("\n Lista de Tareas \n"));
    if (tasks.length === 0) {
        console.log(chalk.green.bold("No hay Tareas por hacer\n\n"));
    } else {
        tasks.forEach((task, index) => {
            let status = task.completed ? "OK" : "NO";

            if (status) {
                console.log(chalk.green.bold(`${index + 1}. ${status} - ${task.task}`));
            } else {
                console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`));
            }
        });
    }

    displayMenu();
    chooseOption();
}

function chooseOption() {
    rl.question("Digita el número de tu opción: ", (choice) => {
        switch (choice) {
            case "1":
                addTask();
                break;
            case "2":
                listTasks();
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