'use strick'
let apiKey = 'cc1efb0f06701a578843';
let respond = new XMLHttpRequest();
let urlCurrencies = `https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`;
let urlCountries = `https://free.currconv.com/api/v7/countries?apiKey=${apiKey}`;
let urlConvert = `https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=${apiKey}`;

let countries = document.querySelector('.country1');
let countries2 = document.querySelector('.country2');

console.log(countries2);


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