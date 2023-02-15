import React from 'react';
import { db, auth } from './firebaseConnection';
import './app.css';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

import { createUserWithEmailAndPassword } from 'firebase/auth';

const App = () => {
  const [titulo, setTitulo] = React.useState('');
  const [autor, setAutor] = React.useState('');
  const [idPost, setIdPost] = React.useState('');
  const [posts, setPosts] = React.useState([]);

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  React.useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
      });
    }
    loadPosts();
  }, []);

  async function handleAdd() {
    // await setDoc(doc(db, 'posts', '12345'), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log('dados registrados')
    // }).catch((error) => {
    //   console.log('error' + error)
    // })

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log('sucesso');
        setAutor('');
        setTitulo('');
      })
      .catch((error) => {
        console.log(error + 'error');
      });
  }

  async function buscarPost() {
    // const postRef = doc(db, 'posts', '1234');

    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch(() => {
    //     console.log('erro ao buscar');
    //   });

    const postsRef = collection(db, 'posts');

    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((error) => {
        console.log('errror' + error + 'ao buscar');
      });
  }

  async function editarPost() {
    const docRef = doc(db, 'posts', idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        setIdPost('');
        setTitulo('');
        setAutor('');
      })
      .catch((error) => {
        console.log('erro ao atualziar');
      });
  }

  async function excluirPost(id) {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef)
      .then(() => {
        console.log('deletado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log('cadastrado com sucesso');
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('senha fraca');
        } else if (error.code === 'auth/email-already-in-use') {
          alert('Email já existe');
        }
      });
  }

  return (
    <div>
      <h1>React Js + Firebase 😃 </h1>

      <div className="container">
        <h2>Usuários: </h2>
        <label>Email:</label>
        <input
          value={email}
          placeholder="Email para login"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <label>Senha:</label>
        <input
          value={senha}
          placeholder="Senha para login"
          onChange={({ target }) => {
            setSenha(target.value);
          }}
        />
        <button onClick={novoUsuario}>Cadastrar</button>
      </div>

      <br />
      <br />
      <hr />

      <div className="container">
        <h2>Posts:</h2>
        <label>ID do Post:</label>
        <input
          type="text"
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={({ target }) => {
            setIdPost(target.value);
          }}
        />
        <br />

        <label>Titulo:</label>
        <textarea
          placeholder="Digite o titulo"
          type="text"
          value={titulo}
          onChange={({ target }) => setTitulo(target.value)}
        ></textarea>
        <br />

        <label>Autor:</label>
        <input
          placeholder="Autor do post"
          type="text"
          value={autor}
          onChange={({ target }) => setAutor(target.value)}
        ></input>

        <button onClick={handleAdd}>Cadastrar</button>
        <br />
        <button onClick={buscarPost}>Buscar Post</button>
        <br />
        <button onClick={editarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span>
                <br />
                <span>Autor: {post.autor}</span>
                <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
