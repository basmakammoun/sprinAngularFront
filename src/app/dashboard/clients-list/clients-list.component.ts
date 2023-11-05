import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../services/clients.service';
import Swal from 'sweetalert2';  

declare function deleteAjax(cin: any): any;

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {

    constructor(private clientsService: ClientsService, private router: Router) {
    }
    displayedColumns: string[] = ["cin","nom", "prenom", "actions"];
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

    supprimerAjax(cin: String): void{  
        deleteAjax(cin);
    }

    delete(id: String): void {
        this.clientsService.delete(id).subscribe(
            (response) => {
                window.location.reload()
            },
            (error) => {
                console.error(error);
            }
        );
    }
    clientsSheet(id: any) {

    }
    ngOnInit() {
        this.clientsService.getAll().subscribe((res: any) => {
            this.dataSource = res;
        },
            error => console.error(error)
        );
    }
}
