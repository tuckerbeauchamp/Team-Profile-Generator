//insert inquirer and fs
const inquirer = require("inquirer");
const fs = require("fs");
//create objects for file path
const path = require("path");
//create object jest for testing functionality
const jest = require("jest");

const buildHTMLDirectory = path.resolve(__dirname, "html");
const htmlFilePath = path.join(buildHTMLDirectory, "index.html");
//require methods for each employee class
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const generateHTML = require("./utils/generateHTML.js")
const members = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "managerPhone",
        message: "What is the manager's phone number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerPhone
      );
      members.push(manager);
      console.log(members);
      createTeam()
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "engineerGitHub",
        message: "What is the engineer's GitHub username?",
      },
    ])
    .then((answers) => console.log(answers));
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the intern's ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "internSchoolName",
        message: "What is the intern's school name?",
      },
    ])
    .then((answers) => console.log(answers));
}

// inquirer
//   .prompt([
//     {
//       name: "employee",
//       message: "What type of employee would you like to add?",
//       type: "list",
//       choices: ["Engineer", "Intern", "I'm done entering employees."],
//     },
//   ])
//   .then(function () {});

function createTeam() {
  inquirer.prompt([{
    name: "memberChoices",
    type: "list",
    message: "What type of Employee would you like to create?",
    choices: ["Manager", "Engineer", "Intern", "I'm done creating empoyees."]
  }
])
.then(function (answers) {
  switch (answers.memberChoices) {
    case "Manager": 
    createManager()      
      break;
      case "Engineer": 
    createEngineer()      
      break;
      case "Intern": 
    createIntern()      
      break;
  
    default: buildTeam()
   }
});
}

function buildTeam() {
  console.log(members);
  if (!fs.existsSync(buildHTMLDirectory)) fs.mkdir(buildHTMLDirectory)
 fs.writeFile(htmlFilePath, generateHTML(members), function(error){
   if (error) console.log(error);
 });
 
}

createTeam()
