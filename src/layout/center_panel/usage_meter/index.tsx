import './index.scss';

import { ReactElement } from 'react';

import UsageEntry from 'layout/center_panel/usage_meter/entry';
import { useApp } from 'providers/app';
import { settings } from 'settings';

const UsageMeter = (): ReactElement => {
  const { flightPath } = useApp();

  const populateUsageMeter = () => {
    if (flightPath?.length) {
      const usageDetails = [
        <UsageEntry
          key='initial-idle-usage'
          endInSecs={flightPath[0].departureTime}
          startInSecs={0}
          type='idle'
        />
      ];

      let nextEndTimeInSecs;
      for (let index = 0; index < flightPath.length; index++) {
        const { departureTime, arrivalTime, ident } = flightPath[index];
        usageDetails.push(
          <UsageEntry
            key={`${ident}-active-usage`}
            endInSecs={arrivalTime}
            startInSecs={departureTime}
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
            endInSecs={nextEndTimeInSecs}
            startInSecs={arrivalTime}
            type='turn-around'
          />
        );
      }

      usageDetails.push(
        <UsageEntry
          key='eod-idle-usage'
          endInSecs={86400}
          startInSecs={nextEndTimeInSecs || 0}
          type='idle'
        />
      );

      return usageDetails;
    }

    return (
      <UsageEntry
        key='eod-idle-usage'
        endInSecs={86400}
        startInSecs={0}
        type='idle'
      />
    );
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

export default UsageMeter;
