const API_URL = process.env.API_URL;
const LOC = "/api/services";

export async function GET(request) {
  try {
    const data = await getServicesList();
    const dataJson = JSON.stringify(data);
    return new Response(dataJson, {
      status: 200,
    });
  } catch (error) {
    const message = JSON.stringify({
      error: "failed to get services list",
      LOC,
    });
    return new Response(message, {
      status: 500,
    });
  }
}

async function getServicesList() {
  const response = await fetch(`${API_URL}/services`);
  const data = await response.json();
  return data;
}

// Response.json({
//   Mes: "Hello, Next.js!",
//   env: process.env.API_URL,
// });

// return new Response(
//   { Mes: "Hello, Next.js!", env: process.env.API_URL },
//   {
//     status: 200,
//   }
// );
