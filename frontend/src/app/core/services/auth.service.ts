import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { environment } from '../../../environments/environment';

if (!getApps().length) {
  initializeApp(environment.firebase);
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private firebaseAuth = getAuth();

  currentUser = signal<User | null | undefined>(undefined);

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUser.set(user);
    });
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.firebaseAuth, provider);
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await signOut(this.firebaseAuth);
    this.router.navigate(['/login']);
  }

  async getIdToken(): Promise<string | null> {
    return this.firebaseAuth.currentUser?.getIdToken() ?? null;
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null && this.currentUser() !== undefined;
  }
}
