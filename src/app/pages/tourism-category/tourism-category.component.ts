import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { DirectoryService } from './../../services/directory.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export interface TourismCard {
  _id: string;
  whatIsIt: string;
  whereItIs: string;
  categories: [
    {
      catService: string;
    }
  ];
  pictures: [
    {
      route: string;
    }
  ];
}

@Component({
  selector: 'ess-tourism-category',
  templateUrl: './tourism-category.component.html',
  styleUrls: ['./tourism-category.component.scss'],
})
export class TourismCategoryComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private dirServ: DirectoryService
  ) {
    this.router.paramMap.subscribe((params) => {
      switch (this.router.snapshot.params.cat) {
        case 'Ecoturismo':
          this.tabSelect = 0;
          break;
        case 'Turismo de naturaleza':
          this.tabSelect = 1;
          break;
        case 'Turismo de aventura':
          this.tabSelect = 2;
          break;
        case 'Turismo sostenible':
          this.tabSelect = 3;
          break;
        case 'Turismo rural':
          this.tabSelect = 4;
          break;
      }

      this.ngOnInit();
    });
  }

  tourismCards: TourismCard[];
  tourismCard: TourismCard[];
  id: string;
  // selected: string
  category: string;
  tabSelect: number;
  //category = this.router.snapshot.params.cat

  ngOnInit() {
    this.category = this.router.snapshot.params.cat;
    this.getTabCategorie(this.category);
  }

  getTabCategorie(value) {
    this.category = value;

    this.dirServ.getServices().subscribe(
      (res) => {
        this.tourismCard = res as any;
      //  console.log(this.tourismCard);
        this.tourismCards = this.tourismCard.filter(
          (toris) => toris.categories[0].catService == this.category
        );
      //  console.log(this.tourismCards);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTabCategories($event) {
    // this.tourismCards = [];
    this.category = $event.tab.textLabel;

    this.dirServ.getServices().subscribe(
      (res) => {
        this.tourismCard = res as any;
        //   console.log(this.tourismCard);
      },
      (err) => {
        console.log(err);
      }
    );
    this.tourismCards = this.tourismCard.filter(
      (toris) => toris.categories[0].catService == this.category
    );
  }
  cardButton() {
    console.log('La carta es boton');
  }
}
