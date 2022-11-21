import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../../../core/services/product.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public form!: FormGroup;
  public actionButton: string = "Salvar";

  constructor(
    public dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private fb: FormBuilder,
    private products: ProductService,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      url: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(150),
          Validators.required,
        ]),
      ],
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(500),
          Validators.required,
        ]),
      ],
      amount: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],

    });
    if(this.editData){
      this.actionButton =  "Atualizar";
      console.log(this.editData.id);
      this.form.controls['url'].setValue(this.editData.imageUrl);
      this.form.controls['title'].setValue(this.editData.title);
      this.form.controls['description'].setValue(this.editData.description);
      this.form.controls['amount'].setValue(this.editData.quantitySold);
    }
  }

  close() {
    this.dialog.close();
  }

  addProduct(){
    if(!this.editData){
      if(this.form.valid){
        this.products.postProduct(this.form.value)
        .subscribe({
          next:(data: any)=>{
            this.toastr.info(`Produto adicionado`, '',{
              timeOut: 3000,
              progressBar: true,
            });
            this.form.reset();
            this.dialog.close('Salvar');
          },
          error:()=>{
            this.toastr.info(`Erro ao adicionar produto`, 'Erro',{
              timeOut: 3000,
              progressBar: true,
            });
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.products.putProduct(this.form.value, this.editData.id)
    .subscribe({
      next: (data: any) => {
        this.toastr.info(`Produto id ${this.editData.id} atualizado`, '',{
          timeOut: 3000,
          progressBar: true,
        });
        this.form.reset();
        this.dialog.close('Atualizar');
      },
      error:()=>{
        this.toastr.info(`Erro ao atualizar produto`, 'Erro',{
          timeOut: 3000,
          progressBar: true,
        });
      }
    })
  }

  submit() {
    this.dialog.close(this.form.value);
  }
}
