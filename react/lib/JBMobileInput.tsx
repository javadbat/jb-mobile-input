'use client';

import React,{ useRef, useImperativeHandle, forwardRef, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import 'jb-mobile-input';
import {type BaseProps, useJBInputAttribute, useJBInputEvents} from 'jb-input/react';
import type { JBMobileInputWebComponent } from 'jb-mobile-input';
interface JBMobileInputType extends DetailedHTMLProps<HTMLAttributes<JBMobileInputWebComponent>, JBMobileInputWebComponent> {
  class?:string,
}
declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-mobile-input': JBMobileInputType;
      }
      
    }
}

// eslint-disable-next-line react/display-name
export const JBMobileInput = forwardRef((props:Props, ref) => {
  
  const element = useRef<JBMobileInputWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  const {disabled,required,validationList,value,onBeforeinput,onBlur,onChange,onEnter,onFocus,onInput,onKeydown,onKeyup,...otherProps} = props;
  useJBInputAttribute(element,{disabled,required,validationList,value,...otherProps});
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

