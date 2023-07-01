import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CrudService} from '../../services/crud.service';
import {RouterLink, Router,ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  standalone:true,
  imports:[
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSnackBarModule,
    NgIf
  ]
})
export class ReadComponent {
  displayedColumns = ['name','email','phone','comment','action'];
  lists :any;
  dataSource:any[]=[];
  message :any;
  constructor( private _snackBar: MatSnackBar,private router: Router, private CrudService: CrudService, private ActivatedRoute:ActivatedRoute){};
  ngOnInit(){
    this.fetchData();
  }
  fetchData = ()=>{
    this.CrudService.gets().subscribe((response)=>{
      this.lists = response;
      this.dataSource = this.lists.data;
    },(error)=>{
        this.dataSource = [];
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  deletedata = (id:any)=>{
     this.CrudService.delete(id).subscribe((response)=>{
        this.message = response;
        this.fetchData();
        this.openSnackBar(this.message.message,"close");
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
