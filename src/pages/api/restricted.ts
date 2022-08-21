// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";

const fetchGameFromBGG = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
    return;
  }

  res.send({
    content:
      "This is protected content. You can access this content because you are signed in.",
  });
};

export default fetchGameFromBGG;
