import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './crud/read/read.component';
import { UpdateComponent } from './crud/update/update.component';
import { CreateComponent } from './crud/create/create.component';
import { LayoutComponent } from './components/layout/layout.component';
const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'crud',
        component:ReadComponent
      },
      {
        path:"",
        redirectTo:'/crud',
        pathMatch:'full'
      },
      {
        path:'crud/add',
        component:CreateComponent
      },
      {
        path:'crud/update/:id',
        component:UpdateComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
