import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sections',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './sections.html',
  styleUrl: './sections.scss',
})
export class SectionsComponent {

  @Input() iconSrc: string = '';
  @Input() title: string = '';

}
