import { Game } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  });

  return (
    <div className="flex flex-col w-auto items-center">
      <div className="card w-5/6 bg-base-100 shadow-xl">
        <div className="flex flex-col h-auto w-auto relative">
          {game.imageUrl ? (
            <Image
              src={game.imageUrl}
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
          ) : (
            <div>Image loading</div>
          )}
        </div>

        <div className="card-body mb-14">
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
    </div>
  );
};

const ListGames = () => {
  const { data } = trpc.useQuery(["game.getAll"]);

  if (!data) {
    return <div>No games found!</div>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
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
      <div className="h-16" />
      <ListGames />
    </>
  );
};

export default Home;
