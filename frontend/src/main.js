const BACKEND_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const authContent = document.getElementById('auth-content');
  const userContent = document.getElementById('user-content');

  // Check for existing token
  const token = localStorage.getItem('access_token');
  if (token) {
    showUserProfile(token);
  }

  // Login Handler
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      try {
        loginBtn.textContent = 'Redirecting...';
        loginBtn.disabled = true;

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
          method: 'POST'
        });
        const result = await response.json();

        if (result.status === 'success' && result.data.redirect_to) {
          window.location.href = result.data.redirect_to;
        } else {
          alert('Failed to initiate login');
          resetLoginBtn();
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Connection error');
        resetLoginBtn();
      }
    });
  }

  // Logout Handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    });
  }

  function resetLoginBtn() {
    loginBtn.textContent = 'Login to Gateway';
    loginBtn.disabled = false;
  }

  async function showUserProfile(accessToken) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          authContent.style.display = 'block';
          userContent.style.display = 'none';
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const result = await response.json();
      const user = result.data;

      document.getElementById('user-name').textContent = `${user.first_name || ''} ${user.last_name || ''}`;
      document.getElementById('user-email').textContent = user.email;
      document.getElementById('user-id').textContent = user.id;

      authContent.style.display = 'none';
      userContent.style.display = 'block';
    } catch (error) {
      console.error('Profile fetch error:', error);
      authContent.style.display = 'block';
      userContent.style.display = 'none';
    }
  }
});
