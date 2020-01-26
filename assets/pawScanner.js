window.onload = function() {
    let urlParameters = new URLSearchParams(window.location.search);
    let dogID = urlParameters.get('id');

    fetch(`/dogs/${dogID}`).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);

        if(json.ownerContact == this.undefined) {
            document.getElementById("contact").style.display = 'none';
        } else {
            document.getElementById("owner").innerText = 'Owner contact: ' + json.ownerContact;
        }

        document.getElementById("name").innerText = "Name: " + json.name;
        document.getElementById("zip").innerText = "Zip code: " + json.zip;
        document.getElementById("DoB").innerText = "Date of birth: " + json.DoB;
        document.getElementById("color").innerText = "Color: " + json.color;

        if(json.vaccinations == undefined || json.vaccinations.length === 0) {
            let vaccineHeader = document.createElement("h5");
            vaccineHeader.innerText = "No vaccination information available on this dog.";
            document.getElementById("vaccines").appendChild(vaccineHeader); 
        } else {
            let vaccineHeader = document.createElement("h5");
            vaccineHeader.innerText = "Vaccinations:";
            document.getElementById("vaccines").appendChild(vaccineHeader);

            for(let vaccination of json.vaccinations) {
                let vaccineItem = document.createElement("p");
                vaccineItem.innerText = "✅ " + vaccination.name + " on " + vaccination.date;
                document.getElementById("vaccines").appendChild(vaccineItem);
            }
        }

        const diseasesOfConcern = new Set(["hepatitis", "parvovirus", "rabies"]);
        let receivedVaccines = json.vaccinations ? new Set(json.vaccinations.map(value => value.name)) : new Set([]);
        let missingVaccines = [...diseasesOfConcern].filter(x => !receivedVaccines.has(x));

        for(let missingVaccine of missingVaccines) {
            let vaccineItem = document.createElement("p");
            vaccineItem.innerText = "❌ Not vaccinated for " + missingVaccine;
            document.getElementById("vaccines").appendChild(vaccineItem);
        }
    })
}