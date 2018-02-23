const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const solc = require("solc");
const Web3 = require("web3");
const path = require("path");
const adres = path.resolve(__dirname);
const _ = require('lodash');
const tok = ":TokenERC20";
// Подключение к локальному узлу Ethereum
if (typeof web3 !== "undefined") {
  console.log("undefined");
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  console.log("norm");
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
  // let personal = await web3.eth.personal.newAccount("555");
  let personal = await web3.eth.personal.unlockAccount(
    "0x72b1048ef13b9c363ddd063bff0ca0a86b563d9c",
    "555"
  );
  let getBalance = await web3.eth.getBalance(
    "0x72b1048ef13b9c363ddd063bff0ca0a86b563d9c"
  );
  let fromWei = await web3.utils.fromWei(getBalance, "ether");
  let getCoinbase = await web3.eth.getCoinbase();
  // Скомпилировать исходный код
  const input = fs.readFileSync(adres + "/Token.sol", "utf8");
  const output = solc.compile(input, 1);
  const bytecode = output.contracts[tok].bytecode;
  const abi = JSON.parse(output.contracts[tok].interface);
  
  // Объект контракта
  var tt1 = web3.eth.coinbase;
  var ii1 = bytecode;
  var kk = web3.eth.coinbase;
  let contract = await new web3.eth.Contract(abi);
  //Развертывание экземпляра контракта
  var contractInstance = await new web3.eth.Contract(
    abi,
    "0xf633405e6386278511647928467ae42e4caaf60d",
    {
      // data: abi,
      from: getCoinbase,
      gas: 90000 * 2
    }
  );
  
//    var obg=contractInstance;
//    var tt=JSON.stringify(web3,null," ");
//  fs.appendFile(adres + "/web3.txt",tt, (err) => {if (err) throw err});
  // var obg=_.find([{BatchRequest:555}], 'BatchRequest');
  // var contractRes = await web3.eth.Contract.test()
  // console.log(contractInstance, "getBalance");
  // console.log(personal, "personal");
  // console.log(getCoinbase, "getCoinbase");
  name_1();
};
tt().catch(err => {
  console.log(err, "catch");
});

function name_1() {
  console.log("11115555");

  // var uuu = contractInstance.at("0x0d64590C908B0D5356543e2bFE8D776988cd2E4A")
  // console.log(uuu)
}

// //////////////////////
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

app.listen(3001);
console.log("fin");
