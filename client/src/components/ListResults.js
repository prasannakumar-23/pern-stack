import React, { Fragment, useEffect, useState } from "react";

const ListResults = () => {
  const [results, setResults] = useState([]);
  const getResults = async () => {
    const response = await fetch("http://localhost:5000/results");
    const jsonData = await response.json();
    setResults(jsonData);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <Fragment>
      <h1>List Results</h1>
      <h2>
        As the database didn't store the api's json file, it can't print
        anything according to the keywords used here for example: result.name,
        result.last, result.volume
      </h2>
      <table class="table table-borderless text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>Last</th>
            <th>Buy / Sell Price</th>
            <th>volume</th>
            <th>base_unit</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.last}</td>
              <td>
                {result.buy} / {result.sell}
              </td>
              <td>{result.volume}</td>
              <td>{result.base_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListResults;
