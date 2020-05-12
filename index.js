const mysql = require ('mysql2')
const inquirer = require ('inquirer')
const orms = require ('./orm.js');


//to view all roles
orms
  .selectAll('role')
  .then(rows => console.table(rows))
  .catch(console.error)

  //to view all departments
  orms
  .selectAll('department')
  .then(rows => console.table(rows))
  .catch(console.error)

  //to view all employees
  orms
  .selectAll('employee')
  .then(rows => console.table(rows))
  .catch(console.error)

  //questions to ask user
  let questions = [
    {
      type: "list",
      name: "question",
      message: "What would you like to do?",
      choices: [
        "View employees",
        "View roles",
        "View departments",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
      ],
    },
  ]


  const employerQuestion = [
      {
          name: "name",
          message: "Enter employer's first name: "
      },

      {
        name: "name",
        message: "Enter employer's last name: "
      }, 

      {     
          type: "list",
          name: "role",
          message: "What is the employee role?: ",
          choices: ["Sales Lead", "sales person", "Lead Engineer", "Software Engineer", "Accountant"]
      }
  ]