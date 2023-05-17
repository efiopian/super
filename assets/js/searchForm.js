// Airport Autocomplete
function autocompleteCityAirport(input) {
    if (input.value.length > 2) {
        // Get the list element

        const list = input.list;

        // Create a new XHR object
        const xhr = new XMLHttpRequest();

        // Prepare the request
        xhr.open('GET', `https://api.flightapi.io/iata/6454fd47cf9a27e29dd12b36?name=${input.value}&type=airport&limit=10`, true);

        // Handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse the response
                const response = JSON.parse(xhr.responseText);
                // Clear the previous suggestions
                list.innerHTML = '';

                // Add the new suggestions
                response.data.filter(result =>
                    result.name.includes("Airport")).forEach(item => {
                        const option = document.createElement('option');
                        option.value = `${item.name} ${item.iata}`;
                        list.appendChild(option);
                    });
            } else {
                console.log('Error:', xhr.status);
            }
        };

        // Send the request
        xhr.send();
    }
}

const OWorigin = document.getElementById('onewayOrigin');
OWorigin.addEventListener('input', function () {
    autocompleteCityAirport(this);
});

const OWDestination = document.getElementById('onewayDestination');
OWDestination.addEventListener('input', function () {
    autocompleteCityAirport(this);
});

function searchHandler() {
    const onewayOrigin = document.getElementById('onewayOrigin');
    const onewayDestination = document.getElementById('onewayDestination');
    const date = document.getElementById("datepicker");
    const adults = document.querySelector('input[name="onewayAdult"]').value;
    const children = document.querySelector('input[name="onewayChild"]').value;
    const infants = document.querySelector('input[name="onewayInfant"]').value;
    let travelClass = document.querySelector('input[name="class"]:checked');

    travelClass = travelClass === null ? "Economy" : travelClass.value;

    localStorage.setItem('onewayOrigin', onewayOrigin.value);
    localStorage.setItem('onewayDestination', onewayDestination.value);
    localStorage.setItem('onewayOrigin', onewayOrigin.value);
    localStorage.setItem('onewayDestination', onewayDestination.value);
    localStorage.setItem('date', date.value);
    localStorage.setItem('adults', adults);
    localStorage.setItem('children', children);
    localStorage.setItem('infants', infants);
    localStorage.setItem('travelClass', travelClass);
}

function closeMenu() {
    document.querySelector(".dropdown-menu.show").classList.remove("show");
}

function travellersHandler(op) {
    const adults = document.querySelector('input[name="onewayAdult"]').value;
    const children = document.querySelector('input[name="onewayChild"]').value;
    const infants = document.querySelector('input[name="onewayInfant"]').value;
    let travelClass = document.querySelector('input[name="class"]:checked');

    travelClass = travelClass === null ? "Economy" : travelClass.value;

    const travellersInfo = document.querySelector("#travellersInfo");
    const num = op === "plus" ? 1 : op === "minus" ? -1 : 0;
    const infoString = `${Number(adults) + Number(children) + Number(infants) + num} Traveller(s), ${travelClass ? travelClass : "Economy"}`
    travellersInfo.textContent = infoString;
}