// Employee Form Validation Script
// This script provides comprehensive validation for the employee form

// Global variables to track validation state
let validationState = {
    empName: false,
    empEmail: false,
    empPassword: false,
    empRole: false
};

// DOM elements
let formElements = {};

// Initialize validation when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeValidation();
});

// Initialize all validation components
function initializeValidation() {
    // Get form elements
    formElements = {
        form: document.getElementById('employeeForm'),
        empName: document.querySelector('input[name="ename"]'),
        empEmail: document.querySelector('input[name="eemail"]'),
        empPassword: document.querySelector('input[name="epass"]'),
        empRole: document.querySelector('select[name="erole"]'),
        submitBtn: document.querySelector('button[type="submit"]')
    };

    // Add event listeners for real-time validation
    addEventListeners();
    
    // Initial validation check
    updateSubmitButton();
}

// Add event listeners for real-time validation
function addEventListeners() {
    // Employee Name validation
    formElements.empName.addEventListener('input', function() {
        validateEmpName();
        updateSubmitButton();
    });

    formElements.empName.addEventListener('blur', function() {
        validateEmpName();
        updateSubmitButton();
    });

    // Email validation
    formElements.empEmail.addEventListener('input', function() {
        validateEmpEmail();
        updateSubmitButton();
    });

    formElements.empEmail.addEventListener('blur', function() {
        validateEmpEmail();
        updateSubmitButton();
    });

    // Password validation
    formElements.empPassword.addEventListener('input', function() {
        validateEmpPassword();
        updateSubmitButton();
    });

    formElements.empPassword.addEventListener('blur', function() {
        validateEmpPassword();
        updateSubmitButton();
    });

    // Role validation
    formElements.empRole.addEventListener('change', function() {
        validateEmpRole();
        updateSubmitButton();
    });

    // Form submission
    formElements.form.addEventListener('submit', function(e) {
        if (!isFormValid()) {
            e.preventDefault();
            showAllErrors();
            return false;
        }
        return true;
    });
}

// ========================================
// INDIVIDUAL FIELD VALIDATION FUNCTIONS
// ========================================

// Validate Employee Name
function validateEmpName() {
    const name = formElements.empName.value.trim();
    const errorDiv = document.getElementById('empNameError');
    
    // Clear previous error
    errorDiv.textContent = '';
    formElements.empName.classList.remove('is-invalid');
    
    // Validation rules
    if (name === '') {
        showFieldError('empName', 'Employee name is required');
        validationState.empName = false;
        return false;
    }
    
    if (name.length < 2) {
        showFieldError('empName', 'Employee name must be at least 2 characters long');
        validationState.empName = false;
        return false;
    }
    
    if (name.length > 50) {
        showFieldError('empName', 'Employee name cannot exceed 50 characters');
        validationState.empName = false;
        return false;
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s\-']+$/.test(name)) {
        showFieldError('empName', 'Employee name can only contain letters, spaces, hyphens, and apostrophes');
        validationState.empName = false;
        return false;
    }
    
    // Success
    formElements.empName.classList.add('is-valid');
    validationState.empName = true;
    return true;
}

// Validate Employee Email
function validateEmpEmail() {
    const email = formElements.empEmail.value.trim();
    const errorDiv = document.getElementById('empEmailError');
    
    // Clear previous error
    errorDiv.textContent = '';
    formElements.empEmail.classList.remove('is-invalid');
    
    // Validation rules
    if (email === '') {
        showFieldError('empEmail', 'Email is required');
        validationState.empEmail = false;
        return false;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('empEmail', 'Please enter a valid email address');
        validationState.empEmail = false;
        return false;
    }
    
    // Check email length
    if (email.length > 100) {
        showFieldError('empEmail', 'Email cannot exceed 100 characters');
        validationState.empEmail = false;
        return false;
    }
    
    // Success
    formElements.empEmail.classList.add('is-valid');
    validationState.empEmail = true;
    return true;
}

// Validate Employee Password
function validateEmpPassword() {
    const password = formElements.empPassword.value;
    const errorDiv = document.getElementById('empPasswordError');
    
    // Clear previous error
    errorDiv.textContent = '';
    formElements.empPassword.classList.remove('is-invalid');
    
    // Validation rules
    if (password === '') {
        showFieldError('empPassword', 'Password is required');
        validationState.empPassword = false;
        return false;
    }
    
    if (password.length < 6) {
        showFieldError('empPassword', 'Password must be at least 6 characters long');
        validationState.empPassword = false;
        return false;
    }
    
    if (password.length > 128) {
        showFieldError('empPassword', 'Password cannot exceed 128 characters');
        validationState.empPassword = false;
        return false;
    }
    
    // Check for at least one letter and one number
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
        showFieldError('empPassword', 'Password must contain at least one letter and one number');
        validationState.empPassword = false;
        return false;
    }
    
    // Success
    formElements.empPassword.classList.add('is-valid');
    validationState.empPassword = true;
    return true;
}

// Validate Employee Role
function validateEmpRole() {
    const role = formElements.empRole.value;
    const errorDiv = document.getElementById('empRoleError');
    
    // Clear previous error
    errorDiv.textContent = '';
    formElements.empRole.classList.remove('is-invalid');
    
    // Validation rules
    if (role === '') {
        showFieldError('empRole', 'Please select a role');
        validationState.empRole = false;
        return false;
    }
    
    // Check if selected role is valid
    const validRoles = ['admin', 'leader', 'member'];
    if (!validRoles.includes(role)) {
        showFieldError('empRole', 'Please select a valid role');
        validationState.empRole = false;
        return false;
    }
    
    // Success
    formElements.empRole.classList.add('is-valid');
    validationState.empRole = true;
    return true;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

// Show error for a specific field
function showFieldError(fieldName, message) {
    let errorDiv;
    let inputElement;
    
    switch(fieldName) {
        case 'empName':
            errorDiv = document.getElementById('empNameError');
            inputElement = formElements.empName;
            break;
        case 'empEmail':
            errorDiv = document.getElementById('empEmailError');
            inputElement = formElements.empEmail;
            break;
        case 'empPassword':
            errorDiv = document.getElementById('empPasswordError');
            inputElement = formElements.empPassword;
            break;
        case 'empRole':
            errorDiv = document.getElementById('empRoleError');
            inputElement = formElements.empRole;
            break;
    }
    
    if (errorDiv && inputElement) {
        errorDiv.textContent = message;
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    }
}

// Clear all errors
function clearAllErrors() {
    // Clear error messages
    document.getElementById('empNameError').textContent = '';
    document.getElementById('empEmailError').textContent = '';
    document.getElementById('empPasswordError').textContent = '';
    document.getElementById('empRoleError').textContent = '';
    
    // Remove validation classes
    formElements.empName.classList.remove('is-invalid', 'is-valid');
    formElements.empEmail.classList.remove('is-invalid', 'is-valid');
    formElements.empPassword.classList.remove('is-invalid', 'is-valid');
    formElements.empRole.classList.remove('is-invalid', 'is-valid');
}

// Show all current errors
function showAllErrors() {
    validateEmpName();
    validateEmpEmail();
    validateEmpPassword();
    validateEmpRole();
}

// Check if entire form is valid
function isFormValid() {
    return validationState.empName && 
           validationState.empEmail && 
           validationState.empPassword && 
           validationState.empRole;
}

// Update submit button state
function updateSubmitButton() {
    if (isFormValid()) {
        formElements.submitBtn.disabled = false;
        formElements.submitBtn.classList.remove('btn-secondary');
        formElements.submitBtn.classList.add('btn-primary');
    } else {
        formElements.submitBtn.disabled = true;
        formElements.submitBtn.classList.remove('btn-primary');
        formElements.submitBtn.classList.add('btn-secondary');
    }
}

// ========================================
// PUBLIC FUNCTIONS (can be called from HTML)
// ========================================

// Validate entire form (can be called from HTML)
function validateForm() {
    const isValid = isFormValid();
    if (!isValid) {
        showAllErrors();
    }
    return isValid;
}

// Reset form and clear all validations
function resetForm() {
    formElements.form.reset();
    clearAllErrors();
    
    // Reset validation state
    validationState = {
        empName: false,
        empEmail: false,
        empPassword: false,
        empRole: false
    };
    
    updateSubmitButton();
}

// Get validation status for debugging
function getValidationStatus() {
    return {
        formValid: isFormValid(),
        fields: validationState
    };
}

// Manual validation trigger for any field
function validateField(fieldName) {
    switch(fieldName) {
        case 'empName':
            return validateEmpName();
        case 'empEmail':
            return validateEmpEmail();
        case 'empPassword':
            return validateEmpPassword();
        case 'empRole':
            return validateEmpRole();
        default:
            console.error('Unknown field:', fieldName);
            return false;
    }
}
