import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient
  ) {}

  ngOnInit() {
    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache'
    });

    // PRODUCTOS
    this.http.get<any[]>(`${this.apiUrl}/productos`, { headers }).subscribe({
      next: (data) => { 
        this.productos = data; 
        console.log('Productos:', data); 
      },
      error: (err) => console.error('Error productos:', err)
    });

    // STAKEHOLDERS
    this.http.get<any>(`${this.apiUrl}/stakeholders`, { headers }).subscribe({
      next: (data) => { 
        this.stakeholders = data.data || []; 
        console.log('Stakeholders:', data); 
      },
      error: (err) => console.error('Error stakeholders:', err)
    });
  }

  trackById(index: number, item: any) {
    return item._id;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}