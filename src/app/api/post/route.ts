import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
type ResponseData = {
    message: string,
}
 
export default function POST(
  req: NextApiRequest,
) {
    try {
        const { type, longitude, latitude, details } = req.body;

        // await supabase
   
        return NextResponse.json({message: "Post successful!"})
    } catch (error) {
        return NextResponse.json({message: "Post unsuccessful!"})
    }
}