const placeholderElement = document.createElement('div');
placeholderElement.classList.add("flight-placeholder")
placeholderElement.innerHTML = `

  <div class="flight-details"></div>
  <div class="flight-details"></div>
  <div class="flight-details"></div>
  <div class="flight-details"></div>
  <div class="flight-details"></div>
`;

const container = document.getElementById('flightsList');
container.appendChild(placeholderElement);


// Define the API endpoint URL

const API_KEY = '6454fd47cf9a27e29dd12b36';
const FLIGHTS_API_URL = `https://api.flightapi.io/onewaytrip/${API_KEY}`;
// Fetch data from the API

let onewayOrigin = localStorage.getItem('onewayOrigin');
let onewayDestination = localStorage.getItem('onewayDestination');
const date = localStorage.getItem('date');
const adults = Number(localStorage.getItem('adults'));
const children = Number(localStorage.getItem('children'));
const infants = Number(localStorage.getItem('infants'));
const travelClass = localStorage.getItem('travelClass');


const onewayOriginIata = onewayOrigin.split(" ").reverse()[0];
localStorage.setItem("onewayOriginIata", onewayOriginIata);
onewayOrigin = onewayOrigin.split(' ')
onewayOrigin.pop();
let onewayOriginCity = onewayOrigin.join(" ")
localStorage.setItem("onewayOriginCity", onewayOriginCity);

const onewayDestinationIata = onewayDestination.split(' ').reverse()[0];
localStorage.setItem("onewayDestinationIata", onewayDestinationIata);
onewayDestination = onewayDestination.split(' ')
onewayDestination.pop();
let onewayDestinationCity = onewayDestination.join(" ")
localStorage.setItem("onewayDestinationCity", onewayDestinationCity);

document.querySelector("#directionOW").innerHTML = `${onewayOriginCity} (${onewayOriginIata})<i class="bi bi-arrow-right mx-2"></i>${onewayDestinationCity} (${onewayDestinationIata})`
document.querySelector("#flightDate").textContent = localStorage.getItem('date');

let formattedDate = date.split("/");
formattedDate = `${formattedDate[2]}-${formattedDate[0]}-${formattedDate[1]}`;

const url = `${FLIGHTS_API_URL}/${onewayOriginIata}/${onewayDestinationIata}/${formattedDate}/${adults || 1}/${children || 0}/${infants || 0}/${travelClass || "Economy"}/USD`;

let timesCalled = 0;
let datai;
function fetchFlights() {
    fetch(url)
        .then(response => {
            if(response.status === "404"){ throw new Error(respone.json())}
            else{
                return response.json()
            }
        })
        .then(data => {
            console.dir(data)
            if (data.count !== 0) {
                container.removeChild(placeholderElement);
                const originCityCode = data.airports.filter(airport => airport.code === onewayOriginIata)[0].cityCode
                onewayOriginCity = data.cities.filter(city => city.code === originCityCode)[0].name

                const destinationCityCode = data.airports.filter(airport => airport.code === onewayDestinationIata)[0].cityCode
                onewayDestinationCity = data.cities.filter(city => city.code === destinationCityCode)[0].name

                localStorage.setItem("flightData", JSON.stringify(data));
                localStorage.setItem("onewayDestinationCity", onewayDestinationCity);
                localStorage.setItem("onewayDestinationCityCode", originCityCode);
                localStorage.setItem("onewayOriginCity", onewayOriginCity);
                localStorage.setItem("onewayOriginCityCode", destinationCityCode);
                document.querySelector("#directionOW").innerHTML = `${onewayOriginCity} (${onewayOriginIata})<i class="bi bi-arrow-right mx-2"></i>${onewayDestinationCity} (${onewayDestinationIata})`

                // // Create a new card element
                data.legs.forEach((leg, i) => {
                    const element = document.createElement('div');
                    element.classList.add('col-12', 'mb-3');
                    element.dataset.aos = "fade-up";

                    if (i > 0) {
                        element.dataset.aos.delay = "300"
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
                <button type="submit" class="btn-select btn btn-effect" 
                onclick="onSelectFlight(event);window.location.href='traveller-details.html';"
                // onclick="window.location.href='review-booking.html';"
                
                >
                    <span class="font-small">Select</span>
                </button>
            </div>
        </div>
    </div>
            `
                    // Add the card to the container
                    container.appendChild(element);
                })
            } else if (timesCalled < 3) {
                timesCalled++;
                fetchFlights();
            }
            else {
                container.removeChild(placeholderElement);
                const error = document.createElement('div');
                error.classList.add("alert", "alert-danger", "mt-3", "error")
                error.innerText = "Sorry, there was an issue. Please try changing the date or try again later. "
                container.appendChild(error)
            }

        })
        .catch(error => {
            container.removeChild(placeholderElement);
            const error = document.createElement('div');
            error.classList.add("alert", "alert-danger", "mt-3", "error")
            error.innerText = "Sorry, there was an issue. Please try changing the date or try again later. "
            container.appendChild(error)        });

}

fetchFlights();

function onSelectFlight(event) {
    const button = event.target; // Get the clicked button element
    const parentElement = button.closest('[data-aos]:defined'); // Replace '.parent-class' with the actual class or selector of the parent element you want to target

    // Do something with the parent element
    localStorage.setItem("price", parentElement.dataset.ticketprice);
    localStorage.setItem("selectedLeg", parentElement.dataset.legid);

    // console.log(parentElement);    
}