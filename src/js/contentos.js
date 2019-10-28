let cos = new Cos("test", "https://testnode.contentos.io");

cos.wallet.addAccount("jrastit", "4rxfDLYtMUt7LbMiNTqVpNEkUKeDvAtqVbT1sYkyU77fszzfKK");

(async () => {
  let result = await cos.wallet.contractCall("jrastit", "jrastit", "moodforest", "greet", "[]", "0.000000");



  console.log(result.invoice);

  App.addAlert("Contentos smart contract message : " + result.invoice.opResultsList[0].vmConsole);

  let result2 = await cos.wallet.accountInfo("jrastit", false);

  console.log(result2["info"].coin.value);

  App.addAlert("Contentos balnce : " + result2["info"].coin.value);

})();
