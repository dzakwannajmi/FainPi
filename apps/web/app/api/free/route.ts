export async function GET() {
  return Response.json({
    message: "This is a free API response.",
    access: "public",
  });
}