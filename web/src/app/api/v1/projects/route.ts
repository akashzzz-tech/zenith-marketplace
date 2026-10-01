import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const minExp = searchParams.get('minExp');
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();
    let query = supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }
    if (minExp) {
      query = query.lte('min_years_experience', parseInt(minExp));
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, count: data?.length || 0, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
