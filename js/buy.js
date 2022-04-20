const dissccountCodeInput = document.getElementById("code");
const entrysInput = document.getElementById("entrys");
const shopFormElement = document.getElementById("shopForm");

let priceLabel = document.getElementById("precio");
let disccount = 1;
let priceEntry = 600000;
let price = priceEntry;

function getPrice(){
    
    if(entrysInput.value != ""){
        entrys = parseInt(entrysInput.value);
        disccount = getDisccount();
    }else {
        entrysInput.value = "1";
    }
    price = entrys * (priceEntry - (priceEntry * disccount));
    priceLabel.innerHTML = `COP ${price} `
}

function getDisccount(){
    let disccount = 0
    if(dissccountCodeInput.value != ""){
        if(dissccountCodeInput.value == "ABCDE-FGHIJ-KLMNO"){
            disccount = 0.5;
        }else {
            alert("Codigo inválido")
            dissccountCodeInput.value = "";
        }
    }
    
    return disccount
}

