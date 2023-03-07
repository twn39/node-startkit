import { Module } from '@nestjs/common';
import { fetch, request } from 'undici';

export const FETCH = 'UNDICI_FETCH';
export const REQUEST = 'UNDICI_REQUEST';

@Module({
  providers: [
    {
      provide: FETCH,
      useValue: fetch,
    },
    {
      provide: REQUEST,
      useValue: request,
    },
  ],
  exports: [FETCH, REQUEST],
})
export class HttpModule {}
