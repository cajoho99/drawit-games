import { Game } from "@prisma/client";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
  const utils = trpc.useContext();

  const addGameMutation = trpc.useMutation("game.addWithBggId", {
    onSuccess: () => {
      utils.refetchQueries(["game.getAll"]);
    },
  });

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
          className="input input-bordered w-full max-w-xs"
        />
        <div className="h-5" />
        <button
          className="btn btn-primary"
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

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  });

  return (
    <div className="flex flex-col w-auto items-center">
      <div className="card w-5/6 bg-base-100 shadow-xl">
        <div className="flex flex-col h-auto w-auto relative">
          <Image
            src={game.imageUrl!}
            layout="responsive"
            objectFit="contain"
            onLoadingComplete={(target) => {
              setImageSize({
                width: target.naturalWidth,
                height: target.naturalHeight,
              });
            }}
            width={imageSize.width}
            height={imageSize.height}
            alt={"cover image of " + game.name}
          />
        </div>

        <div className="card-body">
          <h2 className="card-title">{game.name}</h2>
          <div className="card-actions justify-start">
            <div className="badge badge-outline p-2">{game.yearPublished}</div>
            <div className="badge badge-outline p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {game.minPlayers}-{game.maxPlayers}
            </div>
            <div className="badge badge-outline p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {game.minPlaytime}-{game.maxPlaytime}
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 w-96" />
    </div>
  );
};

const ListGames = () => {
  const { data } = trpc.useQuery(["game.getAll"]);

  if (!data) {
    return <div>No games found!</div>;
  }

  return (
    <div className="columns-4">
      {data.map((g, i) => {
        console.log("game", g);
        return <GameCard key={g.id} game={g} />;
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
