import { NextRequest, NextResponse } from 'next/server';
import { generateMatchScore } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { professional, project } = body;

    if (!professional || !project) {
      return NextResponse.json(
        { error: 'Both professional and project profiles are required for match scoring' },
        { status: 400 }
      );
    }

    const breakdown = generateMatchScore(professional, project);

    return NextResponse.json({
      success: true,
      data: {
        score: breakdown.total,
        breakdown,
        matchedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
