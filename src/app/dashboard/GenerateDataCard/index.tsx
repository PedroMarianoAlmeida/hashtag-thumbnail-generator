import GenerateDataForm from "./GenerateDataForm";

const GenerateData = () => {
  return (
    <div className="card bg-base-200 shadow-xl w-full max-w-xl">
      <div className="card-body">
        <h2 className="card-title">New Hashtags and Thumbnail!</h2>
        <GenerateDataForm />
      </div>
    </div>
  );
};

export default GenerateData;
