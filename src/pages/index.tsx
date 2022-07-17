import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
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
      <ListGames />
    </>
  );
};

export default Home;
