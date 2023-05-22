// Define the API endpoint URL

const API_KEY = '6454fd47cf9a27e29dd12b36';
const FLIGHTS_API_URL = `https://api.flightapi.io/roundtrip/${API_KEY}`;
// Fetch data from the API

const onewayOrigin = localStorage.getItem('onewayOrigin');
const onewayDestination = localStorage.getItem('onewayDestination');
const date = localStorage.getItem('date');
const adults = Number(localStorage.getItem('adults'));
const children = Number(localStorage.getItem('children'));
const infants = Number(localStorage.getItem('infants'));
const travelClass = localStorage.getItem('travelClass');


const onewayOriginIata = onewayOrigin.split(" ").reverse()[0];
localStorage.setItem("onewayOriginIata", onewayOriginIata);
let onewayOriginCity = onewayOrigin.split(' ').shift();
localStorage.setItem("onewayOriginCity", onewayOriginCity);

const onewayDestinationIata = onewayDestination.split(' ').reverse()[0];
localStorage.setItem("onewayDestinationIata", onewayDestinationIata);
let onewayDestinationCity = onewayDestination.split(' ').shift();
localStorage.setItem("onewayDestinationCity", onewayDestinationCity);

document.querySelector("#directionOW").innerHTML = `${onewayOriginCity} (${onewayOriginIata})<i class="bi bi-arrow-right mx-2"></i>${onewayDestinationCity} (${onewayDestinationIata})`
document.querySelector("#flightDate").textContent = localStorage.getItem('date');

let formattedDate = date.split("/");
formattedDate = `${formattedDate[2]}-${formattedDate[0]}-${formattedDate[1]}`;

const url = `${FLIGHTS_API_URL}/${onewayOriginIata}/${onewayDestinationIata}/${formattedDate}/2023-07-01/${adults || 1}/${children || 0}/${infants || 0}/${travelClass || "Economy"}/USD`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("data", data);
        localStorage.setItem("flightData", data);
        // Get the DOM element where the card will be inserted
        const container = document.getElementById('flightsList');

        // // Create a new card element
        data.legs.forEach((leg, i) => {
            const element = document.createElement('div');
            element.classList.add('col-12', 'mb-3');
            element.dataset.aos = "fade-up";
            
            if (i > 0){
                element.dataset.aos.delay="300"
            }
  
            const tripId = data.trips.filter(trip => trip.legIds[0] === leg.id)[0].id;
            const flightFare = data.fares.filter(fare => fare.tripId === tripId)[0];
            const airline = data.airlines.filter(al => al.code === leg.airlineCodes[0])[0].name;
            element.dataset.ticketprice = flightFare.price.amount;
            element.dataset.legid = leg.id;
            const bort = leg.id.split(':')[1];
            element.innerHTML = `
        <div class="row g-0 border theme-border-radius theme-box-shadow p-2 align-items-center theme-bg-white">
        <div class="col-12 col-md-3">
            <div class="d-flex">
            <div>
            <img src="assets/images/icons/flight-booking-icon.png"
                class="img-fluid theme-border-radius" alt="airline"
                title="airline icon">
            </div>
                <div class="d-flex flex-column ms-2">
                    <span class="font-small d-inline-flex mb-0 align-middle">${airline}
                    </span>
                    <span class="font-small d-inline-flex mb-0 align-middle">${bort}</span>
                </div>
            </div>
        </div>
        <div class="col-4 col-md-2">
            <div class="fw-bold">${leg.departureTime}</div>
            <div class="font-small">${leg.departureAirportCode}</div>
        </div>
        <div class="col-4 col-md-2">
            <div class="font-small">${leg.duration}</div>
            <span class="stops"></span>
            <div class="font-small">${leg.stopoversCount ? leg.stopoversCount + " stop(s)" : "Non Stop"}</div>
        </div>
        <div class="col-4 col-md-2">
            <div class="fw-bold">${leg.arrivalTime}</div>
            <div class="font-small">${leg.arrivalAirportCode}</div>
        </div>
        <div class="col-12 col-md-3 text-center mt-md-0 mt-2">
            <div class="fw-bold"><i class="bi bi-currency-dollar ms-2"></i>${flightFare.price.amount}</div>
            <button type="submit" class="btn-select btn btn-effect" onclick="window.location.href='review-booking.html';">
                <span class="font-small">Select</span>
            </button>
        </div>
    </div>
</div>
        `
            // Add the card to the container
            container.appendChild(element);
        })
    })
    .catch(error => {
        console.error(error);
    });