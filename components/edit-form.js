import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";

const EditForm = ({ defaultValues, id }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      catatan: defaultValues.catatan,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch(`/api/peserta/${id}/update`, {
        method: "PUT",
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

  return (
    <>
      <h1>Ubah Data Peserta </h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Nama</label>
          <input
            type="text"
            placeholder="amar"
            {...register("nama", { required: "nama wajib di isi" })}
          />
          {errors.nama && (
            <span role="alert" className="error">
              {errors.nama.message}
            </span>
          )}
        </div>

        <div>
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
        </div>

        <div>
          <label>Keterangan</label>
          <input type="text" placeholder="Lunas" {...register("keterangan")} />
          {errors.keterangan && (
            <span role="alert" className="error">
              {errors.keterangan.message}
            </span>
          )}
        </div>

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
            Ubah
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
    </>
  );
};

export default EditForm;
