import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');
    navigate('/')
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
}

export default LogoutButton;
