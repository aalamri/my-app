import React from "react";
import { useQuery } from "@apollo/react-hooks";

const Query = ({ children, query, id, variables }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id, ...variables },
    fetchPolicy: 'no-cache'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error), null, 2}</p>;
  return children({ data, loading, error });
};

export default Query;
