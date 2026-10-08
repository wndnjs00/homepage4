import 'server-only';

import { PrismaClient } from '@prisma/client';

// PrismaClient 싱글턴 (개발 중 HMR 로 연결이 늘어나는 것을 방지)
// 현재 공개 페이지는 정적 데이터를 읽으므로 이 클라이언트는 관리자 기능 도입 시 사용한다
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
