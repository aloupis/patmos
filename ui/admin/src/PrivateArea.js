// import React from "react";
// import Cookies from "js-cookie";
// import { navigate } from "@reach/router";
// import { gql } from "apollo-boost";
// import { useQuery } from "react-apollo";
// import AuthenticatedApp from "./AuthenticatedApp";

// const HELLO_QUERY = gql`
//   query HELLO_QUERY {
//     hello
//   }
// `;

// const PrivateArea = () => {
//   if (!Cookies.get("isAuthenticated")) {
//     navigate("/");
//   }
//   const { data, loading, error } = useQuery(HELLO_QUERY);

//   if (loading) {
//     return <div>loading...</div>;
//   }
//   if (error) {
//     console.log({ error });
//     if (error) {
//       navigate("/");
//       return <p></p>;
//     }
//   }
//   return <AuthenticatedApp></AuthenticatedApp>;
// };

// export default PrivateArea;
