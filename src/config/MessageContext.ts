import  {createContext} from 'react';

import {ISubscriber, Payload} from "rsocket-types";
import {Buffer} from "buffer";

export const MessageContext= createContext<ISubscriber<Payload<Buffer, Buffer>>|null>(null);








