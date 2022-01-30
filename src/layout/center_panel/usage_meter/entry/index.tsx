import './index.scss';

import { ReactElement } from 'react';

import { determinePercentageOfWhole } from 'utils/determinePercentageOfWhole';

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

export default UsageEntry;
