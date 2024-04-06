const API_URL = process.env.API_URL;
const LOC = "/api/inventory/";

export const dynamic = "force-dynamic"; // have next js NOT cache this request
export async function GET(request) {
  try {
    const data = await getInventory({ lowInventory: true });
    const body = JSON.stringify({ data });

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      data: [],
      message: "failed to get inventory list",
      error: error.message,
    });
    return new Response(body, {
      status: 500,
    });
  }
}

async function getInventory({ lowInventory = false }) {
  const params = new URLSearchParams({ lowInventory });

  const response = await fetch(`${API_URL}/parts/${params}`);
  const data = await response.json();
  console.log("data from parts java api", data);

  return data;
}
