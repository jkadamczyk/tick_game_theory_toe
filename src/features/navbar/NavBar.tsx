import * as React from 'react';
import "./NavBar.css";
import { Text } from '../../common/components/Text/Text';
import { Size } from '../../common/util/Enum';

export const NavBar = () => (
    <div className="NavBar">
        <Text size={Size.H1}>Tic Tac Toe</Text>
    </div>
);