'use client';
import React,{ useRef, useEffect, useImperativeHandle, useState, forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import 'jb-mobile-input';
import {BaseProps, type Props as JBInputProps, useJBInputAttribute, useJBInputEvents} from 'jb-input/react';
// eslint-disable-next-line no-duplicate-imports
import { type JBMobileInputWebComponent } from 'jb-mobile-input';
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
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  //to force rerender for events
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  useJBInputAttribute(element,props);
  useJBInputEvents<JBMobileInputWebComponent>(element,props);
  return(
    <jb-mobile-input ref={element} class={props.className}>
      {props.children}
    </jb-mobile-input>
  );
});
export type Props = BaseProps<JBMobileInputWebComponent> & {
  // add special props here
}
JBMobileInput.displayName = "JBMobileInput";

