import Redis from 'ioredis';

const useRedis = process.env.USE_REDIS === 'true' ? true : false;
const host = process.env.REDIS_HOST || 'localhost';
const port = parseInt(process.env.REDIS_PORT || '6379');

const redisInstance = (host: string, port: number) => {
    if (!useRedis) {
        return;
    }

    return new Redis({
        host,
        port,
        connectTimeout: 1000,
    });
};

export const redisClient = redisInstance(host, port);
