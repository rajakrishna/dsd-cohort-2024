const API_URL = process.env.API_URL;
const LOC = "/api/timeslots/";

export async function GET(request, { params }) {
  const { date } = params;

  try {
    const data = await getTimeSlotList(date);
    const body = JSON.stringify({ data });

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      data: [],
      message: "failed to get timeslot list",
      error,
    });
    return new Response(body, {
      status: 500,
    });
  }
}

async function getTimeSlotList(date) {
  const response = await fetch(`${API_URL}/timeslots/${date}`);
  const data = await response.json();

  return data;
}
