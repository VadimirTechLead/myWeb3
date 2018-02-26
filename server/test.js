import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
  Template.myTemplate.events(
    {
      'submit form': function (event) {
        event.preventDefault();
        var template = Template.instance();
        var textValue=event.target.myForm.value
        var ethBalance;
        web3.eth.getBalance(textValue,
          function (err, res) {
            ethBalance = web3.fromWei(res, "ether");
            TemplateVar.set(template, "counter", ethBalance)
            TemplateVar.set(template, "accnumber", textValue)
          })
          event.target.myForm.value="";
      }
    }
  )
}
 


geth --dev --rpc --rpccorsdomain "*" --networkid 8545 --minerthreads 1 --rpcapi "admin,debug,miner,shh,txpooll,personal,eth,net,web3" console

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
  Template.myTemplate.events(
    {
      'submit form': function (event) {
        event.preventDefault();
        var template = Template.instance();
        var textValue=event.target.myForm.value
        var ethBalance;
        web3.eth.getBalance(textValue,
          function (err, res) {
            ethBalance = web3.fromWei(res, "ether");
            TemplateVar.set(template, "counter", ethBalance)
            TemplateVar.set(template, "accnumber", textValue)
          })
          event.target.myForm.value="";
      }
    }
  )
}
> eth.coinbase
> eth.getCoinbase(function(err, cb) { console.log(err, cb); })
> eth.accounts
> eth.getAccounts(function(err, accounts) { console.log(err, accounts); })

eth.sendTransaction({from:"0xe559b994e44b233260b311addcfc6b13f0bb59f9", to:'0x352af4b9caefedadd95ac77d1cdabd9741ec4621', value: 500000)


// разблокировка счета 0x352af4b9caefedadd95ac77d1cdabd9741ec4621
let personal_2 = await web3.eth.personal.unlockAccount(
//  "0x352af4b9caefedadd95ac77d1cdabd9741ec4621" возращается при создании,
 "555"/* пароль */,
  6000/* время на сколько разблокирован аккыунт */
);
// проверка счета
let getBalance_user2 = await web3.eth.getBalance("0xd7843c42df925c9a8a87d46b821ff6664f37d82e");  
// перевод
let sendTransaction = await web3.eth.sendTransaction({from:"0x352af4b9caefedadd95ac77d1cdabd9741ec4621", to:'0xd7843c42df925c9a8a87d46b821ff6664f37d82e', value: web3.toWei(100, "ether")})
