const airportsString = document.querySelector("#routeSeats")
const text = `${localStorage.getItem("onewayOriginIata")} - ${localStorage.getItem("onewayDestinationIata")}`
airportsString.textContent = text

const element = document.querySelector("#grandAmount");
element.textContent = localStorage.getItem("grandAmount")