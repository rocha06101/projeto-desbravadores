import { Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from '../../shared/components/sections/sections';
@Component({
  selector: 'app-home',
  imports: [CommonModule, SectionsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  @ViewChild('profilePopup') profilePopup!: ElementRef; 
  @ViewChild('profileButton') profileButton!: ElementRef;
  profileOpen: boolean = false;

  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.profileOpen = !this.profileOpen;
  }

  @HostListener('document:click', ['$event']) closeOnclickOutside(event: MouseEvent) {
    if(!this.profileOpen) return;

    const clickedInseidePopup = this.profilePopup?.nativeElement.contains(event.target);
    const clickedProfileButton = this.profileButton?.nativeElement.contains(event.target);

    if (!clickedInseidePopup && !clickedProfileButton ) {
      this.profileOpen = false;
    }
  }
}
