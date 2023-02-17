import React from 'react';
import './admin.css';
import { auth } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
const Admin = () => {
  const [tarefaInput, setTarefaInput] = React.useState('');

  function handleTarefa(e) {
    e.preventDefault();

    alert('clicou');
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="admin-container">
      <h1>Minhas tarefas.</h1>

      <form className="form" onSubmit={handleTarefa}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={({ target }) => {
            setTarefaInput(target.value);
          }}
        />

        <button className="btn-register" type="submit">
          Registrar tarefa
        </button>
      </form>

      <article className="list">
        <p>tarefa 1</p>
        <div>
          <button>Editar</button>
          <button className="btn-concluir">Concluida</button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default Admin;
