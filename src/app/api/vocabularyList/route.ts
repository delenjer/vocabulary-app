import { SortOrder } from 'mongoose';
import {NextRequest, NextResponse} from 'next/server';
import {connectMongoDB} from '@/lib/mongodb';
import Vocabulary from '@/utils/vocabularySchema/vocabularySchema';
import NewWords from '@/utils/newWordsSchema/newWordsSchema';

export interface IVocabulary extends Document {
  word: string;
  translate: string;
  transcription?: string;
  lable?: string;
  createdAt: Date;
  updatedAt: Date;  
}

type FilterParam = Partial<Record<keyof IVocabulary, any>>;
type SortParams = Partial<Record<keyof IVocabulary, SortOrder>>;

const filterData = (
  data: typeof Vocabulary, 
  filterParam: FilterParam, 
  sortParams: SortParams
) => data.find({ ...filterParam }).sort({ ...sortParams });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await connectMongoDB();

    // await Vocabulary.create({ ...data });

     await NewWords.create({ ...data });

    return NextResponse.json({ message: "User registered." }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const param = searchParams.get('key');

  console.log(param);

  // const getDataParams = word === 'new' ?
  // filterData(Vocabulary, { lable: 'new' }, { updatedAt: -1 }) :
  // filterData(Vocabulary, {lable: { $ne: 'new' }}, { updatedAt: -1 });

  // const list = await getDataParams;

  await connectMongoDB();

  const list = await Vocabulary.find().sort({ updatedAt: -1 });

  return NextResponse.json({ list });
}
