import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const questionsFilePath = path.join(process.cwd(), 'questions.json');

export async function POST(req: Request) {
  try {
    const newMaterial = await req.json();
    
    const data = await fs.readFile(questionsFilePath, 'utf8');
    const materials = JSON.parse(data);
    materials.push(newMaterial);
    
    await fs.writeFile(questionsFilePath, JSON.stringify(materials, null, 2));
    
    return NextResponse.json({ message: 'Question added successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add question' }, { status: 500 });
  }
}