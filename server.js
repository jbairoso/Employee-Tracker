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
    .then(answer => {
        switch (answer.choices{
            
        })
    })
}