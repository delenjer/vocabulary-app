'use client'

import {
  Fragment,
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

import showImg from '../../../public/images/visible.png';
import hideImg from '../../../public/images/not-invisible.png';
import {Spinner} from '@/components/Spinner/Spinner';
import {DeleteWord} from '@/components/VocabularyList/DeleteWord/DeleteWord';

type DataDto = {
  list: VocabularyItem[],
}

export const VocabularyList = () => {
  const [ isVisible, setVisible ] = useState(false);
  const [ open, setOpen ] = useState(false);

  const existWordId = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  useEffect(() => {
    setOpen(!!existWordId);
  }, [existWordId]);


  const { data, isLoading } = useQuery<DataDto>({ queryKey: ['words'], queryFn: getVocabularyList });

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
                  <button
                    type="button"
                    onClick={() => setVisible(!isVisible)}
                    className="button-visible-col"
                    title="Show/Hide translate column"
                  >
                    <Image
                      src={isVisible ? hideImg.src : showImg.src}
                      alt="Image"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>

                <ul className="list">
                  {
                    data?.list?.map(item => (
                      <Fragment key={item._id}>
                        <li className="list-item item-word">
                          { item.word }
                        </li>

                        <li className="list-item item-transcription">
                          { item.transcription || ' - ' }
                        </li>

                        <li className={isVisible ? 'list-item item-translate hide-item' : 'list-item item-translate'}>
                        <span>
                          { item.translate }
                        </span>

                          {/* <DeleteWord itemId={item._id} /> */}
                        </li>
                      </Fragment>
                    ))
                  }
                </ul>
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
