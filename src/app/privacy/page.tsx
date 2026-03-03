import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32 selection:bg-zinc-200">
            <div className="max-w-3xl mx-auto px-4 md:px-12 prose prose-zinc prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:font-sans prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-black">

                <h1>Privacy Policy</h1>
                <p className="text-sm font-medium tracking-widest uppercase text-zinc-400 mb-12">
                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <p>
                    Welcome to Coseli. We respect your privacy and are committed to protecting your personal data.
                    This Privacy Policy will inform you as to how we look after your personal data when you visit our website
                    (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>

                <p>
                    This policy is designed to comply with the <strong>Privacy Act, 2075 (2018)</strong> and the <strong>Electronic Transactions Act, 2063 (2006)</strong> of Nepal.
                </p>

                <h2>1. Important Information and Who We Are</h2>
                <p>
                    Coseli is the controller and responsible for your personal data (collectively referred to as "Coseli", "we", "us" or "our" in this Privacy Policy).
                    If you have any questions about this Privacy Policy, including any requests to exercise your legal rights, please contact us using the details provided below.
                </p>

                <h2>2. The Data We Collect About You</h2>
                <p>
                    Personal data, or personal information, means any information about an individual from which that person can be identified.
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul>
                    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                    <li><strong>Contact Data</strong> includes delivery address in Nepal, email address, and telephone/mobile numbers.</li>
                    <li><strong>Financial Data</strong> includes payment processing details. Note that for transactions processed via Esewa or Khalti, your secure financial data is handled directly by these respective gateways and we do not store your full financial credentials.</li>
                    <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                    <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browsing behavior, and other technology on the devices you use to access this website.</li>
                </ul>
                <p>
                    In accordance with the <em>Privacy Act, 2075</em>, we only collect personal data with your explicit consent and only to the extent necessary to provide our services.
                </p>

                <h2>3. How We Use Your Personal Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul>
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your shoe order).</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal or regulatory obligation under Nepalese law.</li>
                </ul>

                <h2>4. Data Security</h2>
                <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed, adhering to the standards expected under the <em>Electronic Transactions Act, 2063</em>.
                    In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>

                <h2>5. Data Retention</h2>
                <p>
                    We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements in Nepal.
                </p>

                <h2>6. Your Legal Rights</h2>
                <p>
                    Under the <em>Privacy Act, 2075</em>, you have rights under data protection laws in relation to your personal data. You have the right to:
                </p>
                <ul>
                    <li>Request access to your personal data.</li>
                    <li>Request correction of your personal data.</li>
                    <li>Request erasure of your personal data.</li>
                    <li>Object to processing of your personal data.</li>
                    <li>Withdraw consent at any time where we are relying on consent to process your personal data.</li>
                </ul>
                <p>
                    If you wish to exercise any of the rights set out above, please contact our support team.
                </p>

                <h2>7. Contact Details</h2>
                <p>
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                    <br />
                    Email: privacy@coseli.com.np
                    <br />
                    Phone: +977-1-XXXXXXX
                    <br />
                    Address: Kathmandu, Nepal
                </p>
            </div>
        </div>
    );
}
