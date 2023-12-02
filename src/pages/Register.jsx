import React, { useState } from "react";
import Add from "../assets/img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../connections/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Crear usuario
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Crea un nombre de imagen único
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Actualización del perfil
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //crear usuario firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            // console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Support Stage</span>
        <span className="title">Registro</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Nombre de usuario" />
          <input required type="email" placeholder="Correo" />
          <input required type="password" placeholder="Contraseña" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Agregar imagen de perfil</span>
          </label>
          <button disabled={loading}>Registrar</button>
          {loading && "Subiendo y comprimiendo la imagen por favor espera..."}
          {err && <span>Algo salió mal</span>}
        </form>
        <p>
        ¿Tienes una cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
