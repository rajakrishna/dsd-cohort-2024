const API_URL = process.env.API_URL;
const LOC = "/api/appointments";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("date");

  console.log(LOC, "GET");
}

export async function POST(request) {
  console.log(LOC, "POST");
}
