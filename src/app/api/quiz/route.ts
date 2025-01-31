import { NextResponse } from "next/server";
import { generateQuiz } from "@/utils/gemini";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || getTodayCategory();

    const questions = await generateQuiz(category);

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error in GET /api/quiz:", error);
    return NextResponse.json(
      {
        success: false,
        error: "クイズの取得に失敗しました",
      },
      { status: 500 }
    );
  }
}

function getTodayCategory(): string {
  const days = ["HTML", "CSS", "JavaScript", "Web API"];
  const dayIndex = new Date().getDay();
  return days[dayIndex % days.length];
}
