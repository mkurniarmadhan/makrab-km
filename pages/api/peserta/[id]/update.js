import { query as q } from "faunadb";
import { serverClient } from "../../../../utils/fauna-auth";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const { nama, lembaga, catatan, keterangan } = req.body;

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection("peserta"), id), {
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
