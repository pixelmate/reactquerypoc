/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchUsernames />
    </QueryClientProvider>
  );
}

function FetchUsernames() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("https://fakestoreapi.com/users").then((res) => res.data)
  );
  console.log(data, "res");
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>All Username List</h2>
      {data.map((user) => (
        <div>{user.username}</div>
      ))}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
