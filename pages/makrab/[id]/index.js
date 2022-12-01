import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../../../components/layout";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Customer = () => {
  const router = useRouter();
  const { id } = router.query;

  const onClick = async () => {
    try {
      const res = await fetch(`/api/peserta/${id}/delete`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error } = useSWR(`/api/peserta/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Detail Peserta</h1>
      <hr />
      {data ? (
        <div>
          <p className="name">
            {data.firstName} {data.nama}
          </p>
          <p className="num">{data.lembaga}</p>
          <p className="num">{data.keterangan}</p>
          <p className="num">{data.catatan}</p>

          <div className="buttons">
            <Link href={`/makrab/${id}/update`} legacyBehavior>
              <a className="editButton">Ubah</a>
            </Link>
            <button onClick={onClick} className="deleteButton">
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}

      <style jsx>{`
        .name {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .buttons {
          text-align: right;
        }
        .editButton {
          display: inline-block;
          border: 1px solid #0070f3;
          border-radius: 3px;
          padding: 0.25rem 1rem;
          margin-right: 0.25rem;
        }
        .editButton:hover {
          text-decoration: none;
        }
        .deleteButton {
          background-color: inherit;
          border: 1px solid #d32f2f;
          border-radius: 3px;
          padding: 0.25rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          color: #d32f2f;
        }
        .num {
          font-family: Roboto, "Open Sans";
        }
      `}</style>
    </Layout>
  );
};

export default Customer;
