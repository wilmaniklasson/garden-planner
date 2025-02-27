import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./LoginPage.css";
import icon from "../../assets/garden-planner-icon.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  // State to track login mode (login vs. sign-up)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);


  // Handle user login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);  // Using imported auth instance
      console.log("Login successful");
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Login failed: " + error.message);
      } else {
        setError("Login failed: Unknown error");
      }
    }
  };

  // Handle account creation
  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);  // Using imported auth instance
      console.log("Account created");
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Account creation failed: " + error.message);
      } else {
        setError("Account creation failed: Unknown error");
      }
    }
  };

  // Toggle between login and account creation
  const toggleLoginCreate = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Garden Planner</h1>
        <img src={icon} alt="Garden Planner Icon" />
      </div>
      {isLogin ? (
        <>
          <h1 className="login-title">Log in</h1>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">Log in</button>
          </form>

          
      

          <div className="toggle-link">
            <span>Don't have an account? <button onClick={toggleLoginCreate} className="toggle-button">Create one</button></span>
          </div>
        </>
      ) : (
        <>
          <h1 className="login-title">Create Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleCreateAccount}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">Create Account</button>
          </form>

          <div className="toggle-link">
            <span>Already have an account? <button onClick={toggleLoginCreate} className="toggle-button">Log in</button></span>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
