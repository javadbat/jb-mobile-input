import type { DetailedHTMLProps, HTMLAttributes } from 'react';
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
