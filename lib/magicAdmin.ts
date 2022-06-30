import { Magic } from "@magic-sdk/admin";

const magicAdmin = new Magic(process.env.NEXT_SECRET_KEY);

export { magicAdmin };
