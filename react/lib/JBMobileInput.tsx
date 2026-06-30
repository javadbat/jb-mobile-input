'use client';

import React,{ useRef, useImperativeHandle, forwardRef } from 'react';
import 'jb-mobile-input';
import {type BaseProps, useJBInputAttribute, useJBInputEvents} from 'jb-input/react';
import type { JBMobileInputWebComponent } from 'jb-mobile-input';
import './module-declaration.js';

// eslint-disable-next-line react/display-name
export const JBMobileInput = forwardRef((props:Props, ref) => {
  
  const element = useRef<JBMobileInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => element.current ?? undefined,
    [element],
  );
  const {disabled,required,validationList,value,onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps} = props;
  useJBInputAttribute<JBMobileInputWebComponent>(element,{disabled,required,validationList,value,...otherProps});
  useJBInputEvents<JBMobileInputWebComponent>(element,{onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps});

  return(
    <jb-mobile-input ref={element} {...otherProps}>
      {props.children}
    </jb-mobile-input>
  );
});

export type Props = BaseProps<JBMobileInputWebComponent> & {
  // add special props here
}

JBMobileInput.displayName = "JBMobileInput";

