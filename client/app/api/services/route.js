const API_URL = process.env.API_URL;

export async function GET(request) {
  try {
    const data = await getServicesList();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {}
}

async function getServicesList() {
  const response = await fetch(`${API_URL}/services`);
  const data = await response.json();
  console.log("data", data);
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
