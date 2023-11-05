import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  constructor(private formBuilder: FormBuilder, private clientsService: ClientsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initForm();
  }
  form!: FormGroup;
  files!: FormArray;
  currentItemID: String = "";

  initForm(): void {
    this.form = this.formBuilder.group({
      cin: [null, Validators.required],
      nom: [null, Validators.required],
      prenom: [null, Validators.required]
    });
  }

  initFormClient(client: any): void {
    this.form = this.formBuilder.group({
      cin: [client.cin, Validators.required],
      nom: [client.nom, Validators.required],
      prenom: [client.prenom, Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentItemID = this.activatedRoute.snapshot.params["cin"];
    if (!!this.currentItemID) {
      this.clientsService.getById(this.currentItemID).subscribe((item1) => { this.initFormClient(item1) });
    } else {
      this.initForm();
    }
  }

  selectedFiles: File[] = [];

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFiles[0] = file;
      if (this.files && this.files.controls.length > 0) {
        this.files.controls[0].setValue(file.name);
      }
    }
  }

  onSub(): void {
    const formData = new FormData();
    formData.append('cin', this.form.value.cin);
    formData.append('nom', this.form.value.nom);
    formData.append('prenom', this.form.value.prenom);
    if (!!this.currentItemID) {
      this.clientsService.update(this.currentItemID, formData).subscribe(
        (response) => {
          this.router.navigate(['/client']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.clientsService.add(formData).subscribe(
        (response) => {
          this.router.navigate(['/client']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}

