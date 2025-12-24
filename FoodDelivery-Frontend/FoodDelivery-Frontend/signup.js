// Add submit event listener to the signup form
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
 // Get values from input fields
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
// Check if any field is empty
  if (!username || !password) {
    alert("All fields required");
    return;
  }
  // Create a user object
  const user = {
    username: username,
    password: password
  };
 
  // Save user data to localStorage 
  localStorage.setItem("user", JSON.stringify(user));
 
  //Notify user of successful signup
  alert("Signup successful! Please login.");

  //Redirect user to login page
  window.location.href = "login.html";
});
