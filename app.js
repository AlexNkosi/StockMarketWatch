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

let countries = document.querySelector('.country1'); // select menu to load all countries, 
let countries2 = document.querySelector('.country2'); //select menu to load all countries 2
let firstCur = document.querySelector('.firstCurrency'); // input for amount to be converted
let secondCur = document.querySelector('.secondCurrency'); //input for amount to be converted
let currConShow = document.querySelector('#currencyConverter'); //to identify the link list to toggle currentcy converter 
let symbole = document.querySelector('.amount');


//EventListener  abr = EL 

countries.addEventListener('click', countries1Currency); // EL to load countries in menu one
countries2.addEventListener('click', countries2Currency); //EL to load countries in menu two
firstCur.addEventListener('click', convertOne);
currConShow.addEventListener('click', (e) => { //EL with annonymous funtion implemetation
    let card = document.querySelector('.loadCountriesToMenu'); //Purpose is identify an element then toggle 
    card.classList.toggle('d-none'); //a class from bootrap
});




respond.open('GET', urlCountries); // calling API to load all countries 

respond.send();
let obj = [];

respond.onreadystatechange = (e) => { // 
    // console.log(respond.response);
    if (respond.readyState === 4 && respond.status === 200) {

        obj = JSON.parse(respond.response);
        // console.log(respond.response);



    }
    loadCountriesToMenu(obj); // sanding the obj with data to loadCountriesToMenu function 
}


//functions 

function returnValue(keys, index) {
    return keys[index];

}

function returnObjKeys(object) {
    let objs = [];
    for (let obj in object) {
        objs.push(obj);
    }

    return objs;
}

function loadCountriesToMenu(item) {
    // used a for in loop to load data into the two country menu's 
    for (const key in item.results) { //by using this line of code <item.results> i end up with data with keys being the index I will use in order to obtain the values


        let opt = document.createElement('option'); //for cuntries in menu 1
        let opt2 = document.createElement('option'); //for countries in menu 2

        // both names of countries are rendered by the object then and loaded on the menu's
        opt.textContent = item.results[key].name;
        opt2.textContent = item.results[key].name;
        //loading the currency pair Id exp USD, CHF , ZAR, GBP 
        opt.setAttribute('value', item.results[key].currencyId);
        opt2.setAttribute('value', item.results[key].currencyId);


        //used insertAdjacentElement to load elemnts <beforeend> of their parent elemnt  
        countries.insertAdjacentElement("beforeend", opt);
        countries2.insertAdjacentElement("beforeend", opt2);

    }


}

function countries1Currency(e) {

    // firstCur.value = this.value;
    let cur1 = this.value; // takes the input value of the element of the first currency 
    let cur2 = countries2.value; //takes the input value of the element of the second currentcy
    convert(cur1, cur2); // sand it to the convert function

}

function countries2Currency(e) {

    // firstCur.value = this.value;
    let cur1 = countries.value; //takes the input value of the element of the first currency
    let cur2 = this.value; //takes the input value of the element of the second currentcy
    convert(cur1, cur2); // sand it to the convert function

}

// 
function convert(curr1, curr2) {
    currencyOne = encodeURIComponent(curr1); //makes sure the string is encoded i.e meets the standard to be a api query 
    currencyTwo = encodeURIComponent(curr2); //makes sure the string is encoded i.e meets the standard to be a api query 
    urlConvert = `https://free.currconv.com/api/v7/convert?q=${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}&compact=ultra&apiKey=${apiKey}`; //inserting mixing variables
    conv.open('GET', urlConvert);
    conv.send(); //calling the API 

    conv.onreadystatechange = (e) => {

        if (conv.readyState === 4 && conv.status === 200) { //<conv.readyState> code tests if the API is done laoding the data 
            console.log(conv.response, " s");
            objPrice = JSON.parse(conv.response); // convert from JSON to obj 

            firstCur.value = objPrice[returnObjKeys(objPrice)[0]]; // 

        }

    }

}


function convertOne() {

    secondCur.value = firstCur.value * objPrice[returnObjKeys(objPrice)[0]];
    let symbole = document.querySelector('.amount');

    symbole.textContent = firstCur.value * objPrice[returnObjKeys(objPrice)[0]];

    // firstCur.value = secondCur.value * objPrice[returnObjKeys(objPrice)[1]];

}


let convInt = setInterval(() => {
    convertOne();
}, 100);
convInt();
// clearInterval(convInt);


// let testMeObj = {
//     name: 'obj',
//     mode: 'strong',

// };

// console.log(testMeObj);

// for (let t in testMeObj) {
//     console.log(t);
// }

// let keys = returnObjKeys(testMeObj);

// console.log(testMeObj[returnValue(keys, 1)]);