import React from "react";
interface Iprops {
  id: string;
  label: string;
  queries: object;
  handleQuery: Function;
}

const SingleQuery: React.FC<Iprops> = ({ id, label, queries, handleQuery }) => {
  return (
    <>
      <div className="mb-2">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input type="text" className="form-control" id={id} onChange={(e) => {
          handleQuery(id, e.target.value);
        }}/>
      </div>
    </>
  );
};

export default SingleQuery;
