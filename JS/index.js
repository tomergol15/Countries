console.log('hello');
let countries = [];
const containerCountries = document.querySelector(".countries-grid");
const countryCardTemplate = document.querySelector(".country.scale-effect");

fetch('./CountriesData.json')
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        countries = data;
        console.log(data);
        innerDetailsIntoCards(countries); 
    })
    .catch((error) => {
        console.error("Unable to fetch data:", error);
    });

const innerDetailsIntoCards = (array) => {
    containerCountries.innerHTML = '';

    array.forEach((country) => {
        const cloneCard = countryCardTemplate.cloneNode(true);
       
        const titleElement = cloneCard.querySelector(".country-title");
        const flagImage = cloneCard.querySelector(".country-flag img");
        const countryInfo = cloneCard.querySelectorAll(".country-brief li");

        titleElement.textContent = country.name;
        flagImage.src = country.flag;
        flagImage.alt = `${country.name}`;
        
        countryInfo[0].textContent = "Population: ";
        const populationStrong = document.createElement("strong");
        populationStrong.textContent = country.population;
        countryInfo[0].appendChild(populationStrong);
     
        countryInfo[1].textContent = "Region: ";
        const regionStrong = document.createElement("strong");
        regionStrong.textContent = country.region;
        countryInfo[1].appendChild(regionStrong);

       
        countryInfo[2].textContent = "Capital: ";
        const capitalStrong = document.createElement("strong");
        capitalStrong.textContent = country.capital;
        countryInfo[2].appendChild(capitalStrong);

        containerCountries.appendChild(cloneCard);
    });
};

const openDropDown = () => {
  const dropDown = document.querySelector(".dropdown-wrapper");
  console.log('enter');
  dropDown.classList.toggle("open");
}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
const createDropDownBody=()=>{
    const dropdownBody = document.createElement("div");
    dropdownBody.classList.add("dropdown-body");
    const ul = document.createElement("ul");

    regions.forEach((region)=>{
        const li = document.createElement('li');
        li.textContent = region;
        li.setAttribute("data-region", region.toLowerCase());
        li.setAttribute("onClick", "filterByRegion(event)");
        ul.appendChild(li);
    });
    dropdownBody.appendChild(ul);
    const dropdownWrapper = document.querySelector(".dropdown-wrapper"); 
    dropdownWrapper.appendChild(dropdownBody); 
}
createDropDownBody();

const filterByRegion = (event) => {
   const region = event.target.getAttribute("data-region");
   console.log("select region:" + region)

   if(region!="all"){
   const result = countries.filter((country)=>{
    return country.region.toLowerCase() == region.toLowerCase()
   })
   console.log(result);
   innerDetailsIntoCards(result);
}
else{
    innerDetailsIntoCards(countries);
}

//    const result =  countries.filter((country)=>{
//          return country.region === "Africa";
//     })
//     console.log(result);
}

const matchValues = (country, input) => {
    return (country.name.toLowerCase().includes(input) || 
        country.population.toString().includes(input)) ||
        country.region.toLowerCase().includes(input) ||
        country.capital.toLowerCase().includes(input)
}
const filterBySerach = (event) =>{
    console.log("enter to filterbyserach func");
    const input = event.target.value.toLowerCase().trim(); //ignore white spaces and make it lowercase letters
    console.log(input);

    const resultBySearch = countries.filter((country)=>{
        return matchValues(country,input);
     })
    console.log(resultBySearch);
    innerDetailsIntoCards(resultBySearch);
}


const switchPage = (event) =>{
    const card = event.currentTarget;
    console.log(card.innerHTML);
    
    const titleElement = card.querySelector(".country-title").textContent;
    const flagImage = card.querySelector(".country-flag img").src;
    const population = card.querySelector(".country-brief li:nth-child(1)").textContent;
    const region = card.querySelector(".country-brief li:nth-child(2)").textContent;
    const capital = card.querySelector(".country-brief li:nth-child(3)").textContent;
    
    const countryInfo = {name:titleElement, flagImg:flagImage, population:population, region: region, capital:capital};
    console.log(countryInfo);
    localStorage.setItem("selectedCountry", JSON.stringify(countryInfo));
    window.location.href = "details.html";
}


//maybe do this
// const changeColorOfPage = () =>{
//     console.log("enter");
//     const currentColor = getComputedStyle(document.body).backgroundColor;
    
//     if (currentColor === "rgb(33, 37, 41)") { 
//         document.body.style.backgroundColor = "rgb(255, 255, 255)";
//     } else {
//         document.body.style.backgroundColor = "rgb(33, 37, 41)";
//     }
// };
    






