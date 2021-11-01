//externos
const inquirer = require("inquirer");
const chalk = require("chalk");

//core
const fs = require("fs");

const operation = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "******CRISBANK****** \nO que você gostaria de fazer?",
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
      const action = answer["action"];
      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        console.log(chalk.bgBlueBright.white("Obrigada por usar o CrisBank"));
        process.exit();
      }
    })
    .catch((err) => console.error(err));
};

// criação de conta
const createAccount = () => {
  console.log(chalk.bgBlue.white("Obrigado por escolher nosso banco"));
  console.log(
    chalk.blue(
      "A seguir vamos configurar sua conta de acordo com o seu perfil."
    )
  );
  buildAccount();
};

// configuração de conta
const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.log(
        chalk.yellow(`Você escolheu o nome ${accountName} para sua conta`)
      );

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe, escolha outro nome.")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        "{'balance': 0}",
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns sua conta foi criada!"));
      operation();
    })
    .catch((err) => console.log(err));
};

// função de depositar
const deposit = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da conta que deseja realizar o deposito?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.log(err));
};

// função check se conta existe]
const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Essa conta não existe, escolha outro nome!")
    );
    return false;
  }
  return true;
};

// função adiciona valor a conta
const addAmount = (accountName, amount) => {
  const account = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return deposit();
  }
  console.log(account);
};

const getAccount = (accountName) => {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
};

operation();
