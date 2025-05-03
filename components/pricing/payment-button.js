'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Script from 'next/script';

const PaymentButton = ({ email, razorpayKey }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleScriptLoad = () => {
        setIsScriptLoaded(true);
    };

    const handlePayment = async () => {
        if (!isScriptLoaded) {
            console.error("Razorpay script not loaded yet");
            return;
        }

        try {
            setIsProcessing(true);

            const res = await fetch('/api/payment/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const resData = await res.json();

            if (!resData.success) {
                throw new Error(resData.error || "Failed to create order");
            }

            const order = resData.order;

            const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: 'Upgrade to Pro',
                order_id: order.id,
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                            email: email,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        window.location.href = '/dashboard';
                    }
                },
                prefill: {
                    email: email
                },
                theme: {
                    color: '#be123c'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={handleScriptLoad}
                strategy="lazyOnload"
            />
            <button
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-rose-900 bg-linear-to-r from-rose-800 to-rose-500 py-2 text-white duration-1000 hover:from-rose-500 hover:to-rose-800"
                onClick={handlePayment}
                disabled={!isScriptLoaded || isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Try Now'} {!isProcessing && <ArrowRight size={18} />}
            </button>
        </>
    );
};

export default PaymentButton;