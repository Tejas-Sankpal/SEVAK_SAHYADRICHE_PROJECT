
//form validation to add volunteers and update volunteers

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("volunteerForm");

    // --- Name Validation ---
    function validateName() {
      const name = form.vname.value.trim();
      const errorEl = document.getElementById("volNameError");

      if (name === "") {
        errorEl.textContent = "Name is required";
        form.vname.classList.add("invalid");
        form.vname.classList.remove("valid");
        return false;
      } else if (name.length < 2 || name.length > 50) {
        errorEl.textContent = "Name must be between 2 and 50 characters";
        form.vname.classList.add("invalid");
        form.vname.classList.remove("valid");
        return false;
      } else {
        errorEl.textContent = "";
        form.vname.classList.add("valid");
        form.vname.classList.remove("invalid");
        return true;
      }
    }

    // --- Email Validation ---
    function validateEmail() {
      const email = form.vemail.value.trim();
      const errorEl = document.getElementById("volEmailError");

      if (email === "") {
        errorEl.textContent = "Email is required";
        form.vemail.classList.add("invalid");
        form.vemail.classList.remove("valid");
        return false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errorEl.textContent = "Enter a valid email address";
          form.vemail.classList.add("invalid");
          form.vemail.classList.remove("valid");
          return false;
        } else if (email.length > 100) {
          errorEl.textContent = "Email must be less than 100 characters";
          form.vemail.classList.add("invalid");
          form.vemail.classList.remove("valid");
          return false;
        } else {
          errorEl.textContent = "";
          form.vemail.classList.add("valid");
          form.vemail.classList.remove("invalid");
          return true;
        }
      }
    }

   // --- Contact / Mobile Number Validation ---
        function validateContact() {
    const contact = form.vcon.value.trim();
    const errorEl = document.getElementById("volContactError");

    if (contact === "") {
        errorEl.textContent = "Mobile number is required";
        form.vcon.classList.add("invalid");
        form.vcon.classList.remove("valid");
        return false;
    } else if (!/^[0-9]+$/.test(contact)) {  // Only digits
        errorEl.textContent = "Mobile number must contain only digits";
        form.vcon.classList.add("invalid");
        form.vcon.classList.remove("valid");
        return false;
    } else if (contact.length !== 10) {  // Check length
        errorEl.textContent = "Mobile number must be exactly 10 digits";
        form.vcon.classList.add("invalid");
        form.vcon.classList.remove("valid");

        return false;
    } else if (!/^[6-9][0-9]{9}$/.test(contact)) {  // Indian mobile rule
        errorEl.textContent = "Mobile number must start with 6-9";
        form.vcon.classList.add("invalid");
        form.vcon.classList.remove("valid");
        return false;
    } else {
        errorEl.textContent = "";
        form.vcon.classList.add("valid");
        form.vcon.classList.remove("invalid");
        return true;
    }
}

        // Auto-generate secure random password
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

    // Copy password to clipboard
    function copyPassword() {
      const passwordInput = document.getElementById("vpass");
      passwordInput.select();
      document.execCommand("copy");
      alert("Password copied!");
    }

    // Auto-generate on page load
    document.addEventListener("DOMContentLoaded", generatePassword);

    document.getElementById("vpass").classList.add("generated");
    setTimeout(() => {
        document.getElementById("vpass").classList.remove("generated");
    }, 500);


    // --- Role Validation ---
    function validateRole() {
      const role = form.vrole.value;
      const errorEl = document.getElementById("volRoleError");

      if (role === "") {
        errorEl.textContent = "Please select a role";
        form.vrole.classList.add("invalid");
        form.vrole.classList.remove("valid");
        return false;
      } else {
        errorEl.textContent = "";
        form.vrole.classList.add("valid");
        form.vrole.classList.remove("invalid");
        return true;
      }
    }

    // Attach real-time validation
    form.vname.addEventListener("input", validateName);
    form.vemail.addEventListener("input", validateEmail);
    form.vcon.addEventListener("input", validateContact);
    form.vpass.addEventListener("input", validatePassword);
    form.vrole.addEventListener("change", validateRole);

    // Final validation on submit
    form.addEventListener("submit", function (e) {
      let isValid = true;

      if (!validateName()) isValid = false;
      if (!validateEmail()) isValid = false;
      if(!validateContact()) isValid = false;
      if (!validatePassword()) isValid = false;
      if (!validateRole()) isValid = false;

      if (!isValid) e.preventDefault();
    });
  });


// validation for group create

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("GroupCreate");

    // --- Group Name Validation ---
    function validateGroupName() {
      const groupName = form.group_nm.value.trim();
      const errorEl = document.getElementById("GroupNameError");

      if (groupName === "") {
        errorEl.textContent = "Group name is required";
        form.group_nm.classList.add("invalid");
        form.group_nm.classList.remove("valid");
        return false;
      } else if (groupName.length < 2 || groupName.length > 50) {
        errorEl.textContent = "Name must be between 2 and 50 characters";
        form.group_nm.classList.add("invalid");
        form.group_nm.classList.remove("valid");

        return false;
      } else {
        errorEl.textContent = "";
        form.group_nm.classList.add("valid");
        form.group_nm.classList.remove("invalid");
        return true;
      }
    }

    // --- Leader Validation ---
    function validateLeader() {
      const leader = form.vid.value;
      const errorEl = document.getElementById("GroupLeaderError");

      if (leader === "") {
        errorEl.textContent = "Please select a group leader";
        form.vid.classList.add("invalid");
        form.vid.classList.remove("valid");
        return false;
      } else {
        errorEl.textContent = "";
        form.vid.classList.add("valid");
        form.vid.classList.remove("invalid");
        return true;
      }
    }

    // --- Real-time validation (optional) ---
    form.group_nm.addEventListener("input", validateGroupName);
    form.vid.addEventListener("change", validateLeader);

    // --- Form Submit Validation ---
    form.addEventListener("submit", function (e) {
      const isGroupValid = validateGroupName();
      const isLeaderValid = validateLeader();

      if (!isGroupValid || !isLeaderValid) {
        e.preventDefault(); // stop form submit if invalid
      }
    });
});


//for sidebar and topbar

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


// for the counter function
// Counter animation function
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


//role name validation

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("SetRoleForm");

    // --- Name Validation ---
    function validateName() {
      const name = form.rolenm.value.trim();
      const errorEl = document.getElementById("roleNameError");

      if (name === "") {
        errorEl.textContent = "Name is required";
        form.rolenm.classList.add("invalid");
        form.rolenm.classList.remove("valid");
        return false;
      } else if (name.length < 2 || name.length > 50) {
        errorEl.textContent = "Name must be between 2 and 50 characters";
        form.rolenm.classList.add("invalid");
        form.rolenm.classList.remove("valid");
        return false;
      } else {
        errorEl.textContent = "";
        form.rolenm.classList.add("valid");
        form.rolenm.classList.remove("invalid");
        return true;
      }
    }

    form.rolenm.addEventListener("input", validateName);

     form.addEventListener("submit", function (e) {
      let isValid = true;

      if (!validateName()) isValid = false;

      if (!isValid) e.preventDefault();
    });

});