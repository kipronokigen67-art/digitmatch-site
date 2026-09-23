import {NextResponse} from 'next/server';
import {configurationStatus} from '@/lib/config';
export async function GET(){const config=configurationStatus();return NextResponse.json({status:config.ready?'ready':'degraded',services:{database:Boolean(process.env.DATABASE_URL),queue:Boolean(process.env.QUEUE_URL),storage:Boolean(process.env.OBJECT_STORAGE_ENDPOINT&&process.env.OBJECT_STORAGE_ACCESS_KEY),hosting:Boolean(process.env.HOSTING_PROVIDER),dns:Boolean(process.env.DNS_PROVIDER)},missing:config.missing}, {status:config.ready?200:503});}
