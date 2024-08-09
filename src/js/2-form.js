const STORAGE_KEY = "feedback-form-state"

const form = document.querySelector(".feedback-form");

const formData = loadFormFromLS()

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);

function handleInput(event) {
    const form = event.currentTarget;
    const targetInput = event.target;

    formData[targetInput.name] = targetInput.value.trim()

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function handleSubmit(event) {
    event.preventDefault()

    if (!formData.email || !formData.message) {
        alert("Fill please all fields")
        return
    }

    console.log(formData)
    clearFormData(event.currentTarget)

}


function loadFormFromLS() {

    const formDataLS = localStorage.getItem(STORAGE_KEY)

    if (formDataLS) {
        const savedData = JSON.parse(formDataLS)

        fillForm(form, savedData)

        return savedData
    }

    return { email: "", message: "" };

}


function fillForm(form, { email, message }) {
    form.elements.email.value = email
    form.elements.message.value = message
}

function clearFormData(form) {
    localStorage.removeItem(STORAGE_KEY);
    formData.email = ""
    formData.message = ""
    form.reset()
}