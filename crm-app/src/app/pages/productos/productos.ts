import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  private apiUrl = 'https://crm-backend-9qs1.onrender.com/api';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<any[]>(`${this.apiUrl}/productos`, { headers }).subscribe({
      next: (data) => { this.productos = data; },
      error: (err) => console.error(err)
    });
  }

  volver() { this.router.navigate(['/dashboard']); }
}