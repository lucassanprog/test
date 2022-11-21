import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import {AuthService} from '../../core/services/auth.service';
import {ProductService} from '../../core/services/product.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import addBox from '@iconify/icons-mdi/add-box';
import exitToApp from '@iconify/icons-mdi/exit-to-app';
import edit from '@iconify/icons-mdi/edit';
import deleteForever from '@iconify/icons-mdi/delete-forever';
import administrator from '@iconify/icons-mdi/administrator';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addBoxIcon = addBox;
  exitIcon = exitToApp;
  editIcon =  edit;
  deleteIcon =  deleteForever;
  administratorIcon =  administrator;
  currentUser = {
    name: "",
    role:""
  }

  displayedColumns: string[] = ['ImageUrl', 'Title', 'Description', 'QuantitySold', 'Action'];
    dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              public auth: AuthService,
              public router: Router,
              private toastr: ToastrService,
              private products: ProductService,
              ) {}

  ngOnInit(): void {
    this.getProducts();
    let name = this.auth.getCurrentUser().user ;
    let role = this.auth.getCurrentUser().role;
    if(name !=null && role !=null){
      this.currentUser.name = name;
      this.currentUser.role = role;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProducts() {
    this.products.getProducts().subscribe(
        (data: any) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator =  this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }

  openDialog(): void {
     this.dialog.open(ModalComponent, {
      width: '500px',
      data: null,
    }).afterClosed().subscribe(val =>{
      if(val == 'Salvar'){
        this.getProducts();
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(ModalComponent, {
      width: '500px',
      data:row,
    }).afterClosed().subscribe(val =>{
      if(val == 'Atualizar'){
        this.getProducts();
      }
    })
  }
  deleteProduct(id: any){
    this.products.deletetProduct(id)
    .subscribe({
      next: (data: any) => {
        this.toastr.info(`Produto deletado`, '',{
          timeOut: 3000,
          progressBar: true,
        });
      },
      error: () =>{
        this.toastr.error(`Erro ao deletar produto `, '',{
          timeOut: 3000,
          progressBar: true,
        });
      }
    })
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
