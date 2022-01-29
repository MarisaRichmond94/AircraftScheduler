import './index.scss';

import { ReactElement } from 'react';

type AirPanelProps = {
  contents: object[],
  header: string,
  id: string,
};

const AirPanel = (props: AirPanelProps): ReactElement => {
  const { contents, header, id } = props;

  return (
    <div className='air-panel-container' id={id}>
      <div className='air-panel-header'>
        <b>{header}</b>
      </div>
      <div className='air-panel-body'>
        {contents}
      </div>
    </div>
  );
};

export default AirPanel;
