import React, { useState } from "react";
import QrReader from 'react-qr-scanner';
import { useNavigate } from "react-router-dom";

const QRCode = (props) => {
    const navigate = useNavigate()
    const [delay, setDelay] = useState(1000)
    const [result, setResult] = useState("No result")

    //this.handleScan = this.handleScan.bind(this)
    const handleScan = (data) => {
        if (data != null) {
            setResult(data.text)
            console.log(data)
            navigate(props.goTo, { state: { data: data.text } })
        }
    }
    const handleError = (err) => {
        console.error(err)
    }
    const previewStyle = {
        height: '100',
        width: '100'
    }
    return (
        <div>
            <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    )
}

export default QRCode;