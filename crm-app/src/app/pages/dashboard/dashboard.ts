import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  productos: any[] = [];
  stakeholders: any[] = [];
  private apiUrl = 'https://crm-backend-9qs1.onrender.com/api';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private http: HttpClient,
    private zone: NgZone
  ) {}

  ngOnInit() {
    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache'
    });

    this.http.get<any[]>(`${this.apiUrl}/productos`, { headers }).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.productos = data;
        });
      },
      error: (err) => console.error('Error productos:', err)
    });

    this.http.get<any>(`${this.apiUrl}/stakeholders`, { headers }).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.stakeholders = data.data;
        });
      },
      error: (err) => console.error('Error stakeholders:', err)
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}