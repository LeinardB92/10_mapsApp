import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


interface MarkerAndColor {
  color: string;
  marker: Marker;
}


@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: 13, // starting zoom
    });

    // Ejemplo básico de como se coloca un marcador.

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Soy un cacahuate'

    // const marker = new Marker({
    //   // color: 'red'
    //   element: markerHtml
    // }).setLngLat(this.currentLngLat).addTo(this.map);
  }


  createMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.markers.push({ color, marker, });
  }


  addMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.createMarker( lngLat, color );
  }


  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }
}
