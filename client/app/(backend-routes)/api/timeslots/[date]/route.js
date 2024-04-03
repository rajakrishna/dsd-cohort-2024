const API_URL = process.env.API_URL;
const LOC = "/api/timeslots/";

export async function GET(request, { params }) {
  const { date } = params;

  try {
    const data = await JSON.stringify(await getTimeSlotList(date));
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    const message = JSON.stringify({
      error: "failed to get timeslot list",
      LOC,
    });
    return new Response(message, {
      status: 500,
    });
  }
}

async function getTimeSlotList(date) {
  const response = await fetch(`${API_URL}/timeslots/${date}`);
  const data = await response.json();

  console.log("data", data);
  return data;
}
