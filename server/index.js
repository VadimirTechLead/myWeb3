const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const solc = require("solc");
const Web3 = require("web3");
const path = require('path');
const adres=path.resolve(__dirname)
const tok=":TokenERC20"
// Подключение к локальному узлу Ethereum
if (typeof web3 !== 'undefined') {
  console.log( "undefined")
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}



var tt = web3.eth.accounts/* .getBalance("0x0c3c4d686ce1f6aca98a8c692c321c7071311a1e",
function (err, res) {
  console.log(res)
  console.log(res)
  ethBalance = web3.fromWei(res, "ether");
  TemplateVar.set(template, "counter", ethBalance)
  TemplateVar.set(template, "accnumber", textValue) 
}
)*/
// console.log(tt)

// Скомпилировать исходный код

/* 
const input = fs.readFileSync(adres + "/Token.sol", 'utf8');
const output = solc.compile(input, 1);
const bytecode = output.contracts[tok].bytecode;
const abi = JSON.parse(output.contracts[tok].interface);
 */
// Объект контракта

const contract =new web3.eth.Contract(abi);
/* console.log(web3.eth.getTransaction ())
//Развертывание экземпляра контракта
const contractInstance =contract(
  {
    data: "0x" + bytecode,
    from: web3.eth.coinbase,
    gas: 90000 * 2
  },
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    //Войдите в систему tx, вы можете изучить статус с помощью eth.getTransaction ()
    console.log(res.transactionHash);

    // Если у нас есть свойство адреса, контракт был развернут
    if (res.address) {
      console.log("Contract address: " + res.address);
      // Let's test the deployed contract
      testContract(res.address);
    }
  }
);

// Быстрая проверка контракта

function testContract(address) {
  //Ссылка на развернутый контракт
  const token = contract.at(address);
  // Целевая учетная запись для проверки
  const dest_account = "0x002D61B362ead60A632c0e6B43fCff4A7a259285";

  // Утвердить баланс первоначального счета, должен быть 100000
  const balance1 = token.balances.call(web3.eth.coinbase);
  console.log(balance1 == 1000000);

  // Вызовите функцию передачи
  token.transfer(dest_account, 100, { from: web3.eth.coinbase }, (err, res) => {
    //Транзакция журнала, если вы хотите изучить

    console.log("tx: " + res);
    // Подтверждение баланса целевого счета должно быть 100
    const balance2 = token.balances.call(dest_account);
    console.log(balance2 == 100);
  });
} */
// response
app.use(ctx => {
  ctx.body = "Hello Koa";
});

app.listen(3000);

