import { NextResponse } from 'next/server';
import WomboDream from 'dream-api';

export async function POST(request){
    const result = await request.json();
    const { question , style } = result;
    const response = await WomboDream.generateImage(style, question);
    const images =  response;
    return NextResponse.json({message: images})

}