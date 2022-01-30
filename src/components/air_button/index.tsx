import { ReactElement } from 'react';

type AirButtonProps = {
  classNames?: string,
  id?: string,
  isDisabled?: boolean,
  onClick: (e: any) => void,
  text?: string,
  textBlock?: ReactElement,
};

const AirButton = (props: AirButtonProps): ReactElement => {
  return (
    <button
      className={`air-button${props.classNames ? ` ${props.classNames}` : ''}`}
      disabled={props.isDisabled || false}
      id={props.id}
      onClick={props.onClick}
    >
      {props.text || props.textBlock || ''}
    </button>
  );
};

export default AirButton;
