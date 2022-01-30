import './index.scss';

import { ReactElement, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import AirLoader from 'components/air_loader';
import { usePrevious } from 'hooks/usePrevious';
import { settings } from 'settings';

type AirPanelProps = {
  contents: object[],
  emptyMessage?: string,
  header: string,
  id: string,
};

const AirPanel = (props: AirPanelProps): ReactElement => {
  const { contents, emptyMessage, header, id } = props;
  const [resultsCount, setResultsCount] = useState(0);
  const prevContents = usePrevious(contents);
  const emptyContents = (
    <div className='empty-contents paragragh-text'>
      {emptyMessage || 'No data available to display'}
    </div>
  );

  useEffect(() => {
    if (!prevContents && contents?.length) {
      setResultsCount(
        contents.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : contents.length
      );
    }
  }, [contents, prevContents]);

  const getMoreContents = useCallback((): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= contents.length
        ? nextResultsCount
        : contents.length
    );
  }, [contents?.length, resultsCount]);

  return (
    <div className='air-panel-container' id={id}>
      <div className='air-panel-header'>
        <b>{header}</b>
      </div>
      <div className='air-panel-body'>
        {
          contents.length
            ? (
              <InfiniteScroll
                dataLength={resultsCount}
                next={getMoreContents}
                hasMore={resultsCount !== contents.length}
                loader={<AirLoader color='#5BA1C5' height='5%' type='cylon'/>}
                scrollableTarget='air-panel-body'
              >
                {contents}
              </InfiniteScroll>
            )
            : emptyContents
        }
      </div>
    </div>
  );
};

export default AirPanel;
