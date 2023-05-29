const adults = +localStorage.getItem("adults")
const infants = +localStorage.getItem("infants")
const children = +localStorage.getItem("children")
const price = +localStorage.getItem("price")
const peopleNum = adults + infants + children;
let grandAmount = peopleNum * price;

const element = document.querySelector("#grandAmount");
element.textContent = grandAmount;
localStorage.setItem("grandAmount", grandAmount);

function radioChange(event) {

  if (event.target.id === "flexRadioDefault1") {
    grandAmount = 159 * peopleNum + price * peopleNum;
    element.textContent = grandAmount;
    localStorage.setItem("grandAmount", grandAmount);
    localStorage.setItem("safety", "true");
  } else {
    grandAmount = peopleNum * price;
    element.textContent = grandAmount;
    localStorage.setItem("grandAmount", grandAmount);
    localStorage.removeItem("safety");
  }
}

function displayPeopleForms(id, quantity, pref){
  const container = document.querySelector(`#${id}`);

  if(quantity == 0) {
    container.textContent = `No ${pref}`.toUpperCase();
    return;
  }

  for (i = 1; i <= quantity; i++) {
    const prefix = pref + i;
    const seniority = pref.charAt(0).toUpperCase() + pref.slice(1);
    const child = document.createElement("div");
    child.classList.add("theme-box-shadow", "theme-border-radius", "bg-light", "mb-3");
    child.innerHTML = `
    <div class="row border-bottom py-2 m-auto">
    <div class="col-8">
        <div class="fw-bold font-medium">${seniority} ${i}</div>
    </div>
    <div class="col-4 text-end align-self-center">
        <a class="font-small" data-bs-toggle="collapse" href="#${prefix}Collapse"
            role="button" aria-expanded="false" aria-controls="${prefix}Collapse"><i
                class="bi bi-chevron-down ps-1"></i></a>
    </div>
</div>
<div class="${pref !=="adult" || i > 1 ? "collapse": ""}" id="${prefix}Collapse" data-collapsable>
    <div class="row">
        <div class="col-sm-12">
            <div class="px-3">
                <ul class="row py-3">
                    <li class="col-12 col-md-2 pb-3">
                        <label for="${prefix}Preference">Preference</label>
                        <select class="form-select" id="${prefix}Preference"
                            required>
                            <option selected>Title</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Other">Other</option>
                        </select>
                        <small class="font-small text-danger">*required</small>
                    </li>
                    <li class="col-12 col-md-4 pb-3">
                        <label for="${prefix}Name">First Name</label>
                        <input type="text" class="form-control" id="${prefix}Name"
                            placeholder="Name" required>
                            <small class="font-small text-danger">*required</small>  
                    </li>
                    <li class="col-12 col-md-4 pb-3">
                        <label for="${prefix}Surname">Last Name</label>
                        <input type="text" class="form-control"
                            id="${prefix}Surname" placeholder="Surname" required>
                            <small class="font-small text-danger">*required</small>                   
                    </li>
                    <li class="col-12 col-md-6 pb-3">
                        <label for="${prefix}DOB">Date of
                            Birth</label>
                        <input type="date" class="form-control" id="${prefix}DOB"
                            placeholder="12/25/1980" required>
                            <small class="font-small text-danger">*required</small>                    
                    </li>
                    <li class="col-12 col-md-12 pb-3">
                        <label class="mb-3">Passport
                            Details*</label>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                                <label for="${prefix}PassportNum">Passport
                                    Number</label>
                                <input type="text" class="form-control"
                                    id="${prefix}PassportNum"
                                    placeholder="001020304" required>
                                    <small class="font-small text-danger">*required</small>                    
                            </div>
                            <div class="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                                <label for="${prefix}PassIssuedCountry">Issued
                                    Country</label>
                                <input type="text" class="form-control"
                                    id="${prefix}PassIssuedCountry"
                                    placeholder="Belgium" required>
                                    <small class="font-small text-danger">*required</small>                   
                            </div>
                            <div class="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                                <label
                                    for="${prefix}PassExpairyDate">Expairy Date</label>
                                <input type="date" class="form-control"
                                    id="${prefix}PassExpairyDate"
                                    placeholder="08-18-2028" required>
                                    <small class="font-small text-danger">*required</small>                    
                            </div>
                        </div>
                    </li>
                    <li>
                        <span class="font-small">Note: Please make sure that
                            traveller's Names are
                            as per govt. approved Identity Card or
                            Passport.</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
    `
    container.appendChild(child);
  }
}

displayPeopleForms("adults", adults, 'adult');
displayPeopleForms("children", children, "child");
displayPeopleForms("infants", infants, "infant");

// Function to set values to local storage when an input field changes
function setLocalStorageValue(inputId) {
  const inputElement = document.getElementById(inputId);
  localStorage.setItem(inputId, inputElement.value);
}

// Function to check if required fields are filled
function checkRequiredFields() {
  const requiredFields = document.querySelectorAll('[required]');
  let allFieldsFilled = true;

  requiredFields.forEach((field) => {
    if (field.value === '') {
      allFieldsFilled = false;
      field.classList.add('is-invalid');
      console.log(field);
      const f = field;
      field.closest('[data-collapsable]:defined').classList.add('show')
    } else {
      field.classList.remove('is-invalid');
    }
  });

  if (!allFieldsFilled) {
    alert('Please fill in all required fields.');
  }

  return allFieldsFilled;
}

// Event listeners for input fields
const inputFields = document.querySelectorAll('input[required], select[required]');
inputFields.forEach((field) => {
  field.addEventListener('change', () => {
    setLocalStorageValue(field.id);
  });
});

// Event listener for the button that passes to another page
const button1 = document.getElementById('continueButton');
button1.addEventListener('click', () => {

  if (checkRequiredFields()) {
    // Proceed to the next page
    window.location.href = 'traveller-addons-seat.html';
  }
});
const button2 = document.getElementById('paymentButton');
button2.addEventListener('click', () => {

  if (checkRequiredFields()) {
    // Proceed to the next page
    window.location.href = 'payment.html';
  }
});
