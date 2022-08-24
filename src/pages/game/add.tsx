import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

import { GetServerSideProps } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const AddGames: NextPage = () => {
  const { data } = useSession();

  const [bggId, setBggId] = useState("");
  const utils = trpc.useContext();

  const addGameMutation = trpc.useMutation("game.addWithBggId", {
    onError: () => {
      alert("Something went wrong!");
    },
    onSuccess: () => {
      utils.refetchQueries(["game.getAll"]);
      setBggId("");
      alert("The game was added!");
    },
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10 min-h-screen">
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
      {/* <div className="alert alert-success shadow-lg absolute bottom-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your game has been added!</span>
        </div>
      </div> */}
    </>
  );
};

export default AddGames;
