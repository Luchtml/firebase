import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Home = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email && password)
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true });
        })
        .catch(() => {
          console.log('erro no login');
        });
    else alert('preencha os campos');
  }

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <p>Gerencia sua agenda de forma fácil.</p>

      <form className="form" onSubmit={handleLogin}>
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

        <button type="submit">Acessar</button>
      </form>

      <Link className="links" to="/register">
        Não possui uma conta? <strong>cadastre-se</strong>
      </Link>
    </div>
  );
};

export default Home;
