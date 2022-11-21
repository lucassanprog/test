import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../core/helpers/auth.interceptor';
@NgModule({
 providers: [
  AuthInterceptor,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
 ],
})
export class InterceptorModule {}
