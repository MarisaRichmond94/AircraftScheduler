import './index.scss';

import { ReactElement } from 'react';
import ReactLoading from 'react-loading';

interface AirLoaderProps {
  color?: string,
  height?: string,
  type?: any,
  width?: string,
}

const AirLoader = (props: AirLoaderProps): ReactElement => (
  <ReactLoading
    className='air-loader'
    color={props.color || '#083F89'}
    height={props.height || '10%'}
    type={props.type || 'cylon'}
    width={props.width || '20%'}
  />
);

export default AirLoader;
