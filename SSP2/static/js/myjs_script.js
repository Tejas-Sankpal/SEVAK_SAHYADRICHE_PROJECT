//VOLUNTEER FORM VALIDATION

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("volunteerForm");
  if (!form) return; // Stop if not on volunteer page

  // --- Name Validation ---
  function validateName() {
    const name = form.vname.value.trim();
    const errorEl = document.getElementById("volNameError");

    if (name === "") {
      errorEl.textContent = "Name is required";
      return false;
    } else if (name.length < 2 || name.length > 50) {
      errorEl.textContent = "Name must be between 2 and 50 characters";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // --- Email Validation ---
  function validateEmail() {
    const email = form.vemail.value.trim();
    const errorEl = document.getElementById("volEmailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      errorEl.textContent = "Email is required";
      return false;
    } else if (!emailRegex.test(email)) {
      errorEl.textContent = "Enter a valid email address";
      return false;
    } else if (email.length > 100) {
      errorEl.textContent = "Email must be less than 100 characters";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // --- Contact Validation ---
  function validateContact() {
    const contact = form.vcon.value.trim();
    const errorEl = document.getElementById("volContactError");

    if (contact === "") {
      errorEl.textContent = "Mobile number is required";
      return false;
    } else if (!/^[6-9][0-9]{9}$/.test(contact)) {
      errorEl.textContent = "Enter a valid 10-digit mobile number starting with 6-9";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // --- Password Validation ---
  function validatePassword() {
    const password = form.vpass.value.trim();
    const errorEl = document.getElementById("volPasswordError");

    if (password === "") {
      errorEl.textContent = "Password is required";
      return false;
    } else if (password.length < 8) {
      errorEl.textContent = "Password must be at least 8 characters";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // --- Role Validation ---
  function validateRole() {
    const role = form.vrole.value.trim();
    const errorEl = document.getElementById("volRoleError");

    if (role === "") {
      errorEl.textContent = "Select a role";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // --- Generate Random Password ---
  function generatePassword(length = 10) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }
    document.getElementById("vpass").value = password;
  }

  // --- Copy Password to Clipboard ---
  function copyPassword() {
    const passwordInput = document.getElementById("vpass");
    const password = passwordInput.value.trim();

    if (!password) {
      alert("No password to copy!");
      return;
    }

    navigator.clipboard.writeText(password)
      .then(() => alert("Password copied!"))
      .catch(() => alert("Failed to copy password."));
  }

  // Expose functions globally for buttons
  window.generatePassword = generatePassword;
  window.copyPassword = copyPassword;

  // --- Auto-generate password when page loads ---
  if (!document.getElementById("vpass").value) {
    generatePassword();
  }

  // --- Real-time field validation ---
  form.vname.addEventListener("input", validateName);
  form.vemail.addEventListener("input", validateEmail);
  form.vcon.addEventListener("input", validateContact);
  form.vpass.addEventListener("input", validatePassword);
  form.vrole.addEventListener("change", validateRole);

  // --- On form submit ---
  form.addEventListener("submit", function (e) {
    if (
      !validateName() ||
      !validateEmail() ||
      !validateContact() ||
      !validatePassword() ||
      !validateRole()
    ) {
      e.preventDefault();
    }
  });
});


//GROUP CREATE VALIDATION

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("GroupCreate");
  if (!form) return;

  function validateGroupName() {
    const groupName = form.group_nm.value.trim();
    const errorEl = document.getElementById("GroupNameError");

    if (groupName === "") {
      errorEl.textContent = "Group name is required";
      return false;
    } else if (groupName.length < 2 || groupName.length > 50) {
      errorEl.textContent = "Name must be between 2 and 50 characters";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  function validateLeader() {
    const leader = form.vid.value;
    const errorEl = document.getElementById("GroupLeaderError");

    if (leader === "") {
      errorEl.textContent = "Please select a group leader";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  form.group_nm.addEventListener("input", validateGroupName);
  form.vid.addEventListener("change", validateLeader);

  form.addEventListener("submit", function (e) {
    if (!validateGroupName() || !validateLeader()) e.preventDefault();
  });
});


//ROLE NAME VALIDATION

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("SetRoleForm");
  if (!form) return;

  function validateName() {
    const name = form.rolenm.value.trim();
    const errorEl = document.getElementById("roleNameError");

    if (name === "") {
      errorEl.textContent = "Name is required";
      return false;
    } else if (name.length < 2 || name.length > 50) {
      errorEl.textContent = "Name must be between 2 and 50 characters";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  form.rolenm.addEventListener("input", validateName);
  form.addEventListener("submit", function (e) {
    if (!validateName()) e.preventDefault();
  });
});


//SIDEBAR & COUNTER

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("mainContent");

  if (window.innerWidth > 992) {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("expanded");
  } else {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }
}

function toggleDropdown(event, id) {
  event.preventDefault();
  const navItem = event.target.closest('.nav-item');
  navItem.classList.toggle('open');
}

window.addEventListener('resize', () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (window.innerWidth > 992) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Counter Animation

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-box h3");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
});
