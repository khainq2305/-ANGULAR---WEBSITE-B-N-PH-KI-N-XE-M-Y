import { Injectable } from '@angular/core'; 


import { CanActivate, Router } from '@angular/router'; 


import { ToastrService } from 'ngx-toastr'; 


@Injectable({
  providedIn: 'root' 
  
})
export class AdminGuard implements CanActivate {
  

  constructor(
    private router: Router, 
    private toastr: ToastrService 
  ) {}

  canActivate(): boolean {
   

    const token = localStorage.getItem('token'); 
    

    const role = Number(localStorage.getItem('role')); 


    if (!token) {
      
      this.router.navigate(['/dang-nhap']); 
     
      return false; 
     
    }

    if (role !== 1) {
  
      this.toastr.warning('Bạn không có quyền truy cập!', 'Cảnh báo'); 
      // Hiện cảnh báo

      this.router.navigate(['/']); 
 
      return false; 
    }

    return true; 
  
  }
}
