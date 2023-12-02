import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../connections/firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Support Stage</span>
        <span className="title">Inicio de sesion</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <button>Iniciar sesion</button>
          {err && <span>Algo salió mal</span>}
        </form>
        <p>Seguro que tienes una cuenta? <Link to="/register">Registro</Link></p>
      </div>
    </div>
  );
};

export default Login;
