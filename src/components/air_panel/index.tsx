import './index.scss';

import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import AirLoader from 'components/air_loader';
import { usePrevious } from 'hooks/usePrevious';
import { settings } from 'settings';

type AirPanelProps = {
  contents: ReactElement[],
  emptyMessage?: string,
  header: string,
  id: string,
};

const AirPanel = (props: AirPanelProps): ReactElement => {
  const { contents, emptyMessage, header, id } = props;
  const element = document.getElementById(`${id}-body`);
  const [results, setResults] = useState<ReactElement[]>([]);
  const [panelHeight, setPanelHeight] = useState(element ? `${element.offsetHeight}px` : '500px');
  const prevContents = usePrevious(contents);
  const emptyContents = (
    <div className='empty-contents paragragh-text'>
      {emptyMessage || 'No data available to display'}
    </div>
  );

  useLayoutEffect(() => {
    function updatePanelHeight() {
      const element = document.getElementById(`${id}-body`);
      setPanelHeight(element ? `${element.offsetHeight}px` : '500px');
    }
    window.addEventListener('resize', updatePanelHeight);
    updatePanelHeight();
    return () => window.removeEventListener('resize', updatePanelHeight);
  }, [id]);

  useEffect(() => {
    if ((!prevContents && contents?.length) || prevContents !== contents) {
      setResults(
        contents.length >= settings.MIN_RESULTS_PER_LOAD
          ? contents.slice(0, settings.MIN_RESULTS_PER_LOAD)
          : contents
      );
    }
  }, [contents, prevContents]);

  const getMoreContents = (): void => {
    const nextResultsCount = results.length + settings.MIN_RESULTS_PER_LOAD;
    setResults(
      nextResultsCount <= contents.length
        ? contents.slice(0, nextResultsCount)
        : contents
    );
  };

  return (
    <div className='air-panel-container' id={id} data-testid='air-panel'>
      <div className='air-panel-header'>
        <b>{header}</b>
      </div>
      <div className='air-panel-body' id={`${id}-body`}>
        {
          results?.length
            ? (
              <InfiniteScroll
                dataLength={results.length}
                next={getMoreContents}
                hasMore={results.length < contents.length}
                loader={<AirLoader color='#5BA1C5' height='5%' type='cylon'/>}
                height={panelHeight}
              >
                {results}
              </InfiniteScroll>
            )
            : emptyContents
        }
      </div>
    </div>
  );
};

export default AirPanel;
