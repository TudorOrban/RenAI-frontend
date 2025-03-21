import { Component } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-app-search-bar',
  imports: [FontAwesomeModule],
  templateUrl: './app-search-bar.component.html',
  styleUrl: './app-search-bar.component.css'
})
export class AppSearchBarComponent {

    faSearch = faSearch;
}
