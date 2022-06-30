import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../lib/magicAdmin";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const didToken = req.headers.authorization?.substring(7);
    if (didToken) magicAdmin.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ err: err.message });
    } else {
      console.log("Unexpected Error", err);
    }
  }
};

export default login;
