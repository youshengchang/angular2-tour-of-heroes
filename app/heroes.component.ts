import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html'
})

export class HeroesComponent implements OnInit{ 
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
        private router: Router,
        private heroService: HeroService){

        }

  ngOnInit(){
    this.getHeroes();
  }

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }

  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(){
    this.router.navigate(['/detail', this.selectedHero.id]);
  }


}


