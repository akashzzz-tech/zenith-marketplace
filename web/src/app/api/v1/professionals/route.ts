import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const industry = searchParams.get('industry');
    const route = searchParams.get('route');
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();
    let query = supabase
      .from('professional_profiles')
      .select(`
        id,
        professional_title,
        industry,
        specialization,
        years_of_experience,
        is_retired,
        hourly_rate_cents,
        verification_status,
        profiles (
          full_name,
          country_code,
          time_zone,
          avatar_url
        )
      `)
      .eq('verification_status', 'verified')
      .eq('is_publicly_visible', true)
      .limit(limit);

    if (industry) {
      query = query.eq('industry', industry);
    }
    if (route) {
      query = query.eq('eligibility_route', route);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, count: data?.length || 0, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
