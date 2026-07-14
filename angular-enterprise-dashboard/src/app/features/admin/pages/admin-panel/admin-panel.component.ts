import { Component } from '@angular/core';
import { UserFormDialogComponent } from "../../../users/components/user-form-dialog/user-form-dialog.component";

@Component({
  selector: 'app-admin-panel',
  imports: [UserFormDialogComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
