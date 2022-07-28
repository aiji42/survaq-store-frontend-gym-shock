import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const handle: string = req.body.handle;
    await res.revalidate(`/${handle}`);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
