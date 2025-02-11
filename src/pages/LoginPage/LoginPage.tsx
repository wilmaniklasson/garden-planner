import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Tillstånd för att växla mellan login och registrering

  // Hantera gästinloggning
  const handleGuestLogin = () => {
    navigate("/home");
  };

  // Hantera inloggning med e-post och lösenord
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt");
  };

  // Hantera konto skapande
  const handleCreateAccount = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Account creation attempt");
  };

  // Byt mellan inloggning och konto skapande
  const toggleLoginCreate = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <h1>Garden Planner</h1>
      <img src="../assets/garden-planner-icon.svg" alt="Garden Planner Icon" />

      
      {isLogin ? (
        <>
          <h1 className="login-title">Logga in</h1>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">E-post</label>
              <input type="email" id="email" className="input-field" placeholder="Ange din e-post" required />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Lösenord</label>
              <input type="password" id="password" className="input-field" placeholder="Ange ditt lösenord" required />
            </div>

            <button type="submit" className="login-button">Logga in</button>
          </form>
          
          <div className="guest-login">
            <button onClick={handleGuestLogin} className="guest-button">
              Använd som gäst
            </button>
          </div>

          <div className="toggle-link">
            <span>Har du inte ett konto? <button onClick={toggleLoginCreate} className="toggle-button">Skapa konto</button></span>
          </div>
        </>
      ) : (
        <>
          <h1 className="login-title">Skapa konto</h1>
          
          <form className="login-form" onSubmit={handleCreateAccount}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">E-post</label>
              <input type="email" id="email" className="input-field" placeholder="Ange din e-post" required />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Lösenord</label>
              <input type="password" id="password" className="input-field" placeholder="Ange ditt lösenord" required />
            </div>

            <button type="submit" className="login-button">Skapa konto</button>
          </form>

          <div className="toggle-link">
            <span>Har du redan ett konto? <button onClick={toggleLoginCreate} className="toggle-button">Logga in</button></span>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
