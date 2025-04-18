/* eslint-disable prettier/prettier */
import EmberRouter from '@ember/routing/router';
import config from 'practice/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('student', function () {
    this.route('edit',{path:'/edit/:id'});
    this.route('add');
  });
  this.route('game', function() {
    this.route('simen-says');
    this.route('random');
    this.route('typing');
  });
  this.route('simen-says');
  this.route('properties', function() {
    this.route('liquid-fire');
  });
  this.route('liquid-fire');
});
