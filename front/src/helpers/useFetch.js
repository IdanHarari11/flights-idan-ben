// Do the fetch from the API;
export const getUserFetch = async () => {
  // Get the data from the API;
  // https://flights-idan-ben.herokuapp.com/
  const res = await fetch("http://localhost:5000/flights");
  const response = await res.json();

  return response;
};


export const doFetch = async (url, body, method) => {
  const res = await fetch(url, {
    method: method,
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
};

// export const doFetch = async (url, body, method) => {
//   const res = await fetch(url, {
//     method: method,
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return res;
// };