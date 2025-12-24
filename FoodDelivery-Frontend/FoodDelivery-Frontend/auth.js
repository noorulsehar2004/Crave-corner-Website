// Add event listener for when the login form is submitted
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
 //Get the values entered by the user
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));
 
  //If no user is found in localStorage, prompt the user to sign up
  if (!user) {
    alert("No account found. Please signup first.");
    return;
  }

// Check if entered username and password match the stored user
  if (user.username === username && user.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password");
  }
});
