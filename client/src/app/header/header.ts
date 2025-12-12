import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'boat-manager-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterLinkWithHref]
})
export class HeaderComponent {
  private router = inject(Router);

  logout(): void {
    // TODO: Implement logout logic (e.g., clear auth token, call logout endpoint)
    this.router.navigate(['/login']);
  }
}
