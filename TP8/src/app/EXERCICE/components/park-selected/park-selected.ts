import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ParkService } from '../../services/park-service';
import { Park } from '../../models/park';

@Component({
  selector: 'app-park-selected',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './park-selected.html',
  styleUrl: './park-selected.css'
})
export class ParkSelected implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly parkService = inject(ParkService);

  park = signal<Park | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.parkService.getParkById(id).subscribe({
      next: p => this.park.set(p),
      error: () => this.router.navigate(['/error'])
    });
  }

  goBack() {
    this.router.navigate(['/parks']);
  }
}