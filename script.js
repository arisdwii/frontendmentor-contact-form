// Get form and success message section elements
const form = document.querySelector("form");
const successSection = document.querySelector(".success-msg-section");

// Get input fields and their corresponding error message elements
const firstNameInput = document.getElementById("first-name");
const firstNameMsg = document.querySelector(".fname-msg");

const lastNameInput = document.getElementById("last-name");
const lastNameMsg = document.querySelector(".lname-msg");

const emailInput = document.getElementById("email-address");
const emailMsg = document.querySelector(".email-msg");

const selectQuerys = document.querySelectorAll('input[name="queryType"]');
const queryMsg = document.querySelector(".query-msg");

const textAreaInput = document.getElementById("message");
const textAreaMsg = document.querySelector(".text-msg");

const checkBox = document.getElementById("consent");
const consetMsg = document.querySelector(".consent-msg");

// Function to show an error message and add error class to form group
function showError(element, msg) {
  const group = element.closest(".form-group");
  if (group) group.classList.add("error");
  element.textContent = msg;
}

// Function to clear the error message and remove error class
function clearError(element) {
  const group = element.closest(".form-group");
  if (group) group.classList.remove("error");
  element.textContent = "";
}

// Form submit event listener
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting the default way
  // Get selected radio button value
  const selectedRadio = document.querySelector(
    'input[name="queryType"]:checked'
  );
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // Validate each input field
  if (!firstNameInput.value) {
    showError(firstNameMsg, "The field is required");
  }

  if (!lastNameInput.value) {
    showError(lastNameMsg, "The field is required");
  }

  if (!emailInput.value) {
    showError(emailMsg, "The field is required");
  }

  if (!selectedRadio) {
    showError(queryMsg, "Please select a query type");
  }

  if (!textAreaInput.value) {
    showError(textAreaMsg, "The field is required");
  }

  if (!checkBox.checked) {
    showError(consetMsg, "Please select a query type");
  }

  // Validate email format only if email input is not empty
  if (emailInput.value && !emailRegex.test(emailInput.value)) {
    showError(emailMsg, "Please enter a valid email address");
  }

  // If all validations pass, show success message and reset form
  if (
    firstNameInput.value &&
    lastNameInput.value &&
    emailRegex.test(emailInput.value) &&
    selectedRadio &&
    textAreaInput.value &&
    checkBox.checked
  ) {
    // Show success message section
    successSection.classList.add("active");

    // Hide success message after 5 seconds
    setTimeout(() => {
      successSection.classList.remove("active");
    }, 5000);

    // Clear form inputs
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    textAreaInput.value = "";
    checkBox.checked = false;

    // Uncheck all radio buttons
    selectQuerys.forEach((selectQuery) => {
      selectQuery.checked = false;
    });
  }
});

// Event listeners to clear error messages when user starts typing/selecting
firstNameInput.addEventListener("input", () => {
  clearError(firstNameMsg);
});

lastNameInput.addEventListener("input", () => {
  clearError(lastNameMsg);
});

emailInput.addEventListener("input", () => {
  clearError(emailMsg);
});

selectQuerys.forEach((selectQuery) => {
  selectQuery.addEventListener("change", () => {
    clearError(queryMsg);

    selectQuerys.forEach((sq) =>
      sq.closest(".input-radio").classList.remove("active")
    );

    const inputRadio = selectQuery.closest(".input-radio");
    if (selectQuery.checked) inputRadio.classList.add("active");
  });
});

textAreaInput.addEventListener("input", () => {
  clearError(textAreaMsg);
});

checkBox.addEventListener("click", () => {
  clearError(consetMsg);
});
