import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Thêm dòng này
@Component({
  selector: 'app-client-account-layout',
  imports: [RouterModule],
  templateUrl: './client-account-layout.component.html',
  styleUrl: './client-account-layout.component.scss'
})
export class ClientAccountLayoutComponent {

}
