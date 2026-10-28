// Bonkers Corner — Authentication Script with Supabase Integration

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

      // Hide success state when switching tabs
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

  // Login form submission - Using Supabase
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Call Supabase Auth
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Login Error: ' + error.message);
      return;
    }

    // Save session locally
    if (data.session) {
      localStorage.setItem('bonkers_user', JSON.stringify({
        email: data.user.email,
        name: data.user.user_metadata?.full_name || 'User',
        loggedIn: true
      }));
      if (rememberMe) {
        localStorage.setItem('bonkers_remember', 'true');
      }
    }

    showSuccess('Welcome Back!', `Successfully logged in as ${email}`);
  });

  // Signup form submission - Using Supabase
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validate passwords match
    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }

    // Call Supabase Auth for signup
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) {
      alert('Signup Error: ' + error.message);
      return;
    }

    // Save user data
    if (data.user) {
      localStorage.setItem('bonkers_user', JSON.stringify({
        email: data.user.email,
        name: name,
        loggedIn: true
      }));
    }

    showSuccess('Account Created!', `Welcome to Bonkers Corner, ${name}! Check your email for verification.`);
  });

  // Forgot password form - Using Supabase
  forgotForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value;

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login.html?reset=true`
    });

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    showSuccess('Check Your Email', `We've sent password reset instructions to ${email}`);
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

  // Show success state
  function showSuccess(title, message) {
    forms.forEach(form => form.classList.remove('active'));
    successTitle.textContent = title;
    successMessage.textContent = message;
    successState.classList.add('active');
  }

  // Show specific form
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

  // Check for remembered user
  const remembered = localStorage.getItem('bonkers_remember') === 'true';
  const savedUser = JSON.parse(localStorage.getItem('bonkers_user') || '{}');

  if (remembered && savedUser.email) {
    document.getElementById('loginEmail').value = savedUser.email;
    document.getElementById('rememberMe').checked = true;
  }
});
