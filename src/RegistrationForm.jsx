import React from "react";

function Register() {
  return (
    <div className="Register">
      <h2>Register</h2>
      <form action="/v1/auth/register" method="POST" className="Register-form">
        <div className="Register-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="Register-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
