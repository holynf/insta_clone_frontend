import { NextResponse } from 'next/server';

export function middleware(req) {
    const userAgent = req.headers.get('user-agent') || '';

    const botKeywords = [
        'bot', 'crawl', 'slurp', 'spider', 'WhatsApp', 'TelegramBot', 'Slackbot',
        'Viber', 'Discordbot', 'SkypeUriPreview'
    ];

    if (botKeywords.some(keyword => userAgent.toLowerCase().includes(keyword.toLowerCase()))) {
        console.log('Bot detected:', userAgent);
        return new NextResponse('Bot detected, no action taken', { status: 200 });
    }

    return NextResponse.next();
}
