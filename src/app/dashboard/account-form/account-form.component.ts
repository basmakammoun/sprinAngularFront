import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent {

  constructor(private location: Location,private formBuilder: FormBuilder, private accountsService :AccountsService , private clientsService: ClientsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initForm();
  }
  form!: FormGroup;
  files!: FormArray;
  currentItemID: String = "";
  idCompte: String = "";

  initForm(): void {
    this.form = this.formBuilder.group({
      solde: [null, Validators.required],
      id_client: [this.currentItemID, Validators.required]
    });
  }

  initFormCompte(account: any): void {
    this.form = this.formBuilder.group({
      rib :[this.idCompte, Validators.required],
      solde: [account.solde, Validators.required],
      id_client: [this.currentItemID, Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentItemID = this.activatedRoute.snapshot.params["cin"];
    this.idCompte = this.activatedRoute.snapshot.params["id"];

    if (!!this.idCompte) {
      this.accountsService.getById(this.idCompte).subscribe((item1) => { this.initFormCompte(item1) });
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
    formData.append('rib', this.form.value.rib);
    formData.append('solde', this.form.value.solde);
    formData.append('id_client', this.form.value.id_client);
    if (!this.idCompte) {
      this.accountsService.add(formData).subscribe(
        (response) => {
          this.location.back();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.accountsService.update(this.idCompte, formData).subscribe(
        (response) => {
          this.location.back();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}

