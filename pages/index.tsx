import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

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
  return (
    <>
      <Navbar />
    </>
  );
}
