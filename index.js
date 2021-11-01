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
  console.log(chalk.blue('A seguir vamos configurar sua conta de acordo com o seu perfil.'));
  buildAccount();
}

const buildAccount = () => {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para sua conta:',
    },
  ])
  .then((answer) => {
    const accountName = answer['accountName']
    
    console.log(chalk.yellow(`Você escolheu o nome ${accountName} para sua conta`));
    
    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black('Essa conta já existe, escolha outro nome.'),
      )
      buildAccount();
      return
    }

    fs.writeFileSync(`accounts/${accountName}.json`, "{'balance': 0}", (err) => {
      console.log(err);
    })

    console.log(chalk.green('Parabéns sua conta foi criada!'))
    operation();
  })
  .catch((err) => console.log(err));
}

operation();
