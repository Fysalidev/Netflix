import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

// ServerAuth : Récupère les données de la session et retourne les données de l'utilisateur

const severAuth = async (req: NextApiRequest) => {
  // Récupérer les données des la session via l'objet req: NextApiRequest
  const session = await getSession({ req });

  // Si l'utilisateur n'est pas connecté
  if (!session?.user?.email) {
    throw new Error("Not signed in.");
  }
  // Récupérer les données de l'utilisateur connecté en base
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Si l'utilisateur n'est pas trouvé en base
  if (!currentUser) {
    throw new Error("Not signed in.");
  }
  // Retourner les données de l'utilisateur
  return { currentUser };
};

export default severAuth;
