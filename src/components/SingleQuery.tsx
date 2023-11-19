import React from "react";
interface Iprops {
  id: string;
  label: string;
}
const SingleQuery: React.FC<Iprops> = ({ id, label }) => {
  return (
    <>
      <div className="mb-2">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input type="text" className="form-control" id={id} />
      </div>
    </>
  );
};

export default SingleQuery;
