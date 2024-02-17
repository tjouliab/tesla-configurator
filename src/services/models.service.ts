import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelColorsInformation } from '../dto/model-colors-information';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ModelColorsInformation[]> {
    return this.http.get<ModelColorsInformation[]>(`/models`);
  }
}
