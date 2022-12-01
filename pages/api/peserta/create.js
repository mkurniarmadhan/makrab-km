import { query as q } from "faunadb";
import { serverClient } from "../../../utils/fauna-auth";

export default async (req, res) => {
  const { nama, lembaga, keterangan, catatan } = req.body;

  try {
    await serverClient.query(
      q.Create(q.Collection("peserta"), {
        data: {
          nama,
          lembaga,
          keterangan,
          catatan,
        },
      })
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
