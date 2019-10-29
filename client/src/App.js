import React, { useEffect, useState } from "react";

import FirstHomeForm from "./components/forms/FirstHomeForm";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/v1/reference_data");
        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="App">
      <FirstHomeForm data={data} />
    </div>
  );
}

export default App;
