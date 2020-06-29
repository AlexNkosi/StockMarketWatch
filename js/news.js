let callFinHubAPI = new XMLHttpRequest();
let objNews;


// selectors 
let newsList = document.querySelector('#newsList');


// Event Handler 

document.addEventListener('DOMContentLoaded', callAPIAtContentLoad)


function callAPIAtContentLoad() {

    callFinHubAPI.open('GET', 'https://finnhub.io/api/v1/news?category=general&minId=10&token=brbr3pnrh5rb7je2u100');


    callFinHubAPI.onreadystatechange = () => {
        if (callFinHubAPI.readyState === 4 && callFinHubAPI.status === 200) {
            console.log(JSON.parse(callFinHubAPI.response));
            objNews = JSON.parse(callFinHubAPI.response);
            createNewsElement(objNews);
        }
    }
    callFinHubAPI.send();
}


function createNewsElement(objNews) {


    for (let index = 0; index < objNews.length; index++) {
        // creating elements to use in the news list 
        let list = document.createElement('li');
        let link = document.createElement('a');
        let newsImage = document.createElement('img');
        let source = document.createElement('span');
        let articleDate = document.createElement('span');
        let heading = document.createElement('span');

        // adding classes to use in CSS 
        list.classList.add('class_list');
        newsImage.classList.add('class_img');
        source.classList.add('class_source');
        articleDate.classList.add('class_date');
        link.classList.add('class_link');
        list.classList.add('col-sm');
        // list.classList.add('card');
        // list.classList.add('card-handler');


        heading.textContent = objNews[index].headline;


        newsImage.src = objNews[index].image;
        link.href = objNews[index].url;
        heading.textContent = objNews[index].headline;
        source.textContent = objNews[index].source;
        let timeStamp = new Date(objNews[index].datetime);
        articleDate.textContent = timeStamp.toLocaleTimeString(); // <timeStamp.toLocaleTimeString()> 




        // appending heading to link 
        link.append(heading);

        // appending all elements to the list 
        list.appendChild(newsImage);
        list.appendChild(link);
        list.appendChild(source);
        list.appendChild(articleDate);



        // appending the list into the parent element which is the UL unorderd list 
        newsList.insertAdjacentElement('beforeend', list);

    }



}