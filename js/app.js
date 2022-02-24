// ger current year
const date = new Date().getFullYear();
document.getElementById("currentYear").innerText = date;
const displayError = document.getElementById('display-error');
const spinner = document.getElementById('spinner');
const loadSportDb = () =>{
    spinner.style.display = 'block';
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   if(searchText == ''){
       displayError.style.display = 'block'
   }
   else{
       displayError.style.display = 'none'
    const sportsContainer = document.getElementById('sports-container');
    sportsContainer.textContent = '';
    // detail content clear
    const leagueDetail = document.getElementById('league-detail');
     leagueDetail.textContent = '';
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchLeagues(data.table))
    // clear the field
    searchField.value = '';
   }
}
const loadLeagues = () =>{
    spinner.style.display = 'block';
     fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=England&s=Soccer`)
    .then(res => res.json())
    .then(data => displaySports(data.countrys))
}
loadLeagues();
const displaySports = (sports) =>{
    
    const sportsContainer = document.getElementById('sports-container');
    sports.forEach(sport =>{
        const div = document.createElement('div');
        div.className = 'col-lg-4 p-3'
        div.innerHTML = `
        <div onclick="leagueDetails('${sport.idLeague}')">
        <h3 class="text-white">${sport.strLeague}</h3>
        <p class="text-white">league id: ${sport.idLeague}</p>
        <img width="300px" src="${sport.strBadge}" alt="">
        <div>
        `
        sportsContainer.appendChild(div)
        spinner.style.display = 'none';
        
    })
    
}


const leagueDetails = (idLeague) =>{
    spinner.style.display = 'block';
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=${idLeague}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLeagueDetails(data.table[0]))
}

const displayLeagueDetails = (league) =>{
    const leagueDetail = document.getElementById('league-detail');
    leagueDetail.textContent = '';
    const div = document.createElement('div');
    div.className = 'mx-auto bg-primary w-50 p-3 text-center'
    div.innerHTML= `
    <h3 class="text-white">${league.strLeague}</h3>
    <p class="text-white">league id: ${league.idLeague}</p>
    <img width="300px" src="${league.strTeamBadge}" alt="">
    `
    leagueDetail.appendChild(div)
    spinner.style.display = 'none';
}

const displaySearchLeagues = (leagues) =>{ 
    const sportsContainer = document.getElementById('sports-container');
    sportsContainer.textContent = '';
    leagues.forEach(league =>{
        const div = document.createElement('div');
        div.className = 'col-lg-4 p-3'
        div.innerHTML = `
        <div onclick="leagueDetails('${league.idLeague}')">
        <h3 class="text-white">${league.strLeague}</h3>
        <img width="300px" src="${league.strTeamBadge}" alt="">
        </div>
        
        `
        sportsContainer.appendChild(div)
        spinner.style.display = 'none';
    })
}