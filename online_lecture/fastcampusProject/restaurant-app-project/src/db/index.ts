// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

/**
 * 데이터베이스 연결과 선능 문제가 생길수 있습니다.
 * next dev실행 시 Node.js 캐시를 지웁니다.
 * 그러면 PrismaClient핫 리로딩으로 인해 매번 새 인스턴스가 초기화되어 데이터베이스에 대한 연결이 생성됩니다.
 * 각 PrismaClient인스턴스가 자체 연결 풀을 보유하기 때문에 데이터베이스 연결이 빠르게 소진될 수 있습니다.
 * 그래서 아래로직은 PrismaClient를 전역적으로 사용하기위한 정의
 */
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
