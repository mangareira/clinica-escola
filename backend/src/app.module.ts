import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoginModule } from './module/login/login.module';
import { UsersModule } from './module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { Middleware } from './common/middleware/middleware.middleware';
import { UsersController } from './module/users/users.controller';
import { PatientModule } from './module/patient/patient.module';
import { ServiceModule } from './module/service/service.module';
import { PatientController } from './module/patient/patient.controller';
import { ServiceController } from './module/service/service.controller';
import { SpecialtyModule } from './module/specialty/specialty.module';
import { DemandModule } from './module/demand/demand.module';
import { SpecialtyController } from './module/specialty/specialty.controller';
import { DemandController } from './module/demand/demand.controller';
import { CashRegisterModule } from './module/cash-register/cash-register.module';
import { CashTransactionModule } from './module/cash-transaction/cash-transaction.module';
import { CashRegisterController } from './module/cash-register/cash-register.controller';
import { CashTransactionController } from './module/cash-transaction/cash-transaction.controller';
import { AppointmentModule } from './module/appointment/appointment.module';
import { AppointmentSessionModule } from './module/appointment-session/appointment-session.module';
import { AppointmentPaymentModule } from './module/appointment-payment/appointment-payment.module';
import { AppointmentController } from './module/appointment/appointment.controller';
import { AppointmentSessionController } from './module/appointment-session/appointment-session.controller';
import { AppointmentPaymentController } from './module/appointment-payment/appointment-payment.controller';

@Module({
  imports: [
    LoginModule,
    UsersModule,
    PatientModule,
    ServiceModule,
    SpecialtyModule,
    DemandModule,
    CashRegisterModule,
    CashTransactionModule,
    AppointmentModule,
    AppointmentSessionModule,
    AppointmentPaymentModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY!,
      signOptions: {
        algorithm: 'HS512',
      },
      verifyOptions: {
        algorithms: ['HS512'],
        ignoreExpiration: false,
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes(UsersController, PatientController, ServiceController, SpecialtyController, DemandController, CashRegisterController, CashTransactionController, AppointmentController, AppointmentSessionController, AppointmentPaymentController, {
      path: '/login/verify',  
      method: RequestMethod.GET,
    });
  }
}
