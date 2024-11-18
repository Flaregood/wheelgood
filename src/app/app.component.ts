import { Component, HostListener } from '@angular/core';
import options from './options';
import { NgParticlesModule } from 'ng-particles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import _particlesOptions from './particles-options';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgParticlesModule],
})
export class AppComponent {
  title = 'wheelgood';

  selectedOption: string;
  isSpinning: boolean;
  spinningOption: string;

  timeout;
  wheelSpinningTime;

  particlesOptions = _particlesOptions;

  stopWheel() {
    this.isSpinning = false;
    this.selectedOption = this.getRandomOption();
    clearTimeout(this.timeout);
    clearTimeout(this.wheelSpinningTime);
  }

  getRandomOption(): string {
    const rd = Math.round(Math.random() * (options.length - 1));
    return options[rd];
  }

  startWheel() {
    this.isSpinning = true;
    this.timeout = setTimeout(() => {
      this.wheelSpinning();
      this.startWheel();
    }, 10);
  }

  wheelSpinning() {
    this.spinningOption = this.getRandomOption();
  }

  @HostListener('mousedown')
  clickEvent() {
    if (!this.isSpinning) {
      this.startWheel();
      this.wheelSpinningTime = setTimeout(() => {
        this.stopWheel();
      }, Math.floor(Math.random() * 1000) + 500);
    }
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }
}
