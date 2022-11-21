import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AuthService} from '../../core/services/auth.service'
import user from '@iconify/icons-mdi/user';
import lock from '@iconify/icons-mdi/lock';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userIcon = user;
  lockIcon = lock;
  public form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,

  ) {
    this.form = fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  submit() {
      this.http
      .post(`${environment.apiUrl}login`, this.form.value)
      .subscribe(
        (data: any) => {
          this.auth.logged(data);
          this.router.navigate(['home']);
          this.toastr.info(`Logado como ${data.role}`, 'Login',{
            timeOut: 3000,
            progressBar: true,
          });
        },
        (error) => {
          this.toastr.error('Erro ao fazer o login', 'Login',{
            timeOut: 3000,
            progressBar: true,
          });
        }
      );



}
}
