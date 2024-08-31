import Dashboard from "./component/Dashboard.tsx";
import {useLocation} from 'react-router-dom';
import { useRef } from 'react';

import {
    RSocketClient,
    BufferEncoders,
    encodeCompositeMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    encodeRoute,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {Buffer} from 'buffer';
import {ISubscriber, Payload} from "rsocket-types";
import {Flowable} from "rsocket-flowable";

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

const maxRSocketRequestN = 2147483647;
const keepAlive = 60000;
const lifetime = 180000;
const dataMimeType = 'application/json';
const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;
const route = 'im.v1.setup';


function App() {
    const subscriberRef = useRef<ISubscriber<any> | null>(null);
    const requestFlowable = new Flowable<Payload<Buffer, Buffer>>((subscriber) => {
        subscriberRef.current = subscriber;

        // 这里可以开始 emit 初始数据或在外部通过 subscriberRef 来 emit 数据
        subscriber.onComplete(); // 如果不想立即完成流，可以省略这行
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userCode = queryParams.get('userCode');
    let token = '';
    if ('1' == userCode) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWRvb29tLmNvbSIsInN1YiI6Imh0bWoiLCJ1c2VyQ29kZSI6IjEifQ.tQ9BoTNtn6WliSf9F_ha9F58Q6VD6aP78EOw9BFTHb8'
    } else if ('2' == userCode) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWRvb29tLmNvbSIsInN1YiI6Imh0bWoiLCJ1c2VyQ29kZSI6IjIifQ.bZ4N09E092HyWzdvNgfENrUKDsF5z7mMEYF6NpXksq8'
    } else if ('3' == userCode) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWRvb29tLmNvbSIsInN1YiI6Imh0bWoiLCJ1c2VyQ29kZSI6IjMifQ.zoYb5FPX3IhQD03t99wEGJL7drPKeeOo5TsDXvC9vEA'
    } else if ('4' == userCode) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWRvb29tLmNvbSIsInN1YiI6Imh0bWoiLCJ1c2VyQ29kZSI6IjQifQ.YIj5vBszPsmBWT5CtapVF45Lfoe9SrUX8mgB_OlXw4o'
    }
    const connInfo = {
        token,
        platform: 'WEB',
        userCode
    }

    const client = new RSocketClient<Buffer, Buffer>({
        setup: {
            dataMimeType,
            keepAlive,
            lifetime,
            metadataMimeType,
            payload: {
                data: Buffer.from(JSON.stringify(connInfo)),
                metadata: encodeCompositeMetadata([
                    [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)]
                ]),
            },
        },
        transport: new RSocketWebSocketClient(
            {
                debug: true,
                url: 'ws://localhost:8082',
            },
            BufferEncoders,
        ),
    });
    // Open the connection
    client.connect().then(
        socket => {
            socket.connectionStatus().subscribe(event => console.log(event));
            socket
                .requestStream({
                    data: Buffer.from(JSON.stringify(connInfo)),
                    metadata: encodeCompositeMetadata([
                        [MESSAGE_RSOCKET_ROUTING, encodeRoute("im.v1.stream")],
                    ]),
                })
                .subscribe({
                    // eslint-disable-next-line no-console
                    onComplete: () => console.log('Request-stream completed'),
                    onError: error =>
                        console.error(`Request-stream error:${error.message}`),
                    // eslint-disable-next-line no-console
                    onNext: value => console.log('传来了数据 %s %s', value.data, value.metadata),
                    onSubscribe: sub => sub.request(maxRSocketRequestN),
                });

            socket.requestChannel(requestFlowable).subscribe({
                onComplete: () => console.log('Request-channel completed'),
                onError: error =>
                    console.error(`Request-channel error:${error.message}`),
                onNext: value => console.log('传来了数据 %s %s', value.data, value.metadata),
                onSubscribe: sub => sub.request(maxRSocketRequestN),
            });
        },
        error => {
            // handle connection error
            // eslint-disable-next-line no-console
            console.log('error:', error);
        },
    );

    return (
        <>
            <div>
                <Dashboard></Dashboard>
            </div>

        </>
    )
}

export default App
