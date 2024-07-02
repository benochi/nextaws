import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const flashcardsFilePath = path.join(process.cwd(), 'studyMaterial.json');

export async function POST(req: Request) {
  try {
    const newMaterial = await req.json();
    
    const data = await fs.readFile(flashcardsFilePath, 'utf8');
    const materials = JSON.parse(data);
    materials.push(newMaterial);
    
    await fs.writeFile(flashcardsFilePath, JSON.stringify(materials, null, 2));
    
    return NextResponse.json({ message: 'Flashcard added successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add flashcard' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}