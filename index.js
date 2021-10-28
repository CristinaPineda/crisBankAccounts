//externos
const inquirer = require("inquirer");
const chalk = require("chalk");

//core
const fs = require("fs");

const operation = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que você gostaria de fazer?",
      choices: [
        "Criar conta",
        "Consultar saldo",
        "Depositar",
        "Sacar",
        "Sair",
      ],
    },
  ])
  .then((answer) => {
    const action = answer['action'];
    console.log(action);
  })
  .catch(err => console.error(err))
};

operation();
