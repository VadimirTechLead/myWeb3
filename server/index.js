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
  console.log("norm")
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
// var tt=web3.eth.personal.newAccount("5551")

// console.log(web3)      
/* 
var tt = web3.eth.getBalance("0xf633405e6386278511647928467ae42e4caaf60d",
function (err, res) {
  console.log(err,"err")
  console.log(res,"res")
   ethBalance = web3.utils.fromWei(res, "ether");
}
) */

var tt = async () => {
  let getBalance = await web3.eth.getBalance("0xf633405e6386278511647928467ae42e4caaf60d")
  let fromWei= await web3.utils.fromWei(getBalance,"ether");
  let personal= await web3.eth.personal.newAccount("5551") 
}
tt().catch(err=>{console.log(err)})


// Скомпилировать исходный код
const input = fs.readFileSync(adres + "/Token.sol", 'utf8');
const output = solc.compile(input, 1);
const bytecode = output.contracts[tok].bytecode;
const abi = JSON.parse(output.contracts[tok].interface);

// Объект контракта

const contract =new web3.eth.Contract(abi);
//Развертывание экземпляра контракта
  var contractInstance =new web3.eth.Contract(
  {
    data: "0x" + bytecode,
    from: web3.eth.coinbase,
    gas: 90000 * 2
  }
); 
 //Развертывание экземпляра контракта
/*  var contractInstance =new web3.eth.Contract(
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
);  */
// Быстрая проверка контракта

/* function testContract(address) {
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
}  */
// response
app.use(ctx => {
  ctx.body = "Hello Koa";
});

app.listen(3000);
console.log("fin")
