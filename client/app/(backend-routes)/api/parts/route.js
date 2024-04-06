const API_URL = process.env.API_URL;
const LOC = "/api/parts/";

export const dynamic = "force-dynamic"; // have next js NOT cache this request
export async function GET(request) {
  //
  const searchParams = request.nextUrl.searchParams;
  const lowInventory = searchParams.get("lowInventory");

  try {
    const data = await getAllParts({ lowInventory });

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

//request body:{partid,name,quantity,threshold }
export async function POST(request) {
  const part = await request.json();
  try {
    const data = await updatePart(part);
    const body = JSON.stringify({ data });

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      data: {},
      message: "failed to update part",
      error: error.message,
    });
    return new Response(body, {
      status: 500,
    });
  }
}

// part:{partid,name,quantity,threshold }
async function updatePart(part) {
  const body = JSON.stringify(part);
  const response = await fetch(`${API_URL}/parts`, body);
  const data = await response.json();

  return data;
}

//
async function getAllParts({ lowInventory = false }) {
  const params = new URLSearchParams({ lowInventory });

  const response = await fetch(`${API_URL}/parts?${params}`);
  const data = await response.json();

  return data;
}
