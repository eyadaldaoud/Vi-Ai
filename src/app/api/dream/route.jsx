import { NextResponse } from 'next/server';
import WomboDream from 'dream-api';

export async function POST(request){
    const result = await request.json();
    const styleS = await WomboDream.printStyles()
    console.log(styleS)
    const { question , style } = result;
    const response = await WomboDream.generateImage(style, question);
    const images =  await response;

    const responseBody = { message: images };
    return new NextResponse(JSON.stringify(responseBody), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
