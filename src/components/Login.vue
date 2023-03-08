<template>
  <div class="login-container">
    <form class="login-form" id="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password">
      </div>
      <div class="form-group">
        <button type="submit" class="login-btn" id="login-btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { IP } from "../main.js";

function blinkRed(element, times, speed, color) {
  if (times > 0 || times < 0) {
    console.log(element.style.backgroundColor);
    if (element.style.backgroundColor === color) {
      element.style.backgroundColor = 'red';
    } else {
      element.style.backgroundColor = color;
    }
  }
  clearTimeout(function() {
    blinkRed(element, times, speed, color);
  });
  if (times > 0 || times < 0) {
    setTimeout(function() {
      blinkRed(element, times, speed, color);
    }, speed);
    times -= .5;
  } else {
    element.style.backgroundColor = color;
  }
}

export default {
  name: "Login",

  mounted() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === '' || password === '') {
        if (username === '') {
          blinkRed(document.getElementById('username'), 4, 200, 'rgb(60, 60, 60)');
        }
        if (password === '') {
          blinkRed(document.getElementById('password'), 4, 200, 'rgb(60, 60, 60)');
        }
        return;
      }
      // Replace with your own login API endpoint
      fetch(IP + '/api/v1/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
      })
          .then(response => response.json())
          .then(data => {
            // If login is successful, redirect to home page
            if (data.token) {
              // expires in 1 hour
              document.cookie = "api_token=" + data.token + "; expires=" + new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString() + "; path=/";
              window.location.href = '/';
              // set the value isLoggedIn to true in the localStorage
              localStorage.setItem('isLoggedIn', true);
            }
          })
          .catch(error => {
            blinkRed(document.getElementById('login-btn'), 4, 200, 'rgb(0, 105, 217)');
          });
    });
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  /* stop the site from scrolling when the login form is open */
  overflow: hidden;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10vh;
}

.login-form {
  width: 30rem;
  padding: 2rem;
  background-color: #363636;
  border-radius: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="password"] {
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.2rem;
  background-color: rgb(60, 60, 60);
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}

.login-btn {
  padding: 1rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  /* disable the outline on phones when clicking */
  outline: none;
}

.login-btn:hover {
  background-color: #0069d9;
}

.login-btn:active {
  transform: translateY(2px);
}

@media screen and (max-width: 768px) {
  .login-form {
    width: 70%;
    /* place at the top of the page */
    position: absolute;
    top: 25vh;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>