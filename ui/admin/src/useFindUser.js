import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AUTH_SERVICE_BASE_URL = process.env.REACT_APP_GATEWAY;

export default function useFindUser() {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const setUserContext = async () =>
    axios
      .get(`${AUTH_SERVICE_BASE_URL}/user`)
      .then((res) => {
        if (res.data.currentUser) {
          setUser(res.data.currentUser);
        }
        history.push('/');
      })
      .catch((err) => {});

  useEffect(() => {
    async function findUser() {
      await axios
        .get(`${AUTH_SERVICE_BASE_URL}/user`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.currentUser);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    findUser();
  }, []);
  return {
    user,
    isLoading,
    setUserContext,
  };
}
