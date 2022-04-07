/* Using JavaScript's fetch() and the DOM, you are to update the 
f1.html and f1.js files to create a table of data using the F1 racer API 
(i.e. use "f1" as <series> in API call). 
I have attached a link to the documentation below. 
The Overview will show you how to make the API call. 
The table should display at least position, points, driver name, driver nationality, and constructor name. 
The table should dynamically populate the data when a "season" and "round" are specified within your form */

console.log('This is the F1 js file')

// Create a scope to limit my variables 
{
    // Set the navbar to dark
    let body = document.body;
    let children = body.children;
    let navBar = children[0];
    navBar.className = navBar.className.replaceAll('light', 'dark');
}

// Get race info and display on page 

{
    // Grab the form
    let form = document.getElementById('raceForm');

    // Create functiomn to handle submit event
    async function handleSubmit(e){
        e.preventDefault();
        let year = e.target.year.value
        let season = e.target.season.value

        // Make the request to get data 
        let race = await getRaceInfo(year, season)
        console.log(race);

        // Built the element to display
        // insert table func here
        // e.target.year.value = '';
        // e.target.season.value = '';
    }

    // function that accepts year/season and returns race info
    // View in output: res = fetch('https://ergast.com/api/f1/2008/5/driverStandings').then(res => res.text()).then(data => console.log(data))

    async function raceGetInfo(year, season){
        try{
            let res = await fetch(`https://ergast.com/api/f1/${year}/${season}/driverStandings`)
            let data = await res.json()
            return data
        } catch(e){
            console.error(e)
        }
    }

       
    // Add submit event listener to form
    form.addEventListener('submit', handleSubmit)
}



