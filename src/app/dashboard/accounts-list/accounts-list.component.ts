import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AccountsService } from 'src/app/services/accounts.service';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {
    currentItemID: String = "";
    constructor(private accountsService: AccountsService, private router: Router,private activatedRoute: ActivatedRoute) {
    }
    displayedColumns: string[] = ["rib","solde", "actions"];
    dataSource = new MatTableDataSource();
    filterValue = '';
    baseUrl = window.location.href

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    }

    supprimer(id: String){  
        Swal.fire({  
          title: 'Êtes-vous sûr de vouloir supprimer?',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonText: 'oui',  
          cancelButtonText: 'Non'  
        }).then((result) => {  
          if (result.value) {  
           this.delete(id)
          } else if (result.dismiss === Swal.DismissReason.cancel) { }  
        })  
    }

    delete(id: String): void {
        this.accountsService.delete(id).subscribe(
            (response) => {
                window.location.reload()
            },
            (error) => {
                console.error(error);
            }
        );
    }
    accountsSheet(id: any) {

    }
    ngOnInit() {
        this.currentItemID = this.activatedRoute.snapshot.params["cin"];
        this.accountsService.getAll(this.currentItemID).subscribe((res: any) => {
            this.dataSource = res;
        },
            error => console.error(error)
        );
    }
}
