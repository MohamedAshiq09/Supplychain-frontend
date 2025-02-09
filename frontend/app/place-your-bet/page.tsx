import Header from "../components/Header";
import PlaceYourBetForm from "../components/PlaceYourBetForm";

export default function PlaceYourBet() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex items-center justify-center p-6">
        <PlaceYourBetForm />
      </main>
    </>
  );
}
