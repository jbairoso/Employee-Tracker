//dependencies
const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');


// db.connect(async function () {
//   empMenu();
// });

//question prompts-department, roles, employees, add, exit
const promptUser = () => {
  inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message:
          "Thank you for choosing Employee Tracker, please select an option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add a new employee",
          "Exit",
        ],
      },
    ])
    .then(answer => {
      const {choice} = answer;

      switch (choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a new employee":
          addNewEmployee();
          break;
        case "Quit":
          Quit();
          break;
      };
    })
}

const viewAllDepartments = () => {
  const request = "SELECT * FROM roles";
  db.query(request, function (err, res) {
    if (err) throw err;
    console.log("You are now viewing all departments");
    console.table(res);
    empMenu();
  })
};

function viewAllRoles() {
  const request = "SELECT * FROM roles";
  db.query(request, function (err, res) {
    if (err) throw err;
    console.log("You are now viewing all roles");
    console.table(res);
    empMenu();
  });
}

function viewAllEmployees() {
  const request = "SELECT * FROM roles";
  db.query(request, function (err, res) {
    if (err) throw err
    console.log("You are now viewing all employees");
    console.table(res);
    empMenu();
  })
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter a new department",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department(name) VALUES(?)",
        [response.addDepartment],
        function (err, response) {
          console.log(err)
          if (err) throw err
          console.log(response);
        }
      )
      empMenu();
    })
};

function addRole() {
  inquirer.prompt([
      {
        type: "input",
        name: "addRole",
        message: "Enter new role",
      },
      {
        type: "input",
        name: "addSalary",
        message: "Enter new salary",
      },
      {
        type: "input",
        name: "addId",
        message: "Enter new ID",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)",
        [response.addRole, response.addSalary, response.addId],
        function (err, response) {
          console.log(err)
          if (err) throw err
          console.table(response);
        }
      )
      empMenu();
    })
};

function addNewEmployee() {
  inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee first name.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee last name.",
      },
      {
        type: "input",
        name: "empId",
        message: "Enter employee ID number",
      },
      {
        type: "input",
        name: "mangId",
        message: "Enter their managers ID",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          response.firstName,
          response.lastName,
          response.empId,
          response.mangId,
        ],
        function (err, response) {
          console.log(err)
          if (err) throw err
          console.table(response);
        }
      )
      empMenu();
    })
};

function Quit() {
  console.log("Thanks for using employee tracker, goodbye!");
  process.exit();
};
