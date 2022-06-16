//dependencies
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

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
  const request = "SELECT * FROM department";
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all departments", res);
    console.table(res);
    promptUser();
  })
}

const viewAllRoles = () => {
  const request = 'SELECT * FROM roles';
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all roles", res);
    console.table(res);
    promptUser();
  })
}

const viewAllEmployees = () => {
  const request = 'SELECT * FROM employee';
  db.query(request, (err, res) => {
    if (err) throw err;
    console.log("You are now viewing all employees", res);
    console.table(res);
    promptUser();
  })
}

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
          console.log('There is already a department call ${addDepartment}');
          promptUser();
        } else {
          const add = 'INSERT INTO department(name) VALUES (?)';
          db.query(add, addDepartment, (err,res) => {
            if(err) throw err;
            console.log(`Added ${addDepartment} to the database`);
            console.table(res);
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
      console.log(roleData);
      const role = roleData.addRole;
      const salary = roleData.addSalary;

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
            choices: departmentChoice
          }
        ])
        .then(departmentAnswer =>{
          const {dept} = departmentAnswer;
          const targetDept = deptTable.filter(deptInfo => deptInfo.name === dept);
          console.log(targetDept);
          const sql = 'SELECT * FROM roles WHERE title= ?';
          const params = role;
          db.query(sql, params, (err,res) => {
            if(err) throw err;
            console.log(res);
            if(res.length === 1) {
              console.log('Their role, salary, & id already exists');
              promptUser();
            } else {
              const add = `INSERT INTO roles(title, salary, department_id) VALUES('${role}', ${salary}, ${targetDept[0].id})`;
                db.query(add, (err, res) => {
                if(err) throw err;
                console.log(`Added ${role} to the database.`);
                console.table(res);
                promptUser();
                
              })
            }
          })
        })
      })
   })
}

const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee last name",
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
    .then(employeeName => {
      const {firstName, lastName} = employeeName;
      console.table(res);
      promptUser();
    })
}

const Quit = () => {
  console.log('Thanks for using the employee tracker!');
  console.log('Goodbye!');
  process.exit();
};
//start application
promptUser();

