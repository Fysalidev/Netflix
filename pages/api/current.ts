import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

// Api qui retourne les données de l'utilisateur connecté à l'aide du serveur d'authentification

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // On vérifie la méthode de la requête pour n'accepter que les requêtes GET
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // On récupère les informations de l'utilisateur via le serveur d'authentification
    const { currentUser }: any = await serverAuth(req);
    return res.status(200).json(currentUser);

  } catch (error) {
    // Log any errors to the console for development
    console.error(error);
    res.status(401).end();
  }
}
