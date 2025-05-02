import React from 'react'

export default function page() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
            <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

            <p className="text-sm text-gray-500 mb-6 text-center">Effective Date: May 1, 2025</p>

            <section className="space-y-6">
                <p>
                    This Privacy Policy outlines how <strong>Kaushik Verma</strong> collects, uses, and protects any information
                    that you provide when using this website: <a href="https://sommaire-kv.vercel.app" className="text-blue-600 underline">https://sommaire-kv.vercel.app</a>.
                </p>

                <p>
                    Kaushik Verma is committed to ensuring your privacy is protected. Should we ask you to provide information by
                    which you can be identified while using this site, rest assured it will only be used in accordance with this
                    policy.
                </p>

                <p>
                    We may update this policy periodically. Please review this page occasionally to stay informed about any
                    changes.
                </p>

                <h2 className="text-2xl font-semibold mt-10">Information We Collect</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Full name</li>
                    <li>Contact details, including email address</li>
                    <li>Demographic data such as postcode, preferences, and interests (if required)</li>
                    <li>Other relevant information for surveys, feedback, or promotional offers</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10">How We Use Your Information</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Internal record-keeping</li>
                    <li>Improving our products, content, and services</li>
                    <li>Sending promotional emails about updates, offers, or relevant content</li>
                    <li>Conducting market research via email, phone, or other means</li>
                    <li>Personalizing website experience based on your preferences</li>
                </ul>

                <p>
                    All information is stored securely and will not be shared unless required by law or with your explicit permission.
                </p>

                <h2 className="text-2xl font-semibold mt-10">Cookies and Tracking</h2>
                <p>
                    We use cookies to enhance your browsing experience. A cookie is a small text file placed on your device to
                    analyze web traffic and remember user preferences.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Track which pages are visited most frequently</li>
                    <li>Improve website usability and performance</li>
                </ul>
                <p>
                    Cookies do <strong>not</strong> provide access to your computer or any personal information unless you choose
                    to share it. You can decline cookies in your browser settings, although this may affect website functionality.
                </p>

                <h2 className="text-2xl font-semibold mt-10">Controlling Your Information</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Opt out on forms where personal data is collected</li>
                    <li>Contact us to withdraw consent at any time</li>
                </ul>
                <p>
                    We <strong>do not</strong> sell, lease, or distribute your personal information to third parties without your
                    permission, except when legally required.
                </p>

                <h2 className="text-2xl font-semibold mt-10">Contact Details</h2>
                <p>
                    If you have questions, concerns, or wish to update your personal information, please contact:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <p><strong>Kaushik Verma</strong></p>
                    <p>Email: <a href="mailto:kauhsikverma321@gmail.com" className="text-blue-600 underline">kauhsikverma321@gmail.com</a></p>
                    <p>Phone: +91 70617 61587</p>
                    <p>Address: KP-5(A), Campus 12, KIIT University, Bhubaneswar, Odisha - 751024</p>
                </div>
            </section>
        </div>
    );
};