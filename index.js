#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 150; // Increase the limit to 150
process.stdin.setMaxListeners(150);
let todos = [];
let doneTodos;
let notDoneTodos;
//A Main menu for the app
async function menu() {
    console.log("------------------------------------------------------ ");
    console.log(chalk.bold.green(`Todo App by ${chalk.italic("Hamza Islam")}`));
    let answer = await inquirer.prompt([
        {
            message: "choose an option:",
            type: "list",
            choices: [
                "1.add todos",
                "2.read todos",
                "3.update todos",
                "4.delete todos",
                "5.exit",
            ],
            name: "choice",
        },
    ]);
    console.log("------------------------------------------------------ ");
    switch (answer.choice) {
        case "1.add todos":
            await addTodosMenu();
            break;
        case "2.read todos":
            await showTodos();
            break;
        case "3.update todos":
            await updateTodos();
            break;
        case "4.delete todos":
            await deleteTodos();
            break;
        case "5.exit":
            if (true) {
            }
        default:
            break;
    }
    // cleanup()
}
//goback to main menu function
async function goBack() {
    console.log("------------------------------------------------------ ");
    let answer = await inquirer.prompt([
        {
            message: "lets go back to main menu(Press 'Enter' whenever to go back):",
            type: "confirm",
            name: "goBack",
            default: true,
        },
    ]);
    console.log("------------------------------------------------------ ");
    if (answer.goBack) {
        await menu();
    }
}
//Add todos menu
async function addTodosMenu() {
    let condition = true;
    while (condition) {
        await addATodo();
        let answer = await inquirer.prompt({
            message: "Do you want to add more todos:",
            type: "confirm",
            name: "addMore",
            default: false,
        });
        condition = answer.addMore;
    }
    await menu();
}
//add a todo
async function addATodo() {
    let Todo = await inquirer.prompt([
        { message: "Enter todo title:", type: "input", name: "title" },
        {
            message: "Enter todo description:",
            type: "input",
            name: "description",
            default: "As shown in title above.",
        },
        {
            message: "Have you done it:",
            type: "confirm",
            name: "isDone",
            default: false,
        },
    ]);
    console.log("------------------------------------------------------ ");
    let todo = {
        title: Todo.title,
        description: Todo.description,
        isDone: Todo.isDone,
    };
    // todos.push(todo);
    todos.unshift(todo);
}
//implementing for showTodo()
async function showTodos() {
    console.log("------------------------------------------------------ ");
    if (todos.length == 0) {
        console.log(chalk.red("No todos , add first!"));
        await addTodosMenu();
    }
    else {
        let index = 0;
        for (let todo of todos) {
            console.log(chalk.yellow(`id: ${index + 1}`));
            console.log(chalk.green(`Title: ${todo.title}`));
            console.log(chalk.blue(`Description: ${todo.description}`));
            if (todo.isDone) {
                console.log(chalk.blue(`Is done: ${chalk.green(todo.isDone)}`));
            }
            else {
                console.log(chalk.blue(`Is done: ${chalk.red(todo.isDone)}`));
            }
            console.log("------------------------------------------------------ ");
            index++;
        }
    }
    let answer = await inquirer.prompt([
        {
            message: "choose an option:",
            type: "list",
            choices: ["1.go Back", "2.filters"],
            name: "option",
            default: "1.go Back",
        },
    ]);
    if (answer.option == "2.filters") {
        let _doneTodos = todos.filter((t) => {
            return t.isDone == true;
        });
        let _notDoneTodos = todos.filter((t) => {
            return t.isDone == false;
        });
        doneTodos = _doneTodos;
        notDoneTodos = _notDoneTodos;
        let answer = await inquirer.prompt({
            message: "choose a filter:",
            type: "list",
            choices: ["1.Tasks not done.", "2.Tasks already done."],
            name: "option",
            default: "1.Tasks not done.",
        });
        if (answer.option == "1.Tasks not done.") {
            if (notDoneTodos.length > 0) {
                let index = 0;
                for (let todo of notDoneTodos) {
                    console.log(chalk.yellow(`id: ${index + 1}`));
                    console.log(chalk.green(`Title: ${todo.title}`));
                    console.log(chalk.blue(`Description: ${todo.description}`));
                    if (todo.isDone) {
                        console.log(chalk.blue(`Is done: ${chalk.green(todo.isDone)}`));
                    }
                    else {
                        console.log(chalk.blue(`Is done: ${chalk.red(todo.isDone)}`));
                    }
                    console.log("------------------------------------------------------ ");
                    index++;
                    goBack();
                }
            }
            else {
                console.log("No task to do,you are free!");
                goBack();
            }
        }
        else {
            if (doneTodos.length > 0) {
                let index = 0;
                for (let todo of doneTodos) {
                    console.log(chalk.yellow(`id: ${index + 1}`));
                    console.log(chalk.green(`Title: ${todo.title}`));
                    console.log(chalk.blue(`Description: ${todo.description}`));
                    if (todo.isDone) {
                        console.log(chalk.blue(`Is done: ${chalk.green(todo.isDone)}`));
                    }
                    else {
                        console.log(chalk.blue(`Is done: ${chalk.red(todo.isDone)}`));
                    }
                    console.log("------------------------------------------------------ ");
                    index++;
                    goBack();
                }
            }
            else {
                console.log("No task done! add some or you already have lot to do yet!");
                goBack();
            }
        }
    }
    else {
        await menu();
    }
}
//function for update todo
async function updateTodos() {
    console.log("------------------------------------------------------ ");
    if (todos.length == 0) {
        console.log(chalk.red("No todos , add first!"));
        await addTodosMenu();
    }
    else {
        let index = 0;
        for (let todo of todos) {
            console.log(chalk.yellow(`id: ${index + 1}`));
            console.log(chalk.green(`Title: ${todo.title}`));
            console.log("------------------------------------------------------ ");
            index++;
        }
    }
    try {
        let answer = await inquirer.prompt([
            {
                message: "Enter id of todo you want to update:",
                type: "number",
                name: "id",
            },
        ]);
        console.log("------------------------------------------------------ ");
        console.log(`you selected: ${chalk.green(todos[answer.id - 1].title)}`);
        console.log("------------------------------------------------------ ");
        let newData = await inquirer.prompt([
            {
                message: "Enter new todo title:",
                type: "input",
                name: "title",
                default: `${todos[answer.id - 1].title}`,
            },
            {
                message: "Enter new todo description:",
                type: "input",
                name: "description",
                default: `${todos[answer.id - 1].description}`,
            },
            {
                message: "Have you done it:",
                type: "confirm",
                name: "isDone",
                default: `${todos[answer.id - 1].isDone}`,
            },
        ]);
        todos[answer.id - 1].title = newData.title;
        todos[answer.id - 1].description = newData.description;
        todos[answer.id - 1].isDone = newData.isDone;
        console.log("------------------------------------------------------ ");
        console.log(chalk.green("Updated Successfully, updated Todo:"));
        console.log("------------------------------------------------------ ");
        console.log(todos[answer.id - 1].title);
        console.log(todos[answer.id - 1].description);
        console.log(todos[answer.id - 1].isDone);
        console.log("------------------------------------------------------ ");
        goBack();
    }
    catch (error) {
        console.log(chalk.red("You have not selected any!"));
        goBack();
    }
}
//function for delete todo
async function deleteTodos() {
    console.log("------------------------------------------------------ ");
    if (todos.length == 0) {
        console.log(chalk.red("No todos , add first!"));
        await addTodosMenu();
    }
    else {
        let index = 0;
        for (let todo of todos) {
            console.log(chalk.yellow(`id: ${index + 1}`));
            console.log(chalk.green(`Title: ${todo.title}`));
            console.log("------------------------------------------------------ ");
            index++;
        }
    }
    try {
        let answer = await inquirer.prompt([
            {
                message: "Enter id of todo you want to Delete:",
                type: "number",
                name: "id",
            },
        ]);
        console.log("------------------------------------------------------ ");
        console.log(`you selected: ${chalk.green(todos[answer.id - 1].title)}`);
        console.log("------------------------------------------------------ ");
        let answer2 = await inquirer.prompt({
            message: "are you sure you want to delete this todo",
            type: "confirm",
            name: "sure",
            default: true,
        });
        if (answer2.sure) {
            if (answer.id > 0 && answer.id <= todos.length) {
                todos.splice(answer.id - 1, 1);
                console.log("Todo deleted successfully.");
            }
            else {
                console.log("Invalid todo selected!");
            }
        }
        goBack();
    }
    catch (error) {
        console.error("Error: No todo selected or invalid operation.");
        goBack();
    }
}
await menu();
