import {NextRequest, NextResponse} from 'next/server';
import {connectMongoDB} from '@/lib/mongodb';
import Vocabulary from '@/utils/vocabularySchema/vocabularySchema';

export async function POST(req: NextRequest) {
  try {
    const { word, translate, transcription } = await req.json();

    await connectMongoDB();
    await Vocabulary.create({ word, translate, transcription });

    return NextResponse.json({ message: "User registered." }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const list = await Vocabulary.find().sort({ updatedAt: -1 });

  return NextResponse.json({ list });
}
