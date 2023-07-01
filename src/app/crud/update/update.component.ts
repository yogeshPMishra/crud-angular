import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule,NgForm } from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import {RouterLink, Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  standalone:true,
  imports:[
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    RouterLink
  ]
})
export class UpdateComponent {
  id:any= "";
  data:any = "";
  formdata = {
    name:"",
    email:"",
    phone:"",
    comment:""
  }
  message:any;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private CrudService: CrudService,
    private ActivatedRoute:ActivatedRoute
    ){};

  ngOnInit(){
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.CrudService.getone(this.id).subscribe((response)=>{
        this.data = response;
        this.formdata = this.data.data;
    },(error)=>{
        console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  update(){
      this.CrudService.update(this.id,this.formdata).subscribe((response)=>{
          this.message = response;
          this.router.navigate(['/crud']);
          this.openSnackBar(this.message.message,"close");
      },(error)=>{
          this.message = error;
          if(this.message.status == 400){
          this.openSnackBar(this.message.error.message,"close");
          }else{
            this.openSnackBar("Internal Server Error !!!","close");
          }
      });
  }

}
