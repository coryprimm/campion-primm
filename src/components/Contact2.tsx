import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok || result.error) {
                throw new Error(result.error || 'Failed to send message');
            } else {
                setSuccess('Your message has been sent successfully!');
            }
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                message: '',
            });
        } catch (err) {
            setError(`Failed to send message. Please try again later. ${err}`);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 font-[Montserrat] ">
            <div className="max-w-2xl w-full bg-black p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-white pt-[40px] sm:pt-0">
                    Let's Get to Work!{' '}
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Your next project is just a message away. Whether you have a
                    question, want to brainstorm ideas, or are ready to jump
                    right in, I'm here to help. Don't hesitate—reach out today,
                    and let's create something amazing together! Email me and
                    let's get started.
                </p>

                <form className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                First Name (required)
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Type name here..."
                                className="mt-1 p-3 w-full bg-[#2C2C2C] text-white border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Last Name (required)
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                className="mt-1 p-3 w-full bg-[#2C2C2C] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-400">
                            Email (required)
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-3 w-full bg-[#2C2C2C] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-400">
                            Message (required)
                        </label>
                        <textarea
                            name="message"
                            className="mt-1 p-3 w-full bg-[#2C2C2C] text-white border border-gray-600 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-white text-black px-6 py-3 rounded-full text-lg font-semibold border-2 border-gray-600 hover:bg-gray-700 transition"
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
}
