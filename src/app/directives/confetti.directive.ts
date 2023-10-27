import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appConfetti]',
  exportAs: 'appConfetti'
})
export class ConfettiDirective implements AfterViewInit, OnDestroy {

  // https://codepen.io/jonathanbell/pen/OvYVYw

  W: number = 0;
  H: number = 0;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  maxConfettis = 75;
  particles: ConfettiParticle[] = [];

  possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
  ];

  stopped = false;

  constructor(elementRef: ElementRef<HTMLCanvasElement>) {
    this.canvas = elementRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.W = this.canvas.parentElement!.clientWidth;
      this.H = this.canvas.parentElement!.clientHeight;

      this.canvas.height = this.H;
      this.canvas.width = this.W;
    }, 0);
  }

  animate = () => {
    this.stopped = false;

    for (var i = 0; i < this.maxConfettis; i++) {
      this.particles.push(new ConfettiParticle(this));
    }

    this.Draw();

    setTimeout(() => this.stopped = true, 5e3);
  }

  randomFromTo(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  Draw = () => {
    const results = [];

    if (!this.context) return;

    if (this.particles.every(({ deleted }) => deleted)) {
      this.context.clearRect(0, 0, this.W, window.innerHeight);
      this.particles = [];
      return;
    }

    // Magical recursive functional love
    requestAnimationFrame(this.Draw);

    this.context.clearRect(0, 0, this.W, window.innerHeight);

    for (var i = 0; i < this.maxConfettis; i++) {
      const particle = this.particles[i];
      if (!particle.deleted) results.push(this.particles[i].draw());
    }

    let particle: ConfettiParticle | undefined;
    let remainingFlakes = 0;

    for (var i = 0; i < this.maxConfettis; i++) {
      particle = this.particles[i];

      if (!particle.deleted) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= this.H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > this.W + 30 || particle.x < -30 || particle.y > this.H) {
          particle.x = Math.random() * this.W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;

          if (this.stopped) particle.deleted = true;
        }
      }
    }

    return results;
  }

  ngOnDestroy(): void {
    this.stopped = true;
  }

}

class ConfettiParticle {

  context: CanvasRenderingContext2D | null;

  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
  deleted = false;

  constructor({ W, H, randomFromTo, maxConfettis, possibleColors, context }: ConfettiDirective) {
    this.context = context;

    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;
  }

  draw() {
    if (!this.context) return;

    this.context.beginPath();
    this.context.lineWidth = this.r / 2;
    this.context.strokeStyle = this.color;
    this.context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return this.context.stroke();
  }

}