import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spotify: SpotifyService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(async parameters => {
        console.log(parameters);
        const a = this.spotify.getAuthToken(parameters.code);
        a.subscribe(r => console.log(r));
    });
  }

}
