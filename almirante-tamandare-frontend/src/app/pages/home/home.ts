import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { SectionsComponent } from '../../shared/components/sections/sections';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SectionsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild('profilePopup') profilePopup!: ElementRef; 
  @ViewChild('profileButton') profileButton!: ElementRef;

  profileOpen = false;

  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.profileOpen = !this.profileOpen;
  }

  @HostListener('document:click', ['$event'])
  closeOnclickOutside(event: MouseEvent) {
    if (!this.profileOpen) return;

    const clickedInsidePopup =
      this.profilePopup?.nativeElement.contains(event.target);

    const clickedProfileButton =
      this.profileButton?.nativeElement.contains(event.target);

    if (!clickedInsidePopup && !clickedProfileButton) {
      this.profileOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
