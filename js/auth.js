// KAYA — Authentication Script with Backend API

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  const forgotLink = document.getElementById('forgotPasswordLink');
  const backButtons = document.querySelectorAll('.back-to-login');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotForm = document.getElementById('forgotForm');
  const successState = document.getElementById('authSuccess');
  const successTitle = document.getElementById('successTitle');
  const successMessage = document.getElementById('successMessage');

  // Check if user is already logged in
  checkAuthState();

  // Password visibility toggles
  const togglePasswords = document.querySelectorAll('.toggle-password');
  togglePasswords.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      forms.forEach(form => form.classList.remove('active'));
      document.getElementById(`${targetTab}Form`).classList.add('active');

      successState.classList.remove('active');
    });
  });

  // Forgot password link
  forgotLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showForm('forgot');
  });

  // Back buttons
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showForm('login');
    });
  });

  // Login form submission - Using Backend API
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const result = await apiAuth.login(email, password);

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('bonkers_remember', 'true');
      }

      showSuccess('Welcome Back!', `Successfully logged in as ${email}`);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      alert(result.error || 'Login failed');
    }
  });

  // Signup form submission - Using Backend API
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }

    const result = await apiAuth.register(email, password, name);

    if (result.success) {
      showSuccess('Account Created!', `Welcome to KAYA, ${name}! You can now shop with us.`);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      alert(result.error || 'Signup failed');
    }
  });

  // Forgot password form - Using Backend API
  forgotForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value;

    const result = await apiAuth.forgotPassword(email);

    if (result.success) {
      showSuccess('Check Your Email', result.message || 'We\'ve sent password reset instructions to your email');
    } else {
      alert(result.error || 'Failed to send reset email');
    }
  });

  // Password strength meter
  const signupPassword = document.getElementById('signupPassword');
  if (signupPassword) {
    signupPassword.addEventListener('input', updatePasswordStrength);
  }

  function updatePasswordStrength() {
    const password = signupPassword.value;
    const bars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text span');

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength++;

    bars.forEach((bar, index) => {
      bar.classList.toggle('active', index < strength);
    });

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    if (strengthText) {
      strengthText.textContent = labels[strength] || 'Too short';
      strengthText.style.color =
        strength <= 1 ? '#ff3333' :
        strength === 2 ? '#ff9800' :
        strength === 3 ? '#ffc107' : '#00e676';
    }
  }

  function showSuccess(title, message) {
    forms.forEach(form => form.classList.remove('active'));
    successTitle.textContent = title;
    successMessage.textContent = message;
    successState.classList.add('active');
  }

  function showForm(formName) {
    successState.classList.remove('active');
    forms.forEach(form => form.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    if (formName === 'login') {
      loginForm.classList.add('active');
      tabs[0].classList.add('active');
    } else if (formName === 'signup') {
      signupForm.classList.add('active');
      tabs[1].classList.add('active');
    } else if (formName === 'forgot') {
      forgotForm.classList.add('active');
    }
  }

  function checkAuthState() {
    const user = apiAuth.getCurrentUser();
    if (user && user.loggedIn) {
      showSuccess(
        'Already Logged In',
        `Welcome back, ${user.name}! Redirecting to homepage...`
      );
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  }
});
