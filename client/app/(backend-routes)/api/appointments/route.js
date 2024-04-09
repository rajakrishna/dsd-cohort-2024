const API_URL = process.env.API_URL;
const LOC = "/api/appointments";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  try {
    const data = await getAppointmentsByDay(date);
    const body = JSON.stringify({ data });
    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      data: [],
      message: `failed to get appointments list for day: ${date}`,
      error: error?.message,
    });

    return new Response(body, {
      status: 500,
    });
  }
}

export async function POST(request) {
  const appointmentData = await request.json();

  try {
    const data = await postAppointment(appointmentData);
    const body = await JSON.stringify(data);
    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    const body = JSON.stringify({
      data: [],
      message: { message: `failed to create appointment`, appointmentData },
      error: error?.message,
    });

    return new Response(body, {
      status: 500,
    });
  }
}

async function getAppointmentsByDay(date) {
  const params = new URLSearchParams({ date });
  const res = fetch(`${API_URL}/appointments?${params}`);
  return await res.json();
}

/*
appointmentData:{
  appointmentTime:{
    day:03212024,
    timeSlot:"TS79"
  },
  customerInfo:{
    address:"123 road",
    name:"bob",
    phoneNumber:8171231234,
    email:"bob@bob.com",
    serviceId:"q1234"
  }
}
*/
async function postAppointment(appointmentData) {
  const body = await JSON.stringify(appointmentData);
  const res = fetch(`${API_URL}/appointments`, { method: "POST", body });
  const data = res.json();
  // const data = {
  //   appointmentTime: {
  //     day: "03212024",
  //     timeSlot: "TS79",
  //   },
  //   customerInfo: {
  //     address: "123 road",
  //     name: "bob",
  //     phoneNumber: 8171231234,
  //     email: "bob@bob.com",
  //     serviceId: "q1234",
  //   },
  // };
  return data;

  //! for testing returning same data with confirmationId added
  // appointmentData.confirmationId = "confirmationBOB1234";
  // return await JSON.stringify(appointmentData);
}
