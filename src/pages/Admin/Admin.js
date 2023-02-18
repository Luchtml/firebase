import React from 'react';
import './admin.css';
import { auth, db } from '../../firebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
const Admin = () => {
  const [tarefaInput, setTarefaInput] = React.useState('');
  const [user, setUser] = React.useState({});
  const [tarefas, setTarefas] = React.useState([]);

  React.useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem('@detailUser');
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, 'tarefas');
        const q = query(
          tarefaRef,
          orderBy('created', 'desc'),
          where('userUid', '==', data?.uid),
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          setTarefas(lista);
        });
      }
    }

    loadTarefas();
  }, []);

  async function handleTarefa(e) {
    e.preventDefault();

    if (tarefaInput === '') {
      alert('Digite sua tarefa.');
      return;
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        console.log('tarefa registrada');
        setTarefaInput('');
      })
      .catch((error) => {
        console.log('erro ao cadastrar' + error);
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, 'tarefas', id);
    await deleteDoc(docRef);
  }

  function editTarefa(item) {
    console.log(item);
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

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>
          <div>
            <button
              onClick={() => {
                editTarefa(item);
              }}
            >
              Editar
            </button>
            <button
              className="btn-concluir"
              onClick={() => deleteTarefa(item.id)}
            >
              Concluida
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default Admin;
