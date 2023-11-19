import React from "react";
import SingleQuery from "./SingleQuery";
import Double from "./Double";
const QueryLogs: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: "5px",
            border: "10px solid black",
            maxHeight: "1000px",
            display: "inline-block",
            width: "600px",
          }}
        >
          <form style={{ padding: "5px" }}>
            <SingleQuery label="Level" id="inputLevel" />
            <SingleQuery label="Message" id="inputMessage" />
            <SingleQuery label="ResourceId" id="inputResourceId" />
            <SingleQuery label="TraceId" id="inputTraceId" />
            <SingleQuery label="SpanId" id="inputSpanId" />
            <SingleQuery label="Commit" id="inputCommit" />
            <SingleQuery label="Message" id="inputMessage" />
            <SingleQuery
              label="Metadata-parentResourceId"
              id="inputMetadata-parentResourceId"
            />
            <Double
              lowerLimit={new Date("0000-01-01T00:00:00")}
              upperLimit={new Date("0000-01-01T00:00:00")}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div
          style={{
            margin: "5px",
            border: "10px solid black",
            maxHeight: "1000px",
            minHeight: "1000px",
            display: "inline-block",
            width: "1000px",
          }}
        >
          <p style={{ padding: "20px" }}>Your Results will be shown here</p>
        </div>
      </div>
    </>
  );
};

export default QueryLogs;
