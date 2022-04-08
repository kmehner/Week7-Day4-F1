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
    console.log(form)

    // Create function to handle submit event
    async function handleSubmit(e){
        e.preventDefault();

        // Check if table has data
        var raceTable = document.getElementById('standingsTable'); 
        var tableRows = raceTable.rows.length;
        
        // If table has data (length > 1) remove that data
        // -1 so the table head doesn't get removed
        if (tableRows > 1){
            for (let i = 0; i < tableRows -1; i++){
                table.deleteRow(-1)
            };
        };

        let raceYear = e.target.raceYear.value
        let raceSeason = e.target.raceSeason.value
        console.log(raceYear, raceSeason)

        // Make the request to get data 
        let race = await getRaceInfo(raceYear, raceSeason)
        console.log(race)
        // append race info to rows 
        for (let i = 0; i < race.length; i++){
            addRow(race[i])
        };
    }

    // function that accepts year/season and returns race info
    // View in output: res = fetch('https://ergast.com/api/f1/2008/5/driverStandings').then(res => res.text()).then(data => console.log(data))

    async function getRaceInfo(raceYear, raceSeason){
        try{
            let res = await fetch(`https://ergast.com/api/f1/${raceYear}/${raceSeason}/driverStandings.json`)
            let data = await res.json();
            return data['MRData']['StandingsTable']['StandingsLists']['0']['DriverStandings']
        } catch(e){
            console.error(e)
        }
    }

    // function to add the table rows for the output 

    async function addRow(race){
        // Table body to insert into
        const tbody = document.getElementById('f1Body')
        // Table Row
        const row = document.createElement('tr')

        // Position
        let position = race['position']
        const th = document.createElement('th')
        th.scope = "row"
        th.innerHTML = position
        row.append(th)

        // Driver name
        let driver = race['Driver']['givenName']
        const driverTD = document.createElement('td')
        driverTD.innerHTML = driver
        row.append(driverTD)

        // Points
        let points = race['points']
        const pointsTD = document.createElement('td')
        pointsTD.innerHTML = points
        row.append(pointsTD)

        // Nationality
        let nation = race['Driver']['nationality']
        const nationTD = document.createElement('td')
        nationTD.innerHTML = nation
        row.append(nationTD)

        // Constructor
        let constructor = race['Constructors'][0]['constructorId']
        let constID = document.createElement('td')
        constID.innerHTML = constructor
        row.append(constID)

        // console.log(driver, position, points, nation, constructor)
        // Add row to table body
        tbody.append(row)

    }
       
    // Add submit event listener to form
    form.addEventListener('submit', handleSubmit)
}



