import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "./prismadb";

// Le serveur d'Authentification vérifie la requête pour savoir si un utilistateur est connecté.
// Si c'est le cas, il renvoie les données de l'utilisateur à partir de la base de données.
// Si ce n'est pas le cas, il renvoie une erreur.

// On crée une fonction qui prend en paramètre la requête NextApiRequest et qui renvoie l'utilisateur
const severAuth = async (req: NextApiRequest) => {
  // Récupère la session de l'utilisateur via l'obet req : NextApiRequest
  const session = await getSession({ req });

  // Si l'utilisateur n'est pas connecté, on renvoie une erreur
  if (!session?.user?.email) {
    throw new Error("Not signed in.");
  }
  // On récupère l'utilisateur dans la base de données car le données de l'utilisateur ne sont pas stockées dans la requête
  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });
  // Si l'utilisateur n'est pas trouvé, on renvoie une erreur
  if (!currentUser) {
    throw new Error("Not signed in.");
  }
  // On renvoie l'utilisateur
  return currentUser;
};

export default severAuth;
