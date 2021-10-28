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
    if(action === 'Criar conta') {
      createAccount();
    }
  })
  .catch(err => console.error(err))
};

const createAccount = () => {
  console.log(chalk.bgBlue.white("Obrigado por escolher nosso banco"));
  console.log(chalk.blue('A seguir vamos configurar sua conta de acordo com o seu perfil.'))
}

operation();
