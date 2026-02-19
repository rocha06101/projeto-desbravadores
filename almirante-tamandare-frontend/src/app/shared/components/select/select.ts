import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options: { label: string; value: any }[] = [];
  @Input() icon?: string;
  @Input() arrow = false;

  arrowOpen = false;

  value: any = '';
  disabled = false; 

private onChange: (value: any) => void = () => {};
private onTouched: () => void = () => {};

writeValue(value: any): void {
  this.value = value ?? '';
}

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched = fn;
}

setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled;
}

  openArrow() {
    this.arrowOpen = true;
  }

  closeArrow() {
    this.arrowOpen = false;
    this.onTouched();
  }

  handleChange(event: Event){
    const nextValue = (event.target as HTMLSelectElement).value;
    this.value = nextValue;
    this.onChange(this.value);
    this.closeArrow();
  }

}




