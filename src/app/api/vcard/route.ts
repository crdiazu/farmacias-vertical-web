import { NextResponse } from 'next/server';

const VCARD_CONTENT = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Díaz;Cristián;;;',
  'FN:Cristián Díaz · MarketingCloud Chile',
  'ORG:MarketingCloud Chile',
  'TITLE:Consultoría Tecnológica, Marketing Digital e IA',
  'TEL;TYPE=CELL,VOICE:+56949438288',
  'EMAIL;TYPE=INTERNET,WORK:cristian@tecnovoa.cl',
  'URL:https://marketingcloud.cl',
  'ADR;TYPE=WORK:;;Santiago;;;Chile',
  'NOTE:Propuesta E-Commerce & Habilitación ISP — Farmacias Vertical',
  'END:VCARD',
].join('\r\n');

export async function GET() {
  return new NextResponse(VCARD_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Cristian-Diaz-MarketingCloud.vcf"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
