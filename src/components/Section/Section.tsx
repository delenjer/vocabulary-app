import {AddWords} from '@/components/AddWords/AddWords';
import {VocabularyList} from '@/components/VocabularyList/VocabularyList';

export const Section = () => (
  <section>
    <div className="form-container">
      <h1>Learn words</h1>

      <AddWords />
    </div>

    <VocabularyList />
  </section>
);
