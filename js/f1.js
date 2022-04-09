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

    // Create function to handle submit event
    async function handleSubmit(e){
        e.preventDefault();
        let raceYear = e.target.raceYear.value
        let raceSeason = e.target.raceSeason.value

        // Make the request to get data 
        let race = await getRaceInfo(raceYear, raceSeason)
        console.log(race)

        // Built the element to display
        let createTable = await buildRaceTable()
        console.log(createTable)

        // Add rows 
        for (const singleDriver of race){
            let singleDriverIndex = race.indexOf(singleDriver) + 1
            addRow(singleDriver, singleDriverIndex)
        }



    }

    // function that accepts year/season and returns race info
    // View in output: res = fetch('https://ergast.com/api/f1/2008/5/driverStandings').then(res => res.text()).then(data => console.log(data))

    async function getRaceInfo(raceYear, raceSeason){
        try{
            let res = await fetch(`https://ergast.com/api/f1/${raceYear}/${raceSeason}/driverStandings.json`)
            let data = await res.json();
            return data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
        } catch(e){
            console.error(e)
        }
    }

    // function to build the table for the output 
    // position, points, driver name, driver nationality, and constructor name.

    async function buildRaceTable(){

        // Find the table div in the HTML
        const raceDiv = document.getElementById('standingsTable')

        let tableHeaders = ['Position', 'Points', 'Driver Name', 'Driver Nationality', 'Constructor name']

        
        // remove all children from table if any
        while (raceDiv.firstChild) raceDiv.removeChild(raceDiv.firstChild)

        // create the table 
        let raceTable = document.createElement('table')
        raceTable.className = 'raceTable'

        // create the table header group element 
        let raceTableHead = document.createElement('thead')
        raceTableHead.className = 'raceTableHead'

        // create the row that contains the header
        let raceTableHeaderRow = document.createElement('tr')
        raceTableHeaderRow.className = 'raceTableHeaderRow'

        // iterate over all the strings in the tableHeader array and append the header cells to the table header row
        tableHeaders.forEach(header => {
            let raceHeader = document.createElement('th')
            raceHeader.innerHTML = header
            raceTableHeaderRow.append(raceHeader)
        })

        // Append the header row to the table header group element 
        raceTableHead.append(raceTableHeaderRow)
        raceTable.append(raceTableHead)

        // Create the table body group element 
        let raceTableBody = document.createElement('tbody')
        raceTableBody.className = "raceTable-Body"
        raceTable.append(raceTableBody)

        // append the table to the scoreboard div 
        raceDiv.append(raceTable)

    }

    async function addRow(singleDriver, singleDriverIndex){
        const raceTable = document.querySelector('.raceTable')

        // Create the current table row 
        let raceTableBodyRow = document.createElement('tr')
        raceTableBodyRow.className = 'raceTableBodyRow'

        // create the column cells that will be appended to the current table 
        let racePosition = document.createElement('td')
        racePosition.innerText = singleDriver.position

        let racePoints = document.createElement('td')
        racePoints.innerText = singleDriver.points

        let raceDriver = document.createElement('td')
        racePoints.innerText = singleDriver.Driver['familyName']

        let raceNationality = document.createElement('td')
        raceNationality.innerText = singleDriver.Driver.nationality

        let raceConstructorId = document.createElement('td')
        raceConstructorId.innerText = singleDriver.Constructors[0].name

        raceTableBodyRow.append(racePosition, racePoints, raceDriver,raceNationality,raceConstructorId)
        raceTable.append(raceTableBodyRow)
        
    }

       
    // Add submit event listener to form
    form.addEventListener('submit', handleSubmit)
}



