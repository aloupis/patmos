import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// const AUTH_SERVICE_BASE_URL = process.env.REACT_APP_GATEWAY;
const AUTH_SERVICE_BASE_URL = 'https://patmos-gateway.herokuapp.com';

export default function useFindUser() {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const setUserContext = async () =>
    axios
      .get(`${AUTH_SERVICE_BASE_URL}/user`)
      .then((res) => {
        console.log({ res });
        if (res.data.currentUser) {
          setUser(res.data.currentUser);
        }
        history.push('/');
      })
      .catch((err) => console.log({ err }));

  useEffect(() => {
    async function findUser() {
      await axios
        .get(`${AUTH_SERVICE_BASE_URL}/user`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log({ res });
          setUser(res.data.currentUser);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
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
