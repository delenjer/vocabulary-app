
export interface FormValues {
  wordField: string;
  translateField: string;
  transcriptionField: string;
}

export interface WordsDto {
  word: string;
  translate: string;
  transcription?: string;
}

export interface VocabularyItem extends WordsDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
