import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate full name
    if (!fullName) {
      window.alert('Please enter your full name');
      return;
    }

    // Check for duplicate emails
    const response = await fetch('http://localhost:8088/users');
    const users = await response.json();
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      window.alert('Account with that email address already exists');
      return;
    }

    // Create user object
    const newUser = {
      fullName,
      email,
      userImg: '',
    };

    // POST new user
    const postResponse = await fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    const createdUser = await postResponse.json();

    // Store user in local storage
    localStorage.setItem('Optimum_User', JSON.stringify({ id: createdUser.id }));

    // Navigate to home
    navigate('/');

  };

  return (
    <div className="container-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <button type="submit" className="form-btn">Create Account</button>
        </fieldset>
      </form>
    </div>
  );
};


