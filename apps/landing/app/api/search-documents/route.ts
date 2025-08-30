import { NextResponse } from 'next/server';
import { loadSearchDocuments } from '@lnd/utils/search';

export async function GET() {
  try {
    const documents = await loadSearchDocuments();
    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error loading search documents:', error);
    return NextResponse.json(
      { error: 'Failed to load search documents' },
      { status: 500 }
    );
  }
}
