import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

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

function loadTasks() {
    try {
        const data = readFileSync(DB_FILE, "utf-8");
        const lines = data.split("\n");
        tasks.length = 0;

        lines.forEach((line) => {
            if (line.trim() !== "") {
                const [task, completed] = line.split("|");
                tasks.push({ task, completed: completed === true });
            }
        });
        console.log(chalk.green.bold("Las tareas se han cargado desde la BD\n"));
    } catch (error) {
        console.log(chalk.green.bold("No hay tareas por hacer\n"));
    }
}

function saveTask() {
    const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
    writeFileSync(DB_FILE, data, "utf-8");
    console.log(chalk.green.bold("Tarea agregada a la BD con éxito\n"));
}

function addTask() {
    rl.question(chalk.bgMagentaBright("Escribe la tarea: "), (task) => {
        tasks.push({ task, completed: false });
        console.log(chalk.green.bold("Tarea agregada con éxito"));
        saveTask();
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

            if (task.completed) {
                console.log(chalk.green.bold(`${index + 1}. ${status} - ${task.task}`));
            } else {
                console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`));
            }
        });
    }

    displayMenu();
    chooseOption();
}

function completeTask() {
    rl.question(chalk.bgMagentaBright("Digita el número de la tarea a Completar: "), (taskNumber) => {
        const index = parseInt(taskNumber) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = true;
            saveTask();
            console.log(chalk.green.bold("Tarea completada con exito"));
        } else {
            console.log(chalk.red.bold("Número de tarea inválido"));
        }
        displayMenu();
        chooseOption();
    });
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
                completeTask();
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

loadTasks();

displayMenu();

chooseOption();