import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liveaboards',
  templateUrl: './liveaboards.component.html',
  styleUrls: ['./liveaboards.component.css']
})
export class LiveaboardsComponent implements OnInit {

  filterDest  = 'All';
  filterDays  = 'All';
  filterLevel = 'All';
  sortBy      = 'rating';

  destinations = ['All', 'Brothers Islands', 'Elphinstone', 'Thistlegorm', 'Rocky Island', 'Daedalus'];
  durations    = ['All', '3 Days', '5 Days', '7 Days', '10 Days', '12 Days'];
  levels       = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Technical'];

  allBoats = [
    { id: '1', name: 'Red Sea Explorer', route: 'Brothers Islands', days: 7, guests: 20, price: 12500, rating: 4.9, reviews: 142, level: 'Advanced', tags: ['All-Inclusive', 'Night Diving'], image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=700&q=80' },
    { id: '2', name: 'Blue Horizon',     route: 'Elphinstone',     days: 5, guests: 16, price: 8900,  rating: 4.8, reviews: 98,  level: 'Intermediate', tags: ['Shark Diving', 'PADI'], image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80' },
    { id: '3', name: 'Thistlegorm Dream',route: 'Thistlegorm',     days: 3, guests: 12, price: 5500,  rating: 4.7, reviews: 76,  level: 'Beginner',    tags: ['Wreck Diving', 'History'], image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&q=80' },
    { id: '4', name: 'Ocean Wanderer',   route: 'Rocky Island',    days: 10,guests: 18, price: 17800, rating: 4.9, reviews: 203, level: 'Advanced',     tags: ['Remote Sites', 'Hammerheads'], image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80' },
    { id: '5', name: 'Daedalus Quest',   route: 'Daedalus',        days: 7, guests: 14, price: 13200, rating: 4.8, reviews: 119, level: 'Advanced',     tags: ['Pelagics', 'All-Inclusive'], image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=700&q=80' },
    { id: '6', name: 'Coral Princess',   route: 'Brothers Islands', days: 5, guests: 20, price: 9800, rating: 4.6, reviews: 87,  level: 'Intermediate', tags: ['Reef Diving', 'Photography'], image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=700&q=80' },
  ];

  filteredBoats = [...this.allBoats];

  whyItems = [
    { emoji: '🌊', title: 'Remote Sites', desc: 'Access reefs and wrecks impossible to reach on day trips.' },
    { emoji: '🌙', title: 'Night Diving', desc: 'Experience the reef after dark when nocturnal creatures emerge.' },
    { emoji: '🍽️', title: 'All-Inclusive', desc: 'Meals, tanks, weights, and guides — everything on board.' },
    { emoji: '👥', title: 'Small Groups', desc: 'Intimate groups of 12–20 divers for a personal experience.' },
  ];

  routes = [
    { name: 'Brothers Islands', desc: 'Legendary big fish encounters — hammerheads, thresher sharks, and manta rays in the open ocean.', highlights: ['Hammerheads', 'Mantas', '7+ days'] },
    { name: 'SS Thistlegorm', desc: "WWII British cargo shipwreck — one of the world's top 10 dive sites, loaded with military vehicles.", highlights: ['Wreck', 'History', '3+ days'] },
    { name: 'Elphinstone Reef', desc: 'A dramatic underwater plateau famous for oceanic whitetip sharks and stunning wall dives.', highlights: ['Sharks', 'Wall Diving', '5+ days'] },
    { name: 'Daedalus Reef', desc: 'Remote offshore reef teeming with pelagic life — scalloped hammerheads and silvertip sharks.', highlights: ['Remote', 'Pelagics', '7+ days'] },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.applyFilters();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.lb-anim').forEach(el => observer.observe(el));
  }

  applyFilters(): void {
    this.filteredBoats = this.allBoats
      .filter(b => {
        const matchDest  = this.filterDest  === 'All' || b.route === this.filterDest;
        const matchDays  = this.filterDays  === 'All' || b.days === parseInt(this.filterDays);
        const matchLevel = this.filterLevel === 'All' || b.level === this.filterLevel;
        return matchDest && matchDays && matchLevel;
      })
      .sort((a, b) => {
        if (this.sortBy === 'price_asc')  return a.price - b.price;
        if (this.sortBy === 'price_desc') return b.price - a.price;
        if (this.sortBy === 'days')       return b.days - a.days;
        return b.rating - a.rating;
      });
  }

  bookTrip(id: string): void {
    this.router.navigate(['/home/liveaboards', id]);
  }
}
