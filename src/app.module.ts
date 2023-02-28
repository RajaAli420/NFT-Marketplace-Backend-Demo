import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CollectionModule } from './collection/collection.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    RoleModule,
    PrismaModule,
    UserModule,
    AuthModule,
    CollectionModule,
    NftModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
