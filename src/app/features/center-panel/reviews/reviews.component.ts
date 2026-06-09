import { Component } from '@angular/core';

interface Review {
  id: number; diver: string; avatar: string; rating: number;
  trip: string; date: string; text: string;
  replied: boolean; reply?: string;
  starsList: boolean[];
}

@Component({ selector: 'app-center-reviews', templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'] })
export class CenterReviewsComponent {
  reviews: Review[] = [
    { id: 1, diver: 'Sarah M.', avatar: 'S', rating: 5, trip: 'Morning Reef Dive', date: 'Jul 10, 2025', text: 'Absolutely incredible! The instructors were so professional and the reef was breathtaking.', replied: false, starsList: [true,true,true,true,true] },
    { id: 2, diver: 'James K.', avatar: 'J', rating: 5, trip: 'Thistlegorm Wreck', date: 'Jun 28, 2025', text: 'Best dive of my life. The wreck site is mind-blowing. Highly recommend!', replied: true, reply: 'Thank you James! We loved having you on board.', starsList: [true,true,true,true,true] },
    { id: 3, diver: 'Lena P.', avatar: 'L', rating: 4, trip: 'PADI Open Water', date: 'Jun 15, 2025', text: 'Great course, patient instructors. The open water assessment was smooth and fun.', replied: false, starsList: [true,true,true,true,false] },
    { id: 4, diver: 'Ali K.', avatar: 'A', rating: 5, trip: 'Advanced Nitrox', date: 'Jun 5, 2025', text: 'Amazing experience! Very professional team and great equipment.', replied: false, starsList: [true,true,true,true,true] },
    { id: 5, diver: 'Emma W.', avatar: 'E', rating: 3, trip: 'Ras Mohammed NP', date: 'May 20, 2025', text: 'Good dive but the boat was a bit crowded. Scenery was stunning though.', replied: false, starsList: [true,true,true,false,false] },
  ];

  replyingId: number | null = null;
  replyText = '';

  get avgRating() { return (this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length).toFixed(1); }
  get goodReviewsCount() { return this.reviews.filter(r => r.rating >= 4).length; }

  openReply(id: number) { this.replyingId = id; this.replyText = ''; }
  submitReply(review: Review) {
    review.reply = this.replyText;
    review.replied = true;
    this.replyingId = null;
    this.replyText = '';
  }
}
