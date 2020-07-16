let callFinHubAPI = new XMLHttpRequest();
let objNews;


// selectors 
let newsList = document.querySelector('#newsList');
let slideParent = document.querySelector('.carousel-inner');
let list = document.querySelector('.carousel-indicators');


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
// heading.textContent = objNews[index].headline;
// newsImage.src = objNews[index].image;
// link.href = objNews[index].url;
// heading.textContent = objNews[index].headline;
// source.textContent =  objNews[index].source;
// let timeStamp = new Date(objNews[index].datetime);
// articleDate.textContent = timeStamp.toLocaleTimeString(); // <timeStamp.toLocaleTimeString()> 


function createNewsElement(objNews) {

    let count = 0;
    let parentDiv = document.createElement('div');
    for (let index = 0; index < objNews.length; index++) {
        // creating elements to use in the news list 
           
    let imgDiv = document.createElement('div');
    let newsImg = document.createElement('img');
    let newsListed = document.createElement('li');

    //adding classes 
    parentDiv.classList.add('carousel-inner');
    imgDiv.classList.add('carousel-item');
    
    //setting the first news to be active in the slide 
    if(index === 0)
    {
        imgDiv.classList.add('active');
        newsListed.classList.add('active')
        
    }
    newsImg.classList.add('d-block');
    newsImg.classList.add('w-50');

    //adding image source
    newsImg.setAttribute('src', objNews[index].image);
    // console.log(imgNames[index]);
   
    //seting newsA
    newsListed.setAttribute('data-target','#newsSlide');
    newsListed.setAttribute('data-slide-to',index);
  
    list.appendChild(newsListed);
    count++;

    imgDiv.appendChild(newsImg);
    parentDiv.appendChild(imgDiv);
    slideParent.appendChild(parentDiv);
        
    }

       
    



}


/* let list = document.createElement('li');
        let link = document.createElement('a');
        let newsImage = document.createElement('img');
        let source = document.createElement('span');
        let articleDate = document.createElement('span');
        let heading = document.createElement('p');
        let cardBodyDiv = document.createElement('div');

        // adding classes to use in CSS 
        list.classList.add('card');
        newsImage.classList.add('card-img-top');
        newsImage.classList.add('class_img');
        cardBodyDiv.classList.add('card-body');
        link.classList.add('card-text');
        source.classList.add('card-footer');
        articleDate.classList.add('card-footer');
        link.classList.add('class_link');
        list.classList.add('col-sm-6');
        list.style.marginTop = '2rem'

        //
        heading.textContent = objNews[index].headline;
        newsImage.src = objNews[index].image;
        link.href = objNews[index].url;
        heading.textContent = objNews[index].headline;
        source.textContent =  objNews[index].source;
        let timeStamp = new Date(objNews[index].datetime);
        articleDate.textContent = timeStamp.toLocaleTimeString(); // <timeStamp.toLocaleTimeString()> 




        // appending heading to link 
        link.append(heading);

        // appending all elements to the list 
        cardBodyDiv.appendChild(link);
        cardBodyDiv.appendChild(source);
        cardBodyDiv.appendChild(articleDate);

        list.appendChild(newsImage);

        list.appendChild(cardBodyDiv);




        // appending the list into the parent element which is the UL unorderd list 
        newsList.insertAdjacentElement('beforeend', list);
 */