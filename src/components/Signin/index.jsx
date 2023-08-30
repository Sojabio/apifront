import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


function Signin() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const regex = new RegExp("[a-zA-Z0-9.+-]+@[a-zA-Z]+.[a-zA-Z]{2,3}");


  const handleLogin = async (event) => {
    event.preventDefault();

    // Effectuer la requête fetch vers le backend Strapi pour l'authentification
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);

        setUser({
          isLoggedIn: true,
          token: response.headers.get("Authorization"),
          id: data.user.id
        });
        navigate('/registersuccess')
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };


  const resetpassword = () => {
    if (regex.test(email)) {
      const data = {
        user: {
          email: email,
        },
      };
      fetch("http://localhost:3000/users/password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => navigate("/"));
    } else {
      setError(
        "Merci d'entrer une adresse mail valide avant de changer votre mdp."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Se connecter</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <button  onClick={() => resetpassword()}>Mot de passe oublié ? </button>
    </div>
  );
}

export default Signin;
