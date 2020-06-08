import React from "react";
import { useQuery } from "@apollo/react-hooks";

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id },
    fetchPolicy: 'no-cache'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error), null, 2}</p>;
  return children({ data, loading, error });
};

export default Query;
