import * as React from 'react';
import "./NavBar.css";
import { Text } from '../../components/Text/Text';
import { Size } from '../../util/Enum';

export const NavBar = () => (
    <div className="NavBar">
        <Text size={Size.H1}>Tic Tac Toe</Text>
    </div>
);