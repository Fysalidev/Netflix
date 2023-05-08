import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

// Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

// Home page UI
export default function Home() {
  const {data: user} = useCurrentUser();
  console.log(user);
 
  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix</h1>
      <p className="text-white">Logged in as : {user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button>
    </>
  );
}
