import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';

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
    <Button
      className={`air-button${props.classNames ? ` ${props.classNames}` : ''}`}
      disabled={props.isDisabled || false}
      id={props.id}
      onClick={props.onClick}
    >
      {props.text || props.textBlock || ''}
    </Button>
  );
};

export default AirButton;
