import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  function handleRedirect() {
    if (user) router.push("/dashboard");
    else router.push("/home");
  }

  return (
    <div className="px-10 flex justify-between border border-dark-300 py-0.5 md:px-4 fixed top-2 left-0 right-0 z-50 md:max-w-7xl mx-auto rounded-lg w-full backdrop-blur-md bg-dark-100/80 mb-6">
      <div className="text-[20px] flex flex-col justify-center">
        <div
          className="font-semibold bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent cursor-pointer"
          onClick={handleRedirect}
        >
          Swiftpay
        </div>
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
