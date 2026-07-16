export const dynamic = 'force-static';

export async function GET() {
  return new Response('6d9c5b4e2a1f4c7b9e8d3a2f1c6b5e4d', {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  });
}
