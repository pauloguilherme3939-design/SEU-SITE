import { NextRequest, NextResponse } from 'next/server';
import { submitLead, isValidLead } from '@/lib/submit-lead';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!isValidLead(body)) {
      return NextResponse.json(
        { error: 'Dados inválidos. Nome e WhatsApp são obrigatórios.' },
        { status: 400 },
      );
    }
    await submitLead(body);
    return NextResponse.json({ ok: true });
  } catch {
    console.error('[api/lead] unexpected error');
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 });
  }
}
