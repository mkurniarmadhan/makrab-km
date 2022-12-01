import Link from "next/link";

const DataRow = ({ id, nama, lembaga, keterangan, catatan, loading }) => (
  <div className="dataRow">
    <p className={loading ? "loading" : ""}>
      <Link href={`/makrab/${id}`}>{nama}</Link>
    </p>
    <p className={`lembaga ${loading ? "loading" : ""}`}>{lembaga}</p>
    <p className={`keterangan num ${loading ? "loading" : ""}`}>{keterangan}</p>
    <p className={`catatan num ${loading ? "loading" : ""}`}>{catatan}</p>

    <style jsx>{`
      .dataRow {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0 32px;
        border-top: 1px solid #eaeaea;
      }
      .creditCard {
        margin-left: auto;
      }
      @keyframes Loading {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .loading {
        animation: Loading 2s ease infinite;
        background: linear-gradient(270deg, #d1d1d1, #eaeaea);
        background-size: 200% 200%;
        height: 16px;
        width: 80%;
      }
      .num {
        font-family: Roboto, "Open Sans";
      }
    `}</style>
  </div>
);

export default DataRow;
