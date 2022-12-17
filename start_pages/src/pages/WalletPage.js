import React, { useEffect, useState } from "react";
import "./WalletPageStyle.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import WalletActivity from "./WalletActivity";
import Button from "../components/button";


const Walletpage = () => {

    const navigate = useNavigate();
    const goBack = () => navigate("/landing")
    const date = new Date();
    const [text, setText] = useState()
    const [user, setUser] = useState({ wallet_id: { amount: 0 } })
    const [activity, setActivity] = useState()
    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]

    function parseJwt(t) {
        if (!t) { return; }
        const base64Url = t.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }


    const loadUser = () => {
        axios.get("http://127.0.0.1:8000/user/" + parseJwt(token).user_id, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            setUser(response.data)
            return response
        }).then((response) => {
            axios.get("http://127.0.0.1:8000/walletactivity/" + response.data.id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((resp) => {
                setActivity(resp.data)
            })
        });
    }

    const addFunds = () => {
        if (parseFloat(text) <= user.bank_account.amount) {
            axios(
                {
                    method: 'put',
                    url: 'http://127.0.0.1:8000/wallet/' + user.wallet_id.wallet_id,
                    data: {
                        amount: user.wallet_id.amount + parseFloat(text)
                    }
                }
            )
            axios(
                {
                    method: 'put',
                    url: 'http://127.0.0.1:8000/bank/' + user.bank_account.account_number,
                    data: {
                        amount: user.bank_account.amount - parseFloat(text)
                    }
                }
            )
            axios.post("http://127.0.0.1:8000/walletactivity/", {
                user_id: user.id,
                wallet_id: user.wallet_id.wallet_id,
                transaction: 0,
                amount: text,
                time: date
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setText(0)
            window.location.reload(false);
        }
        else {
            window.alert("You only have £" + user.bank_account.amount + " in your bank account")
        }
    }

    useEffect(() => {
        loadUser()
    }, [text]);

    return (
        <div className="form">
            <h1>My wallet</h1>
            <div className="balance-wrapper">
                <h3>TOTAL BALANCE</h3>
                <h1>£{user.wallet_id.amount}</h1>
                <input type="number" id="totalbalance" className="no-outline" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <Button title="Go Back" handleSubmit={goBack} />
            <Button title="Add Balance" handleSubmit={addFunds} />

            <br />
            <br />
            <div className="hr"></div>
            <div className="activity-wrapper">Your Activity:</div>
            <WalletActivity activity={activity} />
        </div >
    )

};



export default Walletpage;

