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

  // group name validation
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

  // group leader name validation
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


// Task validation

document.addEventListener("DOMContentLoaded", function (){
    const form = document.getElementById("AdminTaskAssign");
    if (!form) return;

    // task name/title validation
    function validateTaskName(){
        const title = form.task_title.value.trim();
        const errorEl = document.getElementById("taskTitleError");

        if (title === ""){
            errorEl.textContent = "Title is required";
            return false;
        } else if (title.length < 2 || title.length > 200){
            errorEl.textContent = "Title required between 2 to 200 characters";
            return false;
        } else {
            errorEl.textContent = "";
            return true;
        }
    }

    // Task description validation
    function validateTaskDesc(){
        const desc = form.task_description.value.trim();
        const errorEl = document.getElementById("taskDescError");

        if (desc === ""){
            errorEl.textContent = "Description is required";
            return false;
        } else if (desc.length < 2 || desc.length > 500){
            errorEl.textContent = "Description required between 2 to 500 characters";
            return false;
        } else {
            errorEl.textContent = "";
            return true;
        }
    }

    // Task group validation
    function validateTaskGroupId() {
    const group = form.group_id.value.trim();
    const errorEl = document.getElementById("taskGroupIdError");

    if (group === "") {
      errorEl.textContent = "Select a Group";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // Task leader validation
  function validateTaskLeaderId() {
    const leader = form.leader_id.value.trim();
    const errorEl = document.getElementById("taskLeaderIdError");

    if (leader === "") {
      errorEl.textContent = "Select a Leader";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  form.task_title.addEventListener("input", validateTaskName);
  form.task_description.addEventListener("input", validateTaskDesc);
  form.group_id.addEventListener("change", validateTaskGroupId);
  form.leader_id.addEventListener("change", validateTaskLeaderId);

  form.addEventListener("submit", function (e) {
    if (
        !validateTaskName() ||
        !validateTaskDesc() ||
        !validateTaskGroupId() ||
        !validateTaskLeaderId()
        )
         {
            e.preventDefault();
         }
  });
});


//ROLE NAME VALIDATION

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("SetRoleForm");
  if (!form) return;

  //role name validation
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


//Notification validation

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("AdminNotification");
  if (!form) return;

  // Notification type validation
  function validateNotificationType() {
    const type = form.notifytype.value.trim();
    const errorEl = document.getElementById("NotifyTypeError");

    if (type === "") {
      errorEl.textContent = "Select a Notification Type";
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  // Notification title validation
  function validateNotificationTitle(){
        const title = form.notifytitle.value.trim();
        const errorEl = document.getElementById("NotifyTitleError");

        if (title === ""){
            errorEl.textContent = "Title is required";
            return false;
        } else if (title.length < 2 || title.length > 100){
            errorEl.textContent = "Title required between 2 to 100 characters";
            return false;
        } else {
            errorEl.textContent = "";
            return true;
        }
    }

  // Notification description validation
  function validateNotificationDesc(){
        const desc = form.notifydesc.value.trim();
        const errorEl = document.getElementById("NotifyDescError");

        if (desc === ""){
            errorEl.textContent = "Description is required";
            return false;
        } else if (desc.length < 2 ){
            errorEl.textContent = "Description required more than 2 characters";
            return false;
        } else {
            errorEl.textContent = "";
            return true;
        }
    }

  // Notification meeting link validation
  function validateNotificationLink(){
        const type = form.notifytype.value.trim();
        const link = form.meetinglink.value.trim();
        const errorEl = document.getElementById("MeetingLinkError");

        if (type === "Meeting"){
            if (link === ""){
                errorEl.textContent = "Link is required";
                return false;
            } else{
                errorEl.textContent = "";
                return true;
            }
        } else {
            errorEl.textContent = "";
            return true;
        }
    }

  form.notifytype.addEventListener("change", validateNotificationType);
  form.notifytitle.addEventListener("input", validateNotificationTitle);
  form.notifydesc.addEventListener("input", validateNotificationDesc);
  form.meetinglink.addEventListener("input", validateNotificationLink);

  form.addEventListener("submit", function (e) {
    if (
        !validateNotificationType() ||
        !validateNotificationTitle() ||
        !validateNotificationDesc() ||
        !validateNotificationLink()
        )
         {
            e.preventDefault();
         }
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



// ============================================================================
// Sevak Sahyadriche Auth UI
// Plain JavaScript for slideshow, validation, password toggle, and mobile hints
// ============================================================================

(function () {
  'use strict';

  // Utility: safe query helpers
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  // ---------------------------------------------------------------------------
  // 1. Mobile structure indicator (purely cosmetic hook for CSS if desired)
  // ---------------------------------------------------------------------------
  (function setupMobileStructureSwitch() {
    var mq = window.matchMedia('(max-width: 600px)');
    function handle(e) {
      if (e.matches) {
        document.documentElement.classList.add('is-mobile');
      } else {
        document.documentElement.classList.remove('is-mobile');
      }
    }
    if (mq.addEventListener) {
      mq.addEventListener('change', handle);
    } else if (mq.addListener) {
      mq.addListener(handle);
    }
    handle(mq);
  })();

  // ---------------------------------------------------------------------------
  // 2. Slideshow / Carousel
  // ---------------------------------------------------------------------------
  (function setupSlideshow() {
    var slideshow = $('.slideshow');
    if (!slideshow) return;

    var slides = $all('.slideshow__slide', slideshow);
    if (!slides.length) return;

    var indicators = $all('.slideshow__indicator', slideshow);
    var prevBtn = $('.slideshow__control--prev', slideshow);
    var nextBtn = $('.slideshow__control--next', slideshow);
    var viewport = $('.slideshow__viewport', slideshow);
    var announcement = $('.slideshow__announcement', slideshow);

    var currentIndex = 0;
    var autoplayInterval = 4000;
    var autoplayId = null;
    var isPaused = false;
    var focusWithin = false;

    // Mark as JS-enhanced
    slideshow.classList.add('slideshow--js');

    function announce(message) {
      if (!announcement) return;
      announcement.textContent = message;
    }

    function goToSlide(index, opts) {
      opts = opts || {};
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;

      slides.forEach(function (slide, i) {
        var isActive = i === index;
        if (isActive) {
          slide.classList.add('slideshow__slide--active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('slideshow__slide--active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      indicators.forEach(function (dot, i) {
        var isActive = i === index;
        dot.classList.toggle('slideshow__indicator--active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      if (!opts.silent) {
        var slide = slides[index];
        var label = slide && slide.getAttribute('aria-label');
        announce(label ? 'Slide ' + label : 'Slide changed');
      }
    }

    function next() {
      goToSlide(currentIndex + 1);
    }

    function prev() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (autoplayId || isPaused) return;
      autoplayId = window.setInterval(next, autoplayInterval);
    }

    function stopAutoplay() {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    }

    function pause() {
      isPaused = true;
      stopAutoplay();
    }

    function resume() {
      isPaused = false;
      startAutoplay();
    }

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next();
      });
    }

    indicators.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goToSlide(i);
      });
    });

    // Keyboard navigation
    slideshow.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    });

    // Pause on hover / focus
    slideshow.addEventListener('mouseenter', pause);
    slideshow.addEventListener('mouseleave', function () {
      if (!focusWithin) {
        resume();
      }
    });

    slideshow.addEventListener('focusin', function () {
      focusWithin = true;
      pause();
    });
    slideshow.addEventListener('focusout', function (event) {
      // If focus moves entirely out of the slideshow, resume
      if (!slideshow.contains(event.relatedTarget)) {
        focusWithin = false;
        if (!isPaused) {
          resume();
        }
      }
    });

    // Initialize
    slides.forEach(function (slide, i) {
      slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    });
    goToSlide(0, { silent: true });
    startAutoplay();
  })();

  // ---------------------------------------------------------------------------
  // 3. Password visibility toggles
  // ---------------------------------------------------------------------------
  (function setupPasswordToggles() {
    var toggles = $all('.form__password-toggle');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var wrapper = toggle.closest('.form__password-wrapper');
        if (!wrapper) return;

        var input = $('input[type="password"], input[type="text"]', wrapper);
        if (!input) return;

        var isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.setAttribute('aria-pressed', String(isPassword));
        toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    });
  })();

  // ---------------------------------------------------------------------------
  // 4. Inline form validation (register & login)
  // ---------------------------------------------------------------------------
  (function setupFormValidation() {
    var FORMS_SELECTOR = '.form--register, .form--login';

    function showError(input, message) {
      var field = input.closest('.form__field');
      if (field) {
        var error = $('.form__error', field);
        if (error) {
          error.textContent = message || '';
        }
      }

      if (message) {
        input.classList.add('form__input--invalid');
      } else {
        input.classList.remove('form__input--invalid');
      }
    }

    function validateEmail(input) {
      if (!input.value.trim()) {
        showError(input, 'Please enter your email address.');
        return false;
      }
      // Use browser validation if available
      if (input.validity && input.validity.typeMismatch) {
        showError(input, 'Please enter a valid email address.');
        return false;
      }
      // Simple pattern fallback
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(input.value.trim())) {
        showError(input, 'Please enter a valid email address.');
        return false;
      }
      showError(input, '');
      return true;
    }

    function validatePassword(input) {
      var value = input.value || '';
      if (!value.trim()) {
        showError(input, 'Please enter your password.');
        return false;
      }
      if (value.length < 8) {
        showError(input, 'Password must be at least 8 characters long.');
        return false;
      }
      showError(input, '');
      return true;
    }

    function validateText(input, fieldName) {
      var value = (input.value || '').trim();
      if (!value) {
        showError(input, 'Please enter your ' + fieldName + '.');
        return false;
      }
      showError(input, '');
      return true;
    }

    function validateCheckbox(input) {
      if (!input.checked) {
        var field = input.closest('.form__field');
        var error = field && $('.form__error', field);
        if (error) {
          error.textContent = 'Please agree to the terms to continue.';
        }
        return false;
      } else {
        var fieldOk = input.closest('.form__field');
        var errorOk = fieldOk && $('.form__error', fieldOk);
        if (errorOk) {
          errorOk.textContent = '';
        }
        return true;
      }
    }

    $all(FORMS_SELECTOR).forEach(function (form) {
      var email = $('input[type="email"]', form);
      var password = $('#id_password', form) || $('#login_password', form) || $('input[type="password"]', form);
      var firstName = $('#id_first_name', form);
      var lastName = $('#id_last_name', form);
      var terms = $('#id_agree_terms', form);

      if (email) {
        email.addEventListener('input', function () {
          // Validate lightly on input without being too strict
          if (email.value.length > 4) {
            validateEmail(email);
          } else {
            showError(email, '');
          }
        });
      }

      if (password) {
        password.addEventListener('input', function () {
          if (password.value.length > 0) {
            validatePassword(password);
          } else {
            showError(password, '');
          }
        });
      }

      if (firstName) {
        firstName.addEventListener('input', function () {
          if (firstName.value.trim()) {
            showError(firstName, '');
          }
        });
      }

      if (lastName) {
        lastName.addEventListener('input', function () {
          if (lastName.value.trim()) {
            showError(lastName, '');
          }
        });
      }

      if (terms) {
        terms.addEventListener('change', function () {
          validateCheckbox(terms);
        });
      }

      form.addEventListener('submit', function (event) {
        var isValid = true;
        var firstInvalid = null;

        if (firstName && !validateText(firstName, 'first name')) {
          isValid = false;
          firstInvalid = firstInvalid || firstName;
        }
        if (lastName && !validateText(lastName, 'last name')) {
          isValid = false;
          firstInvalid = firstInvalid || lastName;
        }
        if (email && !validateEmail(email)) {
          isValid = false;
          firstInvalid = firstInvalid || email;
        }
        if (password && !validatePassword(password)) {
          isValid = false;
          firstInvalid = firstInvalid || password;
        }
        if (terms && !validateCheckbox(terms)) {
          isValid = false;
          firstInvalid = firstInvalid || terms;
        }

        if (!isValid) {
          event.preventDefault();
          if (firstInvalid && typeof firstInvalid.focus === 'function') {
            firstInvalid.focus();
          }
        }
      });
    });
  })();

  // ---------------------------------------------------------------------------
  // 5. Social sign-in buttons (non-functional placeholders, no console output)
  // ---------------------------------------------------------------------------
  (function setupSocialButtons() {
    $all('.button--social').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        // Intentionally no console output; these are visual placeholders only.
      });
    });
  })();

  // ---------------------------------------------------------------------------
  // 6. Viewport height adjustment for mobile browsers
  // ---------------------------------------------------------------------------
  (function setupViewportHeight() {
    // Set CSS custom property for actual viewport height (handles mobile browser chrome)
    function setVH() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    window.addEventListener('load', setVH);
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    setVH();
  })();
})();

//===========================================================================================================================================================
// js for profile update

document.addEventListener('DOMContentLoaded', function () {

    // Elements
    const photoInput = document.getElementById('photoInput');
    const preview = document.getElementById('profileImagePreview');
    const passField = document.getElementById('volunteer_pass');
    const passConfirm = document.getElementById('volunteer_pass_confirm');
    const toggle = document.getElementById('passwordToggle');
    const toggleConfirm = document.getElementById('passwordToggleConfirm');
    const form = document.getElementById('profileForm');
    const success = document.getElementById('successMessage');
    const contactField = document.getElementById('volunteer_contact');

    const passError = document.getElementById('passError');
    const confirmError = document.getElementById('confirmError');
    const contactError = document.getElementById('contactError');

    // === Photo Preview ===
    if (photoInput && preview) {
        photoInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file && file.type.startsWith('image/')) {
                preview.src = URL.createObjectURL(file);
            } else {
                // ignore non-image or clear
                this.value = '';
                alert('Please select a valid image file.');
            }
        });
    }

    // === Toggle password visibility (both fields) ===
    function toggleVisibility(field, icon) {
        if (!field || !icon) return;
        icon.addEventListener('click', function () {
            field.type = field.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye-slash');
        });
    }
    toggleVisibility(passField, toggle);
    toggleVisibility(passConfirm, toggleConfirm);

    // === Helpers ===
    function showError(el, message) {
        if (!el) return;
        el.style.display = 'block';
        el.textContent = message;
    }
    function hideError(el) {
        if (!el) return;
        el.style.display = 'none';
        el.textContent = '';
    }

    // Strong password regex: min 8, at least 1 lowercase, 1 uppercase, 1 digit
    const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Contact field numeric-only enforcement (simple)
    if (contactField) {
        contactField.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
            hideError(contactError);
        });
    }

    // === Form Submission Validation ===
    if (form) {
        form.addEventListener('submit', function (e) {
            // Reset errors
            hideError(passError);
            hideError(confirmError);
            hideError(contactError);

            // Contact validation (optional)
            const contactVal = contactField ? contactField.value.trim() : '';
            if (contactVal && contactVal.length !== 10) {
                showError(contactError, 'Contact number must be exactly 10 digits.');
                e.preventDefault();
                return;
            }

            // Password logic:
            const pwd = passField ? passField.value : '';
            const pwdConfirm = passConfirm ? passConfirm.value : '';

            // If both blank -> no password change, proceed
            const bothBlank = (!pwd || pwd.trim() === '') && (!pwdConfirm || pwdConfirm.trim() === '');
            if (!bothBlank) {
                // At least one field filled -> enforce validation
                if (!strongPwdRegex.test(pwd)) {
                    showError(passError, 'Password must be at least 8 characters and include uppercase, lowercase and a number.');
                    e.preventDefault();
                    return;
                }
                if (pwd !== pwdConfirm) {
                    showError(confirmError, 'Passwords do not match.');
                    e.preventDefault();
                    return;
                }
            }

            // If validation passed, show a temporary success message (server response will be actual truth)
            success.style.display = 'block';
            setTimeout(function () {
                success.style.display = 'none';
            }, 3000);

            // allow form to submit normally (server will process)
        });
    }

    // ===================================================================
    // AUTO-ADD DATA-LABEL ATTRIBUTES FOR RESPONSIVE TABLE STACKING
    // ===================================================================
    function addDataLabelsToTables() {
        document.querySelectorAll('body:not(.page--auth) table').forEach(function(table) {
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');
            
            if (!thead || !tbody) return;
            
            const headers = Array.from(thead.querySelectorAll('th'));
            
            if (headers.length === 0) return;
            
            tbody.querySelectorAll('tr').forEach(function(row) {
                const cells = Array.from(row.querySelectorAll('td'));
                cells.forEach(function(cell, index) {
                    if (headers[index]) {
                        const headerText = headers[index].textContent.trim();
                        if (headerText && !cell.hasAttribute('data-label')) {
                            cell.setAttribute('data-label', headerText);
                        }
                    }
                });
            });
        });
    }
    
    // Run on page load
    addDataLabelsToTables();
    
    // Re-run when dynamic content is loaded (for AJAX tables)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                addDataLabelsToTables();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});