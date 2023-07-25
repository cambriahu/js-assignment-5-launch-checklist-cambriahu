require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = 
    `<h2>Mission Destination</h2>
     <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
     </ol>
     <img src=${imageUrl}>`;
}

function validateInput(testInput) {
   if(testInput===""){
    return "Empty";
   }else if (isNaN(Number(testInput))=== true){
    return "Not a Number";
   }else if (isNaN(Number(testInput))=== false){
    return "Is a Number";
   }
}

//function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {   
function formSubmission(pilot, copilot, fuelLevel, cargoLevel) { 
   if(validateInput(pilot)==="Empty" || validateInput(copilot)==="Empty" || validateInput(fuelLevel)==="Empty" || validateInput(cargoLevel)==="Empty"){
    alert("All fields are required!");
   }else if(validateInput(pilot)==="Is a Number" || validateInput(copilot)==="Is a Number" || validateInput(fuelLevel)==="Not a Number" || validateInput(cargoLevel)==="Not a Number"){
    alert("Pilot and Copilot should not be numbers. Fuel Level and Cargo Mass should be numbers. Please try again.");
   }else if(fuelLevel>=10000 && cargoLevel<=10000){
    launchStatus.innerHTML = "Shuttle is ready for launch";
    launchStatus.style.color = "green";
    faultyItems.style.visibility='visible';
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`;  
    copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch.`;   
   }else if(fuelLevel<10000){
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
    faultyItems.style.visibility='visible';
    pilotStatus.innerHTML = `The pilot is ${pilot}.`;  
    copilotStatus.innerHTML = `The copilot is ${copilot}.`;  
    fuelStatus.innerHTML = `Fuel level too low for launch.`;  
    cargoStatus.innerHTML = `The cargo mass is ${cargoLevel} kg.`;  
   }else if(cargoLevel>10000){
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
    faultyItems.style.visibility='visible';
    pilotStatus.innerHTML = `The pilot is ${pilot}.`;  
    copilotStatus.innerHTML = `The copilot is ${copilot}.`;  
    fuelStatus.innerHTML = `The fuel level is ${fuelLevel} L.`;  
    cargoStatus.innerHTML = `The cargo mass is too high.`;  
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
    return response.json();    
    });

    return planetsReturned;
}

function pickPlanet(planets) { 
    let maximumIndex = planets.length;
    let chosenIndex = Math.floor(Math.random()*maximumIndex);
    return planets[chosenIndex]; 
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;