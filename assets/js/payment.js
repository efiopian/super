const date = localStorage.getItem('date');
const adults = Number(localStorage.getItem('adults'));
const children = Number(localStorage.getItem('children'));
const infants = Number(localStorage.getItem('infants'));
const travelClass = localStorage.getItem('travelClass');
const email = localStorage.getItem("customerEmail");
const tel = localStorage.getItem("customerMobileNo");
const price = Number(localStorage.getItem("price"));

const oiata = localStorage.getItem("onewayOriginIata");
const ocity = localStorage.getItem("onewayOriginCity");
const diata = localStorage.getItem("onewayDestinationIata");
const dcity = localStorage.getItem("onewayDestinationCity");
const stops  = localStorage.getItem("stops");
const dur  = localStorage.getItem("duration");
const depTime  = localStorage.getItem("depTime");
const arrTime  = localStorage.getItem("arrTime");
const safety = localStorage.getItem("safety");
const grandAmount = localStorage.getItem("grandAmount");

function getPeople(){
    if (adults){
        for(i=1;i<=adults;i++){
            const prefix = `adult${i}`;
            const name = localStorage.getItem(`${prefix}Name`);
            const surname = localStorage.getItem(`${prefix}Surname`);
            const el = document.createElement("li")
            el.classList.add("d-flex", "justify-content-between", "pt-3");
            el.innerHTML = `<span class="font-medium theme-text-accent-one"> ${name + " " + surname}</span>
            <span class="font-medium ms-4">Adult</span>`
            document.querySelector("#passengers").appendChild(el);
        }
    }
    if (children){
        for(i=1;i<=children;i++){
            const prefix = `child${i}`;
            const name = localStorage.getItem(`${prefix}Name`);
            const surname = localStorage.getItem(`${prefix}Surname`);
            const el = document.createElement("li")
            el.classList.add("d-flex", "justify-content-between", "pt-3");
            el.innerHTML = `<span class="font-medium theme-text-accent-one"> ${name + " " + surname}</span>
            <span class="font-medium ms-4">Child</span>`
            document.querySelector("#passengers").appendChild(el);
        }
    }
    if (infants){
        for(i=1;i<=infants;i++){
            const prefix = `infant${i}`;
            const name = localStorage.getItem(`${prefix}Name`);
            const surname = localStorage.getItem(`${prefix}Surname`);
            const el = document.createElement("li")
            el.classList.add("d-flex", "justify-content-between", "pt-3");
            el.innerHTML = `<span class="font-medium theme-text-accent-one"> ${name + " " + surname}</span>
            <span class="font-medium ms-4">Infant</span>`
            document.querySelector("#passengers").appendChild(el);
        }
    }
}

getPeople();

document.querySelector("#depDate").textContent=`Departure ${date}`;
document.querySelector("#fromToCity").innerHTML = `${ocity}<i class="bi bi-arrow-right"></i>${dcity}`;
document.querySelector("#fromIata").textContent = `${oiata}`;
document.querySelector("#depTime").textContent = `${depTime}`;
document.querySelector("#dur").textContent = `${dur}`;
document.querySelector("#stops").textContent = `${stops}`;
document.querySelector("#arrIata").textContent = `${diata}`;
document.querySelector("#arrTime").textContent = `${arrTime}`;

document.querySelector("#tel").textContent = tel;
document.querySelector("#email").textContent = email;
document.querySelector("#peopleFare").textContent = `Passengers(s) (${adults+children+infants} X ${price})`;
document.querySelector("#ticketsAmount").textContent = `${price*(adults + children + infants)}`;
document.querySelector("#extraPassengers").textContent = `Extra-services: ${safety ? ("Passenger(s) (" + (adults + children + infants) + " X 159)"): "No extra-services"}`;
document.querySelector("#extraCalc").textContent = `${(safety ? 159 : 0)*(adults+children+infants)}`;
document.querySelector("#grandTotal").textContent = grandAmount;

