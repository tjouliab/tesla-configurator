import { Injectable } from '@angular/core';
import { ModelConfigOptions } from '../dto/model-config-options';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}

  getOneByCode(id: string): Observable<ModelConfigOptions> {
    return this.http.get<ModelConfigOptions>(`/options/${id}`);
  }
}
