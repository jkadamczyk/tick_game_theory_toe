import * as React from 'react';
import { Size } from '../../util/Enum';

interface Props {
    children?: any;
    size: Size;
}

export const Text = (props: Props) => (
    <span className="Text" style={{fontSize: props.size + 'em'}}>{props.children}</span>
);