let currentDish
let dishIDCounter

fetch('http://localhost:3000/burgers')
.then((res) => res.json())
.then((data) => {
   // console.log(data);
    getBurgers(data);
    getDishDetails(data);

})
fetch('http://localhost:3000/pastas')
.then((res) => res.json())
.then((data) => {
   // console.log(data);
    getPastas(data);
    getDishDetails(data);
})

fetch('http://localhost:3000/pizzas')
.then((res) => res.json())
.then((data) => {
   // console.log(data);
    getPizzas(data);
    getDishDetails(data);

})


// const foodDescriptionList = document.getElementById('');
// const foodDescriptionListItems = foodDescriptionList.childNodes;
const navImages = document.getElementsByClassName("nav-item");
const navImagesArr = Array.from(navImages);

const menuNavCategories = document.getElementsByClassName('overlay-text')
const instructionsHeader = document.getElementById('instructions')
const menuItemsList = document.getElementById('dish-items')
const instructionsList = document.getElementById('menu-items')

const logoImgBlock = document.querySelector('span.image-box');
const dishDetailContainer = document.getElementById('food-description-list');


//DOM variables containing the elements for selecting menu items 
const menuItemsListElement = document.getElementById('dish-items')

//variables for dish detail section
const dishDetailsLiElements = document.getElementsByClassName('dishlist');
const dishDetailsLiElementsArr = Array.from(dishDetailsLiElements);

//form element variables
const formEl = document.getElementById('new-food-form');


function getPastas(data) {
    navImagesArr[0].addEventListener('click', () =>{
        
        menuItemsList.textContent = "";
            instructionsHeader.textContent = `Favorite Local Pasta:`;
            instructionsList.style.display = 'none';
            logoImgBlock.innerHTML=""
            menuItemsList.style.display = 'block';
            dishDetailContainer.style.display = 'block';

        data.forEach((ele) => {
            // console.log(ele)
            const menuItemEls = document.createElement('li');
            menuItemEls.textContent = ele.name;
            menuItemEls.className = 'menu-item-els'
            menuItemsList.appendChild(menuItemEls);

        })
        //auto loads first menu item on menu list
        if(data.length > 0) {displayDishDetails(data[0])};
    })
}


function getPizzas(data) {
    navImagesArr[1].addEventListener('click', () =>{
            menuItemsList.textContent = "";
            instructionsHeader.textContent = `Favorite Local Pizza:`;
            instructionsList.style.display = 'none';
            logoImgBlock.innerHTML="";
            menuItemsList.style.display = 'block';
            dishDetailContainer.style.display = 'block';
        data.forEach((ele) => {
            // console.log(ele)
            const menuItemEls = document.createElement('li');
            menuItemEls.textContent = ele.name;
            menuItemsList.appendChild(menuItemEls);
          
        })
         //auto loads first menu item on menu list
        if(data.length > 0) {displayDishDetails(data[0])};
    })
}

function getBurgers(data) {
    navImagesArr[2].addEventListener('click', () =>{
        menuItemsList.textContent = "";
            instructionsHeader.textContent = `Favorite Local Burgers:`;
            instructionsList.style.display = 'none';
            logoImgBlock.innerHTML=""
            menuItemsList.style.display = 'block';
            dishDetailContainer.style.display = 'block';
            
        data.forEach((ele) => {
            const menuItemEls = document.createElement('li');
            menuItemEls.textContent = ele.name;
            menuItemsList.appendChild(menuItemEls);
          
        })
         //auto loads first menu item on menu list
        if(data.length > 0) {displayDishDetails(data[0])};
       
    })
    
}

//gets dish details by connect textContent of event.target (dish name on menu) w/ name value of dish in json object
function getDishDetails (data) {

    menuItemsListElement.addEventListener('click', (event) => {

        
      
        //grabs dish object by searching for name value in object array
        const itemName = event.target.textContent;
        const item = data.find(obj => obj.name == itemName);
        console.log(item);
        //adds star symbol in place of number values for rating and repeats symbol based on value
        const starSymbol = "٭";
        const starRating = starSymbol.repeat(item.rating); 
        currentDish = item;

        dishDetailsLiElementsArr[0].innerHTML = `<strong> Dish Name: </strong> \n ${item.name}`;
        dishDetailsLiElementsArr[1].innerHTML = `<strong> Description: </strong> \n ${item.description}`;
        dishDetailsLiElementsArr[2].innerHTML = `<strong> Restaurant: </strong> \n ${item.restaurant_name}`;
        dishDetailsLiElementsArr[3].innerHTML = `<strong> Address: </strong> \n ${item.address}`;
        dishDetailsLiElementsArr[4].innerHTML = `<strong> Price: </strong> \n $${item.price}`;
        dishDetailsLiElementsArr[5].innerHTML = `<strong> Type: </strong> \n ${item.category}`;
        dishDetailsLiElementsArr[6].innerHTML = `<strong> Rating: </strong> \n <span class="stars">${starRating}</span>`;
       
       // document.addEventListener('DOMContentLoaded', function() {
            const mapDiv = document.getElementById('map');
            mapDiv.innerHTML = ''; 
            const iframe = document.createElement('iframe');
            mapDiv.style.display = 'block';
            iframe.width = '600';
            iframe.height = '450';
            iframe.style.border = '0';
            iframe.loading = 'lazy';
            const location = encodeURIComponent(item.address); 
            iframe.src = `https://www.google.com/maps?q=${location}&output=embed`; 
            mapDiv.appendChild(iframe);       

    })

}


function displayDishDetails (data) {
    //adds star symbol in place of number input for rating
    const starSymbol = "٭";
    const starRating = starSymbol.repeat(data.rating); 

    dishDetailsLiElementsArr[0].innerHTML = `<strong> Dish Name: </strong> \n ${data.name}`;
    dishDetailsLiElementsArr[1].innerHTML = `<strong> Description: </strong> \n ${data.description}`;
    dishDetailsLiElementsArr[2].innerHTML = `<strong> Restaurant: </strong> \n ${data.restaurant_name}`;
    dishDetailsLiElementsArr[3].innerHTML = `<strong> Address: </strong> \n ${data.address}`;
    dishDetailsLiElementsArr[4].innerHTML = `<strong> Price: </strong> \n $${data.price}`;
    dishDetailsLiElementsArr[5].innerHTML = `<strong> Type: </strong> \n ${data.category}`;
    dishDetailsLiElementsArr[6].innerHTML = `<strong> Rating: </strong> \n <span class="stars">${starRating}</span>`;


}

//class to add form input data to a new object
class Dish {
    constructor(name,description,restaurant,address,price,foodType,rating){
        this.name = name;
        this.description = description;
        this.restaurant_name = restaurant;
        this.address = address;
        this.price = price;
        this.category = foodType;
        this.rating = rating;
}}
//click event to add form input info to json object

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectElement = document.getElementById('food_type');
    const selectedOptionText = selectElement.options[selectElement.selectedIndex].text

    const inputName = formEl.elements.name.value;
    const inputDescription = formEl.elements.description.value;
    const inputRestaurant = formEl.elements.restaurant_name.value;
    const inputAddress = formEl.elements.address.value;
    const inputPrice = formEl.elements.price.value;
    const inputFoodType = selectedOptionText;
    const outputServerLocation = formEl.elements.food_type.value;
    const inputRating = formEl.elements.rating.value;
    const newDish = new Dish (inputName, inputDescription, inputRestaurant, inputAddress, inputPrice, inputFoodType,inputRating)
    console.log(newDish);
    console.log(selectedOptionText);
    

    fetch(`http://localhost:3000/${outputServerLocation}`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDish)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        //clear inner html and load data
        //getDishDetails(data);
    })
    .catch((error) => console.error('Error:', error));
    formEl.reset();
})

