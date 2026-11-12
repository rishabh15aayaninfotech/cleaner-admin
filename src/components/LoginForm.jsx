import { useState } from "react";
import cleanerLogo from "../assets/cleaner-logo.png";
export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("admin@cleana.co"),
    [password, setPassword] = useState("password");
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand brand-large">
          <img className="brand-logo" src={cleanerLogo} alt="Cleaner logo" />
          <span>Cleaner</span>
        </div>
        <div className="login-copy">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Good to see you again.</h1>
          <p>
            A platform to manage your employees, events, inventory, and daily
            business activities efficiently.
          </p>
        </div>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (email && password) onLogin();
          }}
        >
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-options">
            <label className="check">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100">
            Sign in <span>→</span>
          </button>
        </form>
      </section>
      <aside className="login-aside hero-image-panel">
        <div className="hero-image-overlay" />
        <div className="hero-image-copy">
          <span className="eyebrow">RUN YOUR BUSINESS BETTER</span>
          <h2>Everything your team needs, in one place.</h2>
          <p>
            Manage people, schedules, inventory, and everyday operations with
            confidence.
          </p>
          <div className="hero-proof">
            <span className="hero-proof-dot">✓</span>
            <span>
              <strong>Simple. Organized. Efficient.</strong>
              <small>Built for busy teams</small>
            </span>
          </div>
        </div>
      </aside>
    </main>
  );
}
