// Create a Scope to limit my variables

{
    // Set the navbark to dark by replacing the word light with dark in className
    let body = document.body;
    let children = body.children;
    let navBar = children[0];
    navBar.className = navBar.className.replaceAll('light', 'dark');

    // Set the buttons to be bootstrap style with colors
    let myButtonColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info']

    let myButtons = document.querySelectorAll('.col-2 > button')
    
    // Loop through buttons and apply class name
    for (let i = 0; i < myButtons.length; i++){
        myButtons[i].className = `btn btn-${myButtonColors[i]} w-100`
    }

    // Add a header under the buttons in the container
    // First create the header
    let newHeader = document.createElement('h4');
    newHeader.id = 'myHeader';
    newHeader.className = 'text-center mt-3';
    newHeader.innerHTML = 'Created by Brian with the help of JavaScript';

    // Get the row of buttons
    let buttonRow = document.getElementsByClassName('row')[0];
    // Add the new header after the button row
    buttonRow.after(newHeader);

}


// Create a new scope
{
    // Get the header
    let myHeader = document.getElementById('myHeader');
    // console.log(myHeader);

    // Create a function to execute when the event is triggered
    function handleHeaderEvent(e){
        let elementToChange = e.target;
        if (elementToChange.style.color === 'black'){
            elementToChange.style.color = 'purple';
        } else {
            elementToChange.style.color = 'black';
        }
    }

    // Add event listener
    myHeader.addEventListener('click', handleHeaderEvent);

}

// Add event listeners for our buttons
{
    let myButtonColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info']

    let myButtons = document.querySelectorAll('.col-2 > button')

    for (let i=0; i< myButtons.length; i++){
        let button = myButtons[i]
        button.addEventListener('click', () => {
            let body = document.body;
            body.className = `bg-${myButtonColors[i]}`;
        })
    }
}

// Get country info and display on page
{
    // Grab the form
    let form = document.getElementById('countryForm');
    
    // Create function to handle Submit Event
    async function handleSubmit(e){
        e.preventDefault();
        let countryName = e.target.countryName.value
        // Here is where we will make the request to get the data
        let country = await getCountryInfo(countryName)
        console.log(country);
        // Here is where we will build the element to display
        await buildCountryCard(country);
        e.target.countryName.value = '';
    }

    // function that accepts country name and returns a country object
    async function getCountryInfo(countryName){
        try{
            let res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            let data = await res.json()
            return data[0]
        } catch(e){
            console.error(e)
        }
    }

    // function to build the card for the country
    async function buildCountryCard(country){
        // Create card div
        const card = document.createElement('div');
        card.className = 'card';

        // Create a top image
        const image = document.createElement('img')
        image.className = 'card-img-top';
        image.src = country.flags.png;
        // Add image to the card div
        card.append(image);

        // Create card body div
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body'

        // Create country name and population elements
        const countryTitle = document.createElement('h5');
        countryTitle.className = 'card-title';
        countryTitle.innerHTML = country.name.official

        const population = document.createElement('p');
        population.className = 'card-text';
        population.innerHTML = `Population: ${country.population.toLocaleString('en-US')}`;

        // Append name and pop to card body
        cardBody.append(countryTitle);
        cardBody.append(population);

        // Add card body to card div
        card.append(cardBody);

        // Create column div
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3';

        // Add the card to the column
        col.append(card);

        // Get the country Display row
        const countryDisplayRow = document.getElementById('countryDisplay');

        // Add new column to the display
        countryDisplayRow.append(col);

    }

    // Add submit event listener to form
    form.addEventListener('submit', handleSubmit);

}