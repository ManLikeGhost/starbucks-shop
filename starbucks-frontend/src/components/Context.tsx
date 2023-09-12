import React, { useEffect, useState } from "react";

const Context = ({ state }) => {
  const [contexts, setContexts] = useState([]);

  const { contract } = state;
  useEffect(() => {
    const contextsMessage = async () => {
      const contexts = await contract.fetchContext();
      setContexts(contexts);
      // console.log('_getContext_', contexts)
    };
    contract && contextsMessage();
  }, [contract]);

  return (
    <>
      <div className="container-fluid">
        <h3 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          Transaction Data
        </h3>
        <table>
          <tbody>
            {contexts.map((context, index) => {
              return (
                <tr key={index}>
                  <td
                    style={{
                      backgroundColor: "white",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                      color: "black",
                    }}
                  >
                    {context.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "white",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                      color: "black",
                    }}
                  >
                    {new Date(context.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "white",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                      color: "black",
                    }}
                  >
                    {context.message}
                  </td>
                  <td
                    className="container-fluid"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                      color: "black",
                    }}
                  >
                    {context.from}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Context;
