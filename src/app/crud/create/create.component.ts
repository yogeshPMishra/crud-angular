import {Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule,NgForm } from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import { Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone:true,
  imports:[
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class CreateComponent {
  @ViewChild('myForm') myForm!: NgForm;
  formdata = {
    name:"",
    email:"",
    phone:"",
    comment:""
  }
  message :any= "";

  constructor( private _snackBar: MatSnackBar,private router: Router, private CrudService: CrudService, private ActivatedRoute:ActivatedRoute){}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  create =()=>{
    this.CrudService.create(this.formdata).subscribe((response)=>{
      console.log('Delete success', response);
          this.message = response;
          this.openSnackBar(this.message.message,"close");
          this.myForm.resetForm();
          this.router.navigate(['/crud']);
    },(error)=>{
        this.message = error;
        if(this.message.status == 400){
          this.openSnackBar(this.message.error.message,"close");
        }
        else{
          this.openSnackBar("Internal Server Error !!!","close");
        }
    })
  }


}
