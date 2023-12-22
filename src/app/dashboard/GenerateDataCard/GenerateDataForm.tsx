"use client";

const GenerateDataForm = () => {
  return (
    <form className="flex flex-col gap-5 mt-5">
      <input
        type="text"
        placeholder="Content title "
        className="input input-bordered"
      />

      <div className="card-actions">
        <button className="btn btn-primary">Generate</button>
      </div>
    </form>
  );
};

export default GenerateDataForm;
