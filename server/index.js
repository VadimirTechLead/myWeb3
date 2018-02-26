const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const solc = require("solc");
const Web3 = require("web3");
const path = require("path");
const adres = path.resolve(__dirname);
const _ = require("lodash");
const tok = ":TokenERC20";
const port = 3001;
// Подключение к локальному узлу Ethereum
if (typeof web3 !== "undefined") {
  console.log("undefined");
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  console.log("norm");
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var tt = async () => {
  //  let personal = await web3.eth.personal.newAccount("66776");
  // console.log(personal)
  let getBalance = await web3.eth.getBalance("0x352af4b9caefedadd95ac77d1cdabd9741ec4621");
  /* 
  console.log(getBalance, "getBalance до перевода" );
   let personal_2 = await web3.eth.personal.unlockAccount(
    "0x352af4b9caefedadd95ac77d1cdabd9741ec4621",
    "555",
    6000
  );
  console.log(personal_2, "разблокировка акаунта" );
  let getBalance_user2 = await web3.eth.getBalance(
    "0xd7843c42df925c9a8a87d46b821ff6664f37d82e"
  );  
  
   let sendTransaction = await web3.eth.sendTransaction({from:"0x352af4b9caefedadd95ac77d1cdabd9741ec4621", to:'0xd7843c42df925c9a8a87d46b821ff6664f37d82e', value: web3.toWei(100, "ether")})
   
   let getBalance_user_2_2 = await web3.eth.getBalance(
    "0xd7843c42df925c9a8a87d46b821ff6664f37d82e"
  );
   console.log(getBalance_user2,getBalance_user_2_2)
  // console.log(sendTransaction)
  let getBalance_2 = await web3.eth.getBalance(
    "0x352af4b9caefedadd95ac77d1cdabd9741ec4621"
  ); 
  // console.log(personal_2,"personal_2 ");
  console.log(getBalance_2, "getBalance до после перевода" );*/
 
   let fromWei = await web3.utils.fromWei(getBalance, "ether");
  let getCoinbase = await web3.eth.getCoinbase();
  // Скомпилировать исходный код
  const input = fs.readFileSync(adres + "/Token.sol", "utf8");
  const output = solc.compile(input, 1);
  const bytecode = output.contracts[tok].bytecode;
  const abi = JSON.parse(output.contracts[tok].interface);

 // Объект контракта
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
  // //Войдите в систему tx, вы можете изучить статус с помощью eth.getTransaction ()
  // console.log(res.transactionHash);

  // // Если у нас есть свойство адреса, контракт был развернут
  // if (res.address) {
  //   console.log("Contract address: " + res.address);
  //   // Let's test the deployed contract
  //   testContract(res.address);
  // }
  name_1();
};
tt().catch(err => {
  console.log(err, "catch eror");
});

function name_1() {
  console.log("super");

  // var uuu = contractInstance.at("0x0d64590C908B0D5356543e2bFE8D776988cd2E4A")
  // console.log(uuu)
}
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

app.listen(port);
console.log("сервер запущен на " + port + " порту");
