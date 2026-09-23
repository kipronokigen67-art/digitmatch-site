const required=['DATABASE_URL','QUEUE_URL','OBJECT_STORAGE_ENDPOINT','OBJECT_STORAGE_ACCESS_KEY','OBJECT_STORAGE_SECRET_KEY','SESSION_SECRET','ENCRYPTION_KEY','HOSTING_PROVIDER','DNS_PROVIDER'] as const;
export function configurationStatus(){const missing=required.filter(k=>!process.env[k]);return {production:process.env.NODE_ENV==='production',missing,ready:missing.length===0};}
export function assertProductionConfiguration(){const s=configurationStatus();if(s.production&&!s.ready)throw new Error(`Missing production configuration: ${s.missing.join(', ')}`);}
