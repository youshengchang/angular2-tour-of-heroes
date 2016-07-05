import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html',
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit{ 
  heroes: Hero[];
  selectedHero: Hero;
  error: any;
  addingHero = false;

  constructor(
        private router: Router,
        private heroService: HeroService){

        }

  addHero(){
    this.addingHero = true;
    this.selectedHero = null;
  }

  clsoe(savedHero: Hero){
    this.addingHero = false;
    if(savedHero){
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any){
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res=>{
          this.heroes = this.heroes.filter(h=>h!==hero);
          if(this.selectedHero ===hero){
            this.selectedHero = null;
          }
        })
        .catch(error=> this.error = error);
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


