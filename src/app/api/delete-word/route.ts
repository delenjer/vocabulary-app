import {NextRequest, NextResponse} from 'next/server';

import {connectMongoDB} from '@/lib/mongodb';
import Vocabulary from '@/utils/vocabularySchema/vocabularySchema';

export async function DELETE(req:NextRequest) {
  try {
    const id = await req.json();

    await connectMongoDB();
    await Vocabulary.deleteOne(id);

    return NextResponse.json({ message: "Item in list is delete." }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json('');
  }
}
