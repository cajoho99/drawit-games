import { SubmitHandler, useForm } from "react-hook-form";
import { AddGameType, addGameValidator } from "../../shared/add-game-validator";
import { trpc } from "../../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";

const AddGame: React.FC<{}> = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddGameType>({
    resolver: zodResolver(addGameValidator),
  });

  const addGame = trpc.useMutation(["game.add"]);

  const onSubmit: SubmitHandler<AddGameType> = async (data) => {
    addGame.mutate(data);
  };

  // https://www.austinshelby.com/blog/build-a-react-form-with-react-hook-form-and-zod
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">Lägg till spel</h1>
      <div className="drop-shadow-md rounded w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="block">
            <span className="block">Namn</span>
            <input
              {...register("name")}
              type="text"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}

          <label className="block">
            <span className="block">Lanseringsår</span>
            <input
              {...register("yearPublished")}
              type="text"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.yearPublished && (
            <p className="text-sm text-red-600 mt-1">
              {errors.yearPublished.message}
            </p>
          )}

          <label className="block">
            <span className="block">Lägsta antal spelare</span>
            <input
              {...register("minPlayers", {
                valueAsNumber: true,
              })}
              type="number"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.minPlayers && (
            <p className="text-sm text-red-600 mt-1">
              {errors.minPlayers.message}
            </p>
          )}

          <label className="block">
            <span className="block">Högsta antal spelare</span>
            <input
              {...register("maxPlayers", {
                valueAsNumber: true,
              })}
              type="number"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.maxPlayers && (
            <p className="text-sm text-red-600 mt-1">
              {errors.maxPlayers.message}
            </p>
          )}

          <label className="block">
            <span className="block">Minsta speltid</span>
            <input
              {...register("minPlaytime", {
                valueAsNumber: true,
              })}
              type="number"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.minPlaytime && (
            <p className="text-sm text-red-600 mt-1">
              {errors.minPlaytime.message}
            </p>
          )}

          <label className="block">
            <span className="block">Högsta speltid</span>
            <input
              {...register("maxPlaytime", {
                valueAsNumber: true,
              })}
              type="number"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.maxPlaytime && (
            <p className="text-sm text-red-600 mt-1">
              {errors.maxPlaytime.message}
            </p>
          )}

          <label className="block">
            <span className="block">Beskrivning</span>
            <textarea
              {...register("description")}
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.description && (
            <p className="text-sm text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}

          <label className="block">
            <span className="block">Bildurl</span>
            <input
              {...register("imageUrl")}
              type="text"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              disabled={isSubmitting}
            />
          </label>

          {errors.imageUrl && (
            <p className="text-sm text-red-600 mt-1">
              {errors.imageUrl.message}
            </p>
          )}

          <pre>{JSON.stringify(watch(), null, 2)}</pre>
          <button
            type="submit"
            className="w-full px-8 py-4 flex items-center justify-center uppercase text-white font-semibold bg-blue-600 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
            disabled={isSubmitting}
          >
            Lägg till spel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
