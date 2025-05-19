import {NextRequest, NextResponse} from 'next/server';

import {connectMongoDB} from '@/lib/mongodb';
import Vocabulary from '@/utils/vocabularySchema/vocabularySchema';
import NewWords from '@/utils/newWordsSchema/newWordsSchema';

export async function DELETE(req:NextRequest) {
  try {
    const { _id, listKey } = await req.json();

    await connectMongoDB();
    listKey === 'new' ? await NewWords.deleteOne({_id}) : await Vocabulary.deleteOne({_id});

    return NextResponse.json({ message: "Item in list is delete." }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json('');
  }
}
