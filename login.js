// Tab switching functionality
const tabs = document.querySelectorAll(".tab")
const forms = document.querySelectorAll(".form")

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab")

    // Update active tab
    tabs.forEach((t) => t.classList.remove("active"))
    tab.classList.add("active")

    // Show corresponding form
    forms.forEach((form) => {
      form.classList.remove("active")
      if (form.id === `${target}-form`) {
        form.classList.add("active")
      }
    })
  })
})

// Password visibility toggle
const togglePasswordButtons = document.querySelectorAll(".toggle-password")

togglePasswordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling
    const icon = button.querySelector("ion-icon")

    if (input.type === "password") {
      input.type = "text"
      icon.setAttribute("name", "eye-off-outline")
    } else {
      input.type = "password"
      icon.setAttribute("name", "eye-outline")
    }
  })
})

// Form validation
const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // Here you would typically send the form data to a server
  alert("Login form submitted!")
})

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Check if passwords match
  const password = signupForm.querySelectorAll('input[type="password"]')[0].value
  const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value

  if (password !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  // Here you would typically send the form data to a server
  alert("Signup form submitted!")
})
