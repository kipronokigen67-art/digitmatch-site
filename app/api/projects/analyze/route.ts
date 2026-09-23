import {NextResponse} from 'next/server';
import {z} from 'zod';
import {analyzeSource} from '@/lib/source';
const schema=z.object({source:z.string().trim().min(1).max(2048)});
export async function POST(req:Request){try{const body=schema.parse(await req.json());const result=analyzeSource(body.source);return NextResponse.json({ok:true,...result});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Invalid source'},{status:400});}}
