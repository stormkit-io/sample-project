import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/_stormkit/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error(`Registration failed: ${res.statusText}`);
      }
      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="Register-form">
        <div className="Register-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {token && <p className="Register-token">Token: {token}</p>}
      {error && <p className="Register-error">{error}</p>}
    </div>
  );
}

export default Register;
