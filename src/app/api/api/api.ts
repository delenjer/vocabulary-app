import {WordsDto} from '@/models/models';
import { log } from 'console';

export const addWord = async (data:WordsDto) => {
  const res = await fetch("/api/vocabularyList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
}

export const getVocabularyList = async (word: string) => {
  try {
    const res = await fetch(`/api/vocabularyList?word=${word}`, {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json().then(data => data);

  } catch (error) {
    console.log("Error loading topics: ", error);
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

export const deleteWord = (id: { _id: string }) => {
  return fetch("/api/delete-word", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).then(res => res.json());
}

