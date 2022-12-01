import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import Select from "react-select";

const Create = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(" ");
  const [selectedKeterangan, setSelectedKeterangan] = useState("LUNAS");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch("/api/peserta/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  const options = [
    { value: "BEM", label: "BEM" },
    { value: "DPM", label: "DPM" },
    { value: "Himatekkom", label: "Himatekkom" },
    { value: "Himaraksi", label: "Himaraksi" },
    { value: "Himaforka", label: "Himaforka" },
    { value: "Ukm Wamika", label: "Ukm Wamika" },
    { value: "TK S1", label: "TK S1" },
    { value: "Manajemen ritel", label: "Manajemen ritel" },
    { value: "Bisdig", label: "Bisdig" },
    { value: "UKM IKA", label: "UKM IKA" },
    { value: "Hima SIA", label: "Hima SIA" },
    { value: "Hima SI", label: "Hima SI" },
    { value: "KMK", label: "KMK" },
  ];
  const keterangan = [
    { value: "LUNAS", label: "LUNAS" },
    { value: "BELUM LUNAS", label: "BELUM LUNAS" },
  ];

  return (
    <Layout>
      <h1>Tambah Peserta</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Nama</label>
          <input
            type="text"
            {...register("nama", { required: "nama wajib di isi" })}
          />
          {errors.nama && (
            <span role="alert" className="error">
              {errors.nama.message}
            </span>
          )}
        </div>

        {/* <div>
          <label>Lembaga</label>
          <input
            type="text"
            placeholder="BEM"
            {...register("lembaga", { required: "lembaga wajib di isi" })}
          />
          {errors.lembaga && (
            <span role="alert" className="error">
              {errors.lembaga.message}
            </span>
          )}
        </div> */}
        <input hidden {...register("lembaga")} />
        <input hidden {...register("keterangan")} />

        <div>
          <label>Lembaga</label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            {...setValue("lembaga", selectedOption.value)}
          />
          {errors.lembaga && (
            <span role="alert" className="error">
              {errors.lembaga.message}
            </span>
          )}
        </div>

        <div>
          <label>Keterangan</label>
          <Select
            defaultValue={selectedKeterangan}
            onChange={setSelectedKeterangan}
            options={options}
            {...setValue("keterangan", selectedKeterangan.value)}
          />
          {errors.keterangan && (
            <span role="alert" className="error">
              {errors.keterangan.message}
            </span>
          )}
        </div>

        {/* <div>
          <label>Keterangan</label>
          <input type="text" placeholder="Lunas" {...register("keterangan")} />
          {errors.keterangan && (
            <span role="alert" className="error">
              {errors.keterangan.message}
            </span>
          )}
        </div> */}

        <div>
          <label>Catatan</label>
          <input type="text" placeholder="catatan" {...register("catatan")} />
          {errors.catatan && (
            <span role="alert" className="error">
              {errors.catatan.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Tambah
          </button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}

      <style jsx>{`
        form {
          background-color: #eee;
          border-radius: 4px;
          padding: 2rem;
        }
        label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        input {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.75rem;
          margin: 0.25rem 0 1rem;
        }
        .submit {
          margin-top: 1rem;
          text-align: right;
        }
        .submitButton {
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .error,
        .errorMessage {
          color: #d32f2f;
        }
        .error {
          display: block;
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Create;
