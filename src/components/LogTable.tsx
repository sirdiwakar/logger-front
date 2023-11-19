import React, { useState } from 'react';

interface Log {
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    parentResourceId: string;
  };
}

interface LogTableProps {
  logsResponse: {
    data: Log[];
    sortBy: string;
    sortOrder: string;
    currentPage: number;
    logsPerPage: number;
    totalCount: number;
  };
  onPaginate: (pageNumber: number) => void;
}

const LogTable: React.FC<LogTableProps> = ({ logsResponse, onPaginate }) => {
  const { data: logs, currentPage, logsPerPage, totalCount } = logsResponse;

  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const indexOfLastLog = currentPageNumber * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(totalCount / logsPerPage);

  const handlePagination = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPaginate(pageNumber); // Invoke the parent's pagination function
    }
  };

  const paginate = (pageNumber: number) => {
    console.log(pageNumber)
    if (pageNumber > 0 && pageNumber <= Math.ceil(logsResponse.totalCount / logsPerPage)) {
      setCurrentPageNumber(pageNumber);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Level</th>
            <th>Message</th>
            <th>Resource ID</th>
            <th>Timestamp</th>
            <th>Trace ID</th>
            <th>Span ID</th>
            <th>Commit</th>
            <th>Parent Resource ID</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.level}</td>
              <td>{log.message}</td>
              <td>{log.resourceId}</td>
              <td>{log.timestamp}</td>
              <td>{log.traceId}</td>
              <td>{log.spanId}</td>
              <td>{log.commit}</td>
              <td>{log.metadata.parentResourceId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button className="btn btn-primary mr-2" onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="btn btn-primary ml-2" onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LogTable;
