export default function useUpdatePart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  newPartData:{
  //     "partId":12345,
  // 	"name":"test",
  // 	"quantity":10,
  // 	"threshold":5
  // }
  async function updatePart(newPartData) {
    try {
      const response = await fetch("/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPartData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setError(null);
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Failed to update data");
    } finally {
      setIsLoading(false);
    }
  }

  return { updatePart, isLoading, error };
}
