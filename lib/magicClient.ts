import { Magic } from "magic-sdk";

const createMagic = () => {
  if (!process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY) {
    throw new Error("Please add Magic publishable API Key in .env.local");
  }

  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
      locale: "ko",
    })
  );
};

const magicClient = createMagic();

export { magicClient };
