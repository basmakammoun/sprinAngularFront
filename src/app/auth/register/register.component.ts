import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
  erroalert(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Mot de passe ou nom d\'utilisateur incorrect' 
    })
  }
  alertWithSuccess(){
    Swal.fire('Succès', 'Compte ajouté avec succès!', 'success')
  }
  onSubmit(): void {
    const objectToSubmit = { ...this.form.value};
    // Pass the username and password to the login service
    this.loginService.register(objectToSubmit).subscribe(
      (response) => {
        this.alertWithSuccess()
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle the login error logic here
        this.erroalert()
      }
    );
  }
}
