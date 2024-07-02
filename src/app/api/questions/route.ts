import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const flashcardsFilePath = path.join(process.cwd(), 'studyMaterial.json');

export async function POST(req: Request) {
  try {
    const newMaterial = req.body;
    const data = fs.readFileSync(flashcardsFilePath, 'utf8');
    const materials = JSON.parse(data);
    materials.push(newMaterial);
    fs.writeFileSync(flashcardsFilePath, JSON.stringify(materials, null, 2));
    return NextResponse.json({ message: 'Flashcard added successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add flashcard' }, { status: 500 });
  }
}

