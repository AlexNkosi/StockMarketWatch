'use strick'
let apiKey = 'cc1efb0f06701a578843';
let respond = new XMLHttpRequest();
let conv = new XMLHttpRequest();
let currencyOne;
let currencyTwo;
let objPrice;

let urlCurrencies = `https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`;
let urlCountries = `https://free.currconv.com/api/v7/countries?apiKey=${apiKey}`;
let urlConvert = `https://free.currconv.com/api/v7/convert?q=${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}&compact=ultra&apiKey=${apiKey}`;

let countries = document.querySelector('.country1');
let countries2 = document.querySelector('.country2');
let firstCur = document.querySelector('.firstCurrency');
let secondCur = document.querySelector('.secondCurrency');
let currConShow = document.querySelector('#currencyConverter');

//event handlers 

countries.addEventListener('click', countries1Currency);
countries2.addEventListener('click', countries2Currency);
firstCur.addEventListener('click', convertOne);
currConShow.addEventListener('click', (e) => {
    let card = document.querySelector('.display');
    card.classList.toggle('d-none');
})


console.log(firstCur);


respond.open('GET', urlCountries);

respond.send();
let obj = [];

respond.onreadystatechange = (e) => {
    // console.log(respond.response);
    if (respond.readyState === 4 && respond.status === 200) {

        obj = JSON.parse(respond.response);
        // console.log(respond.response);



    }
    display(obj);
}


//functions 
function display(item) {
    // let count =0;
    for (const key in item.results) {


        let opt = document.createElement('option'); //for cuntries in number 1
        let opt2 = document.createElement('option'); //for countries in number 2

        opt.textContent = item.results[key].name;
        opt2.textContent = item.results[key].name;
        opt.setAttribute('value', item.results[key].currencyId);
        opt2.setAttribute('value', item.results[key].currencyId);

        countries.insertAdjacentElement("beforeend", opt);
        countries2.insertAdjacentElement("beforeend", opt2);

        // console.log("", item.results[key].name);
    }

    // console.log(typeof(item.results));
    // console.log(item.results);
}

function countries1Currency(e) {

    firstCur.value = this.value;
    let cur1 = this.value;
    let cur2 = countries2.value;
    convert(cur1, cur2);

}

function countries2Currency(e) {

    firstCur.value = this.value;
    let cur1 = countries.value;
    let cur2 = this.value;
    convert(cur1, cur2);

}

function convert(curr1, curr2) {
    currencyOne = encodeURIComponent(curr1);
    currencyTwo = encodeURIComponent(curr2);
    urlConvert = `https://free.currconv.com/api/v7/convert?q=${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}&compact=ultra&apiKey=${apiKey}`;
    conv.open('GET', urlConvert);
    conv.send();

    conv.onreadystatechange = (e) => {

        if (conv.readyState === 4 && conv.status === 200) {
            console.log(conv.response, " s");
            objPrice = JSON.parse(conv.response);
            console.log(objPrice, typeof(objPrice));

            firstCur.value = objPrice['USD_ZAR']; // 
            //kcontinue to apply calc of the currency  from visa versa 
            // 
        }

    }

}
let symbole = document.querySelector('.amount');
console.log(symbole);

function convertOne() {

    secondCur.value = firstCur.value * objPrice['USD_ZAR'];
    let symbole = document.querySelector('.amount');

    symbole.textContent = firstCur.value * objPrice['USD_ZAR'];
}


let convInt = setInterval(() => {
    convertOne();
}, 100);
convInt();
// clearInterval(convInt);
/*var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-cross-currencies?id=aed%252Caud%252Cbrl%252Ccad%252Cchf%252Ccnh%252Ccny%252Ccop%252Cczk%252Cdkk%252Ceur%252Cgbp%252Chkd%252Chuf%252Cidr%252Cils%252Cinr%252Cjpy%252Ckrw%252Cmxn%252Cmyr%252Cnok%252Cnzd%252Cphp%252Cpln%252Crub%252Csek%252Csgd%252Cthb%252Ctry%252Ctwd%252Cusd%252Czar");
xhr.setRequestHeader("x-rapidapi-host", "bloomberg-market-and-financial-news.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "d17387c034msh1bddbc11277e3b4p146614jsn4a2c95c67479");

xhr.send(data); */