import {Queue, Worker} from 'bullmq';
import {configurationStatus} from '../lib/config';
const connection={url:process.env.QUEUE_URL||''};
export const deploymentQueue=new Queue('primehost-deployments',{connection});
export function startWorker(){if(!configurationStatus().ready)throw new Error('Worker cannot start: production configuration is incomplete');return new Worker('primehost-deployments',async job=>{console.log(JSON.stringify({event:'deployment_job_started',deploymentId:job.data.deploymentId,jobId:job.id}));/* Fetch source, sandbox build, immutable upload, health check, pointer activation. Provider adapters belong here. */},{connection,concurrency:Number(process.env.WORKER_CONCURRENCY||2)});}
