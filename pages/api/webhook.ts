import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body);
    // const handle = req.body.contents.handle;
    // await res.unstable_revalidate(`/${handle}`);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
