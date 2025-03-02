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


type DataDto = {
  list: VocabularyItem[],
}

export const VocabularyList = () => {
  const [ isVisible, setVisible ] = useState(true);
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

  const existWord = useMemo(() => {
    return data?.list?.find(word => existWordId?.includes(word._id))
  }, [data?.list, existWordId]);

  console.log(isVisible, 'in list');

  return (
    <>
      {
        isLoading ? (
            <Spinner />
          ) : (
            <div className="container">
              <div className="container-wrap">
                <div className="button-container">
                  <input checked={checked} type="checkbox" onChange={() => setChecked(!checked)} />

                  <button
                    type="button"
                    onClick={() => setVisible(!isVisible)}
                    className="button-visible-col"
                    title="Show/Hide translate column"
                  >
                    <Image
                      src={isVisible ? showImg.src : hideImg.src}
                      alt="Image"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>

                <Slider key={toggleKeyWord} data={data?.list} isVisible={isVisible} />
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
