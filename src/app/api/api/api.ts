import {WordsDto} from '@/models/models';

export const addWord = ({ word, translate, transcription }:WordsDto):Promise<Response> => {
  return  fetch("/api/vocabularyList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, translate, transcription }),
  });
}

export const getVocabularyList = async () => {
  try {
    const res = await fetch("/api/vocabularyList", {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();

  } catch (error) {
    console.log("Error loading topics: ", error);

    return [];
  }
};

export const researchWord = ({ word }:Pick<WordsDto, 'word'>) => {
  return fetch("/api/existWord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  }).then(res => res.json());
}
