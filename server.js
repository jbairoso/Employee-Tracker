//dependencies
const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connection");

// db.connect(async function () {
//   empMenu();
// });

//question prompts-department, roles, employees, add, exit
const promptUser = () => {
  inquirer
    .prompt([
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
    .then((answer) => {
      const { choice } = answer;

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
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all departments", res);
    promptUser();
  })
}

const viewAllRoles = () => {
  const request = `SELECT role.id, role.title as role, role.salary, department.name AS department
  FROM role
  LEFT JOIN department ON role.department_id = department.id`;
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all roles", res);
    promptUser();
  })
}

const viewAllEmployees = () => {
  const request = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary,
  IF(ISNULL(employee.manager_id)=1, 'null', CONCAT(manager.first_name, ' ', manager.last_name)) AS manager
  FROM employee
  LEFT JOIN role on employee.role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  LEFT JOIN employee manager on manager.id = employee.manager_id`;
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all employees", res);
    promptUser();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter a new department",
        validate: deptInput => {
          if(deptInput) return true;
          else {
            console.log("Please enter the department's name");
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const {addDepartment} = answer;
      const request = 'SELECT * FROM department where name = ?';
        
      db.query(request, addDepartment, (err,res) => {
        if(err) throw err;

        if(res.length) {
          console.log(`There is already a department call ${addDepartment}`);
          promptUser();
        } else {
          const add = `INSERT INTO department(name)
            VALUES (?)`;
          db.query(add, addDepartment, (err,res) => {
            if(err) throw err;
            console.log(`Added ${addDepartment} to the database`);
            promptUser();
          })
        }
      })
    })
  }
  
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Enter new role",
        validate: addRoleInput => {
          if(addRoleInput) return true;
          else {
            console.log("Please enter new role");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "addSalary",
        message: "Enter new salary",
        validate: addSalaryInput => {
          if(addSalaryInput && !isNaN(addSalaryInput)) return true;
          else {
            console.log("Please enter role's new salary");
            return false;
          }
        }
      }
    ])
    .then(roleData => {
      const {role, salary} = roleData;

      const dept = 'SELECT * FROM department';
      db.query(dept, (err, deptTable) => {
        if (err) throw err;
        const departmentChoice =[];
        deptTable.forEach(deptInfo => departmentChoice.push(deptInfo.name));

        inquirer.prompt([
          {
            type: 'list',
            name: 'dept',
            message: 'Which department does this role belong in?',
            choices: deptChoice
          }
        ])
        .then(departmentAnswer =>{
          const {dept} = departmentAnswer;
          const targetDept = deptTable.filter(deptInfo => deptInfo.name === dept);

          const role = `SELECT * FROM role WHERE title = ? AND salary = ? AND department_id = ?`;
          const params = [role, salary, targetDept[0].id];
          db.query(role, params, (err,res) => {
            if(err) throw err;

            if(res.length) {
              console.log(`There role, salary, & id already exists`);
              promptUser();
            } else {
              const add = `INSERT INTO role(title, salary, department_id)
                VALUES(?,?,?)`;
                db.query(add, params, (err, res) => {
                if(err) throw err;
                console.log(`Added ${role} to the database.`);
                promptUser();
              })
            }
          })
        })
      })
    })
  }

function addNewEmployee() {
  inquirer
    .prompt([
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
          console.log(err);
          if (err) throw err;
          console.table(response);
        }
      );
      empMenu();
    });
}

function Quit() {
  console.log("Thanks for using employee tracker, goodbye!");
  process.exit();
}
