import Dashboard from "./Dashboard.tsx";
import {
    EventMessage,
    EventType,
    MahjongChangeResponseMessage,
    MahjongEndResponseMessage,
    MahjongErrorResponseMessage,
    MahjongInitResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongMessage,
    MahjongMessageEvent,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage,
    RoomChangePositionMessage,
    RoomInitMessage,
    RoomUserMessage,
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
import {Payload} from "rsocket-types";
import {Flowable} from "rsocket-flowable";
import {useCallback, useContext, useEffect} from "react";
import {MessageChangeContext} from '../config/MessageContext.ts';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Play from "./play/Play.tsx";
import UserForm from "./user/UserForm.tsx";
import {UserContext} from "../config/UserContext.ts";
import {WS_URL} from "../config/RequestConfig.ts";
import {RoomChangeContext} from "../config/RoomContext.ts";

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

    const dispatch = useContext(TableChangeContext)!
    const messageDispatch = useContext(MessageChangeContext)!
    const roomDispatch = useContext(RoomChangeContext)!
    const user = useContext(UserContext)

    const token = user?.token;
    const userCode = user?.userCode;


    const processMessage = useCallback((payload: Payload<Buffer, Buffer>) => {
        const message = JSON.parse(payload.data?.toString() as string);
        if (message.message != null && message.message.type == ServerMessageType.MAHJONG && userCode !== null && userCode != '') {
            const messageContent = message.message.content as MahjongMessage;
            let body
            console.log(message)
            switch (messageContent.event) {
                // 解决初始化
                case MahjongMessageEvent.INIT_RESPONSE:
                    body = messageContent.content as MahjongInitResponseMessage;
                    console.log('收到初始化响应，出牌人为')
                    dispatch({type: 'INIT', payload: body, userCode: userCode!})
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
                    dispatch({type: 'END', payload: body, userCode: userCode!})
                    console.log('收到结束响应，响应人为' + body.winner)
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
        if (message.message != null && message.message.type == ServerMessageType.EVENT && userCode !== null && userCode != '') {
            const eventContent = message.message.content as EventMessage;
            let body
            switch (eventContent.event) {
                case EventType.SELF_JOIN_ROOM:
                    body = eventContent.content as RoomInitMessage;
                    roomDispatch({type: 'SELF_JOIN_ROOM', payload: body})
                    break
                case EventType.OTHER_JOIN_ROOM:
                    body = eventContent.content as RoomUserMessage;
                    roomDispatch({type: 'OTHER_JOIN_ROOM', payload: body})
                    break
                case EventType.LEAVE_ROOM:
                    body = eventContent.content as RoomUserMessage;
                    roomDispatch({type: 'LEAVE_ROOM', payload: body})
                    break
                case EventType.CHANGE_POSITION:
                    body = eventContent.content as RoomChangePositionMessage;
                    roomDispatch({type: 'CHANGE_POSITION', payload: body})
                    console.log('收到切换位置事件，切换位置为' + body.position)
            }
        }
    }, [dispatch, roomDispatch, userCode])


    useEffect(() => {
        if (userCode == null || userCode == '' || token == null || token == '') {
            console.log('userCode为空，无法建立连接')
            return
        }
        const connInfo = {
            token,
            platform: 'WEB',
            userCode
        }
        const requestFlowable = new Flowable<Payload<Buffer, Buffer>>((subscriber) => {
            messageDispatch({type: 'SET', payload: subscriber})
            subscriber.onSubscribe({
                request: (n) => {
                    console.log('request', n);
                    console.log("发送了消息，n = " + n)
                },
                cancel: () => {
                    // 取消task stream
                    messageDispatch({type: 'CLEAR', payload: null});
                    subscriber.onComplete();
                    console.log('cancel');
                },
            });
            // 这里可以开始 emit 初始数据或在外部通过 subscriberRef 来 emit 数据
        });
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
                    url: WS_URL,
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
                        onComplete: () => console.log('Request-stream completed'),
                        onError: error =>
                            console.error(`Request-stream error:${error.message}`),
                        onNext: value => processMessage(value),
                        onSubscribe: sub => sub.request(maxRSocketRequestN),
                    });
                socket.requestChannel(requestFlowable).subscribe({
                    onComplete: () => console.log('Request-channel completed'),
                    onError: error =>
                        console.error(`Request-channel error:${error.message}`),
                    onNext: () => {
                    },
                    onSubscribe: sub => sub.request(maxRSocketRequestN),
                });

            },
            error => {
                // handle connection error
                // eslint-disable-next-line no-console
                console.log('error:', error);
            },
        );
    }, [user, processMessage, userCode, token, messageDispatch])


    return (
        <>
            <BrowserRouter>
                <Dashboard></Dashboard>
                <Routes>
                    <Route path="/" element={<Play/>}></Route>
                    <Route path="/room" element={<Play/>}></Route>
                    <Route path="/chat" element={"聊天"}></Route>
                    <Route path="/history" element={"战绩"}></Route>
                    <Route path="/login" element={<UserForm/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Chat
