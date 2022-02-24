import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupsService } from '../../lookups.service';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-single-email-edit',
  templateUrl: './single-email-edit.component.html',
  styleUrls: ['./single-email-edit.component.scss'],
})
export class SingleEmailEditComponent implements OnInit {
  id!: string | null;
  details: any;
  dataType!: string;
  editMode = false;
  editingKey!: string;
  editingValue: any;
  error!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _lookupService: LookupsService,
    private _http: HttpClient
  ) {}

  editModeOn(key: any, value: any): void {
    this.editMode = true;
    this.dataType = typeof value === 'number' ? 'number' : 'text';
    this.editingKey = key;
    this.editingValue = value;
  }

  getLookups(): void {
    if (this.id) {
      this._lookupService.getSpecificLookup(this.id).subscribe((details) => {
        this.details = details;
      });
    }
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.getLookups();
  }

  update(input: any): void {
    const dt = {};
    // @ts-ignore
    dt[this.editingKey] = input;
    this._lookupService.updateDetails(dt, this.id as string).then(() => {
      this.editMode = false;
    });
  }

  async delete(): Promise<void> {
    const params = new HttpParams().set('uid', this.id as string);

    this._lookupService.delete(this.id as string).then(async () => {
      const response = await this._http.post<string>(
        'https://us-central1-databinder-9f333.cloudfunctions.net/deleteUser',
        params
      );

      response.subscribe((data) => {
        this.error = data;
      });

      this._location.back();
    });
  }
}
