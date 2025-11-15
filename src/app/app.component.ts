import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flash, flip, pulse, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("death", [
      transition(
        ":increment",
        useAnimation(shakeX, { params: { timing: 0.5 } })
      ),
    ]),
    trigger("attack", [transition(":increment",  [useAnimation(flash, {params: {timing : 0.3}}),useAnimation(pulse, { params: {timing : 0.3, scale : 4.5}})])]),
    trigger("bounce", [
      transition(
        ":increment",
        useAnimation(bounce, {params: {timing: 1}})
      ),
    ]),
    trigger("flip", [
      transition(
        ":increment",
        useAnimation(flip,  {params: {timing: 0.75}})
      ),
    ]),
    trigger("shake", [
      transition(
        ":increment",
        useAnimation(shakeX,  {params: {timing: 0.75}})
      ),
    ]),
    
    
  ]
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  ng_preAttack = 0;

  ng_shake = 0;
  ng_flip = 0;
  ng_bounce = 0;

  css_hit = false
  css_rotateCenter = false
  css_rotateTop = false

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime()
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime()

    // TODO 2e animation angular en même temps
    this.ng_death++
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
    this.ng_attack++
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true
    
    setTimeout(() => {this.css_hit = false}, 1000)
  }

  async bsf() {
    this.ng_bounce++
    
    await lastValueFrom(timer(1000))

    this.ng_shake++

    await lastValueFrom(timer(750))

    this.ng_flip++
  }

  showSlime(){
    let element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime() {
    let element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  playLoop() {
    this.css_rotateCenter = true

    setTimeout(() => {this.css_rotateTop = true}, 1600)

    setTimeout(() => {
      this.css_rotateCenter = false
      this.css_rotateTop = false
      this.playLoop()
    }, 2300)
  }
}
