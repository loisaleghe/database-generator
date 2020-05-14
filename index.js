const mysql = require("mysql2");
const inquirer = require("inquirer");
const orms = require("./orm.js");
const connection =require('./db/connection') 




//to view full table
orms
  .selectJoin(
    "employee.first_name",
    "employee.last_name",
    "role.title",
    "department.name",
    "role.salary",
    "employee.first_name",
    "employee.last_name",
    "manager",
    "employee",
    "role",
    "role.id",
    "employee.id",
    "department",
    "role.department_id",
    "department.id",
    "employee",
    "manager",
    "manager.id",
    "employee.manager_id",
    "employee.id"
  )
  .then((rows) => console.table(rows))
  .catch(console.error);

//to view all roles
let viewRoles = async () => {
  orms
    .selectAll("role")
    .then((rows) => console.table(rows))
    .catch(console.error);
};

//to view all departments
let viewDepartment = async () => {
  orms
    .selectAll("department")
    .then((rows) => console.table(rows))
    .catch(console.error);
};

//to view all employees
let viewEmployee = async () => {
  orms
    .selectAll("employee")
    .then((rows) => console.table(rows))
    .catch(console.error);
};

//to add department
let addDepartment = async () => {
  let answer = await inquirer.prompt(dpQuestion);
  let result = orms.insert("department", "name", "answer.DptName");
  console.log(`Department added: ${answer.DptName}`);
   if (result) main();
};

//to add role
let addRole = async () => {
  let [dpt] = orms.selectAll("department");
  let dptList = dpt.map((list) => list.name);

  const roleQuestion = [
    {
      name: "title",
      message: "Enter role title: ",
    },
    {
      name: "salary",
      message: "Enter role salary (must be an integer): ",
      validate(input) {
        if (input == false || isNaN(input)) {
          return "You must enter a number";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "department",
      message: "Enter role department: ",
      choices: dptList,
    },
  ];

  let answer = await inquirer.prompt(roleQuestion);
  let selectedDpt = dpt.find((list) => list.name == answer.department);

  let result = [answer.title, answer.salary, selectedDpt.id];

  let conc = orms.insertMore(
    "role",
    "title",
    "salary",
    "department_id",
    result[0],
    result[1],
    result[2]
  );

  console.log(`Role added: ${answers.title}`);
  if (conc) main();
};

//to add employee
let addEmployee = async () => {
  let [role] = await connection.query("SELECT roles.id, title FROM roles");
  let roleList = role.map((list) => list.title);

  let [user] = await connection.query(
    `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees`
  );
  let userList = user.map((item) => item.name);
  let userArray = user.map((item) => {
    return { id: item.id, name: item.name };
  });

  const employerQuestion = [
    {
      name: "name",
      message: "Enter employer's first name: ",
    },
  
    {
      name: "name",
      message: "Enter employer's last name: ",
    },
  
    {
      type: "list",
      name: "role",
      message: "What is the employee role?: ",
      choices: [
        "Sales Lead",
        "sales person",
        "Lead Engineer",
        "Software Engineer",
        "Accountant",
      ],
    },
  ];
  
  let answer = await inquirer.prompt(employerQuestion);

  let roleSelected = role.find((item) => item.title == answer.role);

  let manager = userArray.find((item) => item.name == answer.manager);

  let result = [
    answer.first_name,
    answer.last_name,
    roleSelected.id,
    manager.id,
  ];

  let conc = await connection.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    result
  );

  console.log(`Employee ${result[0]} ${result[1]} added succesfully`);

   if (conc) main();
};


//to update employee roles
let updateRole = async () => {
  let [user] = await connection.query(
    `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`
  );
  let userList = user.map((item) => item.name);
  let userArray = user.map((item) => {
    return { id: item.id, name: item.name };
  });

  let [role] = await connection.query("SELECT role.id, title FROM role");
  let roleList = role.map((item) => item.title);

  const UpdateRoleQuestion = [
    {
      type: "list",
      name: "employee",
      message: "Enter employee you would like to update",
      choices: userList,
    },
    {
      type: "list",
      name: "newRole",
      message: "Enter new role: ",
      choices: roleList,
    },
  ];

  let answer = await inquirer.prompt(UpdateRoleQuestion);

  let roleSelected = role.find((item) => item.title == answer.newRole);
  let users = userArray.find((item) => item.name == answer.employee);

  let conc = await connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    roleSelected.id,
    users.id,
  ]);
};

//questions for department
let dpQuestion = [
  {
    name: "DptName",
    message: "Enter name of department: ",
  },
];
//questions to ask user
let main = async() => {
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
  ];

  let answer = await inquirer.prompt(questions);
  switch (answer.command) {
    case "View all employees":
      viewEmployee();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all departments":
      viewDepartment();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Update an employee's role":
      updateRole();
      break;
  }
}

main()