// app/api/send/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// @ts-ignore
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
    const { first_name, last_name, email, message } = await req.json();

    try {
        const response = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['primm@me.com'],
            subject: `New Contact Form Submission from ${first_name} ${last_name}`,
            text: `
         Name: ${first_name} ${last_name}
         Email: ${email}
         Message: ${message}
       `,
        });

        // Check if the response is successful
        if (response.error) {
            console.error('Resend API error:', response.error);
            throw new Error(response.error.message || 'Failed to send email');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
