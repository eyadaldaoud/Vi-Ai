import { NextResponse } from 'next/server';
import WomboDream from 'dream-api'

export async function POST(request){
    const result = await request.json();
    const { question } = result;
    const response = await WomboDream.generateImage(1, question);
    const images =  response;
    return NextResponse.json({message: images})

}