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


  const { data, isLoading } = useQuery<DataDto, boolean>({ queryKey: ['words'], queryFn: getVocabularyList });

  const existWord = useMemo(() => {
    return data?.list.find(word => existWordId?.includes(word._id))
  }, [data?.list, existWordId]);


  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <>
      <div className="container">
        <button
          type="button"
          onClick={() => setVisible(!isVisible)}
          className="item-btn"
        >
          {isVisible ? 'Show col' : 'Hide col'}
        </button>

        <ul className="list">
          {
            data?.list.map(item => (
              <Fragment key={item._id}>
                <li className="list-item item-word">
                  { item.word }
                </li>

                <li className="list-item">
                  { item.transcription ?? ' - ' }
                </li>

                <li className={isVisible ? 'list-item item-translate hide-item' : 'list-item item-translate'}>
                  { item.translate }
                </li>
              </Fragment>
            ))
          }
        </ul>
      </div>

      {
        open && <Popup setOpen={setOpen} data={existWord} />
      }
    </>
  )
}
