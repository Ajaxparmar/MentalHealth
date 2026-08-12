"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Registration() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        text: "",
        width: "0%",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak",
        width: "33%",
      };
    }

    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        text: "Strong",
        width: "100%",
      };
    }

    return {
      text: "Medium",
      width: "66%",
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/pages/Login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* Left Side */}
        <div className="register-info">

          <div className="brand-icon">
            🧠
          </div>

          <h1>
            Mental Health
          </h1>

          <p className="info-title">
            Your mental well-being matters.
          </p>

          <p className="info-text">
            Create your account and take the first step toward
            understanding your mental wellness.
          </p>

          <div className="feature-list">
            <div className="feature">
              <span>✓</span>
              <p>Private and secure</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Personalized experience</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Track your mental wellness</p>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="register-form-container">

          <div className="form-header">
            <h2>Create Account</h2>

            <p>
              Enter your details to get started
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <span>⚠</span>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span>✓</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="input-group-custom">
              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  👤
                </span>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
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
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="password-strength">

                  <div className="strength-bar">
                    <div
                      className="strength-progress"
                      style={{
                        width: passwordStrength.width,
                      }}
                    ></div>
                  </div>

                  <small>
                    Password strength:{" "}
                    <strong>
                      {passwordStrength.text}
                    </strong>
                  </small>

                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group-custom">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <span className="input-icon">
                  🔐
                </span>

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {formData.confirmPassword && (
                <small
                  className={
                    formData.password ===
                    formData.confirmPassword
                      ? "match-success"
                      : "match-error"
                  }
                >
                  {formData.password ===
                  formData.confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </small>
              )}
            </div>

            {/* Terms */}
            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the terms and privacy policy.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="login-link">
            Already have an account?{" "}
            <Link href="/login">
              Login
            </Link>
          </div>

        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .register-page {
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

        .register-card {
          width: 100%;
          max-width: 950px;
          min-height: 620px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 40% 60%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .register-info {
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
          background: rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin-bottom: 25px;
        }

        .register-info h1 {
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
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature p {
          margin: 0;
        }

        .register-form-container {
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

        .input-group-custom {
          margin-bottom: 18px;
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
          height: 48px;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0 75px 0 43px;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
          box-sizing: border-box;
        }

        .input-wrapper input:focus {
          border-color: #5b8def;
          box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.12);
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

        .password-strength {
          margin-top: 7px;
        }

        .strength-bar {
          width: 100%;
          height: 5px;
          background: #eee;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .strength-progress {
          height: 100%;
          background: #5b8def;
          transition: 0.3s;
        }

        .password-strength small {
          color: #777;
        }

        .match-success {
          color: #198754;
          display: block;
          margin-top: 6px;
        }

        .match-error {
          color: #dc3545;
          display: block;
          margin-top: 6px;
        }

        .terms {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin: 20px 0;
          font-size: 13px;
          color: #666;
        }

        .terms input {
          margin-top: 2px;
        }

        .register-btn {
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

        .register-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(91, 141, 239, 0.25);
        }

        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 15px;
          height: 15px;
          display: inline-block;
          border: 2px solid rgba(255, 255, 255, 0.4);
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

        .login-link {
          text-align: center;
          margin-top: 22px;
          color: #666;
          font-size: 14px;
        }

        .login-link a {
          color: #5b8def;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .register-card {
            grid-template-columns: 1fr;
          }

          .register-info {
            padding: 35px 30px;
          }

          .feature-list {
            display: none;
          }

          .register-form-container {
            padding: 35px 25px;
          }
        }
      `}</style>
    </div>
  );
}

export default Registration;