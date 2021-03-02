import React, {useEffect,useRef, useState} from 'react';

export default function AppWs() {
    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);
    const WebSocket = require('ws')
    useEffect(() => {
        /* ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        }; */
        const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        wss.onmessage = (msg) => console.log(msg.data)
        wss.onopen = () => {
        // API keys setup here (See "Authenticated Channels")
        }
    }, []);

   /*  useEffect(() => {
        if (!ws.current) return;
        const inputDetails = {
            "meta":{ event: 'subscribe', channel: "book" , symbol: "tBTCUSD"}
        }
        
        const inputPayload = [0, 'on', null, inputDetails] // Note how the payload is constructed here. It consists of an array starting with the CHANNEL_ID, TYPE, and PLACEHOLDER and is followed by the inputDetails object.
        ws.on('message', (msg) => {     // The 'message' event is called whenever the ws recieves ANY message
        let response = JSON.parse(msg)
        if (response[1] === 'ws') { //Payload is sent when the wallet snapshot is received. Sending an order before the snapshot can result in a tradable balance error
            ws.send(JSON.stringify(inputPayload));// Submit payload for input
        } 
        console.log(msg); // ALL ws receipts will be logged to console
    })
        //Websocket Listener
        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log("e", message);
           
        };
    }, [isPaused]); */

    return (
        <div>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
}