import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto p-8 bg-gradient-to-b from-cyan-600 to-cyan-800-700 text-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-8">Contact Information for Blood Donation</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">Member 1: Rahatunnesa Rahi</h3>
                    <ul className="mb-4">
                        <li className="mb-2">Position: Coordinator</li>
                        <li className="mb-2">Phone: <a href="tel:+8801879233846" className="text-blue-300">+8801879233846</a></li>
                        <li>Email: <a href="mailto:rahi@example.com" className="text-blue-300">Rahatunnesarahi@gmail.com</a></li>
                    </ul>
                    <p className="text-sm text-blue-300">Available Monday to Friday, 9am - 5pm</p>
                </div>
                <div className="bg-blue-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">Member 2: <br /> Ahmed Faiza</h3>
                    <ul className="mb-4">
                        <li className="mb-2">Position: Volunteer Coordinator</li>
                        <li className="mb-2">Phone: <a href="tel:+8801756868664" className="text-blue-300">+8801756868664</a></li>
                        <li>Email: <a href="mailto:ahmedfaiza0613@gmai.com" className="text-blue-400">ahmedfaiza0613@gmai.com</a></li>
                    </ul>
                    <p className="text-sm text-blue-400">Available on weekends and evenings</p>
                </div>
                <div className="bg-blue-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">Member 3: <br /> Azrin Karim</h3>
                    <ul className="mb-4">
                        <li className="mb-2">Position: Outreach Specialist</li>
                        <li className="mb-2">Phone: <a href="tel:+8801318865778" className="text-blue-300">+8801318865778</a></li>
                        <li>Email: <a href="mailto:azrinkarim86@gmail.com" className="text-blue-300">azrinkarim86@gmail.com</a></li>
                    </ul>
                    <p className="text-sm text-blue-400">Available for emergency assistance 24/7</p>
                </div>
            </div>
            <p className="mt-8 text-sm text-center text-black">For general inquiries, please email <a href="mailto:info@blooddonation.org" className="text-black">info@blooddonation.org</a></p>
        </div>
    );
};

export default Contact;