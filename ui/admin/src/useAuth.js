import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const AUTH_SERVICE_BASE_URL = '/gateway';

export default function useAuth() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  // set user
  const setUserContext = async () =>
    axios
      .get(`${AUTH_SERVICE_BASE_URL}/user`)
      .then((res) => {
        setUser(res.data.currentUser);
        history.push('/');
      })
      .catch((err) => {
        setError(err.response.data);
      });

  // login user
  const loginUser = async (data) => {
    const { email, password } = data;

    return axios
      .post(
        `${AUTH_SERVICE_BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(async () => setUserContext())
      .catch((err) => {
        // setError(err.response.data);
      });
  };

  // logout user
  const logoutUser = async () =>
    axios
      .post(`${AUTH_SERVICE_BASE_URL}/logout`, null, {
        withCredentials: true,
        credentials: 'include',
      })
      .then(() => setUserContext())
      .catch((err) => {
        // setError(err.response.data);
      });

  return {
    loginUser,
    logoutUser,
    error,
  };
}
