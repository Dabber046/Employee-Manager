const inquirer = require('inquirer');
const prompts = require('./lib/prompts');
const db = require('./db');

async function viewEmployees() {
  const res = await db.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
  `);
  console.table(res.rows);
  await mainMenu();
}

async function mainMenu() {
  const { choice } = await inquirer.prompt(prompts.mainMenu);
  switch (choice) {
    case 'View All Employees':
      return viewEmployees();
    case 'Exit':
      console.log("Goodbye!");
      process.exit();
  }
}

mainMenu();
