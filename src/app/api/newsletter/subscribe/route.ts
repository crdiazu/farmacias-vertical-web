import { NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().trim().email('Ingresa un correo electrónico válido.'),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Correo inválido.' },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: 'pending_confirmation',
      message:
        'Solicitud registrada (modo demostración Fase 1). El envío de correo de confirmación doble opt-in se conectará en Fase 3.',
    });
  } catch {
    return NextResponse.json({ message: 'Solicitud inválida.' }, { status: 400 });
  }
}
