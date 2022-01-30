import './index.scss';

import { ReactElement } from 'react';

import { useApp } from 'providers/app';
import { determinePercentageOfWhole } from 'utils/determinePercentageOfWhole';
import { settings } from 'settings';

const UsageMeter = (): ReactElement => {
  const { flightPath } = useApp();

  const populateUsageMeter = () => {
    if (flightPath?.length) {
      const usageDetails = [
        <UsageEntry
          key='initial-idle-usage'
          endInSecs={0}
          startInSecs={flightPath[0].departureTime}
          type='idle'
        />
      ];

      let nextEndTimeInSecs;
      for (let index = 0; index < flightPath.length; index++) {
        const { departureTime, arrivalTime, ident } = flightPath[index];
        usageDetails.push(
          <UsageEntry
            key={`${ident}-active-usage`}
            endInSecs={departureTime}
            startInSecs={arrivalTime}
            type='active'
          />
        );
        nextEndTimeInSecs = arrivalTime + settings.REQUIRED_DOWNTIME_IN_SECS;
        if (index < flightPath.length - 1) {
          const { departureTime } = flightPath[index+1];
          nextEndTimeInSecs = departureTime;
        }
        usageDetails.push(
          <UsageEntry
            key={`${ident}-downtime-usage`}
            endInSecs={arrivalTime}
            startInSecs={nextEndTimeInSecs}
            type='turn-around'
          />
        );
      }

      usageDetails.push(
        <UsageEntry
          key='eod-idle-usage'
          endInSecs={nextEndTimeInSecs || 0}
          startInSecs={86400}
          type='idle'
        />
      );

      return usageDetails;
    }

    return <div className='usage idle-time' style={{ width: '100%' }}></div>;
  };

  return (
    <div id='usage-meter'>
      <div id='timeline'>
        <div className='paragraph-text'>00:00</div>
        <div className='paragraph-text'>06:00</div>
        <div className='paragraph-text'>12:00</div>
        <div className='paragraph-text'>18:00</div>
        <div className='paragraph-text'>24:00</div>
      </div>
      <hr />
      <div id='usage-entity-container'>
        {populateUsageMeter()}
      </div>
    </div>
  );
};

type UsageEntryProps = {
  endInSecs: number,
  startInSecs: number,
  type: string,
};

const UsageEntry = (props: UsageEntryProps): ReactElement => {
  const { endInSecs, startInSecs, type } = props;
  const percentage = Math.round(determinePercentageOfWhole(startInSecs, endInSecs));

  return <div className={`usage ${type}-time`} style={{ width: `${percentage}%`}}></div>;
};

export default UsageMeter;
