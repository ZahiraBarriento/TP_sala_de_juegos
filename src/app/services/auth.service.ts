import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth : AngularFireAuth, 
    private router: Router,
    private db : AngularFirestore) { }
  
  login(email:string, password:string)
  {
    return new Promise((resolve, rejects) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(res =>{
        resolve(res);
      }).catch(error => rejects(error));
    });
  }

  register(name:string, lastName:string, email:string, password:string)
  {
    return new Promise((resolve, rejects) =>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res =>{
        const uid = res.user.uid;
        var json = {
          name : name,
          lastName : lastName,
          email : email,
          uid : uid
        }

        localStorage.setItem('userCurrent', JSON.stringify(json));
        this.db.collection('users').doc(uid).set(json);
        resolve(res);
      }).catch(error => rejects(error));
    });
  }

  getUserAuth()
  {
    return this.AFauth.authState
  }

  getData()
  { //Retorna la coleccion de la base de datos
    return this.db.collection('users').snapshotChanges()
  }

  exit()
  {
    this.AFauth.signOut().then(() =>{
      this.router.navigate(['/login']);
    })
  }

}
