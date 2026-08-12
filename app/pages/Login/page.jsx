"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      setSuccess("Login successful! Redirecting...");

      // Store login information if required
      if (rememberMe) {
        localStorage.setItem("userEmail", formData.email);
      }

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-info">

          <div className="brand-icon">
            🧠
          </div>

          <h1>Mental Health</h1>

          <p className="info-title">
            Welcome back!
          </p>

          <p className="info-text">
            Take a moment for yourself. Continue your
            mental wellness journey and understand
            yourself better.
          </p>

          <div className="feature-list">

            <div className="feature">
              <span>✓</span>
              <p>Safe and private</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Personalized experience</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Monitor your wellness</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-container">

          <div className="form-header">
            <h2>Welcome Back</h2>

            <p>
              Login to continue your journey
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger">
              <span>⚠</span>
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="alert alert-success">
              <span>✓</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group-custom">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="input-group-custom">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER + FORGOT */}
            <div className="login-options">

              <div className="remember">

                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <label htmlFor="rememberMe">
                  Remember me
                </label>

              </div>

              <Link
                href="/forgot-password"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          {/* REGISTER */}
          <div className="register-link">

            Dont have an account?{" "}

            <Link href="/register">
              Create Account
            </Link>

          </div>

        </div>
      </div>

      <style jsx>{`

        .login-page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #eef7f6,
            #f5f8ff
          );
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 950px;
          min-height: 570px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 40% 60%;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.1);
        }

        /* LEFT */

        .login-info {
          background: linear-gradient(
            160deg,
            #5b8def,
            #6c63d9
          );
          color: white;
          padding: 55px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand-icon {
          width: 65px;
          height: 65px;
          border-radius: 18px;
          background: rgba(
            255,
            255,
            255,
            0.18
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin-bottom: 25px;
        }

        .login-info h1 {
          font-size: 34px;
          margin-bottom: 15px;
        }

        .info-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .info-text {
          line-height: 1.7;
          opacity: 0.9;
        }

        .feature-list {
          margin-top: 35px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0;
        }

        .feature span {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(
            255,
            255,
            255,
            0.2
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature p {
          margin: 0;
        }

        /* RIGHT */

        .login-form-container {
          padding: 45px 55px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-header {
          margin-bottom: 25px;
        }

        .form-header h2 {
          font-size: 30px;
          color: #222;
          margin-bottom: 8px;
        }

        .form-header p {
          color: #777;
          margin: 0;
        }

        /* ALERT */

        .alert {
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          display: flex;
          gap: 8px;
        }

        .alert-danger {
          background: #fff0f0;
          color: #c62828;
          border: 1px solid #ffcdd2;
        }

        .alert-success {
          background: #edf9f0;
          color: #218838;
          border: 1px solid #c8e6c9;
        }

        /* INPUT */

        .input-group-custom {
          margin-bottom: 20px;
        }

        .input-group-custom label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          height: 50px;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0 75px 0 43px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s;
        }

        .input-wrapper input:focus {
          border-color: #5b8def;
          box-shadow:
            0 0 0 3px
            rgba(91, 141, 239, 0.12);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          z-index: 2;
          font-size: 16px;
        }

        .password-btn {
          position: absolute;
          right: 12px;
          border: none;
          background: none;
          color: #5b8def;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        /* OPTIONS */

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 5px 0 25px;
          font-size: 13px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #666;
        }

        .remember input {
          cursor: pointer;
        }

        .forgot-link {
          color: #5b8def;
          text-decoration: none;
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        /* BUTTON */

        .login-btn {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #5b8def,
            #6c63d9
          );
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .login-btn:hover {
          transform: translateY(-1px);
          box-shadow:
            0 8px 20px
            rgba(91, 141, 239, 0.25);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* SPINNER */

        .spinner {
          width: 15px;
          height: 15px;
          display: inline-block;
          border: 2px solid
            rgba(255, 255, 255, 0.4);
          border-top-color: white;
          border-radius: 50%;
          margin-right: 8px;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* REGISTER */

        .register-link {
          text-align: center;
          margin-top: 25px;
          color: #666;
          font-size: 14px;
        }

        .register-link a {
          color: #5b8def;
          font-weight: 600;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {

          .login-card {
            grid-template-columns: 1fr;
          }

          .login-info {
            padding: 35px 30px;
          }

          .feature-list {
            display: none;
          }

          .login-form-container {
            padding: 35px 25px;
          }
        }

      `}</style>
    </div>
  );
}

export default Login;