import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { IsUniqueFieldConstraint } from './utility/validators/isUniqueField-decorator';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/venue_nest_app'),
    UserModule,
  ],
  controllers: [],
  providers: [IsUniqueFieldConstraint],
})
export class AppModule {}
