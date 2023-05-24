const adults = +localStorage.getItem("adults")
const infants = +localStorage.getItem("infants")
const children = +localStorage.getItem("children")
const price = +localStorage.getItem("price")
const peopleNum = adults + infants + children;
let grandAmount = peopleNum*price;

const element = document.querySelector("#grandAmount");
element.textContent = grandAmount;4
localStorage.setItem("grandAmount", grandAmount)

function radioChange(event) {

    if (event.target.id === "flexRadioDefault1") {
        grandAmount =  159 * peopleNum + price*peopleNum;
        element.textContent = grandAmount;
        localStorage.setItem("grandAmount", grandAmount)
    } else {
        grandAmount =  peopleNum*price;
        element.textContent = grandAmount;
        localStorage.setItem("grandAmount", grandAmount)
    }
}