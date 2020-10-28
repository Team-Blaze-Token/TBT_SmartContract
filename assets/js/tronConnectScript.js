function myDetails(){
    // document.getElementById('walletid').innerHTML = window.tronWeb.defaultAddress.base58;
    const tronWeb = window.tronWeb;
    const contractAdd = "THUEJukGarMTQoQU5oLsyLWZNoxsD1pkiH"; //contract address

    // const contractAdd = "TQ37BLAnxczDEPh6yDE7YsPPJ2epENuKvZ"; //contract address Testnet

   
    (async()=>{
        // Modern dapp browsers...
        if (window.tronWeb.defaultAddress.base58) {
            try {
                console.log(window.tronWeb.defaultAddress.base58);
                const contractInstance = await tronWeb.contract().at(contractAdd);

                const userBalance = await contractInstance.userTokenBalance(window.tronWeb.defaultAddress.base58).call();
                document.getElementById('userTokenBal').innerHTML = parseInt(userBalance._hex,16)/1000000 + " TBT";
                console.log(parseInt(userBalance._hex,16));
                const tokenSold = await contractInstance.tokenSold().call();
                document.getElementById('tokenSold').innerHTML = parseInt(tokenSold._hex,16)/1000000 + " TBT";
                console.log(parseInt(tokenSold._hex,16));

                const tokenPrice = await contractInstance.tokenPriceTrx().call();
                const tokenValue = parseInt(tokenPrice._hex,16)/1000000;
                document.getElementById('tokenRate').innerHTML ="1 TRX = "+ tokenValue + " TBT";
                document.getElementById('tokenRate1').innerHTML ="1 TRX = "+ tokenValue + " TBT";

            } catch (error) {
                console.log(error);
                
            }
        }

        // Non-dapp browsers...
        else {
            console.log(window.tronWeb.defaultAddress.base58);
                const contractInstance = await tronWeb.contract().at(contractAdd);

                const userBalance = await contractInstance.userTokenBalance(window.tronWeb.defaultAddress.base58).call();
                document.getElementById('userTokenBal').innerHTML = parseInt(userBalance._hex,16)/1000000 + " TBT";
                console.log(parseInt(userBalance._hex,16));
                const tokenSold = await contractInstance.tokenSold().call();
                document.getElementById('tokenSold').innerHTML = parseInt(tokenSold._hex,16)/1000000 + " TBT";
                console.log(parseInt(tokenSold._hex,16));

                const tokenPrice = await contractInstance.tokenPriceTrx().call();
                const tokenValue = parseInt(tokenPrice._hex,16)/1000000;
                document.getElementById('tokenRate').innerHTML ="1 TRX = "+ tokenValue + " TBT";
                document.getElementById('tokenRate1').innerHTML ="1 TRX = "+ tokenValue + " TBT";

        }
    })();
}

async function connectWallet(){
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        console.log(window.tronWeb.defaultAddress.base58);
        document.getElementById('walletid').innerHTML = window.tronWeb.defaultAddress.base58;
    }

    // Non-dapp browsers...
    else {
        alert('Non-Tron browser detected. You should consider trying Tronlink Extenstion!');
    }
} 


function buyToken1(){
  
    const tronWeb = window.tronWeb;
    const contractAdd = "THUEJukGarMTQoQU5oLsyLWZNoxsD1pkiH" //contract address
    

    // convert amounts to Sun
    var amounts_str = document.getElementById('trx1').value;

    (async()=>{
        // Modern dapp browsers...
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            try {
                console.log(window.tronWeb.defaultAddress.base58);
                const contractInstance = await tronWeb.contract().at(contractAdd);
                const totalAmont = amounts_str;
                const hash = await contractInstance.ExchangeTRXforTokenMannual().send({
                    callValue:tronWeb.toSun(totalAmont),
                });
                // location.href = "<?php echo $successUrl;?>&txhash="+hash;
                console.log(hash);
                document.getElementById('response1').innerHTML = "https://tronscan.org/#/transaction/"+hash;
                document.getElementById("myAnchor1").href = "https://tronscan.org/#/transaction/"+hash; 
            } catch (error) {
                // location.href = "<?php echo $errorUrl;?>&error="+error;
                console.log(error);
                document.getElementById('response1').innerHTML = error;
            }
        }

        // Non-dapp browsers...
        else {
            alert('Non-Tron browser detected. You should consider trying Tronlink Extenstion!');
        }
    })();
}


function calculateToken1(){
    const tronWeb = window.tronWeb;
    const contractAdd = "THUEJukGarMTQoQU5oLsyLWZNoxsD1pkiH"; //contract address

    (async()=>{
        // Modern dapp browsers...
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            try {
               
                const contractInstance = await tronWeb.contract().at(contractAdd);

                const tokenPrice = await contractInstance.tokenPriceTrx().call();
                const tokenValue = parseInt(tokenPrice._hex,16)/1000000;
                var x = document.getElementById("trx1").value;
                var amount = parseFloat(x/tokenValue)
                console.log(amount);
                document.getElementById("tbt1").value = amount;
                
            } catch (error) {
                console.log(error);
                
            }
        }

        // Non-dapp browsers...
        else {
            document.getElementById("tbt1").value = "Connect to Wallet";
        }
    })();
    
}