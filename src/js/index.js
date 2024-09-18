let generate_button_password = document.getElementById("btn-password");
let password = document.getElementById("text-password");
let slider_range = document.getElementById("lengthSlider");
let password_length = document.getElementById("character-password");
let copy_password = document.getElementById("copy-password");

slider_range.addEventListener("input", (e) => {
  password_length.textContent = e.target.value;
  if (e.target.value > 0) {
    slider_range.style.backgroundColor = "#A4FFAF";
  } else {
    slider_range.style.backgroundColor = "#18171F";
  }
});

generate_button_password.addEventListener("click", () => {
  let length_password = slider_range.value;
  let uppercase = document.getElementById("uppercase").checked;
  let lowercase = document.getElementById("lowercase").checked;
  let symbols = document.getElementById("symbols").checked;
  let numbers = document.getElementById("numbers").checked;

  let password_generated = generatePassword(
    length_password,
    uppercase,
    lowercase,
    symbols,
    numbers
  );

  if (!!password_generated) {
    password.textContent = password_generated;
    password.style.color = "#E6E5EA";
    showStrengthPassword(zxcvbn(password_generated).score);
  }
});

function generatePassword(length, uppercase, lowercase, symbols, numbers) {
  let charset = "";
  let password;
  let is_valid = false;
  let count_opcions = 0;
  if (!!uppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    count_opcions += 1;
  }
  if (!!lowercase) {
    charset += "abcdefghijklmnopqrstuvwxyz";
    count_opcions += 1;
  }
  if (!!symbols) {
    charset += "!@#$%^&*()";
    count_opcions += 1;
  }
  if (!!numbers) {
    charset += "0123456789";
    count_opcions += 1;
  }

  if (length > 0 && length >= count_opcions) {
    while (!is_valid) {
      password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      is_valid = validatePassword(
        password,
        uppercase,
        lowercase,
        symbols,
        numbers
      );

    }
  }

  return password;
}

function validatePassword(password, uppercase, lowercase, symbols, numbers) {
  const has_uppercase = /[A-Z]/.test(password);
  const has_lowercase = /[a-z]/.test(password);
  const has_symbols = /[!@#$%^&*()]/.test(password);
  const has_numbers = /[0-9]/.test(password);

  if (!!uppercase && !has_uppercase) return false;
  if (!!lowercase && !has_lowercase) return false;
  if (!!symbols && !has_symbols) return false;
  if (!!numbers && !has_numbers) return false;

  return true;
}

function showStrengthPassword(value) {
  let strength_password = document.getElementById("password-strength");
  let rectangle_passwords = document.getElementById("rectangle-password");

  console.log(value);
  console.log(strength_password);
  if (value === 1 || value === 0) {
    rectangle_passwords.replaceChildren();
    strength_password.textContent = "TOO WEAK!";
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add("w-3", "h-7", "block", "bg-red");
        rectangle_passwords.appendChild(rectangle_strength);
      } else {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add(
          "w-3",
          "h-7",
          "block",
          "border-2",
          "border-almost_white"
        );
        rectangle_passwords.appendChild(rectangle_strength);
      }
    }
  }
  if (value === 2) {
    rectangle_passwords.replaceChildren();
    strength_password.textContent = "WEAK";
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add("w-3", "h-7", "block", "bg-orange");
        rectangle_passwords.appendChild(rectangle_strength);
      } else {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add(
          "w-3",
          "h-7",
          "block",
          "border-2",
          "border-almost_white"
        );
        rectangle_passwords.appendChild(rectangle_strength);
      }
    }
  }
  if (value === 3) {
    rectangle_passwords.replaceChildren();
    strength_password.textContent = "MEDIUM";
    for (let i = 0; i < 4; i++) {
      if (i < 3) {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add("w-3", "h-7", "block", "bg-yellow");
        rectangle_passwords.appendChild(rectangle_strength);
      } else {
        const rectangle_strength = document.createElement("span");
        rectangle_strength.classList.add(
          "w-3",
          "h-7",
          "block",
          "border-2",
          "border-almost_white"
        );
        rectangle_passwords.appendChild(rectangle_strength);
      }
    }
  }
  if (value === 4) {
    rectangle_passwords.replaceChildren();
    strength_password.textContent = "STRONG";
    for (let i = 0; i < 4; i++) {
      const rectangle_strength = document.createElement("span");
      rectangle_strength.classList.add("w-3", "h-7", "block", "bg-yellow");
      rectangle_passwords.appendChild(rectangle_strength);
    }
  }
}

copy_password.addEventListener("click", () => {
  navigator.clipboard.writeText(password.textContent);
});
