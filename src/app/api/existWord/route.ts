import {NextResponse} from 'next/server';

import {connectMongoDB} from '@/lib/mongodb';
import Vocabulary from '@/utils/vocabularySchema/vocabularySchema';

export async function POST(req:any) {
  try {
    const { word } = await req.json();

    await connectMongoDB();
    const existWordId = await Vocabulary.findOne({ word }).select('_id');

    return NextResponse.json({ existWordId });
  } catch (error) {
    console.log(error);

    return NextResponse.json('');
  }
}
