import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';


@Component({
  selector: 'ess-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formHome: FormGroup;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
   img= "../../../assets/tigre.jpeg";
   img1 = "../../../assets/mineral.png";
   img2 = "../../../assets/caja.png";
   img3= "../../../assets/senora.png";
   img4="../../../assets/tren.png";
   img5="../../../assets/trenn.png";

  constructor( private fb: FormBuilder ) {}

  ngOnInit() {
    this.formHome = this.fb.group({
      name: new FormControl('Hola Mundo')
    });
    this.filteredOptions = this.formHome.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
