import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { useMutation } from "react-query";
import { trpc } from "../utils/trpc";

const HomeContents = () => {
  const { data } = useSession();

  if (!data) {
    return <button onClick={() => signIn()}>Logga in</button>;
  }

  return (
    <>
      <div>Hej {data.user?.name}!</div>
      <button onClick={() => signOut()}>Logga ut</button>
    </>
  );
};

const AddGames = () => {
  const { data } = useSession();

  const [bggId, setBggId] = useState("");

  const addGameMutation = trpc.useMutation(["game.addWithBggId"]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10">
        <input
          type="text"
          name="bggId"
          id="bggIdInput"
          value={bggId}
          placeholder="Enter bgg id"
          onChange={(e) => {
            setBggId(e.target.value);
            console.log(bggId);
          }}
          className="border text-black w-11/12 p-3 rounded md:w-2/3 lg:w-1/2"
        />
        <div className="h-5" />
        <button
          className="bg-neutral-700 px-4 py-2 rounded"
          onClick={() => {
            addGameMutation.mutate({ bggId: parseInt(bggId) });
          }}
        >
          Create Game
        </button>
      </div>
    </>
  );
};

const ListGames = () => {
  const { data } = trpc.useQuery(["game.getAll"]);

  if (!data) {
    return <div>No games found!</div>;
  }

  return (
    <div>
      {data.map((g, i) => {
        return <div key={i}>{g.name}</div>;
      })}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DrawIT Games</title>
        <meta name="description" content="DrawIT Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContents />
      <AddGames />
      <ListGames />
    </>
  );
};

export default Home;
