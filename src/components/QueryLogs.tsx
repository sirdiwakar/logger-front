import React from "react";
import { useState } from "react";
import SingleQuery from "./SingleQuery";
import Double from "./Double";
import LogTable from "./LogTable";

const QueryLogs: React.FC = () => {
  const BASE_URL = process.env.API_URL || "http://localhost:3000";
  const logsPerPage = 10; // Change this value according to your requirements

  const [queries, setQueries] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [logsData, setLogsData] = useState({
    data: [],
    sortBy: 'default',
    sortOrder: 'asc',
    currentPage: 1,
    logsPerPage: logsPerPage,
    totalCount: 0
  }); // Change this value according to your requirements

  const objectToQueryString = (obj: Record<string, any>): string => {
    const keyValuePairs: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(val => {
            keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
          });
        } else {
          keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
    }
    return keyValuePairs.join('&');
  }

  const handleQuery = (queryName: string, queryValue: string) => {
    setQueries((prevQueries) => {
      return { ...prevQueries, [queryName]: queryValue };
    });
  }

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(logsData.totalCount / logsPerPage)) {
      setCurrentPageNumber(pageNumber);
      fetchLogsData(pageNumber); // Call the function to fetch logs based on page number
    }
  };

  const fetchLogsData = (pageNumber: number) => {
    console.log("fetching logs data")
    const queryString = objectToQueryString({
      ...queries,
      page: pageNumber,
      limit: logsPerPage
    });

    fetch(`${BASE_URL}/logs?${queryString}`, {
      method: 'GET'
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setLogsData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle error state or display error message to the user
    });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchLogsData(1)
  }

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
          <form style={{ padding: "5px" }} onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
            <SingleQuery label="Level" id="level" queries={queries} handleQuery={handleQuery}/>
            <SingleQuery label="Message" id="message" queries={queries} handleQuery={handleQuery}/>
            <SingleQuery label="ResourceId" id="resourceId" queries={queries} handleQuery={handleQuery}/>
            <SingleQuery label="TraceId" id="traceId" queries={queries}handleQuery={handleQuery} />
            <SingleQuery label="SpanId" id="spanId" queries={queries} handleQuery={handleQuery}/>
            <SingleQuery label="Commit" id="commit" queries={queries} handleQuery={handleQuery}/>
            <SingleQuery
              label="Metadata-parentResourceId"
              id="parentResourceId"
              queries={queries}
              handleQuery={handleQuery}
            />
            <Double
              queries={queries} handleQuery={handleQuery}
              lowerLimit={new Date("0000-01-01T00:00:00")}
              upperLimit={new Date("0000-01-01T00:00:00")}
            />
            <button type="submit" className="btn btn-primary" >
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
          <div>
            <h1>Log Table</h1>
            <LogTable logsResponse={logsData} onPaginate={paginate}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryLogs;
