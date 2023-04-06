import { NextResponse } from 'next/server';
import WomboDream from 'dream-api'

export async function POST(request){
    const resault = await request.json();
    const { question } = resault;
    const response = await WomboDream.generateImage(1, question);
    const images =  response;
    return NextResponse.json({message: images})

}