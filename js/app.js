'use strick'
let apiKey = 'cc1efb0f06701a578843';
let respond = new XMLHttpRequest();
let conv = new XMLHttpRequest();
let currencyOne;
let currencyTwo;
let objPrice; // used to store the price of the currency to be converted
let convIntID; // ID for setInterval
let arrSymbols = ['','']; 

let urlCurrencies = `https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`;
let urlCountries = `https://free.currconv.com/api/v7/countries?apiKey=${apiKey}`;
let urlConvert = "";


let countries = document.querySelector('.country1'); // select menu to load all countries, 
let countries2 = document.querySelector('.country2'); //select menu to load all countries 2
let firstCur = document.querySelector('#firstCurrency'); // input for amount to be converted
let secondCur = document.querySelector('#secondCurrency'); //input for amount to be converted
let currConShow = document.querySelector('#currencyConverter'); //to identify the link list to toggle currentcy converter 
let convertedPirce = document.querySelector('#convertedPirce');
let cpyYear = document.querySelector('#cpyYear');


//EventListener  abr = EL 

countries.addEventListener('click', storeContriesToArray); // EL to load countries in menu one
countries2.addEventListener('click', storeContriesToArray); //EL to load countries in menu two
firstCur.addEventListener('click', convertBaseCurrentcy);
currConShow.addEventListener('click', (e) => { //EL with annonymous funtion implemetation
    let card = document.querySelector('#currentcyModal'); //Purpose is identify an element then toggle 
    // card.classList.toggle('d-none'); //calling a class from bootrap

    // if (card.classList.contains('d-none')) {
    //     stopIntervalCall();

    // }

});


document.addEventListener('DOMContentLoaded', () => { // EL for copyright span text on the footer 

    let year = new Date();

    cpyYear.textContent = new Date().getFullYear();
    console.log(cpyYear);
})


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

function returnValue(key, index) {
    return KeyframeEffect[index]; // returns the value of the given key

}

// function to return object populated with keys make it easier to work with API 
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


function storeContriesToArray() 
{
    let BaseCurrentcy;
    let currentcy2;
    if (!Number.isNaN(countries.value)) {

        BaseCurrentcy = countries.value; // takes the input value of the element of the first currency 
        currentcy2 = countries2.value; //takes the input value of the element of the second currentcy
        arrSymbols[0] = BaseCurrentcy; 
        arrSymbols[1] = currentcy2; 
    }
    console.log(arrSymbols);
    convert(BaseCurrentcy, currentcy2); // sand it to the convert function

}


// 
function convert(curr1, curr2) {
    currencyOne = encodeURIComponent(curr1); //makes sure the string is encoded i.e meets the standard to be a api query 
    currencyTwo = encodeURIComponent(curr2); //makes sure the string is encoded i.e meets the standard to be a api query 
    urlConvert = `https://free.currconv.com/api/v7/convert?q=${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}&compact=ultra&apiKey=${apiKey}`; //inserting mixing variables
    conv.open('GET', urlConvert);

    conv.onreadystatechange = (e) => {

        if (conv.readyState === 4 && conv.status === 200) { //<conv.readyState> code tests if the API is done laoding the data 
            console.log(conv.response, " s");
            objPrice = JSON.parse(conv.response); // convert from JSON to obj 

            // firstCur.value = objPrice[returnObjKeys(objPrice)[0]]; // 

        }

    }
    conv.send(); //calling the API 


}


function convertBaseCurrentcy() {
    trackChanges(); // call setInterval to tract changes in the input 
    let amount = 0;
    // return the object then i access the first index of the currentcy inside the objPrice
    if (!Number.isNaN(firstCur.value) || objPrice[returnObjKeys(objPrice)[0]] !== null) { // validation if botj
        //< objPrice[returnObjKeys(objPrice)[0]]).toPrecision(20)>
        // return the object then i access the first index of the currentcy inside the objPrice
        //then precision is 15
        //then amount will obtain the calculated value of the currentcies
        amount = (firstCur.value * objPrice[returnObjKeys(objPrice)[0]]).toPrecision(10);
        secondCur.value = amount;

        convertedPirce.textContent = `${amount}\t`;

        return amount;
    }

}

function trackChanges() {

    convIntID = setInterval(() => { // with the help of assyc setInterval, this function made it possible to tract every change in the input fied 
        convertBaseCurrentcy(); // value is used to tract if the amount being conveter

    }, 100);

}

function stopIntervalCall() {
    clearInterval(convIntID); // stops the 
    console.log('stop interval');
}



// convIntID;



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