import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectoNavState {
  // Signal para manejar el estado colapsado/expandido
  isCollapsed = signal<boolean>(false);

  toggle(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  collapse(): void {
    this.isCollapsed.set(true);
  }

  expand(): void {
    this.isCollapsed.set(false);
  }
}
