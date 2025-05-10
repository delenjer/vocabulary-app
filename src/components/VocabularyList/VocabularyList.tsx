'use client'

import {
  useState,
  useSyncExternalStore,
  useEffect,
  useMemo,
} from 'react'

import {useQuery} from '@tanstack/react-query';
import {getVocabularyList} from '@/app/api/api/api';
import {VocabularyItem} from '@/models/models';
import {store} from '@/utils/storageStore/storageStore';
import {Popup} from '@/components/Popup/Popup';
import Image from 'next/image';

import showImg from '../../../public/images/eye.svg';
import hideImg from '../../../public/images/eye-crossed.svg';
import {Spinner} from '@/components/Spinner/Spinner';
import { Slider } from '../Slider/Slider';
import { wordsCount } from '@/helper/wordsCount';


type DataDto = {
  list: VocabularyItem[],
}

export type toggleVisibleType = {
  word: boolean;
  translate: boolean;
}

export const VocabularyList = () => {
  const [ toggleVisible, setToggleVisible ] = useState<toggleVisibleType>({
    word: true,
    translate: true,
  });
  const [ open, setOpen ] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);

  const existWordId = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  let toggleKeyWord = checked ? 'new' : 'all';

  useEffect(() => {
    setOpen(!!existWordId);
  }, [existWordId]);

  const { data, isLoading } = useQuery<DataDto>({
    queryKey: ['words', toggleKeyWord],
    queryFn : () => getVocabularyList(toggleKeyWord),
  });

  const dataSize: number = data?.list.length || 0;

  const existWord = useMemo(() => {
    return data?.list?.find(word => existWordId?.includes(word._id))
  }, [data?.list, existWordId]);

  return (
    <>
      {
        isLoading ? (
            <Spinner />
          ) : (
            <div className="container">
              <div className="container-wrap">
                <div className="button-container">
                  <strong>{wordsCount(dataSize)}</strong>

                  <input checked={checked} type="checkbox" onChange={() => setChecked(!checked)} />

                  <span className='toggle-control'>
                  <button
                      type="button"
                      onClick={() => (
                        setToggleVisible((prevState) => ({
                          ...prevState,
                          word: !toggleVisible.word,
                        }))
                      )}
                      className="button-visible-col"
                      title="Show/Hide Word"
                    >
                      <Image
                        src={toggleVisible.word ? showImg.src : hideImg.src}
                        alt="Image"
                        width={28}
                        height={28}
                      />
                    </button>

                    /

                    <button
                      type="button"
                      onClick={() => (
                        setToggleVisible((prevState) => ({
                          ...prevState,
                          translate: !prevState.translate,
                        }))
                      )}
                      className="button-visible-col"
                      title="Show/Hide translate"
                    >
                      <Image
                        src={toggleVisible.translate ? showImg.src : hideImg.src}
                        alt="Image"
                        width={28}
                        height={28}
                      />
                    </button>
                  </span>
                </div>

                <Slider key={toggleKeyWord} data={data?.list} toggleVisible={toggleVisible} />
              </div>
            </div>
        )
      }

      {
        open && <Popup setOpen={setOpen} data={existWord} />
      }
    </>
  )
}
