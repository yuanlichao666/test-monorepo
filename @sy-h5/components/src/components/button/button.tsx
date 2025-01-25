import React from "react";
import {Button} from "zarm";
import {ButtonSize, ButtonTheme} from "zarm/es/button";

import Icon from '../icon'


export interface SButtonProps {
    theme?: "primary" | "secondary"|"success"|"warning";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export function SButton(props:SButtonProps){
    return <Button className={'sy-button'} size={props.size as ButtonSize} theme={props.theme as ButtonTheme}> <Icon></Icon>  </Button>
}

export function SButtonGroup(){}

export default SButton
