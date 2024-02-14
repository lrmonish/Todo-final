import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custom404',
  templateUrl: './custom404.component.html',
  styleUrl: './custom404.component.css'
})
export class Custom404Component implements OnInit {
  matchedRoute!: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Access the unmatched path parameter if needed
    this.matchedRoute = this.route.snapshot.paramMap.get('path');

    // Optionally handle specific cases or perform custom logic here
  }

  // Function to navigate to a designated page (optional)
  goToHomePage() {
    this.router.navigate(['/']);
  }
}
