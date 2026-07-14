import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserQueryParams, UserListResponse, ManagedUser } from '../../../core/models/user-management.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';

  getUsers(query: UserQueryParams): Observable<UserListResponse> {
    let params = new HttpParams()
      .set('_page', query.page)
      .set('_per_page', query.limit);

    if (query.search.trim()) {
      params = params.set('q', query.search.trim());
    }

    if (query.role) {
      params = params.set('role', query.role);
    }

    if (query.status) {
      params = params.set('status', query.status);
    }

    return this.http.get<any>(this.apiUrl, {
      params,
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;

        const rows = Array.isArray(body)
          ? body
          : Array.isArray(body?.data)
            ? body.data
            : [];

        const total = Number(
          response.headers.get('X-Total-Count') ??
          body?.meta?.total ??
          body?.items ??
          rows.length
        );

        return {
          data: rows,
          total
        };
      })
    );
  }

  createUser(payload: Omit<ManagedUser, 'id'>): Observable<ManagedUser> {
    return this.http.post<ManagedUser>(this.apiUrl, payload);
  }

  updateUser(id: number, payload: Omit<ManagedUser, 'id'>): Observable<ManagedUser> {
    return this.http.put<ManagedUser>(`${this.apiUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleStatus(user: ManagedUser): Observable<ManagedUser> {
    return this.http.patch<ManagedUser>(`${this.apiUrl}/${user.id}`, {
      status: user.status === 'active' ? 'inactive' : 'active'
    });
  }
}