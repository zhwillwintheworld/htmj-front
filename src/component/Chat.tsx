import {useLocation} from 'react-router-dom';
import Dashboard from "./Dashboard.tsx";
import {
    MahjongChangeResponseMessage,
    MahjongEndResponseMessage,
    MahjongErrorResponseMessage,
    MahjongInitResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongMessage,
    MahjongMessageEvent,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage,
    ServerMessageType,
} from '../domain/Task.ts'
import {TableChangeContext} from '../config/TableContext.ts'
import {
    BufferEncoders,
    encodeCompositeMetadata,
    encodeRoute,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {Buffer} from 'buffer';
import {ISubscriber, Payload} from "rsocket-types";
import {Flowable} from "rsocket-flowable";
import {useContext, useRef} from "react";
import {MessageContext} from '../config/MessageContext.ts';
import {makeInitTaskMessage, makeMessage, makeTaskPayload} from "./util/MessageUtil.ts";

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

const maxRSocketRequestN = 2147483647;
const keepAlive = 60000;
const lifetime = 180000;
const dataMimeType = 'application/json';
const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;
const route = 'im.v1.setup';

function Chat() {
    const location = useLocation();
    const subscriberRef = useRef<ISubscriber<Payload<Buffer, Buffer>> | null>(null);
    const dispatch = useContext(TableChangeContext)
    if (dispatch == null) {
        return <Dashboard/>
    }
    const processMessage = (payload: Payload<Buffer, Buffer>) => {
        const message = JSON.parse(payload.data?.toString() as string);
        if (message.message != null && message.message.type == ServerMessageType.MAHJONG) {
            const messageContent = message.message.content as MahjongMessage;
            let body
            switch (messageContent.event) {
                // 解决初始化
                case MahjongMessageEvent.INIT_RESPONSE:
                    body = messageContent.content as MahjongInitResponseMessage;
                    console.log('收到初始化响应，出牌人为')
                    dispatch({type: 'INIT', payload: body.table})
                    break;
                // 解决出牌
                case MahjongMessageEvent.OUT_RESPONSE:
                    body = messageContent.content as MahjongOutResponseMessage;
                    console.log('收到出牌响应，出牌人为' + body.position)
                    dispatch({type: 'OUT', payload: body})
                    break
                case MahjongMessageEvent.CHANGE_RESPONSE:
                    body = messageContent.content as MahjongChangeResponseMessage;
                    dispatch({type: 'CHANGE', payload: body, userCode: userCode!})
                    console.log('收到切换响应，响应人为' + body.position)
                    break
                case MahjongMessageEvent.END_RESPONSE:
                    body = messageContent.content as MahjongEndResponseMessage;
                    break
                case MahjongMessageEvent.ERROR_RESPONSE:
                    body = messageContent.content as MahjongErrorResponseMessage;
                    break
                case MahjongMessageEvent.LEASE_RESPONSE:
                    body = messageContent.content as MahjongLeaseResponseMessage;
                    dispatch({type: 'LEASE', payload: body})
                    console.log('收到响应的LEASE_RESPONSE，响应人为' + body.happenedUser)
                    break
                case MahjongMessageEvent.SEND_LEASE_RESPONSE:
                    body = messageContent.content as MahjongSendLeaseResponseMessage;
                    dispatch({type: 'SEND_LEASE', payload: body})
                    console.log('收到发送的LEASE_RESPONSE，响应人为自己')
                    break
            }
            console.log(body)
        }
    }

    const queryParams = new URLSearchParams(location.search);
    let userCode = queryParams.get('userCode');
    if (userCode == null) {
        userCode = ''
    }
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
                    onNext: value => processMessage(value),
                    onSubscribe: sub => sub.request(maxRSocketRequestN),
                });
            const requestFlowable = new Flowable<Payload<Buffer, Buffer>>((subscriber) => {
                subscriberRef.current = subscriber;
                subscriber.onSubscribe({
                    request: (n) => {
                        console.log('request', n);
                        console.log("发送了消息，n = " + n)
                    },
                    cancel: () => {
                        // 取消task stream
                        subscriberRef.current = null;
                        console.log('cancel');
                    },
                });
                // 这里可以开始 emit 初始数据或在外部通过 subscriberRef 来 emit 数据
            });
            socket.requestChannel(requestFlowable).subscribe({
                onComplete: () => console.log('Request-channel completed'),
                onError: error =>
                    console.error(`Request-channel error:${error.message}`),
                onNext: value => console.log('传来了数据 %s %s', value.data, value.metadata),
                onSubscribe: sub => sub.request(maxRSocketRequestN),
            });
            if (subscriberRef.current == null) {
                console.log('subscriberRef.current == null')
            } else {
                console.log('subscriberRef.current != null')
            }
            subscriberRef.current?.onNext(makeTaskPayload(makeMessage(userCode, userCode, makeInitTaskMessage())))
            console.log("发送了消息")
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
                <MessageContext.Provider value={subscriberRef.current}>
                    <Dashboard></Dashboard>
                </MessageContext.Provider>
            </div>
        </>
    )
}

export default Chat
