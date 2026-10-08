import 'server-only';

// 서버 공통 에러. 사용자에게는 message(일반화된 문구)만 노출한다
export class AppError extends Error {
  constructor(
    message: string,
    readonly code: 'NOT_FOUND' | 'BAD_REQUEST' | 'INTERNAL',
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = '요청하신 정보를 찾을 수 없습니다.') {
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}
