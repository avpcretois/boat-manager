import { Component, ChangeDetectionStrategy, inject, signal, computed } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "../app/auth/authentication.service";

@Component({
  selector: 'boat-manager-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterLink]
})
export class HeaderComponent {
  private router = inject(Router);
  authenticationService = inject(AuthenticationService);

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
