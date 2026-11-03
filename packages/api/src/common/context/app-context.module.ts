import { Module } from '@nestjs/common';
import { AppContextProvider, AppContextSingleton } from './app.context';

@Module({
  providers: [AppContextProvider, AppContextSingleton],
  exports: [AppContextProvider, AppContextSingleton],
})
export class AppContextModule {}
