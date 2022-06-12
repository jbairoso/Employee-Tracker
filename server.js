//dependencies
const inquirer = require('inquirer');
const fs = require('fs');
const mysql2 = require('mysql2');
//get connection
const db = require('./db/connection');
const { connection } = require('./db');
const { exit } = require('process');
require('console.table');

db.connect(async function() {
    empMenu();
})

//question prompts-department, roles, employees, add, exit
function empMenu(){
    inquirer.prompt([
        {
            type:'list',
            name: 'choice',
            message: 'Thank you for choosing Employee Tracker, please select an option',
            choices:[
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add a new employee',
                'Exit',
            ]
        }
    ])
    .then((answer) => {

        switch (answer.choices) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a new employee':
                addNewEmployee();
                break;
            case 'Quit':
                Quit();
                break;
        }
    })
};

function viewAllDepartments() {
    const request = "SELECT * FROM roles";
    db.query(request, function (err, res){
        if (err) throw err;
        console.log("You are now viewing all departments");
        console.table(res);
        empMenu();
    })
};

// function viewAllRoles
// function viewAllEmployees
// function addDepartment
// function addRole
// function addNewEmployee
// function Quit