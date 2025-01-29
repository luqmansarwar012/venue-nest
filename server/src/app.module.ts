import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { IsUniqueFieldConstraint } from './utility/validators/isUniqueField-decorator';
import { HelperModule } from './helper/helper.module';
import { IsNotAdminRoleConstraint } from './utility/validators/isNotAdminRole-decorator';
import { constants } from './utils/constants';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(constants.MONGODB_URI),
    UserModule,
    HelperModule,
    AuthModule,
  ],
  controllers: [],
  providers: [IsUniqueFieldConstraint, IsNotAdminRoleConstraint],
})
export class AppModule {}
