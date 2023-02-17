import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (email && password)
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true });
        })
        .catch(() => {
          console.log('erro ao cadastrar');
        });
    else alert('preencha os campos');
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <p>Vamos criar sua conta!</p>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <Link className="links" to="/">
        Já possui uma conta? <strong>Faça login</strong>
      </Link>
    </div>
  );
};

export default Register;
